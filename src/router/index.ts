import Vue from 'vue';
import type { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';
import type { RouteConfig, RouteMeta } from 'vue-router';
import type { RouteConfigSingleView, RouteConfigMultipleViews } from 'vue-router/types/router';
import { cloneDeep, omit } from 'lodash';

import Dashboard from '@/views/index.vue';
import Layout from '@/layout/index.vue';
import Placeholder from '@/components/Placeholder.vue';

Vue.use(VueRouter);

/**
 * 面包屑配置，支持false, 对象和数组形式配置：
 *
 * `false`: 命中路由时不展示面包屑，请注意有/无面包屑的页面切换时可能造成页面抖动。
 *
 * 对象(`{ title: string; navigatable?: false }`)：命中路由时由顶级路由配置开始寻找，依次展示所有找到的面包屑，`navigatable`为 false 时这一层面包屑不能跳转；**支持包含参数的path 跳转**。
 *
 * 数组(`string | { title: string; url?: string}`)：命中路由时直接展示指定的面包屑，传入字符串时会被转换为`{ title }`；url 为空时生成的面包屑不能跳转。
 *
 * TODO: Standard document format
 */
type MetaBreadcrumb = false | { title: string; navigatable?: false } | (string | { title: string; url?: string })[];

/**
 * Elev 扩展的路由定义
 */
export type EvRouteConfig = RouteConfig & {
  meta?: RouteMeta & {
    breadcrumb?: MetaBreadcrumb;
  };
};

const routes: Array<EvRouteConfig> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      //#region fake routes
      // fake flatted routes
      {
        path: 'auth/roles',
        name: 'RoleManage',
        component: Placeholder,
        props: {
          cname: 'role-manage',
        },
        meta: {
          breadcrumb: [{ title: '权限管理' }, { title: '角色管理' }],
        },
      },
      {
        path: 'auth/roles/create',
        name: 'RoleCreate',
        component: Placeholder,
        props: {
          cname: 'role-create',
        },
        meta: {
          breadcrumb: [{ title: '权限管理' }, { title: '角色管理' }, { title: '创建角色' }],
        },
      },
      // fake nested routes
      {
        path: 'class',
        meta: {
          breadcrumb: { title: '班级管理', navigatable: false },
        },
        children: [
          {
            path: 'students',
            meta: {
              breadcrumb: { title: '学生管理' },
            },
            children: [
              {
                path: '',
                name: 'StudentManage',
                component: Placeholder,
                props: {
                  cname: 'student-manage',
                },
              },
            ],
          },
          {
            path: 'teachers',
            meta: {
              breadcrumb: { title: '教师管理', navigatable: false },
            },
            children: [
              {
                path: '',
                name: 'TeacherManage',
                component: Placeholder,
                props: {
                  cname: 'teacher-manage',
                },
                meta: {
                  breadcrumb: { title: '教师列表' },
                },
              },
              {
                path: ':id',
                meta: {
                  breadcrumb: { title: '教师详情' },
                },
                children: [
                  {
                    path: '',
                    name: 'TeacherView',
                    component: Placeholder,
                    props: route => ({
                      cname: `teacher-${route.params.id}`,
                    }),
                    meta: {
                      breadcrumb: false,
                    },
                  },
                  {
                    path: 'hobbies',
                    name: 'TeacherHobbiesView',
                    component: Placeholder,
                    props: route => ({
                      cname: `teacher-${route.params.id}'s-hobbies`,
                    }),
                    meta: {
                      breadcrumb: { title: '教师爱好' },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      //#endregion
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
