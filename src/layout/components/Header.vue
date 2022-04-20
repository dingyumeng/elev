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
