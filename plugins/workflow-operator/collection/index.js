function readPath(value, path) {
  if (!path || path === "$") return value;
  var parts = String(path).replace(/\[(\d+)\]/g, ".$1").split(".");
  var current = value;
  for (var i = 0; i < parts.length; i++) {
    if (current === null || current === undefined) return undefined;
    if (parts[i] === "__proto__" || parts[i] === "prototype" || parts[i] === "constructor") return undefined;
    if (!Object.prototype.hasOwnProperty.call(Object(current), parts[i])) return undefined;
    current = current[parts[i]];
  }
  return current;
}
function flatten(items) {
  var out = [];
  for (var i = 0; i < items.length; i++) {
    if (Array.isArray(items[i])) out = out.concat(flatten(items[i]));
    else out.push(items[i]);
  }
  return out;
}
function uniqueBy(args) {
  var seen = Object.create(null);
  var out = [];
  for (var i = 0; i < args.items.length; i++) {
    var item = args.items[i];
    var key = String(readPath(item, args.key));
    if (!Object.prototype.hasOwnProperty.call(seen, key)) { seen[key] = true; out.push(item); }
  }
  return out;
}
function groupBy(args) {
  var out = Object.create(null);
  for (var i = 0; i < args.items.length; i++) {
    var item = args.items[i];
    var key = String(readPath(item, args.key));
    if (!Object.prototype.hasOwnProperty.call(out, key)) out[key] = [];
    out[key].push(item);
  }
  return out;
}
function pluck(args) { return args.items.map(function (item) { return readPath(item, args.path); }); }
function sortBy(args) {
  var out = args.items.slice();
  var direction = args.order === "desc" ? -1 : 1;
  out.sort(function (a, b) {
    var x = readPath(a, args.key), y = readPath(b, args.key);
    if (x === y) return 0;
    if (x === undefined || x === null) return 1;
    if (y === undefined || y === null) return -1;
    return (x < y ? -1 : 1) * direction;
  });
  return out;
}
function take(args) {
  var count = Math.max(0, Math.floor(args.count));
  return args.fromEnd === true ? args.items.slice(Math.max(0, args.items.length - count)) : args.items.slice(0, count);
}
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  var args = input.args[0] || {};
  if (!Array.isArray(args.items)) throw new Error("items 必须是数组");
  if (input.method === "flatten") return flatten(args.items);
  if (input.method === "uniqueBy") return uniqueBy(args);
  if (input.method === "groupBy") return groupBy(args);
  if (input.method === "pluck") return pluck(args);
  if (input.method === "sortBy") return sortBy(args);
  if (input.method === "take") return take(args);
  throw new Error("不支持的方法：" + input.method);
}