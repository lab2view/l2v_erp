<template>
  <BaseFormModal
    :submit-form="submitCustomerForm"
    :title="$t('customers.customer.formSaveTitle')"
  >
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseSelect
            v-model.number="customerForm.customer_type_id"
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
            placeholder="John Doe"
            required
            type="text"
          />
        </div>
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
import CustomerFormMixin from '/@/mixins/CustomerFormMixin';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';

export default {
  components: { BaseSelect, BaseInput, BaseFormModal },
  mixins: [CustomerFormMixin],
};
</script>

<style scoped></style>
