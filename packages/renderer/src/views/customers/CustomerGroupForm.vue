<template>
  <BaseFormModal :submit-form="submitCustomerGroupForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="customerGroupForm.label"
        class="form-control"
        placeholder="Regular, Common..."
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
        v-model="customerGroupForm.description"
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
      customerGroupForm: {
        id: null,
        label: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('customerGroup', ['customerGroup']),
    title() {
      return this.customerGroup && this.customerGroup.id
        ? this.$t('customers.customerGroup.formUpdateTitle')
        : this.$t('customers.customerGroup.formCreateTitle');
    },
  },
  created() {
    if (this.customerGroup && this.customerGroup.id)
      this.customerGroupForm = this.customerGroup;
  },
  beforeUnmount() {
    if (this.customerGroup && this.customerGroup.id)
      this.$store.commit('customerGroup/SET_CURRENT_CUSTOMER_GROUP', null);
  },
  methods: {
    submitCustomerGroupForm() {
      if (this.customerGroup && this.customerGroup.id)
        this.$store
          .dispatch('customerGroup/updateCustomerGroup', this.customerGroupForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('customerGroup/addCustomerGroup', this.customerGroupForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
