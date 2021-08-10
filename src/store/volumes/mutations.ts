import { MutationTree } from 'vuex';
import { VolumeState } from "./types";

export enum VolumeMutations {
    setVolumes = "setVolumes",
}

export const mutations: MutationTree<VolumeState> = {
    [VolumeMutations.setVolumes](state, payload: VolumeState) {
        state.result = payload.result;
    }
};