import Vue from 'vue';
import type { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';
import type { RouteConfig } from 'vue-router';
import type { RouteConfigSingleView, RouteConfigMultipleViews } from 'vue-router/types/router';
import { cloneDeep, omit } from 'lodash';

import Dashboard from '@/views/index.vue';
import Layout from '@/layout/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
];

const PassThroughComponent: ComponentOptions<Vue> = {
  render: h => h('router-view'),
};

/**
 * @see {@link addPassThroughComponent}
 */
export function addPassThroughComponents(routes: RouteConfig[]): RouteConfig[] {
  return routes.map(route => {
    const cloned: RouteConfig = cloneDeep(omit(route, 'children'));
    if (Array.isArray(route.children)) {
      cloned.children = [];
      addPassThroughComponent(cloned);
      cloned.children = addPassThroughComponents(route.children);
    }

    return cloned;
  });
}

/**
 * 为有children 无component （我们称为logic group，逻辑组）路由设置默认的Component。
 *
 * @param route 路由配置
 * @returns [mutated] 设置了默认Component 的路由配置
 */
export function addPassThroughComponent(route: RouteConfig): RouteConfig {
  if (
    Array.isArray(route.children) &&
    typeof (route as RouteConfigMultipleViews).components === 'undefined' &&
    typeof (route as RouteConfigSingleView).component === 'undefined'
  ) {
    (route as RouteConfigSingleView).component = PassThroughComponent;
  }

  return route;
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: addPassThroughComponents(routes),
});

export default router;
