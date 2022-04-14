import JSCookie, { CookieAttributes } from 'js-cookie';

/**
 * setCookie 时会把 key 放到 cookieKeys 中一份
 * 退出登录时方便清理所有的cookie
 */
export const cookieKeys: string[] = [];

/**
 * cookie 默认配置
 * 推荐添加 domain
 */
export const CookieOptions: CookieAttributes = {
  domain: 'localhost',
  expires: 30,
};

/**
 * @description 把 key value 添加到 Cookie中，如果 key 已存在，则更新其对应的值。
 * @param key string
 * @param value string | unknow
 * @param options CookieAttributes
 * @returns string | undefined
 */
export const setCookieItem = (key: string, value: string | unknown, options?: CookieAttributes): string | undefined => {
  cookieKeys.push(key);
  const isString = typeof value === 'string';
  const valueRaw = isString ? value : JSON.stringify(value);

  const cookieOptions = { CookieOptions, ...options };

  return JSCookie.set(key, valueRaw as string, cookieOptions);
};

/**
 * @description 接受一个 key 作为参数，并返回对应 key 的值（key's value）。
 * @param key string
 * @returns
 */
export const getCookieItem = (key: string): string | undefined => {
  return JSCookie.get(key);
};

/**
 * @description 接受一个 key 作为参数，会从 Cookie 对象中删除该 key value（如果存在）。
 * @param key string
 * @param options
 * @returns CookieAttributes
 */
export const removeCookieItem = (key: string, options?: CookieAttributes): void => {
  return JSCookie.remove(key, options);
};

/**
 * @description 清空 Cookie 中存在的值
 */
export const clearCookie = (): void => {
  cookieKeys.forEach(name => JSCookie.remove(name));
};
