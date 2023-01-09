<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('customers.customerType.listTitle')"
        add-action-router-name="config.customers.type.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="customer_type/getCustomerTypesList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="customerTypes.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="customerType in customerTypes" :key="customerType.id">
            <td>{{ customerType.id }}</td>
            <td>{{ customerType.label }}</td>
            <td>{{ truncate(customerType.description) }}</td>
            <td>
              <BaseActionBtnGroup
                entity="CustomerType"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'config.customers.type.form',
                    params: { id: customerType.id },
                  })
                "
                @delete="deleteCustomerType(customerType)"
              />
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('customer_type/getCustomerTypesList', {
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
  computed: {
    ...mapGetters('customer_type', ['customerTypes', 'customerType']),
  },
  created() {
    if (this.customerType)
      this.$store.commit('customer_type/SET_CURRENT_CUSTOMER_TYPE', null);
  },

  methods: {
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
    deleteCustomerType(customerType) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: customerType.label })
        )
      )
        this.$store.dispatch(
          'customer_type/deleteCustomerType',
          customerType.id
        );
    },
  },
};
</script>

<style scoped></style>
