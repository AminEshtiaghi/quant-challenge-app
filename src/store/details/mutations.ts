import { MutationTree } from 'vuex';
import { DetailState } from "./types";

export enum DetailsMutations {
    setDetails = "setDetails",
}

export const mutations: MutationTree<DetailState> = {
    [DetailsMutations.setDetails](state, payload: DetailState) {
        state.symbol = payload.symbol;
        state.name = payload.name;
        state.price = payload.price;
        state.market_cap = payload.market_cap;
        state.market_cap_dominance = payload.market_cap_dominance;
    }
};