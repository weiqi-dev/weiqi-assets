/**
 * 弈友圈关系算子（workflow-operator 扩展点的插件工件）
 *
 * 对外只暴露一个方法 normalize({games, rootUid})：把上游 foxwq_fetch_batch 取回的
 * 「紧凑对局行」投影成一份纯计数与图结构 —— stats / nodes / components / edges /
 * commonOpponents。插件不做任何圈层判定，不写「达到几局算熟人」「共邻几个算一圈」之类阈值；
 * 哪些账号形成弈友圈、谁是高连通枢纽、谁游离在外，一律由模型依据这些可复算的事实归纳。
 *
 * 确定性：先按 (starttime, chessid) 升序稳定排序，再只做字符串比较、整数计数与稳定排序；
 * 零网络、零时钟、零随机数、零宿主能力。uid 一律字符串化后参与相等比较
 * （与 foxwq_fetch_batch 的 String(...) 口径一致）。全部统计口径逐条写在同目录 README.md。
 * 输出字段顺序即重要度顺序：摘要在前、明细在后，便于回灌被裁剪时保住关键信息。
 */

/** 字典序升序比较器（uid / chessid / starttime 的字符串定序都用这一支） */
function cmpStr(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/** 计数降序 + uid 升序（nodes 用），uid 升序是确定性兜底 */
function cmpCountThenUid(x, y) {
  if (x.gameCount !== y.gameCount) return y.gameCount - x.gameCount;
  return cmpStr(x.uid, y.uid);
}

/** 一条边的稳定键：两端 uid 按字典序定序后用 \u0000 连接，避免拼接歧义 */
function pairKey(u1, u2) {
  return cmpStr(u1, u2) <= 0 ? u1 + '\u0000' + u2 : u2 + '\u0000' + u1;
}

/** 排序键：starttime 升序、chessid 升序；用于「最近一局」取名字/段位，保证与输入顺序无关 */
function cmpRow(x, y) {
  var t = cmpStr(x.starttime, y.starttime);
  if (t !== 0) return t;
  return cmpStr(x.chessid, y.chessid);
}

/**
 * 清洗 + 去重上游的紧凑对局行：只保留统计需要的字段，uid 字符串化，按 chessid 去重。
 * 结构不合法的行跳过，不编造、不改写入参。chessid 缺失时按行号给一个稳定的合成键，
 * 避免把多条无 id 的行误并成一条。
 */
function cleanGames(games) {
  var seen = {};
  var out = [];
  for (var i = 0; i < games.length; i++) {
    var g = games[i];
    if (!g || typeof g !== 'object') continue;
    if (g.blackuid === undefined || g.blackuid === null ||
        g.whiteuid === undefined || g.whiteuid === null) continue;
    var cid = (g.chessid === undefined || g.chessid === null)
      ? 'row:' + i : String(g.chessid);
    if (seen[cid]) continue;
    seen[cid] = true;
    out.push({
      chessid: cid,
      blackuid: String(g.blackuid),
      blacknick: typeof g.blacknick === 'string' ? g.blacknick : '',
      blackdan: g.blackdan,
      whiteuid: String(g.whiteuid),
      whitenick: typeof g.whitenick === 'string' ? g.whitenick : '',
      whitedan: g.whitedan,
      starttime: typeof g.starttime === 'string' ? g.starttime : '',
      winner: g.winner
    });
  }
  out.sort(cmpRow);
  return out;
}

/**
 * 合并成对边：一条边 = 一对 (a,b) 的所有对局合并。
 * a/b 按 uid 字典序定序去重；aWins/bWins 按 winner（1=黑胜、2=白胜、0=和棋）对照
 * a/b 实际执黑执白统计，和棋不计入任一方胜场；lastTime 取该对局里 starttime 最大值
 * （字符串比较即可，格式 YYYY-MM-DD HH:MM:SS）。
 * aName/bName 取该方在这对局里按 (starttime, chessid) 最后一局的显示名；
 * 若那一局为空名，回退到该方在这对局里出现过的最后一个非空显示名。
 * 自对局（两端 uid 相同）不建边：它不是两个账号之间的交战。
 */
function buildEdges(rows) {
  var map = {};
  for (var i = 0; i < rows.length; i++) {
    var g = rows[i];
    var u1 = g.blackuid, u2 = g.whiteuid;
    if (u1 === u2) continue;
    var key = pairKey(u1, u2);
    var a = cmpStr(u1, u2) <= 0 ? u1 : u2;
    var b = cmpStr(u1, u2) <= 0 ? u2 : u1;
    var aName, bName;
    if (a === u1) { aName = g.blacknick; bName = g.whitenick; }
    else { aName = g.whitenick; bName = g.blacknick; }
    var e = map[key];
    if (!e) {
      e = { a: a, aName: '', b: b, bName: '', games: 0,
            aWins: 0, bWins: 0, lastTime: '',
            _aFallback: '', _bFallback: '' };
      map[key] = e;
    }
    e.games += 1;
    if (cmpStr(g.starttime, e.lastTime) > 0) e.lastTime = g.starttime;
    // 胜场：黑方胜记给实际执黑方，白方胜记给实际执白方，和棋与未知值都不计
    var w = g.winner;
    if (w === 1 || w === '1') {
      if (g.blackuid === a) e.aWins += 1; else e.bWins += 1;
    } else if (w === 2 || w === '2') {
      if (g.whiteuid === a) e.aWins += 1; else e.bWins += 1;
    }
    // rows 已按 (starttime, chessid) 升序，逐行覆盖即「最近一局」的名字
    if (aName) e._aFallback = aName;
    if (bName) e._bFallback = bName;
    e.aName = aName;
    e.bName = bName;
  }
  var list = [];
  for (var k in map) {
    if (!Object.prototype.hasOwnProperty.call(map, k)) continue;
    var v = map[k];
    list.push({
      a: v.a,
      aName: v.aName || v._aFallback,
      b: v.b,
      bName: v.bName || v._bFallback,
      games: v.games,
      aWins: v.aWins,
      bWins: v.bWins,
      lastTime: v.lastTime
    });
  }
  // 按 games 降序；并列时 a、b 字典序升序兜底，保证确定性
  list.sort(function (x, y) {
    if (x.games !== y.games) return y.games - x.games;
    if (x.a !== y.a) return cmpStr(x.a, y.a);
    return cmpStr(x.b, y.b);
  });
  return list;
}

/**
 * 节点表：uid / name / dan / degree / gameCount。
 * degree = 该 uid 在 edges 里出现过的不同对手数（edges 已按对去重，即关联边数）；
 * gameCount = 该 uid 参与的去重局数；
 * name/dan 取该 uid 参与的、按 (starttime, chessid) 最后一局里的显示名与原始段位值
 * （dan 保留原始数值，不调 formatDan，沙箱无 hostApi）；空名回退到出现过的最后一个非空显示名。
 * 按 gameCount 降序、uid 升序。
 */
function buildNodes(rows, edges) {
  var gameCount = {}, name = {}, dan = {}, fallback = {};
  for (var i = 0; i < rows.length; i++) {
    var g = rows[i];
    var sides = [
      { uid: g.blackuid, nm: g.blacknick, dn: g.blackdan },
      { uid: g.whiteuid, nm: g.whitenick, dn: g.whitedan }
    ];
    for (var j = 0; j < sides.length; j++) {
      var s = sides[j];
      if (gameCount[s.uid] === undefined) gameCount[s.uid] = 0;
      gameCount[s.uid] += 1;
      if (s.nm) fallback[s.uid] = s.nm;
      name[s.uid] = s.nm;
      dan[s.uid] = s.dn;
    }
  }
  var degree = {};
  for (var e = 0; e < edges.length; e++) {
    var ed = edges[e];
    if (degree[ed.a] === undefined) degree[ed.a] = 0;
    if (degree[ed.b] === undefined) degree[ed.b] = 0;
    degree[ed.a] += 1;
    degree[ed.b] += 1;
  }
  var out = [];
  for (var uid in gameCount) {
    if (!Object.prototype.hasOwnProperty.call(gameCount, uid)) continue;
    out.push({
      uid: uid,
      name: name[uid] || fallback[uid] || '',
      dan: dan[uid],
      degree: degree[uid] || 0,
      gameCount: gameCount[uid]
    });
  }
  out.sort(cmpCountThenUid);
  return out;
}

/**
 * 无向图连通分量：以 edges 建邻接表，节点集取 nodes[] 的全部 uid
 * （只出现在自对局里的账号是孤立点，自成 size=1 分量，不丢节点）。
 * uids 按升序逐个起 BFS，邻居也按 uid 升序扩展，保证遍历顺序确定；
 * 每个分量 members 按 uid 升序，整体按 size 降序、再按 members[0] 升序。
 */
function buildComponents(nodes, edges) {
  var adj = {};
  for (var n = 0; n < nodes.length; n++) adj[nodes[n].uid] = [];
  for (var i = 0; i < edges.length; i++) {
    var a = edges[i].a, b = edges[i].b;
    if (!adj[a]) adj[a] = [];
    if (!adj[b]) adj[b] = [];
    adj[a].push(b);
    adj[b].push(a);
  }
  var uids = Object.keys(adj).sort(cmpStr);
  var visited = {};
  var comps = [];
  for (var k = 0; k < uids.length; k++) {
    var start = uids[k];
    if (visited[start]) continue;
    var queue = [start];
    visited[start] = true;
    var members = [];
    while (queue.length > 0) {
      var cur = queue.shift();
      members.push(cur);
      var nb = (adj[cur] || []).slice().sort(cmpStr);
      for (var m = 0; m < nb.length; m++) {
        if (!visited[nb[m]]) { visited[nb[m]] = true; queue.push(nb[m]); }
      }
    }
    members.sort(cmpStr);
    comps.push({ size: members.length, members: members });
  }
  comps.sort(function (x, y) {
    if (x.size !== y.size) return y.size - x.size;
    return cmpStr(x.members[0], y.members[0]);
  });
  return comps;
}

/**
 * 与 rootUid 的共同对手：shared = 节点 i 与 rootUid 的邻居集合交集大小；
 * gamesWithRoot = 该节点与 rootUid 直接对局数（无则 0）。
 * 列出除 rootUid 自身外的全部节点，按 shared 降序、再按 uid 升序（确定性兜底）。
 */
function buildCommonOpponents(rootUid, nodes, edges, rows) {
  var neigh = {};
  for (var i = 0; i < edges.length; i++) {
    var ed = edges[i];
    if (!neigh[ed.a]) neigh[ed.a] = [];
    if (!neigh[ed.b]) neigh[ed.b] = [];
    neigh[ed.a].push(ed.b);
    neigh[ed.b].push(ed.a);
  }
  var rootSet = {};
  var rn = neigh[rootUid] || [];
  for (var r = 0; r < rn.length; r++) rootSet[rn[r]] = true;
  var direct = {};
  for (var g = 0; g < rows.length; g++) {
    var row = rows[g];
    var other;
    if (row.blackuid === rootUid) other = row.whiteuid;
    else if (row.whiteuid === rootUid) other = row.blackuid;
    else continue;
    if (direct[other] === undefined) direct[other] = 0;
    direct[other] += 1;
  }
  var out = [];
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    if (node.uid === rootUid) continue;
    var set = neigh[node.uid] || [];
    var shared = 0;
    for (var s = 0; s < set.length; s++) if (rootSet[set[s]]) shared += 1;
    out.push({
      uid: node.uid,
      name: node.name,
      shared: shared,
      gamesWithRoot: direct[node.uid] || 0
    });
  }
  out.sort(function (x, y) {
    if (x.shared !== y.shared) return y.shared - x.shared;
    return cmpStr(x.uid, y.uid);
  });
  return out;
}


/**
 * 从主账号对局中提取对手 uid，按对局数降序、uid 升序选取。
 * 只负责围棋对手语义，不负责取数或分页。
 */
function pickOpponents(args) {
  if (!args || !Array.isArray(args.games)) throw new Error("games 必须是数组");
  if (typeof args.rootUid !== "string") throw new Error("rootUid 必须是字符串");
  var count = args.opponentCount === undefined ? 8 : args.opponentCount;
  var hops = args.maxHops === undefined ? 2 : args.maxHops;
  if (!Number.isInteger(count) || count < 0) throw new Error("opponentCount 必须是非负整数");
  if (hops !== 1 && hops !== 2) throw new Error("maxHops 只能是 1 或 2");
  if (hops === 1 || count === 0) return [];
  var counts = Object.create(null);
  for (var i = 0; i < args.games.length; i++) {
    var game = args.games[i];
    if (!game || typeof game !== "object") continue;
    var black = game.blackuid === undefined || game.blackuid === null ? "" : String(game.blackuid);
    var white = game.whiteuid === undefined || game.whiteuid === null ? "" : String(game.whiteuid);
    var other = black === args.rootUid ? white : (white === args.rootUid ? black : "");
    if (!other || other === args.rootUid) continue;
    if (counts[other] === undefined) counts[other] = 0;
    counts[other] += 1;
  }
  return Object.keys(counts).sort(function (a, b) {
    if (counts[a] !== counts[b]) return counts[b] - counts[a];
    return cmpStr(a, b);
  }).slice(0, count);
}

/**
 * normalize：把对局行投影为可复算的关系事实。
 * 出参 {stats, nodes, components, edges, commonOpponents}，摘要在前、明细在后。
 * stats.expandedCount = 图中除 rootUid 外的不同账号数（可由 nodes[] 直接复算，见 README）。
 * 只出计数与图结构，绝不输出任何圈层 / 熟人 / 枢纽判定。
 */
function normalize(args) {
  if (!args || typeof args !== 'object') throw new Error('参数必须是对象');
  if (!Array.isArray(args.games)) throw new Error('games 必须是数组');
  if (typeof args.rootUid !== 'string') throw new Error('rootUid 必须是字符串');
  var rootUid = args.rootUid;
  var rows = cleanGames(args.games);
  var edges = buildEdges(rows);
  var nodes = buildNodes(rows, edges);
  var components = buildComponents(nodes, edges);
  var expandedCount = 0;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].uid !== rootUid) expandedCount += 1;
  }
  return {
    stats: {
      rootUid: rootUid,
      totalGames: rows.length,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      expandedCount: expandedCount
    },
    nodes: nodes,
    components: components,
    edges: edges,
    commonOpponents: buildCommonOpponents(rootUid, nodes, edges, rows)
  };
}

function summary(args) {
  if (!args || typeof args.analysis !== 'object' || args.analysis === null) throw new Error('analysis 必须是对象');
  var value = args.analysis;
  return {
    stats: value.stats,
    nodes: value.nodes,
    components: value.components,
    commonOpponents: value.commonOpponents
  };
}

/** workflow-operator 扩展点入口：宿主以 call({method,args}) 调用。 */
function call(input) {
  if (!input || typeof input.method !== 'string') throw new Error('缺少 method');
  if (!Array.isArray(input.args) || input.args.length !== 1) throw new Error('args 必须是含一个参数对象的数组');
  if (input.method === 'pickOpponents') return pickOpponents(input.args[0]);
  if (input.method === 'normalize') return normalize(input.args[0]);
  if (input.method === 'summary') return summary(input.args[0]);
  throw new Error('不支持的方法：' + input.method);
}
