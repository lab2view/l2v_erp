<template>
  <p class="border-bottom pb-1">
    {{ article.name }}
    <span class="float-end f-w-700">
      {{ composition.quantity }}
    </span>
  </p>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    composition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('article', ['getArticleById']),
    article() {
      return this.getArticleById(this.composition.child_article_id);
    },
  },
};
</script>

<style scoped></style>
