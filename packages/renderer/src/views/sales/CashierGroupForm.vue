<template>
  <BaseFormModal :submit-form="submitCashierGroupForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="cashierGroupForm.label"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />
      <div
        v-if="errors.label && errors.label.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      formLoading: false,
      errors: [],
      cashierGroupForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('cashier_group', ['cashierGroup']),
    title() {
      return this.cashierGroup && this.cashierGroup.id
        ? this.$t('sales.cashierGroup.formUpdateTitle')
        : this.$t('sales.cashierGroup.formCreateTitle');
    },
  },
  created() {
    if (this.cashierGroup && this.cashierGroup.id)
      this.cashierGroupForm = this.cashierGroup;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.cashierGroup && this.cashierGroup.id)
      this.$store.commit('cashier_group/SET_CURRENT_CASHIER_GROUP', null);
  },
  methods: {
    setLoading(value = false) {
      if (!value && this.errors.length) {
        this.cashierGroup = {
          id: null,
          label: null,
          code: null,
        };
      }
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCashierGroupForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.cashierGroup && this.cashierGroup.id) {
        this.$store
          .dispatch('cashier_group/updateCashierGroup', this.cashierGroupForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('cashier_group/addCashierGroup', this.cashierGroupForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
