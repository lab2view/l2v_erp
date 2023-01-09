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
        entity="CustomerGroup"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="customerGroups.length"
        >
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
              <BaseActionBtnGroup
                entity="CustomerGroup"
                @show="
                  $router.push({
                    name: 'customerGroup.details',
                    params: { id: customerGroup.id },
                  })
                "
                @update="
                  $router.push({
                    name: 'customers.group.form',
                    params: { id: customerGroup.id },
                  })
                "
                @delete="deleteCustomerGroup(customerGroup)"
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
import FilterMixin from '/@/mixins/FilterMixin';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
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
