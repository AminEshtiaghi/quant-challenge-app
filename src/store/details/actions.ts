import { ActionTree } from "vuex";
import { DetailState } from "./types";
import { RootState } from "../types";
import { DetailsMutations } from "./mutations";
import { DetailsActionResponse } from "@/models/Details";
import store from "..";

export const actions: ActionTree<DetailState ,RootState> = {
  fetchDetails({commit}, symbol: string): Promise<DetailState|null> {

    const token = store.getters['auth/getToken'];
    const requestOptions = {
      method: "GET",
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
      }
  };

    const url = `${process.env.VUE_APP_BASE_URL}/api/search/details/${symbol}`;
    return fetch(url, requestOptions)
    .then((response) => {

        return response.json();

    })
    .then((detailsActionResponse: DetailsActionResponse) => {

      if (detailsActionResponse.symbol !== null &&
          detailsActionResponse.name !== null &&
          detailsActionResponse.price !== null &&
          detailsActionResponse.market_cap !== null &&
          detailsActionResponse.market_cap_dominance !== null
        ) {
        const detailsState = {
          symbol: detailsActionResponse.symbol,
          name: detailsActionResponse.name,
          price: detailsActionResponse.price,
          market_cap: detailsActionResponse.market_cap,
          market_cap_dominance: detailsActionResponse.market_cap_dominance,
        } as DetailState;

        commit(DetailsMutations.setDetails, detailsState);
        return detailsState;
      }

      return null;
    });

  }
};