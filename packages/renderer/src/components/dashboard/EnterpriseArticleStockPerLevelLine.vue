<template>
  <tr>
    <td>{{ distribution.name }}</td>
    <td class="text-center">{{ articleStat.critical }}</td>
    <td class="text-center">{{ articleStat.alert }}</td>
    <td v-if="canShowEnterpriseArticleLineStats" class="text-end">
      <BaseButton
        type="button"
        icon="fa fa-eye"
        :text="$t('common.show')"
        class="btn btn-sm btn-outline-primary m-r-5"
        @click.prevent="
          $router.push({
            name: 'dashboard.enterprise.article.levels',
            params: { enterprise_id: distribution.id },
          })
        "
      />
    </td>
    <td v-else class="text-end">{{ $t('common.headers.not_available') }}</td>
  </tr>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EnterpriseArticleStockPerLevelLine',
  components: { BaseButton },
  props: {
    distribution: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['canShowMenuItem']),
    ...mapGetters('article', ['getStatsCountByArticleStockLevel']),

    articleStat() {
      return this.getStatsCountByArticleStockLevel(this.distribution.id);
    },

    canShowEnterpriseArticleLineStats() {
      return this.canShowMenuItem('Enterprise.viewAnyArticleLineStats');
    },
  },
};
</script>

<style scoped></style>
