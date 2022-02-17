<template>
  <BaseContainer
    :module="$t('menu.modules.customers')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('customers.customer.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'customer.form.desc' }"
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
        <BaseDatatable :tfoot="false" :total="customers.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.customerType') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.email') }}</th>
            <th>{{ $t('common.attributes.phone') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.customer_type.label }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'customer.form.desc',
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

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../components/common/BaseContainer.vue';

export default {
  components: { BaseContainer, BaseDatatable },
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
  computed: {
    ...mapGetters('customer', ['customers', 'customer']),
  },
  created() {
    if (this.customer)
      this.$store.commit('customer/SET_CURRENT_customer', null);
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
