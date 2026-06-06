/**
 * Web Shell 引导程序
 * @description 一次性初始化所有通用基础设施（Logger、NetworkManager、Providers、ConfigProvider、AdapterFactory）
 */

import { LogManager, ConsoleTransport } from '../../../infrastructure/logger';
import { NetworkManager } from '../../../infrastructure/network/core/NetworkManager';
import { UserType } from '../../../infrastructure/network/interfaces/UserType';
import { DirectProvider } from '../../../infrastructure/network/adapters/web/DirectProvider';
import { ProxyProvider } from '../../../infrastructure/network/adapters/web/ProxyProvider';
import { IndexedDBAdapter } from '../../../infrastructure/storage/adapters/web/IndexedDBAdapter';
import { IndexedDBFileAdapter } from '../../../infrastructure/storage/adapters/web/IndexedDBFileAdapter';
import { LocalStorageCacheAdapter } from '../../../infrastructure/storage/adapters/web/LocalStorageCacheAdapter';
import { FavoriteService } from '../../../services/favorite/FavoriteService';
import { GameHistoryStorage } from '../../../services/game/GameHistoryStorage';
import { WebAdapterFactory } from '../../../presentation/adapters/web/WebAdapterFactory';
import type { WebShellContext } from './Context';
import type { IDocumentStorage } from '../../../infrastructure/storage/interfaces/IDocumentStorage';
import type { IFavoriteItem } from '../../../services/favorite/IFavoriteService';
import type { GameHistoryIndex } from '../../../services/game/IGameHistoryStorage';
import type { IConfigProvider } from '../../../infrastructure/config/interfaces/IConfigProvider';
import type { ConfigKey, ConfigNamespace, ConfigChangeListener } from '../../../infrastructure/config/interfaces/types';

/**
 * Bootstrap 选项
 */
export interface WebBootstrapOptions {
  /** 页面容器元素 ID */
  containerId: string;
  /** 代理服务器 URL，默认 https://api.weiqi.lol */
  proxyUrl?: string;
  /** 模块配置映射：module name → config object */
  moduleConfigs?: Record<string, Record<string, unknown>>;
  /** 用户上下文覆盖（可选） */
  userContext?: {
    getUserType: () => Promise<UserType>;
    hasPaidToken: () => Promise<boolean>;
    getAuthToken: () => Promise<string | null>;
    hasPermission: (permission: string) => Promise<boolean>;
  };
}

/**
 * 默认配置提供者
 * @description 简单实现 IConfigProvider，只支持 getModuleConfig()
 */
class DefaultConfigProvider implements IConfigProvider {
  private readonly moduleConfigs: Record<string, Record<string, unknown>>;

  constructor(moduleConfigs: Record<string, Record<string, unknown>>) {
    this.moduleConfigs = moduleConfigs;
  }

  async get<T>(_key: ConfigKey): Promise<T | undefined> {
    return undefined;
  }

  async set<T>(_key: ConfigKey, _value: T): Promise<void> {
    // 空实现
  }

  async getModuleConfig<T>(module: ConfigNamespace): Promise<T> {
    return (this.moduleConfigs[module] ?? {}) as T;
  }

  async setModuleConfig<T>(_module: ConfigNamespace, _config: Partial<T>): Promise<void> {
    // 空实现
  }

  onChange<T>(_key: ConfigKey, _callback: ConfigChangeListener<T>): () => void {
    return () => {
      // 空实现
    };
  }

  async reset(_key?: ConfigKey): Promise<void> {
    // 空实现
  }

  async has(_key: ConfigKey): Promise<boolean> {
    return false;
  }

  async delete(_key: ConfigKey): Promise<void> {
    // 空实现
  }

  registerSchema(_namespace: ConfigNamespace, _schema: unknown): void {
    // 空实现
  }
}

/**
 * Web Shell 引导程序
 * @description 一次性初始化所有通用基础设施
 */
export class WebBootstrap {
  /**
   * 初始化 Web Shell
   * @param options - Bootstrap 选项
   * @returns Shell 上下文
   */
  static async init(options: WebBootstrapOptions): Promise<WebShellContext> {
    const containerId = options.containerId;
    const proxyUrl = options.proxyUrl ?? 'https://api.weiqi.lol';

    // 1. Logger
    LogManager.registerTransport(new ConsoleTransport());
    const logger = LogManager.createLogger('shell');

    // 2. AdapterFactory + rootContainer
    const adapterFactory = new WebAdapterFactory();
    const rootContainer = document.getElementById(containerId);
    if (!rootContainer) {
      throw new Error(`Container #${containerId} not found`);
    }
    rootContainer.innerHTML = '';
    adapterFactory.setRootContainer(rootContainer);

    // 3. NetworkManager + Providers
    const network = new NetworkManager({ defaultTimeout: 30000, retryCount: 2 });
    network.setUserContext(options.userContext ?? {
      getUserType: async () => UserType.GUEST,
      hasPaidToken: async () => false,
      getAuthToken: async () => null,
      hasPermission: async () => false,
    });
    network.registerProvider(new DirectProvider());
    network.registerProvider(new ProxyProvider({ proxyUrl }));
    await network.initialize();

    // 4. ConfigProvider
    const config = new DefaultConfigProvider(options.moduleConfigs ?? {});

    // 5. 缓存工厂
    const createCache = async <T extends { id: string }>(dbName: string, storeName: string): Promise<IDocumentStorage<T>> => {
      const adapter = new IndexedDBAdapter<T>(dbName, storeName);
      await adapter.initialize();
      return adapter;
    };

    // 6. 收藏服务（单例）
    const favoriteStorage = new IndexedDBAdapter<IFavoriteItem>('weiqi-bot-favorite', 'items');
    await favoriteStorage.initialize();
    const favoriteService = new FavoriteService(favoriteStorage);

    // 7. 棋谱历史归档服务（单例）
    const gameIndexStorage = new IndexedDBAdapter<GameHistoryIndex>('weiqi-bot-game-history', 'index');
    await gameIndexStorage.initialize();
    const gameFileStorage = new IndexedDBFileAdapter('weiqi-bot-game-files');
    await gameFileStorage.initialize();
    const gameHistoryStorage = new GameHistoryStorage(gameIndexStorage, gameFileStorage);

    // 8. 缓存存储工厂
    const createCacheStorage = () => new LocalStorageCacheAdapter('weiqi-session');

    return { network, config, adapterFactory, logger, rootContainer, createCache, favoriteService, gameHistoryStorage, createCacheStorage };
  }
}
