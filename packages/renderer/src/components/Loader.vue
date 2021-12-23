<template>
  <div v-if="globalLoading" class="loader-wrapper">
    <div class="theme-loader">
      <div class="loader-p"></div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapState} from "vuex";
export default defineComponent({
  name: "Loader",
  computed: {
    ...mapState(["globalLoading"])
  },
  mounted() {
    setTimeout(() => this.$store.dispatch("setGlobalLoading", false), 3000);
  }
})
</script>

<style scoped>

</style>
