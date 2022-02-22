<template>
  <div class="card rounded shadow-sm">
    <div class="card-header p-3 bg-light">
      <h5>{{ $t('customers.customer.formCreateTitle') }}</h5>
    </div>
    <form class="theme-form" @submit.prevent="submitCustomerGroupLineForm">
      <div class="card-body pb-0 pt-2">
        <div class="mb-3">
          <BaseSelect
            v-model="customer_id"
            :options="unselectedCustomers"
            key-label="name"
            key-value="id"
            required
          />
        </div>
      </div>
      <div class="card-footer pt-2 pb-2">
        <div class="row justify-content-center align-items-center">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.back()"
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
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store';

export default {
  components: { BaseFieldGroup, BaseButton, BaseInput, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('customer/getCustomersList', {
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
      errors: [],
      formLoading: false,
      customer_id: null,
    };
  },
  computed: {
    ...mapGetters('customer', ['customers']),
    ...mapGetters('customer_group', ['customerGroup']),
    unselectedCustomers() {
      const customers =
        this.customerGroup?.customer_group_lines?.map(
          (cgl) => cgl.customer_id
        ) ?? [];
      return this.customers.filter(
        (customer) => !customers.includes(customer.id)
      );
    },
  },
  methods: {
    submitCustomerGroupLineForm() {
      if (this.formLoading) {
        return;
      }

      this.formLoading = true;
      this.$store
        .dispatch('customer_group/addCustomerToCustomerGroup', {
          id: this.customerGroup.id,
          customer: { id: this.customer_id },
        })
        .then(() => this.$router.back())
        .catch((error) => {
          this.errors = error.response?.data?.errors;
        })
        .finally(() => (this.formLoading = false));
    },
  },
};
</script>

<style scoped></style>
