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
 * PLUGIN_SPECS 注册表（当前 'ranking' / 'workflow-operator'）。资源侧不得自造 pointId，
 * 否则宿主 resolvePluginSpec 找不到 spec、装了也用不了。
 * 宿主新增扩展点时，这里与 docs/extension-points.md 一起更新。
 */
const KNOWN_POINT_IDS = ['ranking', 'workflow-operator'];

/**
 * 面板筛选分类白名单。来源：weiqi-bot presentation/adapters/web/pages/assistant/ChatPage.ts 内联的
 * EXTENSION_CATEGORIES（人工标注的业务分类表，不是拟合出来的数值）。
 * 两处必须同步；写不在表里的值，宿主会按 pointId / id 命名空间兜底推导，
 * 但容易让贡献者以为标注生效，因此在这里提前拦下。
 */
const KNOWN_CATEGORIES = ['排名', '算子', '围棋', '财经', '搜索', '生活', '开发', '未分类'];

function validateCategory(obj, ctx) {
  const c = obj?.category;
  if (c === undefined) return; // 可选：老资源 / 第三方源不强制
  if (typeof c !== 'string' || !c.trim()) { fail(`${ctx}.category 必须是非空字符串`); return; }
  if (!KNOWN_CATEGORIES.includes(c)) {
    fail(`${ctx}.category (${c}) 不是已知分类；可用：${KNOWN_CATEGORIES.join(' / ')}`);
  }
}

/**
 * 可选路由词短语数组：配方从自身场景句里提炼的若干短路由词，只供技能路由目录消费。
 * 与宿主 parseSkillRecipe.readRouteWords 同款形状：没配 routeHint 的配方目录缺省只给
 * id | name（靠名称路由）；配了就由宿主把数组里的短语用顿号 join 成一行拼在目录行里，
 * 供模型按用户说法命中。
 * 本仓库是发布方清单，口径比宿主略严：宿主对非数组 / 空数组 / 全空白项按缺省宽放，
 * 这里显式写歪就拦住（发布方清单要求写对）。
 * 目录一技能一行，路由词必须是单行非空短语；不设词数上限 / 长度阈值 / 截断启发式
 * （数值必须有出处，不引入经验常数）。
 */
function validateRouteHint(obj, ctx) {
  const h = obj?.routeHint;
  if (h === undefined) return; // 可选：老配方 / 第三方源不强制
  // 非数组（含字符串）/ 空数组 / 全空白项：宿主按缺省宽放会静默丢词，发布方清单必须写对
  if (!Array.isArray(h) || h.length === 0 ||
      h.every((w) => typeof w !== 'string' || !w.trim())) {
    fail(`${ctx}.routeHint 必须是非空短语数组（目录一技能一行，路由词必须是单行非空短语）`);
    return;
  }
  for (const [i, w] of h.entries()) {
    if (typeof w !== 'string' || !w.trim() || /[\r\n]/.test(w)) {
      fail(`${ctx}.routeHint[${i}] 每项必须是 string、trim 后非空、不含换行（目录一技能一行，路由词必须是单行非空短语）`);
    }
  }
}

/**
 * workflow 配方声明静态校验（契约与 weiqi-bot 的 parseSkillRecipe 同款）。
 * 只校验「本仓库能自证的形状 + 引用」：节点名是否命中已启用算子白名单是宿主运行时
 * OperatorRegistry 的事，这里不校验 call 取值、不设数值阈值、不引 ajv。
 * 出处：阶段二硬契约「§二次核实」+ parseSkillRecipe 的 readWorkflow() 判据。
 */
const WORKFLOW_INPUT_TYPES = ['string', 'number', 'integer', 'boolean', 'object', 'array'];
const INPUT_PLACEHOLDER_RE = /\{\{input\.([^}]+)\}\}/g;

/** 递归收集 args 里出现的所有字符串（用于 {{input.xxx}} 占位符引用检查） */
function collectArgStrings(v, out) {
  if (typeof v === 'string') { out.push(v); return; }
  if (Array.isArray(v)) { for (const x of v) collectArgStrings(x, out); return; }
  if (v && typeof v === 'object') { for (const x of Object.values(v)) collectArgStrings(x, out); }
}

function validateWorkflowSkill(sk, ctx, pathHint) {
  // 调用点按契约传 (sk, ctx, pathHint)：ctx 为具体配方文件路径（如 skills/<id>/skill.json），
  // 用作报错前缀；pathHint 为同款路径，仅在 ctx 缺省时兜底，保证报错前缀始终非空。
  // 两者都只是定位信息，不参与语义判断。
  if (typeof ctx !== 'string' || !ctx.trim()) ctx = pathHint || 'skill';
  // 只对带 workflow 字段的配方生效；无 workflow 的散文配方跳过（B 决策，不强制 13 条迁移）
  if (sk.workflow === undefined) return;
  // returnToLLM? 可选：给了必须是 boolean（与 weiqi-bot parseSkillRecipe 口径一致）。
  // 索引不带此字段，故不加入 SKILL_OVERLAP_FIELDS，避免强迫索引同步。
  if (sk.returnToLLM !== undefined && typeof sk.returnToLLM !== 'boolean') {
    fail(`${ctx}.returnToLLM 若给必须是 boolean`);
  }
  // llmProjection? 可选：声明式字段白名单 { keep: 非空字符串数组 }（B3）。
  // 与 returnToLLM 同口径：索引不带此字段，故不加入 SKILL_OVERLAP_FIELDS。
  // 「非空」只是结构有效性（白名单不能为空＝等于没声明），不是数值阈值。
  if (sk.llmProjection !== undefined) {
    const p = sk.llmProjection;
    if (!p || typeof p !== 'object' || Array.isArray(p)
        || !Array.isArray(p.keep) || p.keep.length === 0
        || !p.keep.every((x) => typeof x === 'string' && x.trim() !== '')) {
      fail(`${ctx}.llmProjection 必须是 { keep: 非空字符串数组 }`);
    }
  }
  // inputs? 可选；给了必须是数组，且 name 唯一 / type 在枚举内 / required·enum 形状对
  let inputNames = null;
  if (sk.inputs !== undefined) {
    if (!Array.isArray(sk.inputs)) {
      fail(`${ctx}.inputs 必须是数组`);
    } else {
      inputNames = new Set();
      for (const [i, inp] of sk.inputs.entries()) {
        const ic = `${ctx}.inputs[${i}]`;
        if (!inp || typeof inp !== 'object' || Array.isArray(inp)) { fail(`${ic} 必须是对象`); continue; }
        if (typeof inp.name !== 'string' || !inp.name.trim()) {
          fail(`${ic}.name 必须是非空字符串`);
        } else {
          if (inputNames.has(inp.name)) fail(`${ic}.name 重复：${inp.name}`);
          inputNames.add(inp.name);
        }
        if (!WORKFLOW_INPUT_TYPES.includes(inp.type)) {
          fail(`${ic}.type 必须是 ${WORKFLOW_INPUT_TYPES.join(' / ')} 之一，实际：${inp.type}`);
        }
        // required / enum 形状（与 bot readWorkflowInputs 口径一致）；default 任意 JSON 值不校验
        if (inp.required !== undefined && typeof inp.required !== 'boolean') {
          fail(`${ic}.required 若给必须是 boolean`);
        }
        if (inp.enum !== undefined && !Array.isArray(inp.enum)) {
          fail(`${ic}.enum 若给必须是数组`);
        }
      }
    }
  }

  // workflow 必需、对象；steps 必需、非空数组
  const wf = sk.workflow;
  if (!wf || typeof wf !== 'object' || Array.isArray(wf)) {
    fail(`${ctx}.workflow 必须是对象`);
    return;
  }
  if (!Array.isArray(wf.steps) || wf.steps.length === 0) {
    fail(`${ctx}.workflow.steps 必须是非空数组`);
    return;
  }

  // id 唯一、call 非空、args 若给是对象、yield 若给是 boolean；
  // bindings[].from 指向更靠前的真实 step、as 非空；{{input.xxx}} 引用必须存在。
  const stepIds = new Set();
  const priorIds = new Set();
  for (const [i, st] of wf.steps.entries()) {
    const sc = `${ctx}.workflow.steps[${i}]`;
    if (!st || typeof st !== 'object' || Array.isArray(st)) { fail(`${sc} 必须是对象`); continue; }
    if (typeof st.id !== 'string' || !st.id.trim()) {
      fail(`${sc}.id 必须是非空字符串`);
    } else {
      if (stepIds.has(st.id)) fail(`${sc}.id 重复：${st.id}`);
      stepIds.add(st.id);
    }
    if (typeof st.call !== 'string' || !st.call.trim()) fail(`${sc}.call 必须是非空字符串`);
    if (st.args !== undefined && (!st.args || typeof st.args !== 'object' || Array.isArray(st.args))) {
      fail(`${sc}.args 若给必须是对象`);
    }
    if (st.yield !== undefined && typeof st.yield !== 'boolean') fail(`${sc}.yield 若给必须是 boolean`);

    // 占位符引用检查：args 里（含嵌套对象/数组）任一字符串值出现 {{input.xxx}}，
    // 其 xxx 必须在 inputs[] 声明，避免拼错后静默注入。
    if (st.args && typeof st.args === 'object' && !Array.isArray(st.args)) {
      const strings = [];
      collectArgStrings(st.args, strings);
      for (const s of strings) {
        for (const m of s.matchAll(INPUT_PLACEHOLDER_RE)) {
          const name = m[1];
          if (!inputNames || !inputNames.has(name)) {
            fail(`${sc}.args 引用了未声明的占位符 {{input.${name}}}（须在 ${ctx}.inputs[] 中存在）`);
          }
        }
      }
    }

    if (st.bindings !== undefined) {
      if (!Array.isArray(st.bindings)) {
        fail(`${sc}.bindings 若给必须是数组`);
      } else {
        for (const [j, b] of st.bindings.entries()) {
          const bc = `${sc}.bindings[${j}]`;
          if (!b || typeof b !== 'object' || Array.isArray(b)) { fail(`${bc} 必须是对象`); continue; }
          if (typeof b.as !== 'string' || !b.as.trim()) fail(`${bc}.as 必须是非空字符串`);
          if (typeof b.from !== 'string' || !b.from.trim()) {
            fail(`${bc}.from 必须是非空字符串`);
          } else if (!priorIds.has(b.from)) {
            // 更靠前 + 真实：priorIds 只收集本步之前已校验过的 id
            fail(`${bc}.from (${b.from}) 必须指向 steps 中位置更靠前的真实节点 id`);
          }
          if (typeof b.path !== 'string') fail(`${bc}.path 必须是字符串`);
        }
      }
    }
    // 本步校验完才加入 priorIds，供后续步骤引用（from 只能指更靠前）
    if (typeof st.id === 'string' && st.id.trim()) priorIds.add(st.id);
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
  if (m.pointId === 'workflow-operator') validateOperatorPlugin(m, ctx, entryName);
}

/** workflow-operator 扩展点的额外契约：入口固定 call、算子方法白名单、算子安装自检样例 */
function validateOperatorPlugin(m, ctx, entryName) {
  if (entryName && entryName !== 'call') fail(`${ctx}.entry 必须是 "call"（workflow-operator 算子扩展点约定）`);
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
      if (!e.inputSchema || typeof e.inputSchema !== 'object' || Array.isArray(e.inputSchema) || e.inputSchema.type !== 'object') fail(`${ec}.inputSchema 必须是根类型为 object 的 JSON Schema`);
      if (!e.outputSchema || typeof e.outputSchema !== 'object' || Array.isArray(e.outputSchema)) fail(`${ec}.outputSchema 必须是 JSON Schema 对象`);
      if (!['pure', 'io', 'effect'].includes(e.kind)) fail(`${ec}.kind 必须是 pure / io / effect`);
      if (typeof e.idempotent !== 'boolean') fail(`${ec}.idempotent 必须是 boolean`);
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

/**
 * 技能两段式清单校验（共享契约 v2）：
 *   skills/registry.json 是瘦索引（schemaVersion=2，每条 path=<id>/skill.json，只给目录字段）；
 *   skills/<id>/skill.json 是完整配方（schemaVersion=1，含 prompt / workflow / inputs / secrets）。
 * 索引看不到 workflow，但 version / 路由 / 分类等重叠字段必须与配方逐字段一致：
 * version 决定宿主「有更新」判定，索引不能与配方各说各话。
 * 这里是发布侧拦截；宿主运行时取不到某条只标 unavailable，不影响其它条目。
 */
const PRIMITIVE_RE = /^[a-z][a-z0-9_]*$/;
const SKILLS_DIR = resolve(ROOT, 'skills');
const SKILL_OVERLAP_FIELDS = ['id', 'version', 'name', 'summary', 'routeHint', 'primitives', 'category'];

/** 重叠字段逐字段比对：数组逐项、两边都 undefined 算一致；对象按键递归（这些字段只含标量/字符串数组） */
function sameFieldValue(a, b) {
  if (a === undefined || b === undefined) return a === undefined && b === undefined;
  if (Array.isArray(a) || Array.isArray(b)) {
    return Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
      a.every((v, i) => sameFieldValue(v, b[i]));
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    return ka.length === kb.length && ka.every((k, i) => k === kb[i] && sameFieldValue(a[k], b[k]));
  }
  return a === b;
}

function showFieldValue(v) {
  return v === undefined ? 'undefined' : JSON.stringify(v);
}

function validateSkillRegistry() {
  const indexPath = 'skills/registry.json';
  const index = readJson(indexPath);
  if (!index) return;

  if (index.schemaVersion !== 2) {
    fail(`${indexPath} 的 schemaVersion 必须是 2（只支持 2，实际：${showFieldValue(index.schemaVersion)}）`);
  }
  requireString(index, 'name', indexPath);
  requireString(index, 'description', indexPath);
  if (index.baseUrl !== undefined &&
      (typeof index.baseUrl !== 'string' || !index.baseUrl.trim())) {
    fail(`${indexPath} 的 baseUrl 若给必须是非空字符串（可选字段）`);
  }
  if (!Array.isArray(index.skills)) {
    fail(`${indexPath} 的 skills 必须是数组`);
    return;
  }

  const seenIds = new Set();
  const seenPaths = new Set();
  for (const [i, entry] of index.skills.entries()) {
    const rawId = typeof entry?.id === 'string' && entry.id.trim() ? entry.id : null;
    const recipePath = rawId ? `skills/${rawId}/skill.json` : null;
    // 报错一律带具体文件路径：索引文件 + 对应配方文件；不再把 skills/registry.json.skills[i] 当 ctx
    const at = (field) => `${indexPath} ↔ ${recipePath || '（id 无效，无法定位配方文件）'}${field ? ` 的索引条目 .${field}` : ''}`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      fail(`${at()} 必须是对象`);
      continue;
    }

    // ---- 索引条目形状 ----
    if (rawId === null) {
      fail(`${at('id')} 必须是非空字符串`);
    } else {
      if (!ID_RE.test(rawId)) fail(`${at('id')} 不符合命名规则：${rawId}`);
      if (seenIds.has(rawId)) fail(`${at('id')} 全清单重复：${rawId}`);
      seenIds.add(rawId);
    }
    if (!Number.isInteger(entry.version) || entry.version < 1) {
      fail(`${at('version')} 必须是 >=1 的整数，实际：${showFieldValue(entry.version)}`);
    }
    for (const key of ['name', 'summary']) {
      if (typeof entry[key] !== 'string' || !entry[key].trim()) {
        fail(`${at(key)} 必须是非空字符串`);
      }
    }

    const path = typeof entry.path === 'string' ? entry.path : null;
    if (path === null || !path.trim()) {
      fail(`${at('path')} 必须是非空字符串`);
    } else {
      if (seenPaths.has(path)) fail(`${at('path')} 重复：${path}`);
      seenPaths.add(path);
      if (rawId && path !== `${rawId}/skill.json`) {
        fail(`${at('path')} 必须等于 "<id>/skill.json"（期望 ${rawId}/skill.json，实际 ${path}）`);
      }
      // path 是相对 skills/ 的路径：不能拿相对仓库根的 safePath() 直接套，会混掉基准目录
      const abs = resolve(SKILLS_DIR, path);
      const rel = relative(SKILLS_DIR, abs);
      const inside = !path.startsWith('/') && !path.includes('\\') &&
        rel !== '' && !rel.startsWith('..') && !rel.startsWith(sep);
      if (!inside) {
        fail(`${at('path')} 越出 skills/ 目录：skills/${path}`);
      } else if (!existsSync(abs) || !statSync(abs).isFile()) {
        fail(`skills/${path} 指向的配方文件不存在或不是文件（索引 ${indexPath} 的 skills[${i}]）`);
      }
    }

    if (!Array.isArray(entry.primitives)) {
      fail(`${at('primitives')} 必须是字符串数组（允许空数组：workflow 配方就是 []）`);
    } else {
      for (const [j, p] of entry.primitives.entries()) {
        if (typeof p !== 'string' || !PRIMITIVE_RE.test(p)) {
          fail(`${at('primitives')}[${j}] 必须是 /^[a-z][a-z0-9_]*$/ 形式的字符串，实际：${showFieldValue(p)}`);
        }
      }
    }
    // 索引侧 category / routeHint 不单独校验：与配方重叠，配方侧的白名单/形状校验 +
    // 下面的逐字段硬比对已覆盖「两边都写歪」与「只歪一边」两种情形，且报错都落在具体文件路径上。

    // ---- 完整配方（只按 id 定位，不拿索引声明的 path 拼读取路径，避免越界读取）----
    if (!recipePath) continue; // id 无效时无法定位配方文件，上面已带路径报错
    const recipe = readJson(recipePath);
    if (recipe === null) {
      // readJson 已对「文件不存在 / 不是合法 JSON」带路径报错；合法 JSON 但内容为 null 也要拦下
      if (existsSync(resolve(ROOT, recipePath))) fail(`${recipePath} 顶层必须是对象（实际是 null）`);
      continue;
    }
    if (typeof recipe !== 'object' || Array.isArray(recipe)) {
      fail(`${recipePath} 顶层必须是对象`);
      continue;
    }
    if (recipe.schemaVersion !== 1) {
      fail(`${recipePath} 的 schemaVersion 必须是 1（配方自身结构版本；索引是 2，别混），实际：${showFieldValue(recipe.schemaVersion)}`);
    }
    requireString(recipe, 'prompt', recipePath);
    // ctx / pathHint 用具体配方路径；索引里没有 workflow，静态形状只在配方侧校验
    validateCategory(recipe, recipePath);
    validateRouteHint(recipe, recipePath);
    validateWorkflowSkill(recipe, recipePath, recipePath);

    // ---- 索引↔配方重叠字段硬比对（防索引骗人：version 决定宿主「有更新」判定）----
    for (const field of SKILL_OVERLAP_FIELDS) {
      if (!sameFieldValue(entry[field], recipe[field])) {
        fail(`索引↔配方重叠字段不一致：两边文件 ${indexPath} ↔ ${recipePath}，字段名 ${field}，索引 skills[${i}] = ${showFieldValue(entry[field])}，配方 = ${showFieldValue(recipe[field])}`);
      }
    }
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
  // 技能两段式清单：索引形状 / path 存在 / 索引↔配方重叠字段一致 / category 白名单 / workflow 静态形状
  validateSkillRegistry();
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
