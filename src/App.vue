<template>
  <v-app>
    <v-app-bar app color="primary" light>
      <div class="d-flex align-center">
        <v-img
          alt="App Logo"
          class="shrink mr-2"
          contain
          src="@/assets/images/search.png"
          transition="scale-transition"
          width="40"
        />

        <span class="title white--text">
          Amazing Crypto Searcher
        </span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        id="btn_sign_out"
        :loading="isLoading"
        class="ml-5"
        v-if="isLoggedIn"
        @click="signout"
        >
        Sign out
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    isLoading: false,
  }),
  computed: {
    isLoggedIn(): boolean {
      return this.$store.getters['auth/isLoggedIn'];
    }
  },
  methods: {
    async signout() {

      this.isLoading = true;

      const result = await this.$store.dispatch('auth/signout');

      if (result) {
        this.$router.push('login');
      }

      this.isLoading = false;
      
    }
  }
});
</script>
