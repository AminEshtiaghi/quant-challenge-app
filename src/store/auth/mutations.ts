import {MutationTree} from 'vuex';
import {AuthState} from "./types";
import {Auth} from "../../models/Auth";

export enum AuthMutations {
    setAuth = "setAuth",
}

export const mutations: MutationTree<AuthState> = {
    [AuthMutations.setAuth](state, payload: AuthState) {
        state.token = payload.token;
        state.expires_at = payload.expires_at;
        state.name = payload.name;
    }
};