import { VueConstructor } from 'vue/types';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import './assets/theme.scss';
import './assets/styles.scss';
import './assets/element-overwrite/index.scss';

import EvDict from '@/components/dict/';

export default {
  install(Vue: VueConstructor): void {
    Vue.config.productionTip = false;

    Vue.use(ElementUI, { size: 'small' });

    Vue.use(EvDict /*, { labelKey: 'title' } */);
  },
};
