import { RouteConfig } from 'vue-router';
import { useTreeToFlatten, useFlattenToTree } from './useAppCommon';
import { MenuTypes } from '@/common/constants';
import { RouteConfigCommon } from './types/route';

/**
 * @description 把后端返回的路由数据处理成 vue-router 需要的 RouteConfig[]
 * @param routes RouteConfigCommon[]
 * @returns RouteConfig[]
 */
export const useTransformRoute = <T extends RouteConfigCommon>(routes: T[]): RouteConfig[] => {
  const flatten = useTreeToFlatten(routes);
  const filtered = flatten.filter(x => x.type !== MenuTypes.Button);
  const zipNodes = useFlattenToTree(filtered);

  const recursion = (children: RouteConfigCommon[]) => {
    return children.map((route): RouteConfig => {
      let routeChildren: RouteConfig[] = [];
      const { path, name, redirect, componentPath, icon, visible, target, outlink, type, status, children } = route;
      const component = () => import(`@${componentPath}.vue`);

      if (children && children.length) {
        routeChildren = recursion(children);
      }

      return {
        path,
        name,
        redirect,
        component,
        meta: {
          icon,
          visible,
          target,
          outlink,
          type,
          status,
        },
        children: routeChildren,
      };
    });
  };

  return recursion(zipNodes);
};
