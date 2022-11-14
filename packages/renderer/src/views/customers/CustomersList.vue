<template>
  <BaseContainer
    :module="$t('menu.modules.customers')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <BaseTableHeader
        :refresh-action-field="{ page: 1, field: { next: true } }"
        :title="$t('customers.customer.listTitle')"
        add-action-router-name="customer.form"
        refresh-action-name="customer/getCustomersList"
      />
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mt-2 mb-2">
            <BaseFieldGroup
              :with-append="false"
              :with-refresh="true"
              refresh-action-name="customer/getCustomersList"
            >
              <BaseSelect
                v-model.number="customerFilter.customer_type_id"
                :options="customerTypes"
                :placeholder="`${$t('common.attributes.customerType')} ?`"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-4 mt-2 mb-2">
            <BaseFieldGroup
              :with-append="false"
              :with-refresh="true"
              refresh-action-name="customer/getCustomersList"
            >
              <BaseSelect
                v-model.number="customerFilter.country_id"
                :options="countries"
                :placeholder="`${$t('common.attributes.country')} ?`"
                key-label="name"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
          <div class="col-md-4 mt-2 mb-2">
            <BaseFieldGroup
              :with-append="false"
              :with-refresh="true"
              refresh-action-name="customer/getCustomersList"
            >
              <BaseSelect
                v-model.number="customerFilter.localization_id"
                :options="getCitiesByLocalizations"
                :placeholder="`${$t('common.attributes.city')} ?`"
                key-label="label"
                key-value="id"
              />
            </BaseFieldGroup>
          </div>
        </div>
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="customers.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.customerType') }}</th>
            <th>{{ $t('common.attributes.country') }}</th>
            <th>{{ $t('common.attributes.city') }}</th>
            <th>{{ $t('common.attributes.localization') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.customer_type.label }}</td>
            <td>{{ customer.country.name }}</td>
            <td>{{ customer.localization?.city ?? '-' }}</td>
            <td>{{ customer.localization?.address ?? '-' }}</td>
            <td>{{ `${customer?.first_name} ${customer?.name}` }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.email ?? '-' }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'customer.form',
                    params: { id: customer.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deleteCustomer(customer)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
          </tr>
        </BaseDatatable>
        <br />
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../components/common/BaseContainer.vue';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';

export default {
  components: {
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
    BaseSelect,
    BaseFieldGroup,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('customer/getCustomersList', {
        page: 1,
        field: {},
      }),
      store.dispatch('localization/getLocalizationsList', {
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
      customerFilter: {
        customer_type_id: null,
        localization_id: null,
        country_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('customer', ['getCustomerByFilter', 'customer']),
    ...mapGetters('customer_type', ['customerTypes']),
    ...mapGetters('country', ['countries']),
    ...mapGetters('localization', ['getCitiesByLocalizations']),
    customers() {
      return this.getCustomerByFilter(this.customerFilter);
    },
  },
  created() {
    if (this.customer)
      this.$store.commit('customer/SET_CURRENT_CUSTOMER', null);
  },

  methods: {
    deleteCustomer(customer) {
      if (confirm(this.$t('messages.confirmDelete', { label: customer.name })))
        this.$store.dispatch('customer/deleteCustomer', customer.id);
    },
  },
};
</script>

<style scoped></style>
