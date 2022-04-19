<template>
  <div class="layout-wrapper">
    <SiderBar />
    <div class="layout-container">
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SiderBar from './components/SiderBar.vue';

@Component({
  name: 'Layout',
  components: {
    SiderBar,
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss">
.layout-wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
