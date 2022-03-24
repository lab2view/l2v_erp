<template>
  <BaseFormModal :submit-form="submitForm" :title="title">
    <div class="form-group mb-3">
<!--      <BaseSelect-->
<!--          v-model="cashierForm.cashier_group_id"-->
<!--          :errors="errors.cashier_group_id"-->
<!--          :label="$t('common.attributes.cashier_group')"-->
<!--          :options="cashierGroups"-->
<!--          key-label="label"-->
<!--          key-value="id"-->
<!--          required-->
<!--      />-->
    </div>
  </BaseFormModal>
  <router-view />
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
// import BaseSelect from '/@/components/common/BaseSelect.vue';
// import { mapGetters } from 'vuex';
// import store from '/@/store';

export default {
  components: { BaseFormModal },
  // components: { BaseSelect, BaseFormModal },
  // beforeRouteEnter(routeTo, routeFrom, next) {
    // store
    //   .dispatch('role/getPrivilegesList', {
    //   .dispatch('privilege/getPrivilegesList', {
    //     page: 1,
    //     field: {},
    //   })
    //   .then(() => {
    //     next();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     next();
    //   });
  // },
  computed: {
    // ...mapGetters('role', ['role']),
    title() {
      return this.role && this.role.id
          ? this.$t('iam.privilege.formUpdateTitle')
          : this.$t('iam.privilege.formCreateTitle');
    },
    methods: {
      submitForm() {
        return;
      }
    }
  },
};
</script>

<style scoped></style>
