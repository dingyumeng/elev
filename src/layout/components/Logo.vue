<template>
  <div :class="layoutWrapperClass">
    <a href="javascript:void(0);">
      <img src="/full-logo.svg" alt="logo" />
      <h1>EleV Pro</h1>
    </a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// const classNames = ['layout-header-logo', 'layout-sider-logo', 'small', 'normal'];

@Component({ name: 'Header' })
export default class Header extends Vue {
  layoutWrapperClass = {
    'layout-header-logo': true,
    small: true,
  };
}
</script>

<style lang="scss">
.layout-header-logo {
  display: flex;
  min-width: 192px;

  a {
    display: flex;
    align-items: center;

    img {
      height: 28px;
    }

    h1 {
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
      height: 32px;
      line-height: 32px;
      margin: 0 0 0 12px;
    }
  }
}
</style>
