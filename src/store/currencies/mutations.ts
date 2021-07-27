import { MutationTree } from 'vuex';
import { CurrencyState } from "./types";

export enum CurrencyMutations {
    setCurrencies = "setCurrencies",
}

export const mutations: MutationTree<CurrencyState> = {
    [CurrencyMutations.setCurrencies](state, payload: CurrencyState) {
        state.currencies = payload.currencies;
    }
};