<template>
  <div class="bookmark">
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <router-link
          v-if="item.to"
          :to="{ name: item.to }"
          data-container="body"
          data-bs-toggle="popover"
          data-placement="top"
          :title="$t(`menu.${item.code.toString().toLowerCase()}`)"
          data-original-title="Tables"
        >
          <i :data-feather="item.feather"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    window.feather?.replace();
  },
});
</script>

<style scoped></style>
