<template>
  <BaseContainer
    :module="$t('menu.modules.products')"
    :title="$t('product.title')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import formRoutes from '../../router/stocks/formRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('stock_entry', ['haveStockEntry']),
    items() {
      let results = Object.assign([], formRoutes);
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
