/**
 * 棋谱下载依赖组装
 * @description 组装 GameService 所需的归档存储、缓存等依赖
 */

import { GameService, GameHistoryStorage } from '../../../../services/game';
import { createGameArchiveCache, createGameHistoryIndex, createGameFileStorage } from '../storage';
import type { WebShellContext } from '../Context';

/** 棋谱下载依赖集合 */
export interface GameDeps {
  /** Game 服务 */
  gameService: GameService;
}

/** 创建棋谱下载依赖 */
export async function createGameDeps(ctx: WebShellContext): Promise<GameDeps> {
  const [archiveCache, historyIndex, fileStorage] = await Promise.all([
    createGameArchiveCache(),
    createGameHistoryIndex(ctx),
    createGameFileStorage(),
  ]);

  const historyStorage = new GameHistoryStorage(historyIndex, fileStorage);
  await historyStorage.initialize();

  const gameService = new GameService(ctx.network, {
    archiveCache,
    historyStorage,
    configProvider: ctx.config,
  });

  return { gameService };
}
