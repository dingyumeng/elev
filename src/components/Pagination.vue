<template>
  <ElPagination
    :pageSizes="sizes"
    v-bind="$attrs"
    v-on="$listeners"
    small
    background
    layout="total, sizes, prev, pager, next, jumper"
    class="custom-pagination"
  ></ElPagination>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ name: 'Pagination' })
export default class Pagination extends Vue {
  sizes = [10, 20, 50, 100];
}
</script>
