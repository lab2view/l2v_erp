<template>
  <div class="card-header mb-0 pb-0">
    <div class="row align-items-center">
      <div class="col">
        <BaseFieldGroup>
          <VSelect
            v-model="searchArticleField"
            class="form-control"
            style="background-color: rgba(36, 105, 92, 0.1); color: #24695c"
            :options="articles"
            placeholder="Rechercher un produit ou scanner"
          />
          <template #append>
            <a
              href="#"
              title="Scan"
              class="input-group-text font-primary f-24"
              style="background-color: rgba(36, 105, 92, 0.1)"
              @click.prevent="resetBarcode"
            >
              <span class="fa fa-barcode"> </span>
            </a>
          </template>
        </BaseFieldGroup>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <BaseSelect
            v-model.number="salePriceTypeField"
            label="Type de prix ?"
            label-class="col-form-label font-primary pt-0"
            class="form-select digits font-primary"
            :options="salePriceTypes"
            key-label="label"
            key-value="id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { mapGetters } from 'vuex';
import BarcodeScanMixin from '/@/mixins/BarcodeScanMixin.js';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { priceTypeCode } from '/@/helpers/codes.js';

export default {
  components: { BaseSelect, BaseFieldGroup, VSelect },
  mixins: [BarcodeScanMixin],
  data() {
    return {
      scannerBarcode: null,
    };
  },
  computed: {
    ...mapGetters('article', ['sell_articles']),
    ...mapGetters('price_type', ['salePriceTypes']),
    searchArticleField: {
      get() {
        return null;
      },
      set(article) {
        this.$store.commit(
          'cashier_session/ADD_ARTICLE_TO_CURRENT_SALE_REQUEST',
          article
        );
      },
    },
    saleDefaultPriceTypeId() {
      const priceType = this.salePriceTypes.find(
        (st) => st.code === priceTypeCode.sell
      );
      return priceType !== undefined ? priceType.id : null;
    },
    salePriceTypeField: {
      get() {
        return this.$store.state.cashier_session.price_type_id;
      },
      set(value) {
        this.$store.commit('cashier_session/SET_PRICE_TYPE_ID', value);
      },
    },

    articles() {
      return this.sell_articles.map((article) => {
        const price = article.prices.find(
          (p) => p.price_type_id === this.salePriceTypeField
        );
        return {
          label: `${article.name}`,
          article_id: article.id,
          price_id: this.salePriceTypeField,
          discount_id: null,
          quantity: 1,
          sup_price: price !== undefined ? price.value : null,
          price: price !== undefined ? price.value : null,
          vat: null,
          barcode: article.product.code,
          image: article.product.image_url,
          stock: article.stock,
        };
      });
    },
  },

  created() {
    this.$store.commit(
      'cashier_session/SET_PRICE_TYPE_ID',
      this.saleDefaultPriceTypeId
    );
    // this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
    //   field: 'sale_type_id',
    //   value: this.saleDefaultPriceTypeId,
    // });
  },

  methods: {
    onBarcodeScanned(barcode) {
      const article = this.articles.find(
        (a) => a.barcode.toString() === barcode.toString()
      );
      if (article !== undefined) {
        this.$store.commit(
          'cashier_session/ADD_ARTICLE_TO_CURRENT_SALE_REQUEST',
          article
        );
      }
    },
    resetBarcode() {
      this.onBarcodeScanned(this.$barcodeScanner.getPreviousCode());
    },
  },
};
</script>

<style scoped>
>>> {
  /* Font */
  --vs-font-size: 1rem;
  --vs-line-height: 1.4;

  /* Borders */
  --vs-border-width: 0px;
  --vs-border-radius: 0px;

  /* Component Controls: Clear, Open Indicator */
  --vs-controls-size: 0;

  /* Active State */
  --vs-dropdown-option--active-bg: #24695c;
  --vs-dropdown-option--active-color: #fff;
}
</style>
