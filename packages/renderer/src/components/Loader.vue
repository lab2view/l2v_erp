<template>
  <div class="loader-wrapper" ref="wrapper">
    <div class="theme-loader">
      <div class="loader-p"></div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent({
  name: "Loader",
  mounted() {
    setTimeout(() => this.$refs.wrapper.remove(), 3000);
  }
})
</script>

<style scoped>

</style>
