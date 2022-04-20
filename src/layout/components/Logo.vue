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
