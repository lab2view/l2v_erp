<template>
  <BaseContainer
    :module="$t('menu.modules.iam')"
    :title="$t('iam.title')"
  >
    <div class="card">
      <BaseWizardStep :links="items" />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import { formRoutes } from '/@/router/iam/formRoutes';
import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer },
  computed: {
    ...mapGetters('user', ['haveUser']),
    items() {
      let results = Object.assign([], formRoutes);
      return results.map((pfr) => {
        return {
          name: pfr.name,
          code: pfr.meta.code,
          icon: pfr.meta.icon,
          title: pfr.meta.title ?? null,
          disabled: pfr.meta.requireUser ? !this.haveUser : false,
          class: `${this.haveUser ? 'activated' : ''} ${
            RegExp(`^${pfr.name}*`).test(this.$route.name.toString())
              ? 'active'
              : ''
          }`,
        };
      });
    },
  },
  beforeUnmount() {
    this.$store.commit('user/SET_CURRENT_USER', null);
  },
};
</script>

<style scoped></style>
