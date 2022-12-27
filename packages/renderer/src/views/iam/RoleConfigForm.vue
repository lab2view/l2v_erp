<template>
  <BaseModal
    :title="$t('iam.role.addAction', { role: role.label })"
    modal-size="xl"
  >
      <ActionSelectableList class="p-0" :with-header="false" :submit-store-action="() => {}" :used-actions="[]" />
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
import ActionSelectableList from "/@/components/iam/ActionSelectableList.vue";

export default {
  name: 'RoleConfigForm',
  components: {ActionSelectableList, BaseButton, BaseModal },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('role', ['actions', 'role']),
  },
};
</script>

<style scoped></style>
