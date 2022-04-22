<template>
  <p>{{ cname }} works!</p>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ name: 'Placeholder' })
export default class Placeholder extends Vue {
  @Prop() cname!: string;
}
</script>
