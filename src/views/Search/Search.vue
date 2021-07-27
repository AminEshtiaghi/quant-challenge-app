<template>
  <search-component />
</template>

<script lang="ts">
import Vue from "vue";
import SearchComponent from "../../components/Search/SearchComponent.vue";

export default Vue.extend({
  name: "Search",
 
  components: {
    SearchComponent,
  },
});
</script>
