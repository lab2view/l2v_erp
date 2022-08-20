<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitShippingForm">
      <div class="card-header pb-0">
        <h5>{{ title }}</h5>
        <span
        >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <div class="form-group mb-3">
                <BaseSelect
                  v-model.number="entry_id"
                  :label="$t('common.attributes.stock_entry_type_id')"
                  :options="commands"
                  key-label="label"
                  key-value="id"
                  required
                  :disabled="isUpdating"
                />
              </div>
            </div>
            <div class="col-md">
              <div class="form-group mb-3">
                <BaseDatetime
                  id="start_at"
                  v-model="shippingForm.delivery_date"
                  :label="$t('common.attributes.delivery_date')"
                  placeholder="..."
                  type="date"
                />
              </div>
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="shippingForm.reference"
                :label="$t('common.attributes.reference')"
                placeholder="E.g. STOCK-AP00001..."
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
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.push({ name: 'shippings' })"
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
  import {mapGetters} from 'vuex';
  import BaseButton from '/@/components/common/BaseButton.vue';
  import BaseSelect from '/@/components/common/BaseSelect.vue';
  import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
  import store from '/@/store';
  import {stockTypeCode} from '/@/helpers/codes.js';
  import BaseDatetime from "../../../../components/common/BaseDatetime.vue";
  import {random} from "lodash/number";

  export default {
    components: {BaseDatetime, BaseSelect, BaseInputGroup, BaseButton},
    beforeRouteEnter(routeTo, routeFrom, next) {
      Promise.all([
        store.dispatch('stock_entry/getStockEntriesList', {
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
        entry_id:null,
        shippingForm: {
          id: null,
          enterprise_id: null,
          stock_entry_id: null,
          reference: null,
          delivery_date: null,
          user_id: null
        },
      };
    },
    computed: {
      ...mapGetters('shipping', ['shipping']),
      ...mapGetters('stock_entry', ['stock_entries']),
      ...mapGetters('auth', ['currentUser']),
      title() {
        return this.shipping && this.shipping.id
          ? this.$t('stocks.shipping.form.updateTitle')
          : this.$t('stocks.shipping.form.createTitle');
      },
      commands() {
        return this.stock_entries.filter(
          (st) => st.stock_type.code === stockTypeCode.command
        );
      },
      isUpdating() {
        return !!this.shipping;
      },
    },

    created() {
      if (this.shipping) {
        this.shippingForm = {...this.shipping};
      }
    },
    methods: {

      submitShippingForm() {
        if (this.isUpdating) {
          this.$router.push({
            name: 'shipping.form.article.form',
            params: {id: this.shipping.id},
          })
        }
        this.loading = true;
        this.errors = [];
          this.$store
            .dispatch('shipping/addShipping', {
              ...this.shippingForm,
              user_id: parseInt(this.currentUser.id)
            }).then((shipping) => {
            this.$router.push({
              name: 'shipping.form.article.form',
              params: {id: shipping.id},
              query:{stock_entry_id: this.entry_id}
            })
          })
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());

      },
      generateReference() {
        //todo complete generating ref algorithm
        this.shippingForm.reference = `STE-${new Date().getDay()}-${random(
          1000,
          1000000
        )}`;
      },
    },
  };
</script>

<style scoped></style>
