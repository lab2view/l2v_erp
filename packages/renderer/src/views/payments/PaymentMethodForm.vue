<template>
  <BaseFormModal :submit-form="submitPaymentMethodForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="paymentMethodForm.country_id"
        :errors="errors.country_id"
        :label="$t('common.attributes.country')"
        :options="activeCountries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="paymentMethodForm.label"
        class="form-control"
        placeholder="OM"
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
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseFormModal, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store.dispatch('country/getCountriesList', {
      page: 1,
      field: {},
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      console.log(error);
      next();
    });
  },
  data() {
    return {
      formLoading: false,
      errors: [],
      paymentMethodForm: {
        id: null,
        label: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('country', ['activeCountries']),
    ...mapGetters('paymentMethod', ['paymentMethod']),
    title() {
      return this.paymentMethod && this.paymentMethod.id
        ? this.$t('payments.paymentMethod.formUpdateTitle')
        : this.$t('payments.paymentMethod.formCreateTitle');
    },
  },
  created() {
    if (this.paymentMethod && this.paymentMethod.id)
      this.paymentMethodForm = this.paymentMethod;
  },
  beforeUnmount() {
    this.formLoading = false;
    if (this.paymentMethod && this.paymentMethod.id)
      this.$store.commit('paymentMethod/SET_CURRENT_PAYMENT_METHOD', null);
  },
  methods: {
    submitPaymentMethodForm() {
      if (this.formLoading) {
        return;
      }

      this.formLoading = true;
      if (this.paymentMethod && this.paymentMethod.id)
        this.$store
          .dispatch('paymentMethod/updatePaymentMethod', this.paymentMethodForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => (this.formLoading = false));
      else
        this.$store
          .dispatch('paymentMethod/addPaymentMethod', this.paymentMethodForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => (this.formLoading = false));
    },
  },
};
</script>

<style scoped></style>
