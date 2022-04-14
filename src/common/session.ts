/**
 * @description 接受一个 key 作为参数，并返回对应 key 的值（key's value）。
 * @param key string
 * @example
 *  import { getSessionItem } from '@/common/session';
 *  import { TokenKeys } from '@/common/constants';
 *  // 这里的 'user' 可以替换为常量，例如：TokenKeys.User
 *  const user = getSessionItem('user');
 *  // 如使用 Typescript 开发可以指定返回值的类型
 *  interface User {
 *    ...
 *    username: string;
 *    ...
 *  }
 *  const user = getSessionItem<User>(TokenKeys.User);
 * @returns <T>
 */
export const getSessionItem = <T>(key: string): string | T => {
  let sessionItem = null;
  const sessionItemRaw = sessionStorage.getItem(key) || '';

  try {
    sessionItem = JSON.parse(sessionItemRaw);
  } catch (error) {
    sessionItem = sessionItemRaw;
  }

  return sessionItem;
};

/**
 * @description 把 key value 添加到给定的 Storage 对象中，如果 key 已存在，则更新其对应的值。
 * @param key string
 * @param value unknow
 */
export const setSessionItem = (key: string, value: string | unknown): void => {
  const isString = typeof value === 'string';
  const rawValue = isString ? (value as string) : JSON.stringify(value);

  sessionStorage.setItem(key, rawValue);
};

/**
 * @description 接受一个 key 作为参数，会从给定的 Storage 对象中删除该 key value（如果存在）。
 * @param key string
 */
export const removeSessionItem = (key: string): void => {
  sessionStorage.removeItem(key);
};

/**
 * @description 清空 sessionStorage
 */
export const clearSession = (): void => {
  sessionStorage.clear();
};
