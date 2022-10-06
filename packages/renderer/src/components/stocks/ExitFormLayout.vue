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
import exitFormRoutes from '/@/router/stocks/exitFormRoutes.js';
import { mapGetters } from 'vuex';

export default {
  name: 'ExitFormLayout',
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('stock_exit', ['haveStockExit', 'haveMultipleStockExit']),
    items() {
      let results = Object.assign([], exitFormRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireMultipleStockExit
            ? !this.haveMultipleStockExit
            : pfr.meta.requireStockExit
            ? !this.haveStockExit
            : false,
          class: `${this.haveStockExit ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('stock_exit/SET_CURRENT_STOCK_EXIT', null);
  },
};
</script>
