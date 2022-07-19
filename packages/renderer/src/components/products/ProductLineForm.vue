<template>
  <div class="card">
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
              v-for="(stockEntryLine, index) in stockEntryLineFields"
              :key="`stc-ent-lne-form-${index}`"
              v-model="stockEntryLine.quantity"
              :stock-entry-line="stockEntryLine"
              :index="index"
              :errors="errors"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store/index.js';
import ProductEntryLineFormField from '/@/components/products/ProductEntryLineFormField.vue';

export default {
  components: { ProductEntryLineFormField },
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
    stockEntryLineFields: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      show_select_form: true,
      errors: [],
      loading: false,
    };
  },

  computed: {
    ...mapGetters('stock_entry', ['stockEntry', 'stockEntryIsCommand']),
    ...mapGetters('article', ['article']),
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
