<template>
  <form @submit.prevent="submitProvisionsForm">
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
                <th scope="col">
                  {{ $t('common.attributes.provider_id') }}
                  <span class="text-danger m-l-5">*</span>
                </th>
                <th scope="col" style="width: 240px">
                  {{ $t('common.attributes.article_id') }}
                </th>
                <th class="text-center" scope="col">
                  {{ $t('common.attributes.quantity_requested') }}
                  <span class="text-danger m-l-5">*</span>
                </th>
                <th class="text-center" scope="col" style="width: 100px">
                  {{ $t('common.attributes.quantity_received') }}
                  <span class="text-danger m-l-5">*</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <ProvisionLineFormField
                v-for="(provisionLine, index) in provisionsForm"
                :key="`stc-ext-lne-form-${index}`"
                :provision-line="provisionLine"
                :update-field-method="updateProvisionLineField"
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
            type="submit"
            :text="$t('common.save')"
            icon="fa fa-save"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import ProvisionLineFormField from '/@/components/stocks/ProvisionLineFormField.vue';

export default {
  name: 'ProvisionLinesForm',
  components: { ProvisionLineFormField, BaseButton },
  data() {
    return {
      provisionsForm: [],
      errors: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters('shipping', ['shipping']),
    isValidForm() {
      return (
        this.provisionsForm.find((p) => {
          return p.quantity > 0;
        }) !== undefined
      );
    },
  },

  mounted() {
    if (this.shipping?.stock_provisions?.length) {
      this.provisionsForm =
        this.shipping.stock_provisions?.map((sp) => {
          return { ...sp, requested_quantity: sp?.stock_entry_line?.quantity };
        }) ?? [];
    } else
      this.provisionsForm = this.shipping.stock_entry.stock_entry_lines
        .map((sel) => {
          return {
            ...sel,
            id: null,
            article: sel.article,
            shipping_id: this.shipping.id,
            quantity: null,
            requested_quantity: sel.quantity,
            remain_qty: sel.remain_qty,
            provider_name: sel.provider?.name,
            stock_entry_line_id: sel.id,
          };
        })
        .filter((p) => p.remain_qty > 0);
  },
  methods: {
    updateProvisionLineField(provisionLine, index) {
      this.provisionsForm.splice(index, 1, provisionLine);
    },

    submitProvisionsForm() {
      if (this.shipping.stock_provisions?.length) {
        this.$router.push({
          name: 'shippings',
        });
      } else {
        if (this.provisionsForm) {
          this.loading = true;
          this.$store.commit(
            'stock_entry/SET_CURRENT_STOCK_ENTRY',
            this.shipping.stock_entry
          );
          this.$store
            .dispatch('stock_entry/addProvisions', {
              stock_entry_id: this.shipping.stock_entry_id,
              stock_provisions: this.provisionsForm.filter(
                (p) => p.quantity > 0
              ),
            })
            .then(() => {
              this.$router.push({
                name: 'shippings',
              });
              this.$store.commit('stock_entry/SET_CURRENT_STOCK_ENTRY', null);
            })
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => (this.loading = false));
        }
      }
    },
  },
};
</script>

<style scoped></style>
