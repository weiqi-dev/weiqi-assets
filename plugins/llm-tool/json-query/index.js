/**
 * JSON 查询工具（llm-tool 扩展点）
 *
 * 本文件是 weiqi-assets 发布的插件工件，入口 call({method,args}) 由宿主 llm-tool
 * 扩展点约定调用。方法名只认白名单里的 query / grep / outline，参数只作为 JSON
 * 数据进入，不参与任何代码拼接。
 *
 * 解决什么：模型拿到一段 JSON 后，常常需要「只看某几个字段」「筛出满足条件的
 * 那些项」「数一下有多少条」「全文找某个串」。让模型自己通读并复述既容易漏，
 * 也容易把看不到的部分补出来。本工件把这类操作变成确定性的纯函数：给定同样的
 * 输入必得同样的输出，不读时钟、不联网、不产生随机数。
 *
 * 设计来源（逐条可争议、可复算，不引入任何经验阈值）：
 * - 路径分段：借鉴 JSON Pointer（RFC 6901）「按段定位」的思想，但语法与实现自写，
 *   未使用其转义规则、未复制任何第三方实现代码。
 * - 数组负下标：来自常见数组「倒数第 n 个」的语义，n 由调用方给出。
 * - 递归下降 `..name`：来自 XPath `//` 的直觉，语义在本文件里明确定义为
 *   「当前节点自身及所有后代中含该键者」，不沿用别处的边界约定。
 * - grep 全文扫描：对标 grep -r 的「遍历 + 匹配」，输出带路径对标 grep -n，
 *   count 对标 grep -c；实现自写。
 * - 严格相等、数值比较、子串判断：ECMAScript 标准语义，不做隐式类型转换。
 *
 * 不设默认 limit、不设默认深度、不设默认输出条数。所有「取多少」都由调用方
 * 显式给出；输出体积与执行时间由宿主 spec 的 maxOutputBytes / timeoutMs 兜底，
 * 资源侧不复制配额数值。遍历一律用显式队列，不做函数递归，以免深结构耗尽栈。
 */

/** 纯 JSON 值深度相等：NaN / Date / 循环引用不会出现（输入来自 JSON） */
function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== typeof b) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  if (typeof a === 'object') {
    var ka = Object.keys(a).sort();
    var kb = Object.keys(b).sort();
    if (ka.length !== kb.length) return false;
    for (var j = 0; j < ka.length; j++) {
      if (ka[j] !== kb[j] || !deepEqual(a[ka[j]], b[kb[j]])) return false;
    }
    return true;
  }
  return false;
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isObj(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function isScalar(v) {
  return v === null || typeof v === 'string' || typeof v === 'number'
    || typeof v === 'boolean';
}

function isPosInt(v) {
  return typeof v === 'number' && isFinite(v) && Math.floor(v) === v && v > 0;
}

// ---------------------------------------------------------------- 路径表达式

/**
 * 路径语法（自定义，逐条见 README）：
 *   $                 根节点，可省略
 *   .name             对象键；也可在开头直接写 name
 *   ["name"]          含特殊字符的键，转义交给 JSON 规则
 *   [n] / [-n]        数组下标 / 倒数第 n 个
 *   [*] / [] / .*     展开当前层全部子节点
 *   ..name            当前节点自身及所有后代中含该键者
 * 段可连续书写：$.Years.2027[*].Name
 */
function readBareName(s, i) {
  var j = i;
  while (j < s.length && s.charAt(j) !== '.' && s.charAt(j) !== '[') j++;
  if (j === i) return { name: '', next: i };
  return { name: s.slice(i, j), next: j };
}

function readQuoted(s, i) {
  var j = i + 1;
  var buf = '';
  while (j < s.length) {
    var c = s.charAt(j);
    if (c === '\\') {
      buf += c + (s.charAt(j + 1) || '');
      j += 2;
      continue;
    }
    if (c === '"') break;
    buf += c;
    j++;
  }
  if (s.charAt(j) !== '"') throw new Error('路径 ["..."] 缺少收尾引号');
  var name;
  try {
    name = JSON.parse('"' + buf + '"');
  } catch (e) {
    throw new Error('路径键名转义非法');
  }
  j++;
  if (s.charAt(j) !== ']') throw new Error('路径 ["..."] 后缺少 ]');
  return { name: name, next: j + 1 };
}

function readIndex(s, i) {
  var j = i;
  var sign = 1;
  if (s.charAt(j) === '-') {
    sign = -1;
    j++;
  }
  var start = j;
  while (j < s.length && s.charAt(j) >= '0' && s.charAt(j) <= '9') j++;
  if (j === start) throw new Error('路径下标必须是整数：位置 ' + i);
  if (s.charAt(j) !== ']') throw new Error('路径下标后缺少 ]');
  return { n: sign * Number(s.slice(start, j)), next: j + 1 };
}

function parsePath(expr) {
  if (typeof expr !== 'string') throw new Error('路径表达式必须是字符串');
  var s = expr.trim();
  if (s === '' || s === '$') return [];
  var i = 0;
  if (s.charAt(0) === '$') i = 1;
  var tokens = [];
  while (i < s.length) {
    var c = s.charAt(i);
    if (c === '.') {
      i++;
      if (s.charAt(i) === '.') {
        i++;
        var d = readBareName(s, i);
        if (!d.name) throw new Error('.. 后必须跟键名');
        tokens.push({ kind: 'descend', name: d.name });
        i = d.next;
      } else if (s.charAt(i) === '*') {
        i++;
        tokens.push({ kind: 'any' });
      } else if (s.charAt(i) === '[') {
        // 允许 .[ 这种写法，交给下一轮处理
      } else {
        var b = readBareName(s, i);
        if (!b.name) throw new Error('路径 . 后缺少键名：位置 ' + i);
        tokens.push({ kind: 'key', name: b.name });
        i = b.next;
      }
    } else if (c === '[') {
      i++;
      if (s.charAt(i) === ']') {
        i++;
        tokens.push({ kind: 'any' });
      } else if (s.charAt(i) === '*') {
        i++;
        if (s.charAt(i) !== ']') throw new Error('[*] 后缺少 ]');
        i++;
        tokens.push({ kind: 'any' });
      } else if (s.charAt(i) === '"') {
        var q = readQuoted(s, i);
        tokens.push({ kind: 'key', name: q.name });
        i = q.next;
      } else {
        var n = readIndex(s, i);
        tokens.push({ kind: 'index', n: n.n });
        i = n.next;
      }
    } else {
      var bare = readBareName(s, i);
      if (!bare.name) throw new Error('路径无法解析：位置 ' + i);
      tokens.push({ kind: 'key', name: bare.name });
      i = bare.next;
    }
  }
  return tokens;
}

/** 输出路径用的键表示：无特殊字符用 .name，否则用 ["..."]，可原样回贴给 parsePath */
function appendKey(p, name) {
  if (/^[^.\[\]"\s]+$/.test(name)) return p + '.' + name;
  return p + '[' + JSON.stringify(name) + ']';
}

/** 把一个节点的全部直接子节点按原顺序放进队列 */
function pushChildren(queue, node, path) {
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      queue.push({ node: node[i], path: path + '[' + i + ']' });
    }
  } else if (isObj(node)) {
    var keys = Object.keys(node);
    for (var j = 0; j < keys.length; j++) {
      queue.push({ node: node[keys[j]], path: appendKey(path, keys[j]) });
    }
  }
}

/** 按 token 序列选出命中节点；广度优先 + 显式队列，结果顺序确定且无递归 */
function walk(root, tokens) {
  var queue = [{ node: root, idx: 0, path: '$' }];
  var head = 0;
  var out = [];
  while (head < queue.length) {
    var cur = queue[head++];
    if (cur.idx >= tokens.length) {
      out.push({ path: cur.path, value: cur.node });
      continue;
    }
    var t = tokens[cur.idx];
    var nxt = cur.idx + 1;
    if (t.kind === 'key') {
      if (isObj(cur.node) && hasOwn(cur.node, t.name)) {
        queue.push({ node: cur.node[t.name], idx: nxt, path: appendKey(cur.path, t.name) });
      }
    } else if (t.kind === 'index') {
      if (Array.isArray(cur.node)) {
        var n = t.n < 0 ? cur.node.length + t.n : t.n;
        if (n >= 0 && n < cur.node.length) {
          queue.push({ node: cur.node[n], idx: nxt, path: cur.path + '[' + n + ']' });
        }
      }
    } else if (t.kind === 'any') {
      var direct = [];
      pushChildren(direct, cur.node, cur.path);
      for (var k = 0; k < direct.length; k++) {
        queue.push({ node: direct[k].node, idx: nxt, path: direct[k].path });
      }
    } else if (t.kind === 'descend') {
      var sub = [{ node: cur.node, path: cur.path }];
      var sh = 0;
      var found = [];
      while (sh < sub.length) {
        var d = sub[sh++];
        if (isObj(d.node) && hasOwn(d.node, t.name)) {
          found.push({ node: d.node[t.name], idx: nxt, path: appendKey(d.path, t.name) });
        }
        pushChildren(sub, d.node, d.path);
      }
      for (var f = 0; f < found.length; f++) queue.push(found[f]);
    }
  }
  return out;
}

// ---------------------------------------------------------------- 条件筛选

function someHit(hits, pred) {
  for (var i = 0; i < hits.length; i++) {
    if (pred(hits[i].value)) return true;
  }
  return false;
}

function oneCondition(node, c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) {
    throw new Error('where 每项必须是对象');
  }
  if (typeof c.op !== 'string') throw new Error('where.op 必须是字符串');
  var p = c.path === undefined || c.path === '' || c.path === '$' ? [] : parsePath(c.path);
  var hits = walk(node, p);
  var op = c.op;
  var b = c.value;
  if (op === 'exists') return hits.length > 0;
  if (hits.length === 0) return false;
  if (op === 'eq') return someHit(hits, function (a) { return deepEqual(a, b); });
  if (op === 'ne') return !someHit(hits, function (a) { return deepEqual(a, b); });
  if (op === 'in') {
    if (!Array.isArray(b)) throw new Error('where.op=in 时 value 必须是数组');
    return someHit(hits, function (a) {
      for (var i = 0; i < b.length; i++) {
        if (deepEqual(a, b[i])) return true;
      }
      return false;
    });
  }
  if (op === 'contains') {
    return someHit(hits, function (a) {
      if (typeof a === 'string') return typeof b === 'string' && a.indexOf(b) >= 0;
      if (Array.isArray(a)) return someHit(a.map(function (x) { return { value: x }; }),
        function (x) { return deepEqual(x, b); });
      if (isObj(a)) return typeof b === 'string' && hasOwn(a, b);
      return false;
    });
  }
  if (op === 'startsWith' || op === 'endsWith') {
    return someHit(hits, function (a) {
      if (typeof a !== 'string' || typeof b !== 'string') return false;
      if (op === 'startsWith') return a.indexOf(b) === 0;
      return a.length >= b.length && a.lastIndexOf(b) === a.length - b.length;
    });
  }
  if (op === 'gt' || op === 'gte' || op === 'lt' || op === 'lte') {
    return someHit(hits, function (a) {
      // 不做隐式类型转换：类型不同或不是数值/字符串，一律判不满足
      if (typeof a !== typeof b) return false;
      if (typeof a !== 'number' && typeof a !== 'string') return false;
      if (op === 'gt') return a > b;
      if (op === 'gte') return a >= b;
      if (op === 'lt') return a < b;
      return a <= b;
    });
  }
  if (op === 'match') {
    if (typeof b !== 'string') throw new Error('where.op=match 时 value 必须是正则字符串');
    var re = new RegExp(b, typeof c.flags === 'string' ? c.flags : '');
    return someHit(hits, function (a) {
      return isScalar(a) && re.test(String(a));
    });
  }
  throw new Error('不支持的 where.op：' + op);
}

function matchWhere(node, conditions) {
  for (var i = 0; i < conditions.length; i++) {
    if (!oneCondition(node, conditions[i])) return false;
  }
  return true;
}

// ---------------------------------------------------------------- 输出组装

function project(v, pick) {
  if (!pick) return v;
  if (Array.isArray(v)) {
    var arr = [];
    for (var i = 0; i < v.length; i++) arr.push(project(v[i], pick));
    return arr;
  }
  if (isObj(v)) {
    var o = {};
    for (var j = 0; j < pick.length; j++) {
      if (hasOwn(v, pick[j])) o[pick[j]] = v[pick[j]];
    }
    return o;
  }
  return v;
}

function readRoot(spec) {
  var hasJson = spec.json !== undefined;
  var hasText = spec.text !== undefined;
  if (hasJson === hasText) throw new Error('json 与 text 必须二选一');
  if (hasText) {
    if (typeof spec.text !== 'string') throw new Error('text 必须是 JSON 字符串');
    try {
      return JSON.parse(spec.text);
    } catch (e) {
      throw new Error('text 不是合法 JSON：' + (e && e.message ? e.message : String(e)));
    }
  }
  return spec.json;
}

function readCommon(spec) {
  if (spec.limit !== undefined && !isPosInt(spec.limit)) {
    throw new Error('limit 必须是正整数（不传则不限制）');
  }
  if (spec.count !== undefined && typeof spec.count !== 'boolean') {
    throw new Error('count 必须是布尔值');
  }
  if (spec.paths !== undefined && typeof spec.paths !== 'boolean') {
    throw new Error('paths 必须是布尔值');
  }
  if (spec.pick !== undefined) {
    if (!Array.isArray(spec.pick) || spec.pick.some(function (x) { return typeof x !== 'string'; })) {
      throw new Error('pick 必须是字符串数组');
    }
  }
  return {
    limit: spec.limit,
    count: spec.count === true,
    paths: spec.paths !== false,
    pick: spec.pick,
  };
}

function finish(hits, opt) {
  var all = [];
  for (var i = 0; i < hits.length; i++) {
    all.push({
      path: hits[i].path,
      value: opt.pick ? project(hits[i].value, opt.pick) : hits[i].value,
    });
  }
  var res = { ok: true, matched: all.length };
  if (opt.count) return res;
  var kept = opt.limit === undefined ? all : all.slice(0, opt.limit);
  res.returned = kept.length;
  res.truncated = kept.length < all.length;
  var items = [];
  for (var j = 0; j < kept.length; j++) {
    items.push(opt.paths ? { path: kept[j].path, value: kept[j].value } : kept[j].value);
  }
  res.items = items;
  return res;
}

// ---------------------------------------------------------------- 三个方法

/** query：路径选择 + 条件筛选 + 字段投影 */
function doQuery(spec) {
  var root = readRoot(spec);
  var opt = readCommon(spec);
  var tokens = spec.select === undefined || spec.select === '' ? [] : parsePath(spec.select);
  var candidates = walk(root, tokens);
  var where = spec.where === undefined ? [] : spec.where;
  if (!Array.isArray(where)) throw new Error('where 必须是数组');
  var hits = [];
  for (var i = 0; i < candidates.length; i++) {
    if (where.length === 0 || matchWhere(candidates[i].value, where)) hits.push(candidates[i]);
  }
  return finish(hits, opt);
}

/** grep：遍历全部标量节点，用正则匹配其字符串形式；容器本身不参与匹配 */
function doGrep(spec) {
  var root = readRoot(spec);
  var opt = readCommon(spec);
  if (typeof spec.pattern !== 'string') throw new Error('grep 需要 pattern（正则字符串）');
  var flags = spec.flags === undefined ? '' : spec.flags;
  if (typeof flags !== 'string') throw new Error('flags 必须是字符串');
  // g / y 会让 test 记住 lastIndex，导致同一正则在不同节点上结果不确定，故拒绝
  if (flags.indexOf('g') >= 0 || flags.indexOf('y') >= 0) {
    throw new Error('flags 不允许 g / y（会引入 lastIndex 状态，结果不确定）');
  }
  var re;
  try {
    re = new RegExp(spec.pattern, flags);
  } catch (e) {
    throw new Error('pattern 不是合法正则：' + (e && e.message ? e.message : String(e)));
  }
  var queue = [{ node: root, path: '$' }];
  var head = 0;
  var hits = [];
  while (head < queue.length) {
    var cur = queue[head++];
    if (isScalar(cur.node)) {
      if (re.test(String(cur.node))) hits.push({ path: cur.path, value: cur.node });
    } else {
      pushChildren(queue, cur.node, cur.path);
    }
  }
  return finish(hits, opt);
}

/** outline：描述给定路径命中节点的一层结构，不展开子层、不截断标量 */
function describe(node) {
  if (node === null) return { type: 'null', value: null };
  if (Array.isArray(node)) return { type: 'array', length: node.length };
  if (typeof node === 'object') return { type: 'object', keys: Object.keys(node) };
  return { type: typeof node, value: node };
}

function doOutline(spec) {
  var root = readRoot(spec);
  var tokens = spec.path === undefined || spec.path === '' ? [] : parsePath(spec.path);
  var hits = walk(root, tokens);
  var nodes = [];
  for (var i = 0; i < hits.length; i++) {
    var d = describe(hits[i].value);
    d.path = hits[i].path;
    nodes.push(d);
  }
  return { ok: true, matched: hits.length, nodes: nodes };
}

/** llm-tool 扩展点入口：宿主以 call({method,args}) 调用，方法名只认白名单 */
function call(input) {
  if (!input || typeof input !== 'object') throw new Error('输入必须是对象');
  var method = input.method;
  if (!Array.isArray(input.args) || input.args.length !== 1) {
    throw new Error('args 必须是含一个参数对象的数组');
  }
  var spec = input.args[0];
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
    throw new Error('参数必须是对象');
  }
  if (method === 'query') return doQuery(spec);
  if (method === 'grep') return doGrep(spec);
  if (method === 'outline') return doOutline(spec);
  throw new Error('不支持的方法：' + String(method));
}
