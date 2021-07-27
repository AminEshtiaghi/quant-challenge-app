import { GetterTree } from 'vuex';
import { DetailState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<DetailState, RootState> = {
    getSymbol(state): string {
      return state.symbol;
    },
    getName(state): string {
      return state.name;
    },
    getPrice(state): number {
      return state.price;
    },
    getMarketCap(state): number {
      return state.market_cap;
    },
    getMarketCapDominance(state): number {
      return state.market_cap_dominance;
    },
};