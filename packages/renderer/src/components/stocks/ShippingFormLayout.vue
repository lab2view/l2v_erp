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
import { mapGetters } from 'vuex';
import shippingFormRoutes from '../../router/stocks/shippingFormRoutes.js';

export default {
  name: 'ShippingFormLayout',
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('shipping', ['haveShipping']),
    items() {
      let results = Object.assign([], shippingFormRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireShipping ? !this.haveShipping : false,
          class: `${this.haveShipping ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('shipping/SET_CURRENT_SHIPPING', null);
  },
};
</script>
