<template>
  <div class="card rounded shadow-sm">
    <slot>
      <div class="card-header text-center p-3 row justify-content-around">
        <h5>{{ $t('customers.customer.selection') }}</h5>
      </div>
    </slot>
    <form class="theme-form" @submit.prevent="submitSelectedForm">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <div class="default-according style-1 faq-accordion job-accordion">
            <div class="card mb-0">
              <div class="card-header">
                <h5 class="mb-0 p-0">{{ $t('common.filter') }}</h5>
              </div>
              <div class="card-body filter-cards-view animate-chk">
                <div class="job-filter mb-3">
                  <div class="faq-form">
                    <input
                      v-model="customerFilter.keyword"
                      class="form-control"
                      type="text"
                      :placeholder="$t('common.attributes.search')"
                    /><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-search search-icon"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                </div>
                <div class="job-filter">
                  <div class="mb-3">
                    <BaseSelect
                      v-model="customerFilter.customer_type_id"
                      :label="$t('common.fields.customer_type_filter')"
                      :options="selectableCustomerTypes"
                      key-label="label"
                      key-value="id"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card-body p-0">
            <div class="table-responsive">
              <div class="vertical-scroll scroll-demo">
                <table class="table">
                  <thead>
                    <tr>
                      <th>{{ $t('customers.customer.listTitle') }}</th>
                      <th :title="$t('common.select_all')" class="text-end">
                        <div
                          class="checkbox"
                          :class="
                            partialSelect
                              ? 'checkbox-solid-success'
                              : 'checkbox-primary'
                          "
                        >
                          <input
                            id="checkbox-primary-1"
                            v-model="selectAll"
                            type="checkbox"
                          />
                          <label
                            class="m-0 pt-0 pb-0 p-l-5"
                            for="checkbox-primary-1"
                            >{{ $t('common.select_all') }}</label
                          >
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="customer in selectableCustomers" :key="customer.id">
                      <CustomerSelectableColumn
                        :customer="customer"
                        :selected-list="selected"
                        @selected="selectCustomer(customer, true)"
                        @unselected="selectCustomer(customer, false)"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer pt-2 pb-2">
        <div class="row justify-content-center align-items-center">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.close')"
            @click.prevent="$router.back()"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :disabled="!isSelected"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store';
import CustomerSelectableColumn from '/@/components/customers/CustomerSelectableColumn.vue';

export default {
  components: { CustomerSelectableColumn, BaseButton, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('customer_type/getCustomerTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('customer/getCustomersList', {
        page: 1,
        field: {},
      }),
    ])
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  props: {
    usedCustomers: {
      type: Array,
      required: true,
    },
    submitStoreAction: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      customerFilter: {
        keyword: null,
        customer_type_id: null,
      },
      selected: [],
    };
  },
  computed: {
    ...mapGetters('customer', ['searchCustomerByCriteria']),
    ...mapGetters('customer_type', ['customerTypes']),
    selectableCustomerTypes() {
      return [{ label: this.$t('common.all'), id: '' }, ...this.customerTypes];
    },
    selectableCustomers() {
      return this.searchCustomerByCriteria(this.customerFilter).filter(
        (c) =>
          this.usedCustomers.find((ua) => ua.customer_id === c.id) === undefined
      );
    },
    isSelected() {
      return this.selected.length > 0;
    },
    partialSelect() {
      return (
        this.isSelected && this.selected.length < this.selectableCustomers.length
      );
    },
    selectedAllCustomers() {
      if (this.selectableCustomers.length)
        return this.selected.length === this.selectableCustomers.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllCustomers;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.selectableCustomers.forEach((sa) => result.push({ id: sa.id }));
          this.selected = result;
        }
      },
    },
  },
  watch: {
    selectableCustomers() {
      this.selected = [];
    },
  },
  methods: {
    submitSelectedForm() {
      if (this.selected.length > 0) {
        this.loading = true;
        this.submitStoreAction(this.selected)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => console.log(err));
      }
    },
    selectCustomer(customer, adding) {
      if (adding) this.selected.push({ id: customer.id });
      else this.selected = this.selected.filter((s) => s.id !== customer.id);
    },
  },
};
</script>

<style scoped></style>
