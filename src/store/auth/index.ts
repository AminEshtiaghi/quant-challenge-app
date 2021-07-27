import { Module}  from 'vuex';
import { RootState } from '../types';
import { AuthState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from "./getters";

const state: AuthState = {
    token: null,
    expires_at: new Date(),
    name: null
};

export const auth: Module<AuthState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};