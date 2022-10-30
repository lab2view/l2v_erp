<template>
  <BaseFormModal
    :submit-form="submitCustomerForm"
    :title="$t('customers.customer.formSaveTitle')"
  >
    <div class="mb-3">
      <div class="row align-items-center">
        <div class="col-md">
          <BaseFieldGroup
            :with-refresh="true"
            :with-append="false"
            :label="$t('common.attributes.customerType')"
            required
            refresh-action-name="customer_type/getCustomerTypesList"
          >
            <BaseSelect
              v-model.number="customerForm.customer_type_id"
              :options="customerTypes"
              key-label="label"
              key-value="id"
              required
            />
          </BaseFieldGroup>
        </div>
        <div class="col-md">
          <BaseFieldGroup
            :with-refresh="true"
            :with-append="false"
            :label="$t('common.attributes.country')"
            required
            refresh-action-name="country/getCountriesList"
          >
            <BaseSelect
              v-model="customerForm.country_id"
              :errors="errors.country_id"
              :options="countries"
              key-label="name"
              key-value="id"
              required
            />
          </BaseFieldGroup>
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
            placeholder="John"
            required
            type="text"
          />
        </div>
        <div class="col-md">
          <BaseInput
            v-model="customerForm.first_name"
            :errors="errors.first_name"
            :label="$t('common.attributes.first_name')"
            placeholder="Doe"
            required
            type="text"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <BaseButton
        :title="$t('common.save')"
        class="btn btn-primary"
        type="submit"
        :text="$t('common.save')"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import CustomerFormMixin from '/@/mixins/CustomerFormMixin';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import store from '/@/store/index.js';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'CustomerQuickForm',
  components: {
    BaseButton,
    BaseFieldGroup,
    BaseSelect,
    BaseInput,
    BaseFormModal,
  },
  mixins: [CustomerFormMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
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
};
</script>

<style scoped></style>
