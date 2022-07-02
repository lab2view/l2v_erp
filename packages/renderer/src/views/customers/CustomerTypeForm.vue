<template>
  <BaseFormModal :submit-form="submitCustomerTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="customerTypeForm.label"
        class="form-control"
        placeholder="Particular, Agency..."
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
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="customerTypeForm.description"
        class="form-control"
        placeholder="Petite description.."
        type="text"
      ></textarea>
      <div
        v-if="errors.description && errors.description.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.description[0] }}
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
      errors: [],
      formLoading: false,
      customerTypeForm: {
        id: null,
        label: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('customer_type', ['customerType']),
    title() {
      return this.customerType && this.customerType.id
        ? this.$t('customers.customerType.formUpdateTitle')
        : this.$t('customers.customerType.formCreateTitle');
    },
  },
  created() {
    if (this.customerType && this.customerType.id)
      this.customerTypeForm = this.customerType;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.customerType && this.customerType.id)
      this.$store.commit('customer_type/SET_CURRENT_CUSTOMER_TYPE', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCustomerTypeForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.customerType && this.customerType.id) {
        this.$store
          .dispatch('customer_type/updateCustomerType', this.customerTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('customer_type/addCustomerType', this.customerTypeForm)
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
