<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitCustomerForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="customerForm.customer_type_id"
                :errors="errors.customer_type_id"
                :label="$t('customers.customer_type')"
                :options="customerTypes"
                key-label="label"
                key-value="id"
                required
              />
            </div>
            <div class="col-md">
              <BaseInput
                v-model="customerForm.name"
                :errors="errors.name"
                :label="$t('common.attributes.name')"
                placeholder="E.g. Ets Tangui"
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
                v-model="customerForm.email"
                :errors="errors.email"
                :label="$t('common.attributes.email')"
                placeholder="mag1@gmail.com"
                required
                type="email"
              />
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="customerForm.phone"
                :errors="errors.phone"
                :label="$t('common.attributes.phone')"
                placeholder="699.."
                required
                type="number"
              >
                <template v-if="callingCode" #prefix>
                  <div class="input-group-text">
                    {{ callingCode }}
                  </div>
                </template>
              </BaseInputGroup>
            </div>
          </div>
        </div>
        <BaseTextArea
          v-model="customerForm.description"
          :errors="errors.description"
          :label="$t('common.attributes.description')"
          placeholder="customer description..."
          rows="4"
        />
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
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import ean from '/@/helpers/ean';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';

export default {
  components: {
    BaseInputGroup,
    BaseTextArea,
    BaseButton,
    BaseSelect,
    BaseInput,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('customerType/getCustomerTypesList', {
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
      is_edited: true,
      customerForm: {
        user_id: null,
        customer_type_id: null,
        name: null,
        reference: null,
        email: null,
        phone: null,
        logo: null,
        slogan: null,
        description: null,
        po_box: null,
        currency: null,
        domain: null,
        database: null,
        website: null,
      },
    };
  },
  computed: {
    ...mapGetters('customer', ['customer']),
    ...mapGetters('customerType', ['customerTypes']),
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('country', ['countries']),
    formTitle() {
      return this.customer
        ? this.$t('customers.customer.formUpdateTitle')
        : this.$t('customers.customer.formCreateTitle');
    },
    userCountry() {
      return this.countries.find(
        (c) => c.id === this.currentUser.user.country_id
      );
    },
    callingCode() {
      return this.userCountry !== undefined
        ? `+${this.userCountry.calling_code}`
        : null;
    },
  },
  watch: {
    customerForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.customer) {
      this.customerForm = Object.assign({}, this.customer);
      this.customer_type_id = this.customer.customer_type_id;
      this.is_edited = false;
    }
  },
  methods: {
    submitCustomerForm() {
      if (this.customer) {
        if (this.is_edited)
          this.$store
            .dispatch('customer/updateCustomer', this.customerForm)
            .then((customer) =>
              this.$router.push({
                name: 'customer.form.setting',
                params: { id: customer.id },
              })
            )
            .catch((error) => {
              this.errors = error.response.data.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'customer.form.setting',
            params: { id: this.customer.id },
          });
      } else
        this.$store
          .dispatch('customer/addCustomer', this.customerForm)
          .then((customer) =>
            this.$router.push({
              name: 'customer.form.setting',
              params: { id: customer.id },
            })
          )
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
    },
    generateBarCode() {
      this.customerForm.code = ean.generateEan13();
    },
  },
};
</script>

<style scoped></style>
