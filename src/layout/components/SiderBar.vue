<template>
  <aside class="layout-sider">
    <div class="layout-sider-menu">
      <ElMenu default-active="2">
        <ElSubmenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <ElMenuItem index="1-1">菜单一</ElMenuItem>
        </ElSubmenu>
        <ElMenuItem index="2">菜单二</ElMenuItem>
      </ElMenu>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.layout-sider {
  width: 208px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 8px 0 rgba(29, 35 , 41, .05);
}
</style>
