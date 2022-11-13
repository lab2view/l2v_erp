<template>
  <router-view :discount="discount" />
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('sales.discount.customers')} - ${discount.label}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'sales.discount.form.customers'"
          class="col-sm-auto align-items-end"
        >
          <BaseButton
            type="button"
            class="btn btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedDiscountCustomers"
          />
          <router-link
            :to="{
              name: 'sales.discount.form.customers.form',
              params: $route.params,
            }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive mb-3">
        <table class="table">
          <thead>
            <tr>
              <th :title="$t('common.select_all')">
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
                    style="padding-left: 60px"
                  >
                    {{
                      `${$t('customers.customer.listTitle')} ${countSelected}`
                    }}</label
                  >
                </div>
              </th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <CustomerLineSelectable
              v-for="(discountCustomer, index) in discountCustomers"
              :key="`disc-cust-${index}`"
              :model="discountCustomer"
              :selected-list="selected"
              remove-dispatch-name="discount/removeDiscountCustomers"
              @deleted="selected = []"
              @selected="selectDiscountCustomer(discountCustomer, true)"
              @unselected="selectDiscountCustomer(discountCustomer, false)"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div class="row justify-content-end">
        <BaseButton
          :text="$t('common.prev')"
          class="btn btn-secondary col-auto m-r-5"
          type="button"
          @click.prevent="
            $router.push({
              name: 'sales.discount.form.articles',
              params: $route.params,
            })
          "
        />
        <BaseButton
          :text="$t('common.next')"
          class="btn btn-primary col-auto"
          icon="fa fa-save"
          type="button"
          @click.prevent="
            $router.push({
              name: 'sales.discount.form.codes',
              params: $route.params,
            })
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import CustomerLineSelectable from '/@/components/customers/CustomerLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';
import store from '/@/store/index.js';

export default {
  name: 'DiscountCustomersList',
  components: { CustomerLineSelectable, BaseButton },
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
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
    haveDiscount() {
      return !!this.discount;
    },
    discountCustomers() {
      return this.haveDiscount ? this.discount.discount_customers : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.discountCustomers.length
      );
    },
    selectedAllDiscountCustomers() {
      if (this.discountCustomers.length)
        return this.selected.length === this.discountCustomers.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllDiscountCustomers;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.discountCustomers.forEach((ag) => result.push(ag.id));
          this.selected = result;
        }
      },
    },
    isSelected() {
      return this.selected.length > 0;
    },
    countSelected() {
      return this.isSelected ? `( ${this.selected.length} )` : '';
    },
  },
  methods: {
    selectDiscountCustomer(discountCustomer, adding) {
      if (adding) this.selected.push(discountCustomer.id);
      else {
        this.selected = this.selected.filter(
          (id) => id !== discountCustomer.id
        );
      }
    },
    deleteSelectedDiscountCustomers() {
      if (
        this.selected.length &&
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.$t('common.deleted_selection'),
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('discount/removeDiscountCustomers', this.selected)
          .finally(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>

<style scoped></style>
