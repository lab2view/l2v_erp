<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <router-view />

    <div v-if="customerGroup" class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>
              {{
                `${$t('customers.customerGroupLine.listTitle')} - ${
                  customerGroup.label
                }`
              }}
            </h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{
                name: 'customers.groups.line.form',
              }"
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
        <div class="user-status table-responsive">
          <table class="table table-bordernone">
            <thead>
              <tr>
                <th :title="$t('common.select_all')">
                  <div class="checkbox checkbox-solid-success">
                    <input v-if="partialSelect" type="checkbox" />
                    <input v-else v-model="selectAll" type="checkbox" />
                  </div>
                </th>
                <th scope="col">{{ $t('common.attributes.name') }}</th>
                <th scope="col">{{ $t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <CustomerGroupLine
                v-for="customerGroupLine in customerGroupLines"
                :key="customerGroupLine.id"
                :customer-group-line="customerGroupLine"
                :select-all="selectAll"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import CustomerGroupLine from '/@/components/customers/CustomerGroupLine.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer, BaseDatatable, CustomerGroupLine },
  data() {
    return {
      selectAll: false,
      selected: [],
    };
  },
  computed: {
    ...mapGetters('customerGroup', ['customerGroup']),
    customerGroupLines() {
      return this.customerGroup.customer_group_lines ?? [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.customerGroupLines.length
      );
    },
  },
  watch: {
    selectAll(value) {
      if (value) {
        this.selected = this.customerGroupLines.map((cgl) => {
          cgl.id;
        });
      } else this.selected = [];
    },
  },
  methods: {
    deleteCustomerGroupLine(customerGroupLine) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: customerGroupLine.label })
        )
      )
        this.$store.dispatch(
          'customerGroup/deleteCustomerGroupLine',
          customerGroupLine
        );
    },
  },
};
</script>

<style scoped></style>
