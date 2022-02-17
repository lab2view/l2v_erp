<template>
  <BaseContainer
    :module="$t('menu.modules.customers')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import { formRoutes } from '/@/router/customers/formRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('customer', ['haveCustomer']),
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireCustomer ? !this.haveCustomer : false,
          class: `${this.haveCustomer ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name.toString())
              ? 'active'
              : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('customer/SET_CURRENT_ENTERPRISE', null);
  },
};
</script>

<style scoped></style>
