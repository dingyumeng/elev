<template>
  <div class="dashboard-page-wrapper">
    <ElButton type="primary">Button</ElButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Dashboard' })
export default class Dashboard extends Vue {}
</script>
