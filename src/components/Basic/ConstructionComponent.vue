<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" dense>
      <v-col cols="12" sm="8" md="4" lg="4" >
        <v-img
          max-height="250"
          max-width="250"
          src="@/assets/images/engineering.png"
          class="mx-auto"
        ></v-img>
        <span align="center" class="title font-weight-light d-block mt-3 mx-auto">
          Developers are working to implement it in next sprint :)
        </span>
        <router-link :to="{name: 'index'}" align="center" class="d-block mt-3 mx-auto">Back to main page?</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>