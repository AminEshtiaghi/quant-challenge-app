<template>
  <construction-component />
</template>

<script lang="ts">
import Vue from "vue";
import ConstructionComponent from "../../components/Basic/ConstructionComponent.vue";

export default Vue.extend({
  name: "Constructing",

  components: {
    ConstructionComponent,
  },
});
</script>