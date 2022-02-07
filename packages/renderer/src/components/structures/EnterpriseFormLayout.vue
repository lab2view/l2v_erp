<template>
  <BaseContainer
    :module="$t('menu.modules.structures')"
    :title="$t('structures.title')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import { formRoutes } from '/@/router/structures/formRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('enterprise', ['haveEnterprise']),
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireEnterprise ? !this.haveEnterprise : false,
          class: `${this.haveEnterprise ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name.toString()) ? 'active' : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('enterprise/SET_CURRENT_ENTERPRISE', null);
  },
};
</script>

<style scoped></style>
