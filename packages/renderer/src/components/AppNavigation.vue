<template>
  <nav>
    <router-link to="/">
      Page Home
    </router-link>
    <span> | </span>
    <router-link to="/about">
      Page About
    </router-link>
  </nav>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppNavigation',
});
</script>

<style scoped>
nav {
  display: flex;
  gap: 1em;
  justify-content: center;
}
</style>
