/**
 * 基于 sessionStorage 的页面缓存实现
 * @module presentation/shells/web/shared/SessionPageCache
 */

import type { IPageCache } from '../../../core/interfaces/IPageCache';

export class SessionPageCache implements IPageCache {
  get(key: string): string | null { return sessionStorage.getItem(key); }
  set(key: string, value: string): void { sessionStorage.setItem(key, value); }
  remove(key: string): void { sessionStorage.removeItem(key); }
}
