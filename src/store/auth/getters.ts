import { GetterTree } from 'vuex';
import { AuthState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<AuthState, RootState> = {
    getToken(state): string|null {
      return state.token;
    },
    getExpireAt(state): Date {
      return state.expires_at;
    },
    getName(state): string|null {
      return state.name;
    },
    isLoggedIn(state): boolean {
      return state.token !== null;
    },
};