import type { IAdapterFactory } from '../../../core/interfaces';
import type { IConfigProvider } from '../../../infrastructure/config/interfaces/IConfigProvider';
import type { NetworkManager } from '../../../infrastructure/network/core/NetworkManager';
import type { ILogger } from '../../../infrastructure/logger';
import type { IDocumentStorage } from '../../../infrastructure/storage/interfaces/IDocumentStorage';
import type { ICacheStorageAdapter } from '../../../infrastructure/storage/interfaces/ICacheStorage';
import type { IFavoriteService } from '../../../services/favorite/IFavoriteService';
import type { IGameHistoryStorage } from '../../../services/game/IGameHistoryStorage';

/** Shell 上下文（注入给 Page 用） */
export interface WebShellContext {
  network: NetworkManager;
  config: IConfigProvider;
  adapterFactory: IAdapterFactory;
  logger: ILogger;
  rootContainer: HTMLElement;
  /** 创建 IndexedDB 缓存存储 */
  createCache: <T extends { id: string }>(dbName: string, storeName: string) => Promise<IDocumentStorage<T>>;
  /** 创建内存缓存存储 */
  createCacheStorage: () => ICacheStorageAdapter;
  /** 收藏服务（单例，所有页面共享） */
  favoriteService: IFavoriteService;
  /** 棋谱历史归档服务（单例，所有页面共享） */
  gameHistoryStorage: IGameHistoryStorage;
}
