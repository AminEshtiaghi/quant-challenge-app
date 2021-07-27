import { Module}  from 'vuex';
import { RootState } from '../types';
import { DetailState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from "./getters";

const state: DetailState = {
    symbol: '',
    name: '',
    price: 0,
    market_cap: 0,
    market_cap_dominance: 0
};

export const details: Module<DetailState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};