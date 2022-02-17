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
import formRoutes from '../../router/product/formRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('product', ['haveProduct']),
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireProduct ? !this.haveProduct : false,
          class: `${this.haveProduct ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('product/SET_CURRENT_PRODUCT', null);
  },
};
</script>

<style scoped></style>
