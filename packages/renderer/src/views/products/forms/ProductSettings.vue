<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <h5>IMAGE GALLERY</h5>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4"></div>
      <div class="col-md-8">
        <BaseDropzone
          v-if="imagePropertyId"
          :context="productContext"
          @uploaded="uploadProductImage"
        />
      </div>
    </div>
    <BaseGallery :items="images" />
  </div>
</template>

<script>
import BaseGallery from '../../../components/common/BaseGallery.vue';
import BaseDropzone from '../../../components/common/BaseDropzone.vue';
import { mapGetters } from 'vuex';
import { productPropertyImageCode } from '../../../helpers/codes';
import store from '../../../store';

export default {
  components: { BaseDropzone, BaseGallery },
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
        .dispatch('product/saveProperties', { properties })
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
