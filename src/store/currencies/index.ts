import { Module}  from 'vuex';
import { RootState } from '../types';
import { CurrencyState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from "./getters";

const state: CurrencyState = {
    currencies: []
};

export const currencies: Module<CurrencyState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};