<template>
  <BaseModal :title="formTitle" modal-size="lg">
    <BaseContainer :module="$t('menu.modules.iam')" :title="$t('iam.title')">
      <div class="card scroller">
        <BaseWizardStep :links="items" />
      </div>
    </BaseContainer>
  </BaseModal>
</template>

<script>
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseWizardStep from '../common/BaseWizardStep.vue';
import { userformRoutes } from '/@/router/enterprise/userformRoutes';
import BaseModal from '/@/components/common/BaseModal.vue';

import { mapGetters } from 'vuex';

export default {
  components: { BaseWizardStep, BaseContainer, BaseModal },
  computed: {
    ...mapGetters('user', ['user']),

    ...mapGetters('user', ['haveUser']),
    formTitle() {
      return this.user && this.user.id
        ? this.$t('iam.user.formUpdateTitle')
        : this.$t('iam.user.formCreateTitle');
    },
    items() {
      let results = Object.assign([], userformRoutes);
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

<style scoped>
.scroller {
  height: 500px;
  overflow-y: scroll;
}
</style>
