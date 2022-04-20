<template>
  <div class="header-space-content">
    <div class="header-space-item">
      <ElTooltip content="搜索" placement="bottom">
        <i class="el-icon el-icon-search"></i>
      </ElTooltip>
    </div>
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

<style lang="scss">
.global-user-select-dropdown {
  min-width: 175px;

  .el-dropdown-menu__item {
    font-size: 14px;
    color: #606266;
  }
}

.header-space-content {
  display: flex;
  padding: 8px 0;
  height: 48px;
  color: #ffffff;
  line-height: 48px;
  align-items: center;

  .header-space-item {
    display: flex;
    padding: 0 8px;
    align-items: center;

    &:hover {
      background-color: rgba($color: #ffffff, $alpha: 0.1);
    }

    &.small {
      font-size: 14px;
    }

    .el-icon {
      line-height: unset;
    }

    .user-box {
      display: flex;
      align-items: center;
    }

    .username {
      color: #ffffff;
      margin-left: 8px;
    }
  }
}
</style>
