<template>
  <ElDialog
    :visible.sync="dialogWrapperVisible"
    v-on="$listeners"
    v-bind="$attrs"
    v-drag
    :closeOnPressEscape="false"
    :closeOnClickModal="false"
  >
    <template v-if="$slots.title">
      <template slot="title">
        <slot name="title"></slot>
      </template>
    </template>
    <slot></slot>
    <template v-if="$slots.footer">
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
    </template>
  </ElDialog>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator';

@Component({ name: 'DialogWrapper' })
export default class DialogWrapper extends Vue {
  @PropSync('visible', { default: false, type: Boolean })
  dialogWrapperVisible!: boolean;
}
</script>
