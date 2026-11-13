/**
 * 示例插件：胜局优先的排名重排
 *
 * 契约（对齐 weiqi-bot RANKING_SPEC）：
 * - 入口函数 rank(players)，players 为 PlayerRanking[] 的只读 JSON 拷贝
 * - 返回与输入等长、每行至少带 { id: number, rank: number } 的数组
 * - 沙箱零能力：不得引用任何宿主或浏览器全局对象（含注释文本）
 *
 * 排序口径（本示例的业务选择，可争议、可改）：胜局数降序 → 原积分降序 → 原 id 升序。
 * 全部数值均来自输入字段，没有引入任何外部阈值或经验常数。
 */
function rank(players) {
  const rows = players.slice();
  rows.sort(function (a, b) {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.score !== a.score) return b.score - a.score;
    return a.id - b.id;
  });
  return rows.map(function (p, i) {
    return { id: p.id, rank: i + 1 };
  });
}
