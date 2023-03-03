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
      {{ articleName }}
    </td>
    <td>
      <BaseActionBtnGroup
        entity="Article"
        :with-delete-btn="!article.not_deletable"
        :with-update-btn="false"
        @show="
          $router.push({
            name: 'article.details',
            params: { id: article.id },
          })
        "
        @delete="deleteArticle(article)"
      >
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
      </BaseActionBtnGroup>
    </td>
  </tr>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'ArticleTableLine',
  components: { BaseActionBtnGroup, BaseButton },
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
