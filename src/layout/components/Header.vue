<template>
  <header class="layout-header layout-fixed-header">
    <div class="layout-header-container">
      <Logo />
      <div class="layout-header-center"></div>
      <Space />
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Logo from './Logo.vue';
import Space from './Space.vue';

@Component({
  name: 'Header',
  components: {
    Logo,
    Space,
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
