function rank(input) {
  var matches = (input && input.matches) || [];

  // ---- 收集选手与轮次 ----
  var players = {};
  var order = [];
  var roundSet = {};
  function addPlayer(id, name) {
    if (id === 0 || id === undefined || id === null || !name) return;
    var k = String(id);
    if (!players[k]) {
      players[k] = {
        id: id, name: name, points: 0,
        opponents: [], oppByRound: {}, actualRounds: {},
        games: []
      };
      order.push(k);
    }
  }
  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    if (m.bout !== undefined && m.bout !== null) roundSet[String(m.bout)] = true;
    addPlayer(m.p1Id, m.p1Name);
    addPlayer(m.p2Id, m.p2Name);
  }
  var roundCount = Object.keys(roundSet).length;
  // 按数值排序的轮次列表（从第一轮开始）
  var roundList = Object.keys(roundSet).slice().sort(function (a, b) {
    var na = Number(a), nb = Number(b);
    if (isFinite(na) && isFinite(nb)) return na - nb;
    return String(a).localeCompare(String(b));
  });

  function scoreOf(s1, s2) {
    if (s1 === s2) return 1;
    return s1 > s2 ? 2 : 0;
  }

  // ---- 积分、对手、交手记录 ----
  for (var j = 0; j < matches.length; j++) {
    var mm = matches[j];
    var a = String(mm.p1Id), b = String(mm.p2Id);
    var hasA = !!(players[a] && mm.p1Name);
    var hasB = !!(players[b] && mm.p2Name);
    var s1 = Number(mm.p1Score) || 0;
    var s2 = Number(mm.p2Score) || 0;
    var finished = !(s1 === 0 && s2 === 0);
    if (!finished) continue;
    var bk = String(mm.bout);

    if (hasA && hasB) {
      var pa = scoreOf(s1, s2), pb = scoreOf(s2, s1);
      players[a].points += pa;
      players[b].points += pb;
      players[a].opponents.push(b);
      players[b].opponents.push(a);
      (players[a].oppByRound[bk] || (players[a].oppByRound[bk] = [])).push(b);
      (players[b].oppByRound[bk] || (players[b].oppByRound[bk] = [])).push(a);
      players[a].actualRounds[bk] = true;
      players[b].actualRounds[bk] = true;
      players[a].games.push({ opp: b, mine: pa, theirs: pb, round: bk });
      players[b].games.push({ opp: a, mine: pb, theirs: pa, round: bk });
    } else if (hasA) {
      players[a].points += scoreOf(s1, s2);
      players[a].actualRounds[bk] = true;
    } else if (hasB) {
      players[b].points += scoreOf(s2, s1);
      players[b].actualRounds[bk] = true;
    }
  }

  // ---- 最高积分、对手分、总得分 ----
  var maxPoints = 0;
  var keys = Object.keys(players);
  for (var k0 = 0; k0 < keys.length; k0++) {
    if (players[keys[k0]].points > maxPoints) maxPoints = players[keys[k0]].points;
  }
  function oppTotal(p) {
    var t = 0;
    for (var q = 0; q < p.opponents.length; q++) {
      var o = players[p.opponents[q]];
      if (o) t += o.points;
    }
    return t;
  }
  for (var k1 = 0; k1 < keys.length; k1++) {
    var p = players[keys[k1]];
    p.opp = oppTotal(p);
    var raw = maxPoints > 0
      ? p.points + p.opp * 2 / maxPoints - roundCount
      : p.points - roundCount;
    p.total = Math.round(raw * 10) / 10;
    p.direct = [];      // 直胜：可比较时为 [2]，否则空数组
    p.reduce = [];      // 对手分顺减：[轮次, 剩余值] 或空数组
  }

  // ---- 分组：总得分 + 积分完全相同才比较直胜/顺减 ----
  var groups = {};
  for (var k2 = 0; k2 < keys.length; k2++) {
    var pp = players[keys[k2]];
    var gk = pp.total + '|' + pp.points;
    (groups[gk] || (groups[gk] = [])).push(keys[k2]);
  }
  var gKeys = Object.keys(groups);

  // 直胜：同分组内、两人对弈过 -> 胜者 [2]，负者 []；无可比较对象 -> []
  // 顺减：仅当同分组内直胜排不下来（含无可比较、和棋、多人环）时，才逐轮递减
  //       从第一轮开始减该轮对手积分，直到该轮剩余值出现差异即停，高者靠前
  for (var gi = 0; gi < gKeys.length; gi++) {
    var grp = groups[gKeys[gi]];
    var decided = {};   // 已被直胜判定出胜负的人
    var pairWinner = {}; // key = a|b，值为胜者key

    for (var x = 0; x < grp.length; x++) {
      for (var y = x + 1; y < grp.length; y++) {
        var ka = grp[x], kb = grp[y];
        var pa2 = players[ka];
        var found = null;
        for (var g = 0; g < pa2.games.length; g++) {
          if (pa2.games[g].opp === kb) { found = pa2.games[g]; break; }
        }
        if (found && found.mine !== found.theirs) {
          var w = found.mine > found.theirs ? ka : kb;
          var l = w === ka ? kb : ka;
          pairWinner[ka < kb ? ka + '|' + kb : kb + '|' + ka] = w;
          if (players[w].direct.length === 0) players[w].direct = [2];
          decided[w] = true; decided[l] = true;
        }
      }
    }

    // 找出直胜仍无法区分的集合（无可比较对象 / 和棋 / 未决出者）
    var needReduce = [];
    for (var z = 0; z < grp.length; z++) {
      if (!decided[grp[z]]) needReduce.push(grp[z]);
    }
    // 若存在差异但仍有并列胜者/多人环，也纳入顺减比较
    if (needReduce.length < 2) {
      // 单人可正常落位；但若组内多人且直胜全决出，就不再顺减
    }

    if (needReduce.length >= 2) {
      var remain = {};
      for (var n = 0; n < needReduce.length; n++) remain[needReduce[n]] = players[needReduce[n]].opp;
      for (var r = 0; r < roundList.length; r++) {
        var rk = roundList[r];
        var vals = [];
        for (var n2 = 0; n2 < needReduce.length; n2++) {
          var kk = needReduce[n2];
          var pk = players[kk];
          var sub = 0;
          var ops = pk.oppByRound[rk] || [];
          for (var oi = 0; oi < ops.length; oi++) {
            var op = players[ops[oi]];
            if (op) sub += op.points;
          }
          remain[kk] -= sub;
          vals.push(remain[kk]);
        }
        // 是否出现差异
        var diff = false;
        for (var v = 1; v < vals.length; v++) {
          if (vals[v] !== vals[0]) { diff = true; break; }
        }
        if (diff) {
          for (var n3 = 0; n3 < needReduce.length; n3++) {
            players[needReduce[n3]].reduce = [Number(rk), Math.round(remain[needReduce[n3]] * 10) / 10];
          }
          break;
        }
        // 仍相同则继续往前减
      }
      // 全部轮次减完仍相同：留空数组
    }
  }

  // ---- 比较器：总得分 > 积分 > 直胜 > 对手分顺减(高者前) > 对手分 ----
  function cmp(a, b) {
    var A = players[a], B = players[b];
    if (A.total !== B.total) return B.total - A.total;
    if (A.points !== B.points) return B.points - A.points;
    var da = A.direct.length ? A.direct[0] : 0;
    var db = B.direct.length ? B.direct[0] : 0;
    if (da !== db) return db - da;
    if (A.reduce.length && B.reduce.length) {
      if (A.reduce[1] !== B.reduce[1]) return B.reduce[1] - A.reduce[1];
    } else if (A.reduce.length !== B.reduce.length) {
      return B.reduce.length - A.reduce.length;
    }
    if (A.opp !== B.opp) return B.opp - A.opp;
    return 0;
  }

  var sorted = keys.slice().sort(cmp);

  // ---- 输出：先构造齐所有行再统一填 cells ----
  var columns = [
    { key: 'total', label: '总得分' },
    { key: 'points', label: '积分' },
    { key: 'direct', label: '直胜' },
    { key: 'reduce', label: '对手分顺减' }
  ];
  var rows = [];
  for (var s = 0; s < sorted.length; s++) {
    var k = sorted[s];
    var pl = players[k];
    var rk2 = s + 1;
    if (s > 0) {
      var prev = players[sorted[s - 1]];
      if (prev.total === pl.total && prev.points === pl.points &&
          ((prev.direct.length ? prev.direct[0] : 0) === (pl.direct.length ? pl.direct[0] : 0)) &&
          JSON.stringify(prev.reduce) === JSON.stringify(pl.reduce) &&
          prev.opp === pl.opp) {
        rk2 = rows[s - 1].rank;
      }
    }
    rows.push({
      id: pl.id, name: pl.name, rank: rk2,
      cells: {
        total: pl.total,
        points: pl.points,
        direct: pl.direct.slice(),
        reduce: pl.reduce.slice()
      }
    });
  }
  return { columns: columns, rows: rows };
}
