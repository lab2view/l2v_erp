<template>
  <BaseContainer
    :title="$t('product.title')"
    :module="$t('menu.module.products')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import { productFormRoutes } from '../../router/productFormRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('product', ['haveProduct']),
    items() {
      let results = Object.assign([], productFormRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireProduct ? !this.haveProduct : false,
          class: `${this.haveProduct ? 'activated' : ''} ${
            this.$route.name === pfr.name ? 'active' : ''
          }`,
        };
      });
    },
  },
};
</script>

<style scoped></style>
