const { VUE_APP_NAME } = process.env;

/**
 * @description 拼接 package.name 和 TokenKey
 * @param key string
 * @returns
 */
const addKeyPrefix = (key: string) => `${VUE_APP_NAME}-${key}`;

/**
 * 开发期间树的顶级节点默认用 '0'
 */
export const DefaultRoot = '0';

/**
 * 各个类型的树的顶级节点id
 */
export const TreeRootIds = {
  Menu: '0',
  Role: '0',
  Department: '0',
};

/**
 * @description 预置的一些Key，可用于 sessionStorage localStorage Cookie
 * @example
 *  import { TokenKeys } from '@/common/constants';
 *
 *  sessionStorage.getItem(TokenKeys.Token);
 */
export const TokenKeys = {
  User: addKeyPrefix('user'),
  Expire: addKeyPrefix('expire'),
  Token: addKeyPrefix('token'),
  CreateTime: addKeyPrefix('create-time'),
  RefreshToken: addKeyPrefix('refresh-token'),
  Authorization: addKeyPrefix('Authorization'),
};
