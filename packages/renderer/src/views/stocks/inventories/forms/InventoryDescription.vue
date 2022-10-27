<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitInventoryForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >{{ $t('common.fields.required_field_start') }}
          <span class="text-danger">*</span>
          {{ $t('common.fields.required_field_end') }}
        </span>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInputGroup
                v-model="inventoryForm.reference"
                :label="$t('common.attributes.reference')"
                placeholder="E.g. STOCK-INVAP00001..."
                :errors="errors?.reference"
                required
                :disabled="isUpdating"
              >
                <button
                  :disabled="isUpdating"
                  type="button"
                  class="btn btn-success btn-iconsolid"
                  :title="$t('common.shuffle')"
                  @click.prevent="generateReference"
                >
                  <i class="fa fa-random"></i>
                </button>
              </BaseInputGroup>
            </div>
            <div class="col-md">
              <BaseDatetime
                v-model="inventoryForm.inventory_date"
                :label="$t('common.attributes.inventory_date')"
                label-class="form-label fw-bold"
                placeholder="..."
                required
                :disabled="isUpdating"
                :max-date="new Date()"
                type="date"
              />
              <div
                v-if="errors?.inventory_date && errors?.inventory_date.length"
                class="invalid-feedback"
                style="display: inline"
              >
                {{ errors?.inventory_date[0] }}
              </div>
            </div>
            <div v-if="isRoleAdmin" class="col-md">
              <BaseSelect
                v-model.number="inventoryForm.enterprise_id"
                :label="$t('common.attributes.structure')"
                :options="enterprises"
                key-label="name"
                key-value="id"
                :errors="errors?.enterprise_id"
                :disabled="isUpdating"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.push({ name: 'inventories' })"
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import { random } from 'lodash/number';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';

export default {
  name: 'InventoryDescription',
  components: {
    BaseDatetime,
    BaseInputGroup,
    BaseSelect,
    BaseButton,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('stock_type/getStockTypesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterprisesList', {
        page: 1,
        field: {},
      }),
    ])
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
      errors: [],
      loading: false,
      is_edited: false,
      inventoryForm: {
        id: null,
        enterprise_id: null,
        reference: null,
        inventory_date: null,
      },
    };
  },
  computed: {
    ...mapGetters('inventory', ['inventory']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('auth', ['isRoleAdmin']),
    formTitle() {
      return this.inventory
        ? this.$t('stocks.form.inventory.updateTitle')
        : this.$t('stocks.form.inventory.createTitle');
    },
    isUpdating() {
      return !!this.inventory;
    },
  },
  watch: {
    inventoryForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.inventory) {
      this.inventoryForm = { ...this.inventory };
      this.is_edited = false;
    }
  },
  methods: {
    submitInventoryForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.isUpdating) {
        if (this.is_edited)
          this.$store
            .dispatch('inventory/updateInventory', this.inventoryForm)
            .then((inventory) =>
              this.$router.push({
                name: 'inventory.form.article',
                params: { id: inventory.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
              this.loading = false;
            });
        else
          this.$router.push({
            name: 'inventory.form.article',
            params: { id: this.inventory.id },
          });
      } else
        this.$store
          .dispatch('inventory/addInventory', this.inventoryForm)
          .then((inventory) =>
            this.$router.push({
              name: 'inventory.form.article',
              params: { id: inventory.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
            this.loading = false;
          });
    },
    generateReference() {
      //todo complete generating ref algorithm
      this.inventoryForm.reference = `STE-INV${new Date().getDay()}-${random(
        1000,
        1000000
      )}`;
    },
  },
};
</script>

<style scoped></style>
