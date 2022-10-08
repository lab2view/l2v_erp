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
import inventoryFormRoutes from '/@/router/stocks/inventoryFormRoutes';
import { mapGetters } from 'vuex';

export default {
  name: 'InventoryFormLayout',
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('inventory', ['haveInventory']),
    items() {
      let results = Object.assign([], inventoryFormRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireInventory ? !this.haveInventory : false,
          class: `${this.haveInventory ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('inventory/SET_CURRENT_INVENTORY', null);
  },
};
</script>
