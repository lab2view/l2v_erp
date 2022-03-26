<template>
  <BaseContainer
    :title="$t('stocks.title')"
    :module="$t('menu.modules.stocks')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseWizardStep from '/@/components/common/BaseWizardStep.vue';
import entryFormRoutes from '/@/router/stocks/entryFormRoutes.js';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('stock_entry', ['haveStockEntry']),
    items() {
      let results = Object.assign([], entryFormRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireStockEntry ? !this.haveStockEntry : false,
          class: `${this.haveStockEntry ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('stock_entry/SET_CURRENT_STOCK_ENTRY', null);
  },
};
</script>
