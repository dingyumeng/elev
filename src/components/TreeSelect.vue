<template>
  <ElPopover placement="bottom-start" popperClass="popover-wrapper" v-bind="popover.prop">
    <ElTree
      ref="elTreeRef"
      nodeKey="id"
      :data="data"
      :props="defaultTreeProps"
      highlightCurrent
      :expandOnClickNode="false"
      :currentNodeKey="currentNodeKey"
      @node-click="onSelectNode"
      @check="onNodeCheckChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template slot-scope="{ node, data }">
        <slot v-bind="{ node, data }">
          <span :title="node.label" class="el-tree-node__label">
            {{ node.label }}
          </span>
        </slot>
      </template>
    </ElTree>

    <ElSelect
      :value="value"
      slot="reference"
      :multiple="isCheckbox"
      popperClass="tree-select-popper-wrapper"
      style="width: 100%"
      v-bind="select.prop"
      clearable
      @change="onSelectOptionChange"
      @remove-tag="onRemoveSelectTag"
    >
      <ElOption
        v-for="option of flattenTree"
        :key="option.id"
        :value="option.id"
        :label="option[defaultTreeProps.label]"
      />
    </ElSelect>
  </ElPopover>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator';
import { has, isEmpty } from 'lodash';
import { ElTree, TreeData } from 'element-ui/types/tree';
import { useTreeToFlatten } from '@/hooks/useAppCommon';

interface CustomAttrs {
  [field: string]: unknown;
}

@Component({
  name: 'TreeSelect',
})
export default class TreeSelect<D extends TreeData> extends Vue {
  @Prop() value!: string | string[];
  @Prop({ default: () => ({}) }) props!: Record<string, string>;
  @Prop({ default: () => [] }) data!: D[];
  @Prop({ default: () => ({}) }) select!: CustomAttrs;
  @Prop({ default: () => ({}) }) popover!: CustomAttrs;
  @Ref('elTreeRef') elTree!: ElTree<string, D>;

  get elTreeRef() {
    return this.elTree;
  }

  get flattenTree() {
    return useTreeToFlatten(this.data);
  }

  get currentNodeKey() {
    const isString = typeof this.value === 'string';
    return isString ? this.value : null;
  }

  get isCheckbox() {
    return has(this.$attrs, 'showCheckbox') || has(this.$attrs, 'show-checkbox');
  }

  get defaultTreeProps() {
    if (isEmpty(this.props)) {
      return { label: 'name' };
    }

    return this.props;
  }

  @Watch('value', { deep: true, immediate: true })
  onValueChange(value: string | string[]) {
    const values = typeof value === 'string' ? [value] : value;

    if (!this.isCheckbox) {
      return;
    }

    this.$nextTick(() => {
      const currentCheckedKeys = this.elTreeRef.getCheckedKeys();
      if (!(currentCheckedKeys.length && values.length)) {
        return;
      }
      this.elTreeRef.setCheckedKeys(values, false);
    });
  }

  onRemoveSelectTag(value: string) {
    const values = this.value as string[];
    const validValues = values.filter(x => x !== value);

    this.elTreeRef.setCheckedKeys(validValues, false);
    this.eventEmitInput(validValues);
  }

  onSelectOptionChange() {
    this.elTreeRef.setCheckedKeys([]);
    const value = this.isCheckbox ? [] : '';

    this.eventEmitInput(value);
  }

  onNodeCheckChange() {
    const keys = this.elTreeRef.getCheckedKeys();
    this.eventEmitInput(keys);
  }

  onSelectNode(data: D) {
    if (this.isCheckbox) {
      return;
    }

    this.eventEmitInput(data.id);
  }

  eventEmitInput(value: string | string[]) {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss">
.popover-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 240px;
  max-height: 480px;
  width: auto !important;
}

.tree-select-popper-wrapper {
  display: none;
}
</style>

<style lang="scss" scoped>
.el-tree-node__label {
  overflow: hidden;
  padding-right: 6px;
  text-overflow: ellipsis;
}
</style>
