<template>
  <BaseModal :title="modalTitle" modal-body-class="p-1" :show-footer="false">
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
    modalTitle() {
      return this.article.product.code
        ? `${this.article.product.code} - ${this.article.product.reference}`
        : this.article.product.reference;
    },
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
