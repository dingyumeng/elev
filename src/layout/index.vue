<template>
  <div class="layout-wrapper">
    <div class="layout-sider-placeholder" :class="collapseClass"></div>
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
import { Getter } from 'vuex-class';
import Sider from './components/Sider.vue';
import Header from './components/Header.vue';

@Component({
  name: 'Layout',
  components: {
    Header,
    Sider,
  },
})
export default class Layout extends Vue {
  @Getter('collapse', { namespace: 'layout' })
  collapse!: boolean;

  get collapseClass() {
    return { 'layout-sider-collapsed': this.collapse };
  }
}
</script>
