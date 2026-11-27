function readPath(value, path) {
  var parts = String(path || "$").replace(/\[(\d+)\]/g, ".$1").split(".");
  var current = value;
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i] || parts[i] === "$") continue;
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(Object(current), parts[i])) return undefined;
    current = current[parts[i]];
  }
  return current;
}
function failed() { return { state: { cursor: "" }, done: true, items: [], ok: false }; }
function cursor(args) {
  var response = args.response;
  if (!response || typeof response !== "object" || Array.isArray(response)) return failed();
  if (typeof args.itemsPath !== "string" || !args.itemsPath) throw new Error("itemsPath 必须是非空字符串");
  if (typeof args.cursorPath !== "string" || !args.cursorPath) throw new Error("cursorPath 必须是非空字符串");
  if (typeof args.statusPath === "string" && args.statusPath) {
    var status = readPath(response, args.statusPath);
    if (status !== args.successValue) return failed();
  }
  var items = readPath(response, args.itemsPath);
  if (!Array.isArray(items)) return failed();
  var rawCursor = readPath(response, args.cursorPath);
  var nextCursor = rawCursor === undefined || rawCursor === null ? "" : String(rawCursor);
  return { state: { cursor: nextCursor }, done: nextCursor.length === 0, items: items, ok: true };
}

function batchCursor(args) {
  if (!Array.isArray(args.pages)) throw new Error("pages 必须是数组");
  var pending = [], items = [], statuses = [];
  for (var i = 0; i < args.pages.length; i++) {
    var page = args.pages[i];
    if (!page || typeof page !== "object") { statuses.push(false); continue; }
    var ok = page.ok === true;
    statuses.push(ok);
    if (Array.isArray(page.items)) items = items.concat(page.items);
    if (ok && page.done !== true && page.state && page.state.cursor !== undefined) {
      var uid = page.dstuid === undefined || page.dstuid === null ? "" : String(page.dstuid);
      var cursor = String(page.state.cursor);
      if (uid && cursor) pending.push({ uid: uid, cursor: cursor });
    }
  }
  return { state: { pending: pending }, done: pending.length === 0, items: items, statuses: statuses };
}
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  if (input.method === "cursor") return cursor(input.args[0] || {});\n  if (input.method === "batchCursor") return batchCursor(input.args[0] || {});
  throw new Error("不支持的方法：" + input.method);
}