<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('customers.customerGroup.listTitle')"
        add-action-router-name="customers.group.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="customer_group/getCustomerGroupsList"
      />
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="customerGroups.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="customerGroup in customerGroups" :key="customerGroup.id">
            <td>{{ customerGroup.id }}</td>
            <td>{{ customerGroup.label }}</td>
            <td>{{ truncate(customerGroup.description, 100) }}</td>
            <td>
              <button
                :title="$t('customers.show_customers')"
                class="btn btn-default btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'customerGroup.details',
                    params: { id: customerGroup.id },
                  })
                "
              >
                {{ $t('customers.show_customers') }}
              </button>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs m-l-5"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'customers.group.form',
                    params: { id: customerGroup.id },
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
                @click.prevent="deleteCustomerGroup(customerGroup)"
              >
                <i class="fa fa-trash-o" />
              </button>
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
import FilterMixin from '/@/mixins/FilterMixin.js';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  mixins: [FilterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('customer_group/getCustomerGroupsList', {
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
    ...mapGetters('customer_group', ['customerGroups', 'customerGroup']),
  },
  created() {
    if (this.customerGroup)
      this.$store.commit('customer_group/SET_CURRENT_CUSTOMER_GROUP', null);
  },

  methods: {
    deleteCustomerGroup(customerGroup) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: customerGroup.label })
        )
      )
        this.$store.dispatch(
          'customer_group/deleteCustomerGroup',
          customerGroup.id
        );
    },
  },
};
</script>

<style scoped></style>
