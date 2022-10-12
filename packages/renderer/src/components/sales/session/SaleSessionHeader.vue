<template>
  <div class="card-header mb-0 pb-0">
    <div class="row align-items-center">
      <div class="col-auto p-r-1 m-r-0">
        <BaseButton
          type="button"
          class="btn btn-iconsolid"
          @click.prevent="refreshArticleList"
        >
          <i class="fa fa-refresh f-w-300" />
        </BaseButton>
      </div>
      <div class="col p-l-0 m-l-0">
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
          <BaseFieldGroup :btn-icon="`fa fa-refresh fa-spin`">
            <BaseSelect
              v-model.number="salePriceTypeField"
              label-class="col-form-label font-primary pt-0"
              class="form-select digits font-primary"
              :options="salePriceTypes"
              key-label="label"
              key-value="id"
            />
          </BaseFieldGroup>
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
import { priceTypeCode, saleTypeCode } from '/@/helpers/codes.js';
import { getStockExitLineArticleStock } from '/@/helpers/utils.js';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseSelect, BaseFieldGroup, VSelect },
  mixins: [BarcodeScanMixin],
  data() {
    return {
      scannerBarcode: null,
    };
  },
  computed: {
    ...mapGetters('article', ['sell_articles']),
    ...mapGetters('price_type', ['salePriceTypes']),
    ...mapGetters('sale_type', ['saleTypes']),
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
    saleDefaultTypeId() {
      const saleType = this.saleTypes.find(
        (st) => st.code === saleTypeCode.detail
      );
      return saleType !== undefined ? saleType.id : null;
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
        const haveStock = getStockExitLineArticleStock(article) > 0;
        return {
          label: `${article.name}`,
          article_id: article.id,
          price_id: price !== undefined ? price.id : null,
          discount_id: null,
          quantity: haveStock ? 1 : 0,
          sup_price: price !== undefined ? (haveStock ? price.value : 0) : null,
          price: price !== undefined ? price.value : null,
          vat: null,
          barcode: article.product.code,
          image: article.cover_thumb_url ?? article.product.image_url,
          stock: article.stock,
          prices: article.prices,
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
    //   value: this.saleDefaultTypeId,
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
    refreshArticleList() {
      if (confirm("Voulez-vous rafraichir la liste d'articles ?")) {
        this.$store.dispatch('setGlobalLoading', true);
        this.$store
          .dispatch('article/getArticlesList', {
            page: 1,
            field: { next: true },
          })
          .then(() => this.$store.dispatch('setGlobalLoading', false));
      }
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
