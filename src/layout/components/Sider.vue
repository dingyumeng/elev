<template>
  <aside class="layout-sider layout-sider-fixed" :class="collapseClass">
    <div class="layout-sider-menu">
      <ElMenu default-active="2" :collapse="collapse" class="el-menu-sider" router>
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
        <ElSubmenu index="auth">
          <template #title>
            <i class="el-icon-lock"></i>
            <span>权限管理</span>
          </template>
          <ElMenuItem index="/auth/roles">角色管理</ElMenuItem>
          <ElMenuItem index="/auth/roles/create">创建角色</ElMenuItem>
        </ElSubmenu>
        <ElSubmenu index="class">
          <template #title>
            <i class="el-icon-user"></i>
            <span>班级管理</span>
          </template>
          <ElMenuItem index="/class/students/">学生管理</ElMenuItem>
          <ElMenuItem index="/class/teachers/">教师管理</ElMenuItem>
          <ElMenuItem index="/class/teachers/57">57 号教师</ElMenuItem>
          <ElMenuItem index="/class/teachers/57/hobbies">57 号教师的爱好</ElMenuItem>
        </ElSubmenu>
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
