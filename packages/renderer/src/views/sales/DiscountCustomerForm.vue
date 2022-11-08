<template>
  <CustomerSelectableList
    :used-customers="discount.discount_customers"
    :submit-store-action="submitAddCustomersToDiscountForm"
  >
    <div class="card-header pb-2">
      <h5>{{ $t('sales.discount.add_customers') }}</h5>
    </div>
  </CustomerSelectableList>
</template>

<script>
import CustomerSelectableList from '/@/components/customers/CustomerSelectableList.vue';

export default {
  name: 'DiscountCustomerForm',
  components: {
    CustomerSelectableList,
  },
  props: {
    discount: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitAddCustomersToDiscountForm(selected) {
      return this.$store.dispatch('discount/addCustomers', {
        customers: selected,
        discount: this.discount,
      });
    },
  },
};
</script>

<style scoped></style>
