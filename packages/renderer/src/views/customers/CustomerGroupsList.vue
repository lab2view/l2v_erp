<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('customers.customerGroup.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'customers.group.form' }"
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
            <td>{{ truncate(customerGroup.description) }}</td>
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

export default {
  components: { BaseContainer, BaseDatatable },
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
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
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
