<template>
  <BaseFormModal :submit-form="submitCashRegisterForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="cashRegisterForm.label"
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
      cashRegisterForm: {
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('cash_register', ['cashRegister']),
    title() {
      return this.cashRegister && this.cashRegister.id
        ? this.$t('sales.cashRegister.formUpdateTitle')
        : this.$t('sales.cashRegister.formCreateTitle');
    },
  },
  created() {
    if (this.cashRegister && this.cashRegister.id)
      this.cashRegisterForm = this.cashRegister;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.cashRegister && this.cashRegister.id)
      this.$store.commit(
        'cash_register/SET_CURRENT_CASH_REGISTER',
        null
      );
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCashRegisterForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.cashRegister && this.cashRegister.id) {
        this.$store.dispatch(
          'cash_register/updateCashRegister',
          this.cashRegisterForm,
        )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch(
            'cash_register/addCashRegister',
            this.cashRegisterForm,
          )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
