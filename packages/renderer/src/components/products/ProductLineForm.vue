<template>
  <div class="card ">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table w-100">
          <thead>
          <tr>
            <th scope="col">{{ $t('common.attributes.article_id') }}</th>
            <th class="text-center" scope="col" style="width: 120px">
              {{ $t('common.attributes.quantity') }}
              <span class="text-danger m-l-5">*</span>
            </th>
          </tr>
          </thead>
          <tbody>
          <ProductEntryLineFormField
            v-for="(stockEntryLine, index) in product.articles"
            :errors="errors"
            :article="stockEntryLine"
            :index="index"
          />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
  import {mapGetters} from 'vuex';
  import BaseButton from '/@/components/common/BaseButton.vue';
  import store from '/@/store/index.js';
  import ProductEntryLineFormField from "/@/components/products/ProductEntryLineFormField.vue";

  export default {
    components: {ProductEntryLineFormField, BaseButton, ArticleSelectableList},
    beforeRouteEnter(routeTo, routeFrom, next) {
      store
        .dispatch('provider/getStockProvidersList', {
          page: 1,
          field: {},
        })
        .catch((error) => console.log(error))
        .finally(() => next());
    },
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        stock_entry_line_fields: [],
        show_select_form: true,
        errors: [],
        loading: false,
      };
    },
    computed: {
      ...mapGetters('stock_entry', ['stockEntry', 'stockEntryIsCommand']),
      ...mapGetters('article', ['article']),

    },
    created() {
      if (this.stockEntry) {
        this.stock_entry_line_fields = {
          article_id: this.article_id,
          provider_price: null,
          buying_price: null,
          provider_id: null,
          quantity: 1,
          stock_entry_id: this.stockEntry.id,
        }
      }
    },
    methods: {
      submitEntryLinesForm() {
        if (this.stock_entry_line_fields) {
          this.loading = true;
          return this.$store
            .dispatch('stock_entry/addStockEntryLines', {
              stock_entry_lines: this.stock_entry_line_fields,
            })
            .then(() => this.$router.back())
            .catch((error) => (this.errors = error.response?.data?.errors))
            .finally(() => (this.loading = false));
        }
      },
    },
  };
</script>

<style scoped></style>
