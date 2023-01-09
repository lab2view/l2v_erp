<template>
  <BaseContainer
    :module="$t('menu.modules.enterprise')"
    :title="$t('enterprise.title')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseWizardStep from '/@/components/common/BaseWizardStep.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import { mapGetters } from 'vuex';
import formRoutes from '/@/router/sales/formRoutes';

export default {
  name: 'DiscountFormLayout',
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('discount', ['haveDiscount']),
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireDiscount ? !this.haveDiscount : false,
          class: `${this.haveDiscount ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name.toString())
              ? 'active'
              : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('discount/SET_CURRENT_DISCOUNT', null);
  },
};
</script>

<style scoped></style>
