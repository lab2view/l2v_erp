<template>
  <router-view v-if="!inventoryIsConfirm" />
  <div v-if="$route.name === 'inventory.form.article'" class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('stocks.inventoryLine.list')} - ${inventoryReference}` }}
          </h5>
        </div>
        <div v-if="!inventoryIsConfirm" class="col-sm-auto align-items-end">
          <BaseButton
            type="button"
            class="btn btn-sm btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedInventoryLine"
          />
          <router-link
            :to="{
              name: 'inventory.form.article.form',
              params: $route.params,
              query: $route.query,
            }"
            class="btn btn-sm btn-primary m-r-5"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add_article') }}
          </router-link>
          <router-link
            :to="{
              name: 'inventory.form.article.csv',
              params: $route.params,
              query: $route.query,
            }"
            class="btn btn-sm btn-sm btn-info"
            type="button"
          >
            <i class="fa fa-upload m-r-5" />
            {{ $t('common.upload_csv') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th :title="$t('common.select_all')">
                <div
                  :class="`${
                    partialSelect
                      ? 'checkbox-solid-success'
                      : 'checkbox-primary'
                  }
                      ${!inventoryIsConfirm ? 'checkbox' : ''}
                  `"
                >
                  <input
                    v-if="!inventoryIsConfirm"
                    id="checkbox-stock-line-1"
                    v-model="selectAll"
                    type="checkbox"
                  />
                  <label
                    class="m-0 pt-0 pb-0 p-l-5"
                    for="checkbox-stock-line-1"
                    :style="{ 'padding-left: 60px': !inventoryIsConfirm }"
                  >
                    {{ `${$t('articles.listTitle')} ${countSelected}` }}</label
                  >
                </div>
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.inventory_qty') }}
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.headers.stock_in') }}
              </th>
              <th v-if="!inventoryIsConfirm" scope="col">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ArticleLineSelectable
              v-for="(inventoryLine, index) in inventoryLines"
              :key="`inventory-lne-${index}`"
              :model="inventoryLine"
              :selected-list="selected"
              update-dispatch-name="inventory/updateInventoryLine"
              remove-dispatch-name="inventory/removeInventoryLines"
              :cancel-selection="inventoryIsConfirm"
              :for-inventory="true"
              :min-quantity="0"
              @deleted="selected = []"
              @selected="selectInventoryLine(inventoryLine, true)"
              @unselected="selectInventoryLine(inventoryLine, false)"
            >
              <td class="text-center">{{ inventoryLine.old_value }}</td>
            </ArticleLineSelectable>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="!inventory.stock_balancing" class="card-footer border-top-0">
      <div class="row justify-content-center">
        <BaseButton
          v-if="inventoryIsConfirm"
          class="btn btn-success col-auto"
          type="button"
          :text="$t('common.confirm_inventory')"
          icon="fa fa-check-circle"
          :loading="loading"
          @click.prevent="updateStockFromInventory"
        />
        <BaseButton
          v-else-if="inventory.inventory_lines.length"
          class="btn btn-success col-auto"
          type="button"
          :text="$t('common.validate_inventory')"
          icon="fa fa-check-circle"
          :loading="loading"
          @click.prevent="validateInventory"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';

export default {
  name: 'InventoryLineList',
  components: { ArticleLineSelectable, BaseButton },
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('inventory', [
      'inventoryLines',
      'inventoryReference',
      'inventoryIsConfirm',
      'inventory',
    ]),
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.inventoryLines.length
      );
    },
    selectedAllInventoryLine() {
      if (this.inventoryLines.length)
        return this.selected.length === this.inventoryLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllInventoryLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.inventoryLines.forEach((ag) => result.push(ag.id));
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
    selectInventoryLine(inventoryLine, adding) {
      if (adding) this.selected.push(inventoryLine.id);
      else
        this.selected = this.selected.filter((id) => id !== inventoryLine.id);
    },
    deleteSelectedInventoryLine() {
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
          .dispatch('inventory/removeInventoryLines', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
    validateInventory() {
      if (
        confirm(
          this.$t('messages.validateInventory', {
            reference: this.inventory.reference,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('inventory/updateInventory', {
            ...this.inventory,
            validate: true,
          })
          .finally(() => (this.loading = false));
      }
    },
    updateStockFromInventory() {
      if (
        confirm(
          this.$t('messages.confirmInventory', {
            reference: this.inventory.reference,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch(
            'inventory/processToInventoryStockBalancing',
            this.inventory
          )
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style scoped></style>
