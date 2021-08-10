import { Module}  from 'vuex';
import { RootState } from '../types';
import { VolumeState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from "./getters";

const state: VolumeState = {
    result: []
};

export const volumes: Module<VolumeState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};