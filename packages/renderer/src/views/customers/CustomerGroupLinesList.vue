<template>
  <BaseContainer
    :module="$t('common.configurations')"
    :title="$t('customers.title')"
  >
    <router-view />

    <div class="card">
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
          <div
            v-if="$route.name === 'customerGroup.details'"
            class="col-sm-auto align-items-end"
          >
            <BaseButton
              type="button"
              class="btn btn-outline-danger m-r-5"
              :disabled="!isSelected"
              icon="fa fa-trash-o"
              :text="$t('common.delete_all')"
              :loading="loading"
              @click.prevent="deleteSelectedCustomerGroupLine"
            />
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
                  <div
                    class="checkbox"
                    :class="
                      partialSelect
                        ? 'checkbox-solid-success'
                        : 'checkbox-primary'
                    "
                  >
                    <input
                      id="checkbox-customer-group-line"
                      v-model="selectAll"
                      type="checkbox"
                    />
                    <label
                      class="m-0 pt-0 pb-0 p-l-5"
                      for="checkbox-customer-group-line"
                      style="padding-left: 60px"
                    >
                      {{
                        `${$t('customers.customer.listTitle')} ${countSelected}`
                      }}</label
                    >
                  </div>
                </th>
                <th scope="col">{{ $t('common.attributes.phone') }}</th>
                <th scope="col">{{ $t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <CustomerGroupLine
                v-for="(customerGroupLine, index) in customerGroupLines"
                :key="`customer-grp-lne-${index}`"
                :customer-group-line="customerGroupLine"
                :selected-list="selected"
                @deleted="selected = []"
                @selected="selectCustomerGroupLine(customerGroupLine, true)"
                @unselected="selectCustomerGroupLine(customerGroupLine, false)"
              />
            </tbody>
          </table>
        </div>
        <div
          v-if="$route.name === 'customerGroup.details'"
          class="row justify-content-center mt-3"
        >
          <div class="col-auto">
            <router-link
              :to="{ name: 'customers.groups' }"
              class="btn btn-secondary"
              href="#"
              type="button"
            >
              <i class="fa fa-arrow-left m-r-5" />
              {{ $t('common.return_to_list') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import CustomerGroupLine from '/@/components/customers/CustomerGroupLine.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseContainer, CustomerGroupLine },
  data() {
    return {
      selected: [],
      loading: false,
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
    selectedAllCustomerGroupLine() {
      if (this.customerGroupLines.length)
        return this.selected.length === this.customerGroupLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllCustomerGroupLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.customerGroupLines.forEach((cgl) => result.push(cgl.id));
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
    selectCustomerGroupLine(customerGroupLine, adding) {
      if (adding) this.selected.push(customerGroupLine.id);
      else
        this.selected = this.selected.filter(
          (id) => id !== customerGroupLine.id
        );
    },
    deleteSelectedCustomerGroupLine() {
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
          .dispatch('customerGroup/removeCustomerGroupLine', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>

<style scoped></style>
