function encode(value) {
  return encodeURIComponent(String(value));
}
function build(args) {
  if (typeof args.base !== "string" || !/^https?:\/\//i.test(args.base)) throw new Error("base 必须是 http/https URL");
  var pairs = [];
  var params = args.params || {};
  var keys = Object.keys(params).sort();
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i], value = params[key];
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) {
      for (var j = 0; j < value.length; j++) pairs.push(encode(key) + "=" + encode(value[j]));
    } else pairs.push(encode(key) + "=" + encode(value));
  }
  var hashAt = args.base.indexOf("#");
  var base = hashAt < 0 ? args.base : args.base.slice(0, hashAt);
  var hash = hashAt < 0 ? "" : args.base.slice(hashAt);
  var join = base.indexOf("?") < 0 ? "?" : (/[?&]$/.test(base) ? "" : "&");
  return base + (pairs.length ? join + pairs.join("&") : "") + hash;
}
function parse(args) {
  if (typeof args.url !== "string") throw new Error("url 必须是字符串");
  var q = args.url.split("#")[0].split("?")[1] || "";
  var out = Object.create(null);
  q.split("&").forEach(function (part) {
    if (!part) return;
    var pair = part.split("=");
    var key = decodeURIComponent(pair.shift().replace(/\+/g, " "));
    var value = decodeURIComponent(pair.join("=").replace(/\+/g, " "));
    if (Object.prototype.hasOwnProperty.call(out, key)) {
      if (!Array.isArray(out[key])) out[key] = [out[key]];
      out[key].push(value);
    } else out[key] = value;
  });
  return out;
}
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  var args = input.args[0] || {};
  if (input.method === "build") return build(args);
  if (input.method === "parse") return parse(args);
  throw new Error("不支持的方法：" + input.method);
}