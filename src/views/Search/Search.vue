<template>
  <section>
    <search-component />
    <volume-component />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import SearchComponent from "@/components/Search/SearchComponent.vue";
import VolumeComponent from "@/components/Search/VolumeComponent.vue";

export default Vue.extend({
  name: "Search",
 
  components: {
    SearchComponent,
    VolumeComponent,
  },
});
</script>
