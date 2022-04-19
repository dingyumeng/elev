<template>
  <div class="layout-wrapper">
    <div class="layout-sider-placeholder"></div>
    <Sider />
    <div class="layout-container">
      <header class="layout-header-placeholder"></header>
      <Header />
      <main class="layout-main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Sider from './components/Sider.vue';
import Header from './components/Header.vue';

@Component({
  name: 'Layout',
  components: {
    Header,
    Sider,
  },
})
export default class Layout extends Vue {}
</script>
