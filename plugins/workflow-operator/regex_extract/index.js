function call(input) {
  var method = input && input.method;
  var args = (input && input.args) || [];
  var p = args[0] || {};

  function buildRe(pattern, flags, forceGlobal) {
    var f = typeof flags === 'string' ? flags : 'g';
    if (forceGlobal && f.indexOf('g') === -1) f += 'g';
    if (!forceGlobal && f.indexOf('g') !== -1) f = f.replace(/g/g, '');
    // 只保留宿主 JS 引擎支持的标志，过滤掉 y 等不支持的字符
    f = f.replace(/[^gimsu]/g, '');
    return new RegExp(pattern, f);
  }

  var impl = {
    extract: function (p) {
      var text = String(p.text == null ? '' : p.text);
      var pattern = String(p.pattern == null ? '' : p.pattern);
      var flags = typeof p.flags === 'string' ? p.flags : 'g';
      var group = Number.isInteger(p.group) && p.group >= 0 ? p.group : 0;
      var unique = !!p.unique;
      var withIndex = !!p.withIndex;
      var limit = Number.isInteger(p.limit) && p.limit > 0 ? p.limit : 0;

      var re = buildRe(pattern, flags, true);
      var out = [];
      var seen = Object.create(null);
      var m;
      var guard = 0;
      while ((m = re.exec(text)) !== null) {
        guard++;
        if (guard > 100000) break;
        var val = m[group] === undefined ? '' : String(m[group]);
        if (unique) {
          if (seen[val]) {
            if (m[0] === '') re.lastIndex++;
            continue;
          }
          seen[val] = true;
        }
        out.push(withIndex ? { value: val, index: m.index } : val);
        if (limit && out.length >= limit) break;
        // 空匹配时手动推进 lastIndex，避免死循环
        if (m[0] === '') re.lastIndex++;
      }
      return { matches: out, count: out.length };
    },

    test: function (p) {
      var text = String(p.text == null ? '' : p.text);
      var pattern = String(p.pattern == null ? '' : p.pattern);
      var flags = typeof p.flags === 'string' ? p.flags : '';
      var re = buildRe(pattern, flags, false);
      return re.test(text);
    },

    replace: function (p) {
      var text = String(p.text == null ? '' : p.text);
      var pattern = String(p.pattern == null ? '' : p.pattern);
      var flags = typeof p.flags === 'string' ? p.flags : 'g';
      var replacement = String(p.replacement == null ? '' : p.replacement);
      var re = buildRe(pattern, flags, true);
      return text.replace(re, replacement);
    }
  };

  var allowed = { extract: true, test: true, replace: true };
  if (!Object.prototype.hasOwnProperty.call(allowed, method)) {
    throw new Error('未知方法: ' + String(method));
  }
  return impl[method](p);
}