import { GetterTree } from 'vuex';
import { VolumeState } from "./types";
import { RootState } from "../types";
import { Volume } from '@/models/Volume';

export const getters: GetterTree<VolumeState, RootState> = {
    getVolumes(state): Array<Volume> {
      return state.result;
    },
};