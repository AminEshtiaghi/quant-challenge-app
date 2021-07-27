import { GetterTree } from 'vuex';
import { CurrencyState } from "./types";
import { RootState } from "../types";
import { Currency } from '@/models/Currency';

export const getters: GetterTree<CurrencyState, RootState> = {
    getCurrencies(state): Array<Currency> {
      return state.currencies;
    },
};