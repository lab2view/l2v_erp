<template>

  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('stocks.shipping.provisionForm')}` }}
          </h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">{{ $t('common.attributes.article_id') }}</th>
            <th v-if="manage_price" scope="col" style="width: 210px">
              {{ $t('common.attributes.buying_price') }}
              <span class="text-danger m-l-5">*</span>
            </th>
            <th class="text-center " scope="col" style="width: 140px">
              {{ $t('common.attributes.provider_id') }}
              <span class="text-danger m-l-5">*</span>
            </th>
            <th class="text-center" scope="col" style="width: 220px">
              {{ $t('common.attributes.quantity_requested') }}
              <span class="text-danger m-l-5">*</span>
            </th>
            <th class="text-center" scope="col" style="width: 220px">
              {{ $t('common.attributes.quantity_received') }}
              <span class="text-danger m-l-5">*</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <ProvisionLineFormField
            v-for="(provisionLine, index) in stockProvisions"
            :key="`stc-ext-lne-form-${index}`"
            :provision-line="provisionLine"
            :provision-form="provisionForm"
            :update-field-method="updateProvisionEntryLineField"
            :index="index"
            :errors="errors"
          />
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer border-top-0">
      <div class="row justify-content-center">
        <BaseButton
          type="button"
          class="btn btn-secondary col-auto m-r-5"
          :text="$t('common.cancel')"
          @click.prevent="$router.push({ name: 'shippings' })"
        />
        <BaseButton
          class="btn btn-primary col-auto"
          type="button"
          :text="$t('common.save')"
          icon="fa fa-save"
          :loading="loading"
          @click.prevent="submitExitLinesForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BaseButton from '/@/components/common/BaseButton.vue';
  import ProvisionLineFormField from '/@/components/stocks/ProvisionLineFormField.vue';

  export default {
    components: {ProvisionLineFormField, BaseButton,},
    data() {
      return {
        provisionForm: {
          id: null,
          article_id: null,
          shipping_id: null,
          quantity: null,
          provider_price: null,
          buying_price: null,
          stock_entry_id: null,
          stock_entry_line_id: null,
        },
        errors: [],
        loading: false,
      };
    },

    computed: {
      ...mapGetters('stock_entry', ['stockEntry', 'manage_price']),
      ...mapGetters('shipping', ['shipping']),
      stockProvisions() {
        if (this.stockEntry){
          return this.stockEntry.stock_entry_lines.map((sel) => {
            return {
              id: null,
              article_id: sel.article_id,
              shipping_id: this.shipping.id,
              quantity: null,
              requested_quantity: sel.quantity,
              provider_price: sel.provider_price,
              buying_price: sel.buying_price,
              stock_entry_id: this.stockEntry.id,
              stock_entry_line_id: sel.id,
            }
          })}
        else
          return  this.shipping.stock_provisions.map((sp)=>{
            return {...sp,requested_quantity:sp?.stock_entry_line?.quantity}
          });
      }
    },
    watch: {
      provisionForm: {
        deep: true,
        handler() {
          this.is_edited = true;
          console.log(this.provisionForm.quantity)
        },
      },
    },
    created() {
      if (this.stock_provision) {
        this.provisionForm = {...this.stock_provision};
        this.is_edited = false;
      }
    },
    methods: {
      updateProvisionEntryLineField(provisionLine, index) {
        this.stockEntry.stock_entry_lines.splice(index, 1, provisionLine);
      },
      submitExitLinesForm() {
        this.setLoading(true);
        if (this.stock_provision && this.stock_provision.id) {
          this.$store
            .dispatch('stock_provision/updateStockProvision', this.provisionForm).then((e) => {
            this.$router.push({
              name: 'shippings',
            })
          })
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        } else {
          this.$store
            .dispatch('stock_provision/addStockProvision',
              this.provisionForm
            ).then(() => {
            this.$router.push({
              name: 'shippings',
            })
          })
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        }
      },
    },
  };
</script>

<style scoped></style>
