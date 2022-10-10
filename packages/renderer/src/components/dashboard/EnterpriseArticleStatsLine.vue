<template>
  <tr>
    <td>{{ distribution.name }}</td>
    <td>{{ totalStock }}</td>
    <td v-if="canShowEnterpriseArticleLineStats" class="text-end">
      <BaseButton
        type="button"
        icon="fa fa-eye"
        :text="$t('common.show')"
        class="btn btn-sm btn-outline-primary m-r-5"
        @click.prevent="
          $router.push({
            name: 'dashboard.enterprise.article.stats',
            params: { enterprise_id: distribution.id },
          })
        "
      />
    </td>
  </tr>
</template>

<script>
import ArticleDistributionMixin from '/@/mixins/ArticleDistributionMixin';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EnterpriseArticleStatsLine',
  components: { BaseButton },
  mixins: [ArticleDistributionMixin],
  computed: {
    ...mapGetters('auth', ['canShowMenuItem']),
    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem('Enterprise.viewAnyArticleLineStats');
    },
  },
};
</script>

<style scoped></style>
