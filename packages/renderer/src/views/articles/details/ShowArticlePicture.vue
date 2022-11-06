<template>
  <BaseModal
    :title="`${article.product.code} - ${article.product.reference}`"
    modal-body-class="p-1"
    :show-footer="false"
  >
    <img
      class="rounded img-optimize"
      :src="article.cover_url"
      :alt="article.article_id"
      :title="article.label"
    />
  </BaseModal>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '/@/components/common/BaseModal.vue';

export default {
  name: 'ShowArticlePicture',
  components: { BaseModal },
  computed: {
    ...mapGetters('article', ['article']),
  },
  beforeUnmount() {
    this.$store.commit('article/SET_CURRENT_ARTICLE', null);
  },
};
</script>

<style scoped>
.img-optimize {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>
