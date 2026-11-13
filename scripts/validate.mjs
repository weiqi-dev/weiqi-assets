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
  if (m.specVersion !== entry.specVersion) fail(`${ctx}.specVersion 与 registry 不一致`);
  if (!Number.isInteger(m.specVersion) || m.specVersion < 1) fail(`${ctx}.specVersion 必须是 >=1 的整数`);
  const entryName = requireString(m, 'entry', ctx);
  if (entryName && !ENTRY_RE.test(entryName)) fail(`${ctx}.entry 不是合法的函数标识符`);
  if (!['llm', 'manual'].includes(m.origin)) fail(`${ctx}.origin 必须是 llm 或 manual`);
  requireString(m, 'intent', ctx);
  if (m.tags !== undefined && (!Array.isArray(m.tags) || m.tags.some((t) => typeof t !== 'string'))) {
    fail(`${ctx}.tags 必须是字符串数组`);
  }

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
  report();
}

function report() {
  for (const w of warnings) console.warn(`⚠️  ${w}`);
  if (errors.length === 0) {
    console.log('✅ weiqi-assets 校验通过：registry / schema / 条目 / 代码契约一致');
    process.exit(0);
  }
  for (const e of errors) console.error(`❌ ${e}`);
  console.error(`\n共 ${errors.length} 个错误`);
  process.exit(1);
}

main();
