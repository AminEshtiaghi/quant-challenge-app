import { ActionTree } from "vuex";
import { VolumeState } from "./types";
import { RootState } from "../types";
import { VolumeMutations } from "./mutations";
import { VolumeRequestPayload, VolumesActionResponse } from "@/models/Volume";
import store from "..";

export const actions: ActionTree<VolumeState ,RootState> = {
  async fetchVolumes({commit}, payload: VolumeRequestPayload): Promise<void> {

    const token = store.getters['auth/getToken'];
    const requestOptions = {
      method: "GET",
      headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
      }
  };

    const url = `${process.env.VUE_APP_BASE_URL}/api/search/volume?start_at=${payload.start_at}&end_at=${payload.end_at}`;
    await fetch(url, requestOptions)
    .then((response) => {

        return response.json();

    })
    .then((volumesActionResponse: VolumesActionResponse) => {

      if (volumesActionResponse.result) {
        const volumesState = {
          result: volumesActionResponse.result
        } as VolumeState;

        commit(VolumeMutations.setVolumes, volumesState);
      }

    });

  }
};