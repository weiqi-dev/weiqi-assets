/**
 * 直胜排名插件
 * 口径（原内置 'directWin'）：积分 → 对手分 → 直胜 → 逆减；展示列含累进分。
 * 从原始对阵表自行算出全部列，输出 { columns, rows }。
 */
function rank(input) {
  var matches = (input && input.matches) || [];
  var players = {};

  function addPlayer(id, name) {
    if (!id || !name) return;
    var k = String(id);
    if (!players[k]) {
      players[k] = {
        id: id, name: name, score: 0, opponentScore: 0, progressiveScore: 0,
        opponents: [], progressive: [], roundOpponents: [],
        reverseMinus: [], reverseMinusValue: [],
        directResults: {}
      };
    }
  }

  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    addPlayer(m.p1Id, m.p1Name);
    addPlayer(m.p2Id, m.p2Name);
  }

  // 逐场累计：积分、逐轮累进、对手列表、直胜结果
  for (var j = 0; j < matches.length; j++) {
    var g = matches[j];
    var s1 = Number(g.p1Score) || 0;
    var s2 = Number(g.p2Score) || 0;
    var finished = !(s1 === 0 && s2 === 0);
    if (g.p1Id && g.p1Name && players[String(g.p1Id)]) {
      var a = players[String(g.p1Id)];
      a.score += s1;
      a.progressive.push(a.score);
      if (g.p2Id && g.p2Name) {
        a.opponents.push(String(g.p2Id));
        a.roundOpponents.push({ bout: g.bout, opponentId: String(g.p2Id) });
        if (finished) a.directResults[String(g.p2Id)] = (s1 === 2 ? 1 : (s1 === 0 ? -1 : 0.5));
      }
    }
    if (g.p2Id && g.p2Name && players[String(g.p2Id)]) {
      var b = players[String(g.p2Id)];
      b.score += s2;
      b.progressive.push(b.score);
      if (g.p1Id && g.p1Name) {
        b.opponents.push(String(g.p1Id));
        b.roundOpponents.push({ bout: g.bout, opponentId: String(g.p1Id) });
        if (finished) b.directResults[String(g.p1Id)] = (s2 === 2 ? 1 : (s2 === 0 ? -1 : 0.5));
      }
    }
  }

  var keys = Object.keys(players);
  for (var k = 0; k < keys.length; k++) {
    var p = players[keys[k]];
    var oppSum = 0;
    for (var q = 0; q < p.opponents.length; q++) {
      var o = players[p.opponents[q]];
      if (o) oppSum += o.score;
    }
    p.opponentScore = oppSum;
    var prog = 0;
    for (var pg = 0; pg < p.progressive.length; pg++) prog += p.progressive[pg];
    p.progressiveScore = prog;

    var ro = p.roundOpponents.slice().sort(function (x, y) {
      return (Number(x.bout) || 0) - (Number(y.bout) || 0);
    });
    var residual = oppSum;
    p.reverseMinus = [];
    if (oppSum > 0) {
      for (var r = 0; r < ro.length; r++) {
        var op = players[ro[r].opponentId];
        residual -= op ? op.score : 0;
        p.reverseMinus.push(residual);
      }
    }
  }

  function cmpReverse(a, b) {
    var n = Math.max(a.reverseMinus.length, b.reverseMinus.length);
    for (var i = 0; i < n; i++) {
      var av = a.reverseMinus[i] || 0;
      var bv = b.reverseMinus[i] || 0;
      if (bv !== av) return bv - av;
    }
    return 0;
  }

  // 排序：积分 → 对手分 → 直胜（两人交手分出胜负时）→ 逆减
  var sorted = keys.slice().sort(function (ka, kb) {
    var a = players[ka], b = players[kb];
    if (b.score !== a.score) return b.score - a.score;
    if (b.opponentScore !== a.opponentScore) return b.opponentScore - a.opponentScore;
    var av = a.directResults[kb];
    if (av === 1) return -1;
    if (av === -1) return 1;
    return cmpReverse(a, b);
  });

  // 直胜展示值：同分同对手分且组内仅另一人时，取对那个人的交手结果
  for (var t = 0; t < sorted.length; t++) {
    var pl = players[sorted[t]];
    var tied = [];
    for (var u = 0; u < sorted.length; u++) {
      if (u === t) continue;
      var other = players[sorted[u]];
      if (other.score === pl.score && other.opponentScore === pl.opponentScore) {
        tied.push(sorted[u]);
      }
    }
    pl.directWin = 0;
    if (tied.length === 1) {
      var d = pl.directResults[tied[0]];
      pl.directWin = (d === 1 ? 1 : (d === -1 ? -1 : 0));
    }
  }

  // 逆减显示：同分组（积分、对手分相同且直胜未决出胜负）取首个能区分的轮次
  var idx = 0;
  while (idx < sorted.length) {
    var end = idx + 1;
    while (end < sorted.length) {
      var cur = players[sorted[idx]], nxt = players[sorted[end]];
      if (cur.score !== nxt.score || cur.opponentScore !== nxt.opponentScore) break;
      var d2 = cur.directResults[sorted[end]];
      if (d2 !== undefined && d2 !== 0.5) break;
      end++;
    }
    var group = sorted.slice(idx, end);
    if (group.length <= 1) {
      if (group[0]) players[group[0]].reverseMinusValue = [];
      idx = end;
      continue;
    }
    var maxRounds = 0;
    for (var g1 = 0; g1 < group.length; g1++) {
      maxRounds = Math.max(maxRounds, players[group[g1]].reverseMinus.length);
    }
    var chosen = -1;
    for (var round = 0; round < maxRounds; round++) {
      var vals = [], distinct = {}, cnt = 0;
      for (var g2 = 0; g2 < group.length; g2++) {
        var val = players[group[g2]].reverseMinus[round] || 0;
        vals.push(val);
        if (!distinct[val]) { distinct[val] = true; cnt++; }
      }
      if (cnt === vals.length) { chosen = round; break; }
    }
    for (var g3 = 0; g3 < group.length; g3++) {
      var pl2 = players[group[g3]];
      if (chosen >= 0) {
        pl2.reverseMinusValue = [chosen + 1, Math.floor(pl2.reverseMinus[chosen] || 0)];
      } else {
        pl2.reverseMinusValue = pl2.reverseMinus.length > 0
          ? [pl2.reverseMinus.length, Math.floor(pl2.reverseMinus[pl2.reverseMinus.length - 1] || 0)]
          : [];
      }
    }
    idx = end;
  }

  var columns = [
    { key: 'score', label: '积分' },
    { key: 'opponentScore', label: '对手分' },
    { key: 'directWin', label: '直胜' },
    { key: 'progressiveScore', label: '累进分' },
    { key: 'reverseMinus', label: '逆减' }
  ];
  var rows = [];
  for (var s = 0; s < sorted.length; s++) {
    var pl3 = players[sorted[s]];
    rows.push({
      id: pl3.id, name: pl3.name, rank: s + 1,
      cells: {
        score: Math.floor(pl3.score),
        opponentScore: Math.floor(pl3.opponentScore),
        directWin: pl3.directWin,
        progressiveScore: Math.floor(pl3.progressiveScore),
        reverseMinus: pl3.reverseMinusValue.slice()
      }
    });
  }
  return { columns: columns, rows: rows };
}
