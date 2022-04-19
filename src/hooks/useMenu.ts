import { RouteConfigCommon, MenuOptions } from './types';
import { useTreeToFlatten, useFlattenToTree } from './useAppCommon';
import { DefaultRoot } from '@/common/constants';

/**
 * @description 把后端返回的路由数据处理成为菜单，去掉按钮和不展示的菜单
 * @param routes RouteConfigCommon
 * @returns MenuOptions
 */
export const useTransformMenu = (routes: RouteConfigCommon[]): MenuOptions => {
  const flatten = useTreeToFlatten(routes);
  const headMenu = flatten.filter(x => x.parentId === DefaultRoot);
  const filtered = flatten.filter(x => x.type !== 'Button' || !x.visible);
  const zipMenus = useFlattenToTree(filtered);

  return {
    headMenu,
    zipMenus,
  };
};
