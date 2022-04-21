import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { LayoutState } from '@/store/types/layout';

export const getters: GetterTree<LayoutState, RootState> = {
  collapse(state) {
    return state.collapse;
  },
};
