<template>
  <BaseContainer
    :module="$t('menu.modules.customers')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <form @submit.prevent="submitCustomerForm">
        <div class="card-header pb-2 border-bottom border-bottom-">
          <div class="row align-items-center">
            <div class="col-sm">
              <h5>{{ formTitle }}</h5>
            </div>
            <div class="col-sm-auto align-items-end">
              <router-link
                :to="{ name: 'customers' }"
                class="btn btn-primary"
                type="button"
              >
                <i class="fa fa-users m-r-5" />
                {{ $t('customers.customer.listTitle') }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="row align-items-center">
              <div class="col-md">
                <BaseFieldGroup
                  :label="$t('common.attributes.customerType')"
                  required
                  :errors="errors?.customer_type_id"
                  @btn-click="
                    $router.push({ name: 'config.customers.type.form' })
                  "
                >
                  <BaseSelect
                    v-model="customerForm.customer_type_id"
                    :options="customerTypes"
                    key-label="label"
                    key-value="id"
                    required
                  />
                </BaseFieldGroup>
              </div>
              <div class="col-md">
                <BaseSelect
                  v-model="customerForm.country_id"
                  :errors="errors?.country_id"
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
                <BaseInput
                  v-model="customerForm.name"
                  :errors="errors?.name"
                  :label="$t('common.attributes.last_name')"
                  placeholder="John"
                  required
                  type="text"
                />
              </div>
              <div class="col-md">
                <BaseInput
                  v-model="customerForm.first_name"
                  :errors="errors?.first_name"
                  :label="$t('common.attributes.first_name')"
                  placeholder="Doe"
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
                  :errors="errors?.phone"
                  :label="$t('common.attributes.phone')"
                  placeholder="699"
                  required
                  type="text"
                />
              </div>
              <div class="col-md">
                <BaseInput
                  v-model="customerForm.email"
                  :errors="errors?.email"
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
                <BaseFieldGroup
                  :label="$t('common.attributes.localization')"
                  :errors="errors?.localization_id"
                  @btn-click="$router.push({ name: 'localization.form' })"
                >
                  <BaseSelect
                    v-model="customerForm.localization_id"
                    :options="localizations"
                    key-label="address"
                    key-value="id"
                  />
                </BaseFieldGroup>
              </div>
              <div class="col-md">
                <BaseInput
                  v-model="customerForm.reference"
                  :errors="errors?.reference"
                  :label="$t('common.attributes.reference')"
                  placeholder="Ref"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
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
        </div>
      </form>
    </div>
  </BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'CustomerForm',
  components: {
    BaseContainer,
    BaseFieldGroup,
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
      store.dispatch('customer_type/getCustomerTypesList', {
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
        localization_id: null,
        country_id: null,
        first_name: null,
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
    ...mapGetters('customer_type', ['customerTypes']),
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
    this.setLoading();
    if (this.customer) {
      this.$store.commit('customer/SET_CURRENT_CUSTOMER', null);
    }
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCustomerForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.customer) {
        this.$store
          .dispatch('customer/updateCustomer', this.customerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('customer/addCustomer', this.customerForm)
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
