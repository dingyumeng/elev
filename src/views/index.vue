<template>
  <div class="dashboard-page-wrapper">
    <el-button type="primary">按钮</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'Dashboard' })
export default class Dashboard extends Vue {}
</script>
