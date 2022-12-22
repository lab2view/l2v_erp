<template>
  <BaseModal
    :title="$t('iam.role.addAction', { role: role.label })"
    modal-size="xl"
  >
    <div class="card-body p-1"></div>
    <template #footer>
      <BaseButton
        type="button"
        class="btn btn-secondary m-r-5"
        :text="$t('common.close')"
        @click.prevent="$router.back()"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoleConfigForm',
  components: { BaseButton, BaseModal },
  computed: {
    ...mapGetters('role', ['role']),
  },
};
</script>

<style scoped></style>
