<template>
  <v-container class="mt-6" fluid>
    <v-row align="center" justify="center"  dense>
      <v-col cols="12" sm="8" md="4" lg="4">

        <v-card class="px-3 py-3">

          <h3 class="title font-weight-light my-3">
            Search from Nomics website
          </h3>

          <section align="center" justify="center" class="my-4"
              v-if="!hasAnyCurrencies"
            >
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
            <br>
            <span class="d-block mt-2">
              Please wait, we are fetching data from our servers...
            </span>
          </section>
          <v-select
            v-model="selectedCurrency"
            v-if="hasAnyCurrencies"
            :hint="currencyHint"
            :items="currencies"
            item-text="symbol"
            item-value="name"
            label="Select one of currencies"
            persistent-hint
            return-object
            single-line
            prepend-inner-icon="mdi-bitcoin"
            class="rounded-0"
            outlined
          ></v-select>
          <v-btn
              block
              color="primary"
              elevation="1"
              :disabled="!isSearchable"
              :loading="isLoading"
              outlined
              class="mt-6"
              @click="loadDetails"
            >Search</v-btn>

          <h3 v-if="hasAnyDetails" class="title font-weight-light my-6">
            Market Details of {{getSymbol}}
          </h3>

          <v-card
            v-if="hasAnyDetails"
            elevation="1"
            :loading="isLoading"
            outlined
            shaped
          >
            <v-card-title>
              {{getName}}
            </v-card-title>
            <v-card-subtitle>
              Price: {{getPrice}} USD
            </v-card-subtitle>
            <v-card-text>
              <b>Market CAP:</b> {{getMarketCAP}}
              <br>
              <b>Market CAP Dominance:</b> {{getMarketCapDominance}}
            </v-card-text>
          </v-card>

        </v-card>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import { Currency } from "@/models/Currency";
import { Details } from "@/models/Details";
import Vue from "vue";

interface SearchComponentData {
  selectedCurrency: Currency|null,
  details: Details|null,
  isLoading: boolean
};

export default Vue.extend({
  name: "SearchComponent",
  created() {
    this.$store.dispatch('currencies/fetchCurrencies');
  },
  data() {
    return {
      selectedCurrency: null,
      details: null,
      isLoading: false,
    } as SearchComponentData;
  },
  computed: {
    currencies(): Array<Currency> {
      return this.$store.getters['currencies/getCurrencies'];
    },
    hasAnyCurrencies(): boolean {
      return this.currencies.length > 0;
    },
    currencyHint(): string {
      if (this.selectedCurrency === null) {
        return '';
      }

      return `${this.selectedCurrency.symbol}, ${this.selectedCurrency.name}`;
    },
    isSearchable(): boolean {
      return this.selectedCurrency !== null && !this.isLoading;
    },
    hasAnyDetails(): boolean {
      return this.details !== null;
    },
    getSymbol(): string
    {
      if (this.details !== null && this.details.symbol) {
        return this.details.symbol;
      }
      
      return '';
    },
    getName(): string
    {
      if (this.details !== null && this.details.name) {
        return this.details.name;
      }
      
      return '';
    },
    getPrice(): string
    {
      if (this.details !== null && this.details.price) {
        return this.details.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      return '';
    },
    getMarketCAP(): string
    {
      if (this.details !== null && this.details.market_cap) {
        return this.details.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      
      return '';
    },
    getMarketCapDominance(): number
    {
      if (this.details !== null && this.details.market_cap_dominance) {
        return this.details.market_cap_dominance;
      }
      
      return 0;
    },
  },
  methods: {
    async loadDetails(): Promise<void> {

      this.isLoading = true;
      const result: Details|null = await this.$store.dispatch('details/fetchDetails', this.selectedCurrency?.symbol);

      if (result) {
        this.details = {
          symbol: result?.symbol,
          name: result?.name,
          price: result?.price,
          market_cap: result?.market_cap,
          market_cap_dominance: result?.market_cap_dominance,
        } as Details;

      } else {
        this.details = null;

      }

      this.isLoading = false;

    }
  }
});
</script>
