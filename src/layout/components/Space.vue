<template>
  <div class="header-space-content">
    <a href="javascript:void(0);" class="header-space-item small">单位：稻妻社奉行</a>
    <a href="javascript:void(0);" class="header-space-item">
      <ElTooltip content="技术支持" placement="bottom">
        <i class="el-icon el-icon-question"></i>
      </ElTooltip>
    </a>
    <a href="javascript:void(0);" class="header-space-item" @click="requestFullScreen">
      <ElTooltip content="全屏" placement="bottom">
        <i class="el-icon el-icon-full-screen"></i>
      </ElTooltip>
    </a>
    <a href="javascript:void(0);" class="header-space-item">
      <ElTooltip content="通知" placement="bottom">
        <i class="el-icon el-icon-bell"></i>
      </ElTooltip>
    </a>
    <div class="header-space-item small">
      <ElDropdown placement="bottom-start" szie="medium" trigger="click">
        <div class="user-box">
          <ElAvatar :src="defaultAvatar" size="small" />
          <a href="javascript:void(0);" class="username">
            你好 神里凌华
          </a>
        </div>
        <ElDropdownMenu slot="dropdown" class="global-user-select-dropdown">
          <ElDropdownItem icon="el-icon-user">个人信息</ElDropdownItem>
          <ElDropdownItem icon="el-icon-lock">修改密码</ElDropdownItem>
          <ElDropdownItem icon="el-icon-switch-button" divided>退出登录</ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import defaultAvatar from '@/assets/images/default-avatar.webp';

@Component({ name: 'Space' })
export default class Space extends Vue {
  defaultAvatar = defaultAvatar;

  requestFullScreen(): void {
    const body = document.querySelector('body');
    body?.requestFullscreen();
  }
}
</script>
