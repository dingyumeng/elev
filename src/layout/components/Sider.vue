<template>
  <aside class="layout-sider">
    <div class="layout-sider-menu">
      <ElMenu default-active="2">
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
          <template slot="title">
            <i class="el-icon-bell"></i>
            <span slot="title">通知公告</span>
          </template>
        </ElMenuItem>
      </ElMenu>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'Sider' })
export default class Sider extends Vue {}
</script>

<style lang="scss">
.layout-sider {
  width: 208px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-top: 48px;
  background-color: #ffffff;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}
</style>
