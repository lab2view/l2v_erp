<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('customers.customerGroupLineLine.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.customers.groups.lines.form' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="customerGroupLines.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.customer') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr
            v-for="customerGroupLine in customerGroupLines"
            :key="customerGroupLine.id"
          >
            <td>{{ customerGroupLine.id }}</td>
            <td>{{ customerGroupLine.customer.name }}</td>
            <td>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deleteCustomerGroup(customerGroupLine)"
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

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('customerGroupLine/getCustomerGroupLinesList', {
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
    ...mapGetters('customerGroupLine', [
      'getCustomerGroupLinesByGroupId',
      'customerGroupLine',
    ]),
    customerGroupLines() {
      return this.getCustomerGroupLinesByGroupId(this.$route.params.id);
    },
  },
  created() {
    if (this.customerGroupLine)
      this.$store.commit(
        'customerGroupLine/SET_CURRENT_CUSTOMER_GROUP_LINE',
        null
      );
  },

  methods: {
    deleteCustomerGroup(customerGroupLine) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: customerGroupLine.label })
        )
      )
        this.$store.dispatch(
          'customerGroupLine/deleteCustomerGroupLine',
          customerGroupLine.id
        );
    },
  },
};
</script>

<style scoped></style>
