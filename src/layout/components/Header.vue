<template>
  <header class="layout-header layout-fixed-header">
    <div class="layout-header-container">
      <Logo />
      <div class="layout-header-center">
        <ElMenu
          default-active="2"
          mode="horizontal"
          text-color="#ffffffbf"
          background-color="#001529"
          active-text-color="#1890ff"
        >
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
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './Logo.vue';

@Component({
  name: 'Header',
  components: {
    Logo,
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss">
.layout-header {
  width: 100%;
  z-index: 100;
  height: 48px;
  line-height: 48px;
  background-color: #001529;
}

.layout-fixed-header {
  position: fixed;
  top: 0;
  right: 0px;
}

.layout-header-container {
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .layout-header-center {
    flex: 1 1 0%;
  }
}
</style>
