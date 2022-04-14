import { VueConstructor } from 'vue/types';
import drag from './drag';
import permission from './permission';

export default {
  install(Vue: VueConstructor) {
    Vue.directive('drag', drag);
    Vue.directive('permission', permission);
  },
};
