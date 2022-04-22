<template>
  <div class="layout-wrapper">
    <div class="layout-sider-placeholder" :class="collapseClass"></div>
    <Sider />
    <div class="layout-container">
      <header class="layout-header-placeholder"></header>
      <Header />
      <ElBreadcrumb>
        <ElBreadcrumbItem
          v-for="(breadcrumb, index) in breadcrumbItems"
          :key="index"
          :to="index === breadcrumbItems.length - 1 ? undefined : breadcrumb.url"
        >
          {{ breadcrumb.title }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
      <main class="layout-main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import pathToRegexp from 'path-to-regexp';

import { EvRouteConfig } from '@/router';
import Sider from './components/Sider.vue';
import Header from './components/Header.vue';

type EvBreadcrumbItem = {
  title: string;
  url?: string;
};

@Component({
  name: 'Layout',
  components: {
    Header,
    Sider,
  },
})
export default class Layout extends Vue {
  @Getter('collapse', { namespace: 'layout' })
  collapse!: boolean;

  get collapseClass() {
    return { 'layout-sider-collapsed': this.collapse };
  }

  get breadcrumbItems() {
    const { $route } = this;
    const { params, matched } = $route;
    const breadcrumb = ($route.meta as EvRouteConfig['meta'])?.breadcrumb;
    let breadcrumbs: EvBreadcrumbItem[] = [];
    if (Array.isArray(breadcrumb)) {
      breadcrumbs = breadcrumb.map(x => {
        if (typeof x === 'string') {
          return { title: x };
        }
        return x;
      });
    } else if (breadcrumb !== false) {
      breadcrumbs = matched
        .map(matched => {
          const matchedBreadcrumb = matched?.meta?.breadcrumb;

          const breadcrumbItem: EvBreadcrumbItem = {
            title: matchedBreadcrumb?.title,
          };
          if (matchedBreadcrumb?.navigatable !== false) {
            const toPath = pathToRegexp.compile(matched.path);
            const matchedUrl = toPath(params);
            breadcrumbItem.url = matchedUrl;
          }

          return breadcrumbItem;
        })
        .filter(x => typeof x.title !== 'undefined');
    }

    return breadcrumbs;
  }
}
</script>
