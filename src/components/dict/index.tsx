import Vue from 'vue';
import type { VNode, PluginObject } from 'vue';

import { getPrefixCls } from '../util';
import { dict } from './dict';
import type { Dictionary, DictionaryItem } from './types';

export { dict };
export * from './types';

export type EvDictProps<D = unknown, V = unknown> = {
  prefixCls?: string;
  value: V;
  labelKey: keyof DictionaryItem<D>;
  dict: Dictionary<D>;
};

const EvDict = Vue.extend({
  name: 'EvDict',
  functional: true,
  props: {
    prefixCls: String,
    value: {
      required: true,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    dict: {
      validator: (value: any) => {
        return Array.isArray(value) || (typeof value === 'object' && value != null);
      },
    },
  },
  render(_h, { props, scopedSlots }) {
    const { prefixCls: customizePrefixCls, value, labelKey, dict: dictionary } = props;
    const prefixCls = getPrefixCls('dict', customizePrefixCls);

    const dictItem = dict(value, dictionary);
    if (!dictItem) {
      return null as unknown as VNode;
    }
    if (typeof scopedSlots.default !== 'function') {
      return <span class={prefixCls}>{dictItem[labelKey]}</span>;
    }
    return <span class={prefixCls}>{scopedSlots.default(dictItem)}</span>;
  },
});

type EvDictPluginOptions = { labelKey?: string };

(EvDict as unknown as PluginObject<EvDictPluginOptions>).install = function (Vue, options) {
  let comp = EvDict;
  if (options?.labelKey) {
    comp = comp.extend({
      props: {
        labelKey: {
          default: options?.labelKey ?? 'label',
        },
      },
    });
  }

  Vue.component('EvDict', comp);
};

export default EvDict as typeof EvDict & PluginObject<EvDictPluginOptions>;
