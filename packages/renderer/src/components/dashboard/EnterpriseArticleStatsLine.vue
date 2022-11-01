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
    <td v-else class="text-end">{{ $t('common.headers.not_available') }}</td>
  </tr>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import { getDistributionCurrentStock } from '/@/helpers/utils';

export default {
  name: 'EnterpriseArticleStatsLine',
  components: { BaseButton },
  props: {
    distribution: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['canShowMenuItem']),
    totalStock() {
      return getDistributionCurrentStock(this.distribution);
    },
    canShowEnterpriseArticleLineStats() {
      return (
        this.canShowMenuItem('Enterprise.viewAnyArticleLineStats') &&
        this.totalStock > 0
      );
    },
  },
};
</script>

<style scoped></style>
