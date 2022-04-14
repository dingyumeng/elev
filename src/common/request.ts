import { Message } from 'element-ui';
import axios, { AxiosRequestConfig } from 'axios';
import router from '@/router';
import { clearCookie, getCookieItem } from './cookie';
import { clearSession } from './session';
import { TokenKeys } from './constants';

/**
 * HTTP 请求错误码
 */
const HTTP_CODE: { [field: number]: string } = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

/**
 * 未登录或登录信息已过期，跳转登录页面的逻辑
 */
export const usePermissionDenied = (): void => {
  clearCookie();
  clearSession();

  router.push({ name: 'Login' });
};

const request = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const Authorization = getCookieItem(TokenKeys.Authorization);

  if (Authorization) {
    const token = Authorization;
    config.headers = { Authorization, token };
  }

  return config;
});

request.interceptors.response.use(
  response => {
    const { data } = response;
    const { code, msg: message, data: result } = data;

    if (code === 0) {
      return Promise.resolve(result);
    }

    if (code === 401) {
      // 清空所有本地数据，并跳转到登录页面
      usePermissionDenied();
      return Promise.reject({ code, message });
    }

    Message.error(message);
    return Promise.reject({ code, message });
  },
  error => {
    /**
     * 包装错误信息 { code, message }
     */
    let code = 0;
    let message = 'unknown error';

    if (error && error.response) {
      const {
        response: { status },
      } = error;
      code = status as number;
      message = HTTP_CODE[code];
    }

    if (code === 401) {
      // 清空所有本地数据，并跳转到登录页面
      usePermissionDenied();
      return Promise.reject({ code, message });
    }

    Message.error(message);
    return Promise.reject({ code, message });
  }
);

export default request;
