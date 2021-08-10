<template>
  <v-container class="mt-6" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card class="px-3 py-3">

          <h3 class="title font-weight-light my-3">
            Search Volumes
          </h3>

          <v-row class="px-4">
            <v-text-field
              v-model="dateRangeText"
              label="Select a Date range"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
          </v-row>
          <v-row 
            v-if="!isDatesValid"
            class="px-4">
            <p class="red--text">
              Please at least one date for search.
            </p>
          </v-row>

          <v-row justify="center">
            <v-date-picker
                v-model="dates"
                range
              ></v-date-picker>
          </v-row>

          <v-row class="px-4 mb-4">
            <v-btn
                id="btn_volume_search"
                block
                color="primary"
                elevation="1"
                :disabled="!isSearchable"
                :loading="isLoading"
                outlined
                class="mt-2"
                @click="loadVolume"
              >Search</v-btn>
          </v-row>

          <v-row 
              v-if="hasAnyVolume"
              id="row_volumes"
              class="my-4 px-4">
            <v-list-item 
              v-for="volume in volumes" :key="volume.timestamp"
              four-line>
              <v-list-item-content>
                <v-list-item-title>{{formatDate(volume.timestamp)}}</v-list-item-title>
                <v-list-item-subtitle>
                  <b>Volume: </b> {{currencyFormat(volume.volume)}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <b>Spot Volume: </b> {{currencyFormat(volume.spotVolume)}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <b>Derivative Volume: </b> {{currencyFormat(volume.derivativeVolume)}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Volume, VolumeRequestPayload} from "@/models/Volume";

interface VolumeComponentData {
  dates: Array<Date>,
  volumes: Array<Volume>,
  isLoading: boolean,
}

export default Vue.extend({
  name: "VolumeComponent",
  data() {
    return {
      dates: [],
      volumes: [],
      isLoading: false,
    } as VolumeComponentData;
  },
  computed: {
    isDatesValid(): boolean {
      return this.dates.length > 0;
    },
    dateRangeText(): string {
      return this.dates.join(" ~ ");
    },
    isSearchable(): boolean {
      return this.dates.length > 0 && !this.isLoading;
    },
    hasAnyVolume(): boolean {
      return this.volumes.length > 0;
    }
  },
  methods: {
    async loadVolume(): Promise<void> {

      this.isLoading = true;

      const volumePayload: VolumeRequestPayload = {
        start_at: this.dates[0],
        end_at: this.dates.length === 2 ? this.dates[1] : null,
      }
      await this.$store.dispatch("volumes/fetchVolumes", volumePayload);

      const volumes: Array<Volume> = this.$store.getters["volumes/getVolumes"];

      if (volumes.length) {
        this.volumes = volumes;
      }

      this.isLoading = false;
    },
    formatDate(date: Date):  string {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;

      return [year, month, day].join('-');
    },
    currencyFormat(input: number): string {
      return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
});
</script>