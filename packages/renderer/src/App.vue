<template>
  <app-navigation />
  <router-view />
</template>

<script>
import {defineComponent} from 'vue';
import AppNavigation from '/@/components/AppNavigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    AppNavigation,
  },
});
</script>

<style>
</style>
