import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      articleFilter: {
        product_family_id: null,
        product_type_id: null,
        product_unit_id: null,
        sell_price_not_set: false,
      },
    };
  },
  computed: {
    ...mapGetters('article', ['getArticlesByFilter']),
    ...mapGetters('product_family', ['productFamilies']),
    ...mapGetters('product_type', ['productTypes']),
    ...mapGetters('product_unit', ['productUnits']),
    articles() {
      return this.getArticlesByFilter(this.articleFilter);
    },
    filterProductTypes() {
      return this.productTypes.filter((pt) =>
        this.articleFilter?.product_family_id
          ? pt.product_family_id === this.articleFilter?.product_family_id
          : true
      );
    },
  },
};
