import { ActionTree } from "vuex";
import { CurrencyState } from "./types";
import { RootState } from "../types";
import { CurrencyMutations } from "./mutations";
import { CurrenciesActionResponse } from "@/models/Currency";
import store from "..";

export const actions: ActionTree<CurrencyState ,RootState> = {
  fetchCurrencies({commit}): void {

    const token = store.getters['auth/getToken'];
    const requestOptions = {
      method: "GET",
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
      }
  };

    const url = `${process.env.VUE_APP_BASE_URL}/api/search/currencies`;
    fetch(url, requestOptions)
    .then((response) => {

        return response.json();

    })
    .then((currenciesActionResponse: CurrenciesActionResponse) => {

      if (currenciesActionResponse.currencies !== null) {
        const currenciesState = {
          currencies: currenciesActionResponse.currencies
        } as CurrencyState;

        commit(CurrencyMutations.setCurrencies, currenciesState);
      }

    });

  }
};