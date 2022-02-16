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
              :to="{ name: 'groups.customer.form' }"
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
        <BaseNewDatatable :tfoot="false" :total="customerGroups.length">
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
                :title="$t('customers.add_group_line')"
                class="btn btn-primary btn-xs"
                data-original-title="btn btn-primary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'groups.customer.line',
                    params: { id: customerGroup.id },
                  })
                "
              >
                {{ $t('customers.add_group_line') }}
              </button>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'groups.customer.form',
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
        </BaseNewDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseNewDatatable from '/@/components/common/BaseNewDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer, BaseNewDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('customerGroup/getCustomerGroupsList', {
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
    ...mapGetters('customerGroup', ['customerGroups', 'customerGroup']),
  },
  created() {
    if (this.customerGroup)
      this.$store.commit('customerGroup/SET_CURRENT_CUSTOMER_GROUP', null);
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
          'customerGroup/deleteCustomerGroup',
          customerGroup.id
        );
    },
  },
};
</script>

<style scoped></style>
