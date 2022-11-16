<template>
  <tr>
    <td>{{ article.id }}</td>
    <td>{{ article.product.name }}</td>
    <td>{{ article.name }}</td>
    <td class="text-center">
      <div
        class="span badge rounded-pill"
        :class="`pill-badge-${stockClassState}`"
      >
        {{ totalStock }}
      </div>
    </td>
    <td>
      {{ `${article.product.code} / ${article.product.reference}` }}
    </td>
    <td>
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-primary btn-sm"
        :title="$t('common.detail')"
        @click.prevent="
          $router.push({
            name: 'article.details',
            params: { id: article.id },
          })
        "
      >
        {{ $t('common.show') }}
      </BaseButton>
      <BaseButton
        v-if="!haveSalePrice"
        type="button"
        class="btn btn-iconsolid btn-warning btn-sm m-l-5"
        :title="$t('common.configure')"
        @click.prevent="
          $router.push({
            name: 'article.prices',
            params: { id: article.id },
          })
        "
      >
        <i class="fa fa-exclamation-triangle" />
      </BaseButton>
      <BaseButton
        v-if="!article.not_deletable"
        type="button"
        class="btn btn-iconsolid btn-danger btn-sm m-l-5"
        :title="$t('common.delete')"
        :loading="loading"
        @click.prevent="deleteArticle(article)"
      >
        <i class="fa fa-trash-o" />
      </BaseButton>
    </td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'ArticleTableLine',
  components: { BaseButton },
  mixins: [ArticleMixin],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    deleteArticle(article) {
      if (confirm(this.$t('messages.confirmDelete', { label: article.name }))) {
        this.loading = true;
        this.$store
          .dispatch('article/deleteArticle', article.id)
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style scoped></style>
