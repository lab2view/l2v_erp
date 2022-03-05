<template>
  <BaseDropzone
    v-if="imagePropertyId"
    :context="productContext"
    @uploaded="uploadProductImage"
  />
  <BaseGallery :items="images" />
</template>

<script>
import { productPropertyImageCode } from '/@/helpers/codes.js';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import BaseDropzone from '/@/components/common/BaseDropzone.vue';
import BaseGallery from '/@/components/common/BaseGallery.vue';

export default {
  components: { BaseGallery, BaseDropzone },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('propertyConfig/getPropertiesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('product', ['product', 'product_properties']),
    ...mapGetters('propertyConfig', ['properties']),
    productContext() {
      return `products/${this.product?.id}`;
    },
    imagePropertyId() {
      const p = this.properties.find(
        (p) => p.code === productPropertyImageCode
      );
      if (p !== undefined) return p.id;
      return null;
    },
    images() {
      let images = this.product_properties.filter(
        (pp) => pp.property.code === productPropertyImageCode
      );
      return images.map((i) => {
        return { url: i.value_url };
      });
    },
  },
  methods: {
    uploadProductImage(names) {
      const properties = names.map((n) => {
        return { value: n, property_id: this.imagePropertyId };
      });
      this.$store
        .dispatch('product/addProperties', { properties })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          console.log(error?.response?.data);
        });
    },
  },
};
</script>

<style scoped></style>
