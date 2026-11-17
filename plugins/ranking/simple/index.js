/**
 * 简易排名插件
 * 口径（原内置 'simple'）：积分 → 对手分 → 逆减；不算累进分。
 * 从原始对阵表自行算出全部列，输出 { columns, rows }。
 */
function rank(input) {
  var matches = (input && input.matches) || [];
  var players = {};
  var order = [];

  function addPlayer(id, name) {
    if (!id || !name) return;
    var k = String(id);
    if (!players[k]) {
      players[k] = {
        id: id, name: name, score: 0, opponentScore: 0,
        opponents: [], roundOpponents: [],
        reverseMinus: [], reverseMinusValue: []
      };
      order.push(k);
    }
  }

  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    addPlayer(m.p1Id, m.p1Name);
    addPlayer(m.p2Id, m.p2Name);
  }

  for (var j = 0; j < matches.length; j++) {
    var g = matches[j];
    if (g.p1Id && g.p1Name && players[String(g.p1Id)]) {
      var p1 = players[String(g.p1Id)];
      p1.score += Number(g.p1Score) || 0;
      if (g.p2Id && g.p2Name) {
        p1.opponents.push(String(g.p2Id));
        p1.roundOpponents.push({ bout: g.bout, opponentId: String(g.p2Id) });
      }
    }
    if (g.p2Id && g.p2Name && players[String(g.p2Id)]) {
      var p2 = players[String(g.p2Id)];
      p2.score += Number(g.p2Score) || 0;
      if (g.p1Id && g.p1Name) {
        p2.opponents.push(String(g.p1Id));
        p2.roundOpponents.push({ bout: g.bout, opponentId: String(g.p1Id) });
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

    // 逆减：逐轮减去该轮对手积分后的剩余值序列
    var ro = p.roundOpponents.slice().sort(function (a, b) {
      return (Number(a.bout) || 0) - (Number(b.bout) || 0);
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

  var sorted = keys.slice().sort(function (ka, kb) {
    var a = players[ka], b = players[kb];
    if (b.score !== a.score) return b.score - a.score;
    if (b.opponentScore !== a.opponentScore) return b.opponentScore - a.opponentScore;
    return cmpReverse(a, b);
  });

  // 同分组：积分、对手分完全相同（简易口径不比较累进分）
  var idx = 0;
  while (idx < sorted.length) {
    var end = idx + 1;
    while (end < sorted.length &&
      players[sorted[idx]].score === players[sorted[end]].score &&
      players[sorted[idx]].opponentScore === players[sorted[end]].opponentScore) end++;
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
      var vals = [];
      for (var g2 = 0; g2 < group.length; g2++) {
        vals.push(players[group[g2]].reverseMinus[round] || 0);
      }
      var distinct = {};
      var cnt = 0;
      for (var v = 0; v < vals.length; v++) {
        if (!distinct[vals[v]]) { distinct[vals[v]] = true; cnt++; }
      }
      if (cnt === vals.length) { chosen = round; break; }
    }
    for (var g3 = 0; g3 < group.length; g3++) {
      var pl = players[group[g3]];
      if (chosen >= 0) {
        pl.reverseMinusValue = [chosen + 1, Math.floor(pl.reverseMinus[chosen] || 0)];
      } else {
        pl.reverseMinusValue = pl.reverseMinus.length > 0
          ? [pl.reverseMinus.length, Math.floor(pl.reverseMinus[pl.reverseMinus.length - 1] || 0)]
          : [];
      }
    }
    idx = end;
  }

  var columns = [
    { key: 'score', label: '积分' },
    { key: 'opponentScore', label: '对手分' },
    { key: 'reverseMinus', label: '逆减' }
  ];
  var rows = [];
  for (var s = 0; s < sorted.length; s++) {
    var pl2 = players[sorted[s]];
    rows.push({
      id: pl2.id, name: pl2.name, rank: s + 1,
      cells: {
        score: Math.floor(pl2.score),
        opponentScore: Math.floor(pl2.opponentScore),
        reverseMinus: pl2.reverseMinusValue.slice()
      }
    });
  }
  return { columns: columns, rows: rows };
}
