<template>
  <BaseFormModal :submit-form="submitTransactionTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="transactionTypeForm.label"
        class="form-control"
        placeholder="Entree d'argent"
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
      transactionTypeForm: {
        id: null,
        label: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('transaction_type', ['transactionType']),
    title() {
      return this.transactionType && this.transactionType.id
        ? this.$t('payments.transactionType.formUpdateTitle')
        : this.$t('payments.transactionType.formCreateTitle');
    },
  },
  created() {
    if (this.transactionType && this.transactionType.id)
      this.transactionTypeForm = this.transactionType;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.transactionType && this.transactionType.id)
      this.$store.commit('transaction_type/SET_CURRENT_TRANSACTION_TYPE', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitTransactionTypeForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.transactionType && this.transactionType.id) {
        this.$store
          .dispatch('transaction_type/updateTransactionType', this.transactionTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('transaction_type/addTransactionType', this.transactionTypeForm)
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
