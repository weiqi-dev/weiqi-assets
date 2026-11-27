function castFields(args) {
  var value = args.value;
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("value 必须是对象");
  if (!args.fields || typeof args.fields !== "object" || Array.isArray(args.fields)) throw new Error("fields 必须是对象");
  var out = Object.create(null);
  Object.keys(value).forEach(function (key) { out[key] = value[key]; });
  var keys = Object.keys(args.fields);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i], type = args.fields[key];
    if (key === "__proto__" || key === "prototype" || key === "constructor") throw new Error("字段名不允许");
    if (!Object.prototype.hasOwnProperty.call(value, key)) continue;
    var raw = value[key];
    if (type === "string") out[key] = String(raw);
    else if (type === "number") {
      var n = Number(raw);
      if (!Number.isFinite(n)) throw new Error("字段 " + key + " 不能转换为 number");
      out[key] = n;
    } else if (type === "boolean") out[key] = Boolean(raw);
    else throw new Error("不支持的类型：" + type);
  }
  return out;
}
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  if (input.method === "castFields") return castFields(input.args[0] || {});
  throw new Error("不支持的方法：" + input.method);
}