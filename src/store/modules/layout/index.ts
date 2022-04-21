import { Module } from 'vuex';
import { getters } from './getters';
import { mutations } from './mutations';
import { RootState } from '@/store/types';
import { LayoutState } from '@/store/types/layout';

export const state: LayoutState = {
  collapse: false,
};

export const layout: Module<LayoutState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
