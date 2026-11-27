function isObject(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
function safeKey(k) {
  if (k === '__proto__' || k === 'prototype' || k === 'constructor') throw new Error('保留属性名');
  return k;
}
function tokens(path) {
  if (typeof path !== 'string' || !path.trim()) throw new Error('path 必须是非空字符串');
  var s = path.trim();
  if (s === '$') return [];
  if (s.charAt(0) === '$') s = s.slice(1).replace(/^\./, '');
  var out = [], part = '';
  for (var i = 0; i < s.length; i++) {
    var ch = s.charAt(i);
    if (ch === '.') { if (part) { out.push(part); part = ''; } }
    else if (ch === '[') {
      if (part) { out.push(part); part = ''; }
      var end = s.indexOf(']', i + 1);
      if (end < 0) throw new Error('path 缺少 ]');
      var raw = s.slice(i + 1, end).trim();
      if (/^\d+$/.test(raw)) out.push(Number(raw));
      else if ((raw.charAt(0) === '"' && raw.charAt(raw.length - 1) === '"') ||
               (raw.charAt(0) === "'" && raw.charAt(raw.length - 1) === "'")) out.push(raw.slice(1, -1));
      else throw new Error('path 下标必须是整数或引号键名');
      i = end;
    } else part += ch;
  }
  if (part) out.push(part);
  return out;
}
function getPath(value, path) {
  var parts = tokens(path), current = value;
  for (var i = 0; i < parts.length; i++) {
    var key = parts[i];
    if (typeof key === 'string') safeKey(key);
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(Object(current), key)) {
      throw new Error('path 不存在：' + path);
    }
    current = current[key];
  }
  if (current === undefined) throw new Error('path 结果为 undefined：' + path);
  return current;
}
function cloneJson(value) {
  var text = JSON.stringify(value);
  if (text === undefined) throw new Error('value 不是可序列化 JSON');
  return JSON.parse(text);
}
function setPath(root, path, value) {
  var parts = tokens(path);
  if (!parts.length) throw new Error('不能设置根路径');
  var current = root;
  for (var i = 0; i < parts.length - 1; i++) {
    var key = parts[i];
    if (typeof key === 'string') safeKey(key);
    if (current[key] === null || typeof current[key] !== 'object') current[key] = typeof parts[i + 1] === 'number' ? [] : {};
    current = current[key];
  }
  var last = parts[parts.length - 1];
  if (typeof last === 'string') safeKey(last);
  current[last] = value;
  return root;
}
function matches(item, where) {
  if (!isObject(where)) return true;
  var keys = Object.keys(where);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i], actual;
    try { actual = getPath(item, key); } catch (e) { return false; }
    var expected = where[key];
    if (isObject(expected) && Object.prototype.hasOwnProperty.call(expected, 'in')) {
      if (!Array.isArray(expected.in) || expected.in.indexOf(actual) < 0) return false;
    } else if (isObject(expected) && Object.prototype.hasOwnProperty.call(expected, 'ne')) {
      if (actual === expected.ne) return false;
    } else if (actual !== expected) return false;
  }
  return true;
}
function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  var x = String(a), y = String(b);
  return x < y ? -1 : x > y ? 1 : 0;
}
function call(input) {
  if (!isObject(input) || typeof input.method !== 'string' || !Array.isArray(input.args) ||
      input.args.length !== 1 || !isObject(input.args[0])) throw new Error('输入必须是 {method, args:[参数对象]}');
  var m = input.method, a = input.args[0];
  if (m === 'parse') {
    if (typeof a.text !== 'string') throw new Error('text 必须是字符串');
    return JSON.parse(a.text);
  }
  if (m === 'stringify') {
    var encoded = JSON.stringify(a.value);
    if (encoded === undefined) throw new Error('value 不是可序列化 JSON');
    return encoded;
  }
  if (m === 'get') return getPath(a.value, a.path);
  if (m === 'set') return setPath(cloneJson(a.value), a.path, a.nextValue);
  if (m === 'select') {
    if (!Array.isArray(a.items)) throw new Error('items 必须是数组');
    var rows = a.items.filter(function (x) { return matches(x, a.where); });
    if (!Array.isArray(a.pick) || !a.pick.length) return rows;
    return rows.map(function (x) {
      var out = {};
      for (var i = 0; i < a.pick.length; i++) out[a.pick[i]] = getPath(x, a.pick[i]);
      return out;
    });
  }
  if (m === 'pluck') {
    if (!Array.isArray(a.items)) throw new Error('items 必须是数组');
    return a.items.filter(function (x) { return matches(x, a.where); }).map(function (x) { return getPath(x, a.path); });
  }
  if (m === 'concat') {
    if (!Array.isArray(a.arrays)) throw new Error('arrays 必须是数组');
    var joined = [];
    for (var j = 0; j < a.arrays.length; j++) {
      if (!Array.isArray(a.arrays[j])) throw new Error('arrays 每项都必须是数组');
      joined = joined.concat(a.arrays[j]);
    }
    return joined;
  }
  if (m === 'unique') {
    if (!Array.isArray(a.items)) throw new Error('items 必须是数组');
    var seen = {}, unique = [];
    for (var k = 0; k < a.items.length; k++) {
      var item = a.items[k], key = a.key ? getPath(item, a.key) : JSON.stringify(item);
      var identity = typeof key + ':' + String(key);
      if (!Object.prototype.hasOwnProperty.call(seen, identity)) { seen[identity] = true; unique.push(item); }
    }
    return unique;
  }
  if (m === 'append') {
    if (!Array.isArray(a.items)) throw new Error('items 必须是数组');
    return a.items.concat([a.value]);
  }
  if (m === 'groupCount') {
    if (!Array.isArray(a.items) || typeof a.path !== 'string') throw new Error('items/path 参数无效');
    var counts = Object.create(null);
    for (var n = 0; n < a.items.length; n++) {
      var groupKey = String(getPath(a.items[n], a.path));
      counts[groupKey] = (counts[groupKey] || 0) + 1;
    }
    return Object.keys(counts).map(function (key) { return { key: key, count: counts[key] }; })
      .sort(function (x, y) { return (y.count - x.count) || compare(x.key, y.key); });
  }
  if (m === 'sortBy') {
    if (!Array.isArray(a.items) || typeof a.path !== 'string') throw new Error('items/path 参数无效');
    var direction = a.order === 'desc' ? -1 : 1;
    return a.items.slice().sort(function (x, y) { return direction * compare(getPath(x, a.path), getPath(y, a.path)); });
  }
  if (m === 'take') {
    if (!Array.isArray(a.items) || !Number.isInteger(a.count) || a.count < 0) throw new Error('items/count 参数无效');
    return a.items.slice(0, a.count);
  }
  throw new Error('不支持的 JSON action：' + m);
}
