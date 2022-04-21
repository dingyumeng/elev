<template>
  <aside class="layout-sider layout-sider-fixed" :class="collapseClass">
    <div class="layout-sider-menu">
      <ElMenu default-active="2" :collapse="collapse" class="el-menu-sider">
        <ElSubmenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统设置</span>
          </template>
          <ElMenuItem index="1-1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">菜单管理</span>
            </template>
          </ElMenuItem>
        </ElSubmenu>
        <ElMenuItem index="2">
          <i class="el-icon-bell"></i>
          <span slot="title">通知公告</span>
        </ElMenuItem>
      </ElMenu>
    </div>
    <div @click="onCollapseChange" class="collapse-sider-menu">
      <i class="el-icon" :class="collapseIconClass"></i>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';

const LayoutNamespace = 'layout';

@Component({ name: 'Sider' })
export default class Sider extends Vue {
  @Getter('collapse', { namespace: LayoutNamespace })
  collapse!: boolean;

  @Mutation('setCollapse', { namespace: LayoutNamespace })
  // eslint-disable-next-line @typescript-eslint/ban-types
  setCollapse!: Function;

  get collapseClass() {
    return { 'layout-sider-collapsed': this.collapse };
  }

  get collapseIconClass() {
    return this.collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold';
  }

  onCollapseChange() {
    this.setCollapse(!this.collapse);
  }
}
</script>
