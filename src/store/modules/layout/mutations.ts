import { MutationTree } from 'vuex';
import { LayoutState } from '@/store/types/layout';

export const mutations: MutationTree<LayoutState> = {
  setCollapse(state, payload: boolean) {
    state.collapse = payload;
  },
};
