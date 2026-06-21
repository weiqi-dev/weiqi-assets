/**
 * 任务助手 - 提供通用的后台任务处理逻辑
 * @module clients/web/shared/task-helper
 */

import { ScheduleManager } from '../../../domain/schedule';

/**
 * 任务参数
 */
export interface TaskParams {
  scheduleId?: string | null;
  taskId?: string | null;
  view?: string | null;
  favoriteKey?: string | null;
  returnTo?: string | null;
  auto?: string | null;
}

/**
 * 任务处理器（页面实现）
 */
export interface TaskHandlers {
  // 执行周期性任务
  onExecuteSchedule?: (params: any, scheduleId: string) => Promise<void>;
  
  // 查看收藏
  onViewFavorite?: (key: string) => Promise<void>;
}

/**
 * 任务助手类
 */
export class TaskHelper {
  /**
   * 解析任务相关的 URL 参数
   */
  static parseTaskParams(): TaskParams {
    const urlParams = new URLSearchParams(window.location.search);
    
    return {
      scheduleId: urlParams.get('scheduleId'),
      taskId: urlParams.get('taskId'),
      view: urlParams.get('view'),
      favoriteKey: urlParams.get('key'),
      returnTo: urlParams.get('return'),
      auto: urlParams.get('auto'),
    };
  }
  
  /**
   * 处理任务参数（入口函数）
   * 
   * @param params 任务参数
   * @param handlers 任务处理器
   * @returns 是否已处理（如果已处理，页面应终止后续逻辑）
   */
  static async handleTaskParams(
    params: TaskParams,
    handlers: TaskHandlers
  ): Promise<boolean> {
    // 1. 处理周期性任务
    if (params.scheduleId) {
      await this.handleSchedule(params.scheduleId, handlers);
      return true;
    }
    
    // 2. 处理查看收藏
    if (params.view === 'favorite' && params.favoriteKey) {
      await handlers.onViewFavorite?.(params.favoriteKey);
      return true;
    }
    
    // 3. 处理返回参数
    if (params.returnTo === 'home') {
      this.setupReturnHandler();
    }
    
    // 4. 返回 false 表示未完全处理，页面应继续执行
    return false;
  }
  
  /**
   * 处理周期性任务
   */
  private static async handleSchedule(
    scheduleId: string,
    handlers: TaskHandlers
  ): Promise<void> {
    console.log('[TaskHelper] Handling schedule:', scheduleId);
    
    // 如果 TaskBridge 不存在，直接执行（无环境依赖）
    if (!window.TaskBridge) {
      console.log('[TaskHelper] TaskBridge not available, executing directly');
      await handlers.onExecuteSchedule?.({}, scheduleId);
      return;
    }
    
    try {
      // 获取计划配置
      const config = await window.TaskBridge.getSchedule(scheduleId);
      
      if (!config) {
        console.error('[TaskHelper] Schedule not found:', scheduleId);
        return;
      }
      
      console.log('[TaskHelper] Schedule config:', config);
      
      // 判断是否需要执行
      const shouldExecute = ScheduleManager.shouldExecute(config);
      
      if (shouldExecute) {
        console.log('[TaskHelper] Executing schedule...');
        
        // 执行任务
        await handlers.onExecuteSchedule?.(config.params, scheduleId);
        
        // 更新计划配置，标记为已执行
        const updatedConfig = ScheduleManager.markAsExecuted(config);
        await window.TaskBridge.updateSchedule(scheduleId, updatedConfig);
        
        console.log('[TaskHelper] Schedule executed and updated');
      } else {
        console.log('[TaskHelper] Schedule not ready to execute');
        console.log('  Current time:', new Date().toISOString());
        console.log('  Config:', {
          frequency: config.frequency,
          hour: config.hour,
          dayOfWeek: config.dayOfWeek,
          dayOfMonth: config.dayOfMonth,
          lastRunDate: config.lastRunDate,
        });
      }
    } catch (error) {
      console.error('[TaskHelper] Failed to handle schedule execution:', error);
    }
  }
  
  /**
   * 设置返回处理器
   */
  private static setupReturnHandler(): void {
    // 插入一个额外记录，增加 history 栈长度，防止直接退出 app
    window.history.pushState({}, '', window.location.href);
    
    // 监听 popstate 事件，直接跳转到助手页面
    window.addEventListener('popstate', () => {
      window.location.href = '/assistant/index.html';
    });
  }
  
  /**
   * 发送任务进度通知
   */
  static notifyProgress(taskId: string | undefined, percent: number, message: string): void {
    if (!taskId) return;
    
    console.log(`[TaskHelper] Sending progress: taskId=${taskId}, percent=${percent}, message=${message}`);
    
    prompt('task:progress:' + JSON.stringify({
      taskId,
      percent,
      message,
    }));
  }
  
  /**
   * 发送任务完成通知
   */
  static notifyComplete(
    taskId: string | undefined,
    title: string,
    message: string,
    detailUrl: string
  ): void {
    if (!taskId) return;
    
    console.log(`[TaskHelper] Sending complete: taskId=${taskId}, title=${title}, message=${message}`);
    
    prompt('task:complete:' + JSON.stringify({
      taskId,
      title,
      message,
      detailUrl,
    }));
  }
  
  /**
   * 发送任务失败通知
   */
  static notifyFail(taskId: string | undefined, error: string): void {
    if (!taskId) return;
    
    console.log(`[TaskHelper] Sending fail: taskId=${taskId}, error=${error}`);
    
    prompt('task:fail:' + JSON.stringify({
      taskId,
      error,
    }));
  }
}
