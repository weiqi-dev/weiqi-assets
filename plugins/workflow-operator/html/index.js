function decodeEntities(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, function (_, n) { return String.fromCharCode(Number(n)); });
}
function parseAttributes(source) {
  var out = {};
  var re = /([A-Za-z_:][A-Za-z0-9_.:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>\x60]+)))?/g;
  var match;
  while ((match = re.exec(source))) out[match[1].toLowerCase()] = decodeEntities(match[2] !== undefined ? match[2] : match[3] !== undefined ? match[3] : match[4] !== undefined ? match[4] : "");
  return out;
}
function parseHtml(source) {
  var root = { tag: "#root", attrs: {}, children: [], parent: null, text: "" };
  var stack = [root];
  var token = /<!--[\s\S]*?-->|<![^>]*>|<\/?[A-Za-z][^>]*>|[^<]+/g;
  var match;
  while ((match = token.exec(source))) {
    var part = match[0];
    if (part.slice(0, 4) === "<!--" || part.slice(0, 2) === "<!") continue;
    if (part.charAt(0) !== "<") {
      stack[stack.length - 1].text += decodeEntities(part);
      continue;
    }
    if (/^<\//.test(part)) {
      var closing = part.slice(2).match(/^\s*([A-Za-z0-9:-]+)/);
      if (closing) {
        for (var s = stack.length - 1; s > 0; s--) {
          if (stack[s].tag === closing[1].toLowerCase()) { stack.length = s; break; }
        }
      }
      continue;
    }
    var opening = part.match(/^<\s*([A-Za-z0-9:-]+)([\s\S]*?)\/?\s*>$/);
    if (!opening) continue;
    var tag = opening[1].toLowerCase();
    var node = { tag: tag, attrs: parseAttributes(opening[2]), children: [], parent: stack[stack.length - 1], text: "" };
    stack[stack.length - 1].children.push(node);
    if (!/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag) && !/\/\s*>$/.test(part)) stack.push(node);
  }
  return root;
}
function textContent(node) {
  var value = node.text || "";
  for (var i = 0; i < node.children.length; i++) value += textContent(node.children[i]);
  return value.replace(/\s+/g, " ").trim();
}
function matchesSimple(node, selector) {
  var tag = selector.match(/^[A-Za-z][A-Za-z0-9-]*/);
  if (tag && node.tag !== tag[0].toLowerCase()) return false;
  var id = selector.match(/#([A-Za-z0-9_-]+)/);
  if (id && node.attrs.id !== id[1]) return false;
  var classes = selector.match(/\.([A-Za-z0-9_-]+)/g) || [];
  var actual = (node.attrs.class || "").split(/\s+/);
  for (var i = 0; i < classes.length; i++) if (actual.indexOf(classes[i].slice(1)) < 0) return false;
  var attrs = selector.match(/\[([^\]]+)\]/g) || [];
  for (var j = 0; j < attrs.length; j++) {
    var body = attrs[j].slice(1, -1);
    var eq = body.match(/^([\w:-]+)\s*=\s*["']?([^"'\]]+)["']?$/);
    if (eq) { if (node.attrs[eq[1].toLowerCase()] !== eq[2]) return false; }
    else if (node.attrs[body.toLowerCase()] === undefined) return false;
  }
  return !!(tag || id || classes.length || attrs.length);
}
function descendants(node, out) {
  for (var i = 0; i < node.children.length; i++) {
    out.push(node.children[i]);
    descendants(node.children[i], out);
  }
}
function selectNodes(root, selector) {
  var parts = selector.trim().split(/\s+/);
  var current = [root];
  for (var p = 0; p < parts.length; p++) {
    var next = [];
    for (var i = 0; i < current.length; i++) {
      var all = [];
      descendants(current[i], all);
      for (var j = 0; j < all.length; j++) if (matchesSimple(all[j], parts[p])) next.push(all[j]);
    }
    current = next;
  }
  return current;
}
function extract(args) {
  if (typeof args.html !== "string") throw new Error("html 必须是字符串");
  if (typeof args.selector !== "string" || !args.selector.trim()) throw new Error("selector 必须是非空字符串");
  var nodes = selectNodes(parseHtml(args.html), args.selector);
  var values = nodes.map(function (node) {
    if (typeof args.attribute === "string" && args.attribute) return node.attrs[args.attribute.toLowerCase()] || "";
    return textContent(node);
  });
  return args.first === true ? (values.length ? values[0] : null) : values;
}
function call(input) {
  if (!input || typeof input.method !== "string" || !Array.isArray(input.args) || input.args.length !== 1) throw new Error("调用参数无效");
  var args = input.args[0] || {};
  if (input.method === "extract") return extract(args);
  if (input.method === "links") return extract({ html: args.html, selector: args.selector || "a[href]", attribute: "href" });
  throw new Error("不支持的方法：" + input.method);
}