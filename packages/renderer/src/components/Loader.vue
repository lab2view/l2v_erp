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
  computed: {
    ...mapState(["globalLoading"])
  }
})
</script>

<style scoped>

</style>
