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
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  if (input.method === "cursor") return cursor(input.args[0] || {});
  throw new Error("不支持的方法：" + input.method);
}