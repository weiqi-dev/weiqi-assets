/**
 * Web Shell 默认配置
 * @description 各模块的默认配置常量，供 Shell 使用
 */

export const DEFAULT_GAME_CONFIG = {
  proxyUrl: 'https://api.weiqi.lol',
  timeout: 30000,
  enableCache: true,
  maxHistorySize: 100,
};

export const DEFAULT_PLAYER_CONFIG = {
  proxyUrl: 'https://api.weiqi.lol',
  shoutanBaseUrl: 'https://v.dzqzd.com/SpBody.aspx',
  yichafenBaseUrl: '',
  timeout: 30000,
  playerCacheTTL: 3600000,
  enablePlayerCache: true,
};

export const DEFAULT_EVENT_CONFIG = {
  proxyUrl: 'https://api.weiqi.lol',
  eventsBaseUrl: 'https://data-center.yunbisai.com/api/lswl-events',
  groupsBaseUrl: 'https://open.yunbisai.com/api/event/feel/list',
  againstPlanBaseUrl: 'https://api.yunbisai.com/request/Group/Againstplan',
  timeout: 30000,
  eventCacheTTL: 1800000,
  enableEventCache: true,
};
