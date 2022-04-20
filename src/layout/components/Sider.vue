<template>
  <aside class="layout-sider">
    <div class="layout-sider-menu">
      <ElMenu default-active="2" class="el-menu-sider">
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
