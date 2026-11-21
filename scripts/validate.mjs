#!/usr/bin/env node
/**
 * weiqi-assets 资源清单一致性校验
 *
 * 只做「本仓库能自证的事」：JSON 可解析、必填字段齐全、路径存在且不出仓库、
 * registry 与条目一一对应、插件代码能通过宿主 PluginValidator 的禁用规则、
 * 入口函数与 manifest 声明一致。
 *
 * 不引入 npm 依赖（这是纯静态资源仓库，任何依赖都会给下载端添负担）。
 * JSON Schema 是给贡献者/编辑器看的契约文档，本脚本按同一份契约做等价检查；
 * 若将来引入 ajv，可把这里的字段检查换成真正的 schema 编译。
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function readJson(relPath) {
  const abs = resolve(ROOT, relPath);
  if (!existsSync(abs)) {
    fail(`文件不存在：${relPath}`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(abs, 'utf8'));
  } catch (e) {
    fail(`${relPath} 不是合法 JSON：${e.message}`);
    return null;
  }
}

/** 相对路径必须落在仓库内，且不能是绝对路径或 .. 逃逸 */
function safePath(relPath) {
  if (typeof relPath !== 'string' || !relPath) return false;
  if (relPath.startsWith('/') || relPath.includes('\\')) return false;
  const abs = resolve(ROOT, relPath);
  const rel = relative(ROOT, abs);
  return rel !== '' && !rel.startsWith('..') && !rel.startsWith(sep);
}

function requireString(obj, key, ctx) {
  if (typeof obj?.[key] !== 'string' || !obj[key].trim()) {
    fail(`${ctx}.${key} 必须是非空字符串`);
    return null;
  }
  return obj[key];
}

const ID_RE = /^[a-z0-9][a-z0-9._-]*$/;
const ENTRY_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * 宿主已注册的扩展点白名单。来源：weiqi-bot/domain/plugin/types.ts 的
 * PLUGIN_SPECS 注册表（当前 'ranking' / 'llm-tool'）。资源侧不得自造 pointId，
 * 否则宿主 resolvePluginSpec 找不到 spec、装了也用不了。
 * 宿主新增扩展点时，这里与 docs/extension-points.md 一起更新。
 */
const KNOWN_POINT_IDS = ['ranking', 'llm-tool'];

/**
 * 面板筛选分类白名单。来源：weiqi-bot presentation/adapters/web/pages/assistant/ChatPage.ts 内联的
 * EXTENSION_CATEGORIES（人工标注的业务分类表，不是拟合出来的数值）。
 * 两处必须同步；写不在表里的值，宿主会按 pointId / id 命名空间兜底推导，
 * 但容易让贡献者以为标注生效，因此在这里提前拦下。
 */
const KNOWN_CATEGORIES = ['排名', '模型工具', '围棋', '财经', '搜索', '生活', '开发', '未分类'];

function validateCategory(obj, ctx) {
  const c = obj?.category;
  if (c === undefined) return; // 可选：老资源 / 第三方源不强制
  if (typeof c !== 'string' || !c.trim()) { fail(`${ctx}.category 必须是非空字符串`); return; }
  if (!KNOWN_CATEGORIES.includes(c)) {
    fail(`${ctx}.category (${c}) 不是已知分类；可用：${KNOWN_CATEGORIES.join(' / ')}`);
  }
}

/** 与 weiqi-bot/domain/plugin/PluginValidator.ts 的禁用规则同源 */
const BROWSER_GLOBALS =
  /\bfetch\b|\bwindow\b|\bdocument\b|\blocalStorage\b|\bindexedDB\b|\bXMLHttpRequest\b|\bimportScripts\b|\brequire\b|\bpostMessage\b|\bself\b|\bnavigator\b|\bWebSocket\b/;
const HIGH_RISK = [
  { re: /\beval\s*\(/, reason: '不允许使用 eval()' },
  { re: /\bnew\s+Function\b/, reason: '不允许使用 new Function()' },
  { re: /\bimport\s*\(/, reason: '不允许动态 import()' },
  { re: /\bwhile\s*\(\s*true\s*\)/, reason: '不允许 while(true) 死循环' },
  { re: /\bfor\s*\(\s*;\s*;\s*\)/, reason: '不允许 for(;;) 死循环' },
];

function validatePlugin(manifestPath, entry) {
  const m = readJson(manifestPath);
  if (!m) return;
  const ctx = manifestPath;
  if (m.type !== 'plugin') fail(`${ctx}.type 必须是 "plugin"`);
  if (m.id !== entry.id) fail(`${ctx}.id (${m.id}) 与 registry 条目 (${entry.id}) 不一致`);
  requireString(m, 'name', ctx);
  requireString(m, 'pointId', ctx);
  if (m.pointId !== entry.pointId) fail(`${ctx}.pointId 与 registry 不一致`);
  if (!KNOWN_POINT_IDS.includes(m.pointId)) {
    fail(`${ctx}.pointId (${m.pointId}) 不是宿主已注册的扩展点；仅允许：${KNOWN_POINT_IDS.join(', ')}`);
  }
  if (!KNOWN_POINT_IDS.includes(entry.pointId)) {
    fail(`registry 条目 pointId (${entry.pointId}) 不是宿主已注册的扩展点；仅允许：${KNOWN_POINT_IDS.join(', ')}`);
  }
  if (m.specVersion !== entry.specVersion) fail(`${ctx}.specVersion 与 registry 不一致`);
  if (!Number.isInteger(m.specVersion) || m.specVersion < 1) fail(`${ctx}.specVersion 必须是 >=1 的整数`);
  const entryName = requireString(m, 'entry', ctx);
  if (entryName && !ENTRY_RE.test(entryName)) fail(`${ctx}.entry 不是合法的函数标识符`);
  if (!['llm', 'manual'].includes(m.origin)) fail(`${ctx}.origin 必须是 llm 或 manual`);
  requireString(m, 'intent', ctx);
  if (m.tags !== undefined && (!Array.isArray(m.tags) || m.tags.some((t) => typeof t !== 'string'))) {
    fail(`${ctx}.tags 必须是字符串数组`);
  }
  validateCategory(m, ctx);

  const codePath = requireString(m, 'code', ctx);
  if (codePath) {
    if (!safePath(codePath)) fail(`${ctx}.code 路径越界：${codePath}`);
    else {
      const abs = resolve(ROOT, codePath);
      if (!existsSync(abs) || !statSync(abs).isFile()) fail(`${ctx}.code 指向的文件不存在：${codePath}`);
      else {
        const code = readFileSync(abs, 'utf8');
        if (!code.trim()) fail(`${codePath} 内容为空`);
        const hit = BROWSER_GLOBALS.exec(code);
        if (hit) fail(`${codePath} 使用了宿主禁用的全局：${hit[0]}`);
        for (const item of HIGH_RISK) {
          if (item.re.test(code)) fail(`${codePath}：${item.reason}`);
        }
        if (entryName && !new RegExp(`\\b(function\\s+${entryName}\\s*\\(|(?:const|let|var)\\s+${entryName}\\s*=)`).test(code)) {
          fail(`${codePath} 未声明入口函数 ${entryName}`);
        }
      }
    }
  }
  if (m.readme !== undefined) {
    if (!safePath(m.readme) || !existsSync(resolve(ROOT, m.readme))) {
      fail(`${ctx}.readme 指向的文件不存在：${m.readme}`);
    }
  }
  if (m.pointId === 'llm-tool') validateLlmToolPlugin(m, ctx, entryName);
}

/** llm-tool 扩展点的额外契约：入口固定 call、方法白名单、安装自检样例 */
function validateLlmToolPlugin(m, ctx, entryName) {
  if (entryName && entryName !== 'call') fail(`${ctx}.entry 必须是 "call"（llm-tool 扩展点约定）`);
  if (!Array.isArray(m.exposes) || m.exposes.length === 0) {
    fail(`${ctx}.exposes 必须是非空数组`);
  } else {
    const names = new Set();
    for (const [i, e] of m.exposes.entries()) {
      const ec = `${ctx}.exposes[${i}]`;
      if (!e || typeof e !== 'object') { fail(`${ec} 必须是对象`); continue; }
      if (typeof e.name !== 'string' || !ENTRY_RE.test(e.name)) fail(`${ec}.name 不是合法方法标识符`);
      if (names.has(e.name)) fail(`${ec}.name 重复：${e.name}`);
      if (e.name) names.add(e.name);
      if (typeof e.description !== 'string' || !e.description.trim()) fail(`${ec}.description 必须是非空字符串`);
      if (!e.params || typeof e.params !== 'object' || Array.isArray(e.params)) fail(`${ec}.params 必须是对象`);
    }
  }
  if (!Array.isArray(m.smoke) || m.smoke.length === 0) {
    fail(`${ctx}.smoke 必须是非空数组`);
  } else {
    for (const [i, s] of m.smoke.entries()) {
      const sc = `${ctx}.smoke[${i}]`;
      if (!s || typeof s !== 'object') { fail(`${sc} 必须是对象`); continue; }
      if (!Array.isArray(s.args) || s.args.length !== 1) fail(`${sc}.args 必须是含一个参数对象的数组`);
      if (s.expect === undefined) fail(`${sc}.expect 缺失`);
      if (s.method !== undefined && (typeof s.method !== 'string' || !ENTRY_RE.test(s.method))) {
        fail(`${sc}.method 不是合法方法标识符`);
      }
    }
  }
}

function validateTool(manifestPath, entry) {
  const m = readJson(manifestPath);
  if (!m) return;
  const ctx = manifestPath;
  if (m.type !== 'tool') fail(`${ctx}.type 必须是 "tool"`);
  if (m.id !== entry.id) fail(`${ctx}.id (${m.id}) 与 registry 条目 (${entry.id}) 不一致`);
  if (!Number.isInteger(m.version) || m.version < 1) fail(`${ctx}.version 必须是 >=1 的整数`);
  requireString(m, 'name', ctx);
  const d = m.definition;
  if (!d || typeof d !== 'object') {
    fail(`${ctx}.definition 必须是对象`);
  } else {
    requireString(d, 'name', `${ctx}.definition`);
    requireString(d, 'description', `${ctx}.definition`);
    if (!d.parameters || typeof d.parameters !== 'object' || d.parameters.type !== 'object') {
      fail(`${ctx}.definition.parameters 必须是 type=object 的 JSON Schema`);
    }
    if (d.name !== m.name) warn(`${ctx}.definition.name 与 m.name 不一致（应保持一致）`);
  }
  if (m.implementation !== undefined) {
    if (!['host-builtin', 'downloadable', 'reference'].includes(m.implementation.status)) {
      fail(`${ctx}.implementation.status 取值非法`);
    }
  }
  if (m.readme !== undefined && (!safePath(m.readme) || !existsSync(resolve(ROOT, m.readme)))) {
    fail(`${ctx}.readme 指向的文件不存在：${m.readme}`);
  }
}

/** SGF 分享站点的 URL 契约（见 share/README.md 与 weiqi-bot/services/share/WeiqiAssetsUrls.ts） */
function validateShareUrls() {
  const libPath = 'share/share.js';
  const pagePath = 'share/index.html';
  const expectedBase = 'https://weiqi-dev.github.io/weiqi-assets/';
  const expectedDecode = `${expectedBase}share/`;
  const expectedLib = `${expectedBase}share/share.js`;

  for (const p of [libPath, pagePath, 'share/README.md']) {
    if (!existsSync(resolve(ROOT, p))) fail(`share/ 能力缺少文件：${p}`);
  }
  if (existsSync(resolve(ROOT, 'js'))) fail('js/ 目录应已删除（share.js 已收编到 share/）');

  const libAbs = resolve(ROOT, libPath);
  if (!existsSync(libAbs)) return;
  const lib = readFileSync(libAbs, 'utf8');
  const decodeMatch = lib.match(/decodeUrl:\s*'([^']+)'/);
  const libMatch = lib.match(/libUrl:\s*'([^']+)'/);
  if (!decodeMatch) fail(`${libPath} 未声明 config.decodeUrl`);
  else if (decodeMatch[1] !== expectedDecode) {
    fail(`${libPath} config.decodeUrl 与契约不一致：期望 ${expectedDecode}，实际 ${decodeMatch[1]}`);
  }
  if (!libMatch) fail(`${libPath} 未声明 config.libUrl`);
  else if (libMatch[1] !== expectedLib) {
    fail(`${libPath} config.libUrl 与契约不一致：期望 ${expectedLib}，实际 ${libMatch[1]}`);
  }
  // 库必须是纯库：不得有基于 currentScript 路径的自动初始化
  if (/currentScript[\s\S]{0,160}handleDecodePage|DOMContentLoaded[\s\S]{0,160}handleDecodePage/.test(lib)) {
    fail(`${libPath} 含自动初始化解码的逻辑：库移入 share/ 后会与落页显式调用叠加，导致重复下载`);
  }
  if (/js\/share\.js/.test(lib)) fail(`${libPath} 仍有 js/share.js 残留引用`);

  const pageAbs = resolve(ROOT, pagePath);
  if (existsSync(pageAbs)) {
    const page = readFileSync(pageAbs, 'utf8');
    if (!/src=["']\.\/share\.js["']/.test(page)) fail(`${pagePath} 未以 ./share.js 引用库`);
    if (!/WeiqiShare\.handleDecodePage\(\)/.test(page)) fail(`${pagePath} 未显式调用 handleDecodePage()`);
    const calls = (page.match(/handleDecodePage\s*\(/g) || []).length;
    if (calls !== 1) fail(`${pagePath} handleDecodePage 调用次数应为 1，实际 ${calls}`);
  }
}

function main() {
  const registry = readJson('registry.json');
  if (!registry) return report();
  if (registry.schemaVersion !== 1) fail('registry.json schemaVersion 必须是 1');
  requireString(registry, 'name', 'registry.json');
  requireString(registry, 'description', 'registry.json');
  requireString(registry, 'baseUrl', 'registry.json');
  if (!Array.isArray(registry.resources) || registry.resources.length === 0) {
    fail('registry.json.resources 必须是非空数组');
  } else {
    const seenIds = new Set();
    const seenPaths = new Set();
    for (const [i, r] of registry.resources.entries()) {
      const ctx = `registry.json.resources[${i}]`;
      if (!r || typeof r !== 'object') { fail(`${ctx} 必须是对象`); continue; }
      const id = requireString(r, 'id', ctx);
      if (id && !ID_RE.test(id)) fail(`${ctx}.id 不符合命名规则：${id}`);
      if (id && seenIds.has(id)) fail(`${ctx}.id 重复：${id}`);
      if (id) seenIds.add(id);
      requireString(r, 'name', ctx);
      requireString(r, 'summary', ctx);
      validateCategory(r, ctx);
      const path = requireString(r, 'path', ctx);
      if (path && !/^(plugins|tools)\/[A-Za-z0-9._/-]+\.json$/.test(path)) {
        fail(`${ctx}.path 必须位于 plugins/ 或 tools/ 下且以 .json 结尾`);
      }
      if (path && seenPaths.has(path)) fail(`${ctx}.path 重复：${path}`);
      if (path) seenPaths.add(path);
      if (path && !safePath(path)) { fail(`${ctx}.path 越界：${path}`); continue; }
      if (!['plugin', 'tool'].includes(r.type)) { fail(`${ctx}.type 必须是 plugin 或 tool`); continue; }
      if (r.type === 'plugin') {
        requireString(r, 'pointId', ctx);
        if (!Number.isInteger(r.specVersion) || r.specVersion < 1) fail(`${ctx}.specVersion 必须是 >=1 的整数`);
        if (path) validatePlugin(path, r);
      } else {
        if (path) validateTool(path, r);
      }
    }
  }
  // 技能清单不做结构校验（契约在 weiqi-bot 的 parseSkillRecipe），
  // 只对本仓库新增的可选 category 标注做取值自检，避免写一个宿主不认识的标签。
  const skills = readJson('skills/registry.json');
  if (skills) {
    if (Array.isArray(skills.skills)) {
      for (const [i, sk] of skills.skills.entries()) {
        if (!sk || typeof sk !== 'object') continue;
        validateCategory(sk, `skills/registry.json.skills[${i}]`);
      }
    } else {
      fail('skills/registry.json.skills 必须是数组');
    }
  }
  validateShareUrls();
  report();
}

function report() {
  for (const w of warnings) console.warn(`⚠️  ${w}`);
  if (errors.length === 0) {
    console.log('✅ weiqi-assets 校验通过：registry / schema / 条目 / 代码 / share URL 契约一致');
    process.exit(0);
  }
  for (const e of errors) console.error(`❌ ${e}`);
  console.error(`\n共 ${errors.length} 个错误`);
  process.exit(1);
}

main();
