<template>
  <BaseFormModal :submit-form="submitCustomerForm" :title="formTitle">
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseSelect
            v-model="customerForm.customer_type_id"
            :errors="errors.customer_type_id"
            :label="$t('common.attributes.customerType')"
            :options="customerTypes"
            key-label="label"
            key-value="id"
            required
          />
        </div>
        <div class="col-md">
          <BaseSelect
            v-model="customerForm.country_id"
            :errors="errors.country_id"
            :label="$t('common.attributes.country')"
            :options="countries"
            key-label="name"
            key-value="id"
            required
          />
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseSelect
            v-model="customerForm.localization_id"
            :errors="errors.localization_id"
            :label="$t('common.attributes.localization')"
            :options="localizations"
            key-label="address"
            key-value="id"
            required
          />
        </div>
        <div class="col-md">
          <BaseInput
            v-model="customerForm.reference"
            :errors="errors.reference"
            :label="$t('common.attributes.reference')"
            placeholder="Ref"
            required
            type="text"
          />
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseInput
            v-model="customerForm.phone"
            :errors="errors.phone"
            :label="$t('common.attributes.phone')"
            placeholder="699"
            required
            type="text"
          />
        </div>
        <div class="col-md">
          <BaseInput
            v-model="customerForm.email"
            :errors="errors.email"
            :label="$t('common.attributes.email')"
            placeholder="customer@gmail.com"
            type="email"
          />
        </div>
      </div>
    </div>
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseInput
            v-model="customerForm.name"
            :errors="errors.name"
            :label="$t('common.attributes.name')"
            placeholder="Jean Parpaing"
            required
            type="text"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="row justify-content-end">
        <BaseButton
          :text="$t('common.cancel')"
          class="btn btn-secondary col-auto m-r-5"
          type="button"
          @click.prevent="$router.push({ name: 'customers' })"
        />
        <BaseButton
          :text="$t('common.save')"
          class="btn btn-primary col-auto"
          icon="fa fa-save"
        />
      </div>
    </template>
  </BaseFormModal>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: {
    BaseFormModal,
    BaseButton,
    BaseSelect,
    BaseInput,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('localization/getLocalizationsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('customerType/getCustomerTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      }),
    ])
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
      errors: [],
      formLoading: false,
      customerForm: {
        id: null,
        customer_type_id: null,
        customer_type: null,
        localization_id: null,
        localization: null,
        country_id: null,
        country: null,
        name: null,
        phone: null,
        email: null,
        reference: null,
      },
    };
  },
  computed: {
    ...mapGetters('localization', ['localizations']),
    ...mapGetters('customer', ['customer']),
    ...mapGetters('customerType', ['customerTypes']),
    ...mapGetters('country', { countries: 'activeCountries' }),
    formTitle() {
      return this.customer
        ? this.$t('customers.customer.formUpdateTitle')
        : this.$t('customers.customer.formCreateTitle');
    },
  },
  created() {
    if (this.customer) {
      this.customerForm = Object.assign({}, this.customer);
    }
  },
  beforeUnmount() {
    if (this.customer) {
      this.$store.commit('customer/SET_CURRENT_CUSTOMER', null);
    }
  },
  methods: {
    submitCustomerForm() {
      if (this.formLoading) {
        return;
      }

      this.formLoading = true;
      if (this.customer) {
        this.$store
          .dispatch('customer/updateCustomer', this.customerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => (this.formLoading = false));
      } else
        this.$store
          .dispatch('customer/addCustomer', this.customerForm)
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
