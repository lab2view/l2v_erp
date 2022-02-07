<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <h5>IMAGE GALLERY</h5>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4"></div>
      <div class="col-md-8">
        <BaseDropzone
          v-if="imageEnterpriseId"
          :context="enterpriseContext"
          @uploaded="uploadEntrepriseImage"
        />
      </div>
    </div>
    <BaseGallery :items="images" />
  </div>
</template>

<script>
import BaseGallery from '/@/components/common/BaseGallery.vue';
import BaseDropzone from '/@/components/common/BaseDropzone.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';
import { enterpriseImageCode } from '/@/helpers/codes';

export default {
  components: { BaseDropzone, BaseGallery },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('enterprise/getEnterprise', {
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
    ...mapGetters('enterprise', ['enterprise']),
    enterpriseContext() {
      return `enterprises/${this.enterprise?.id}`;
    },
    imageEnterpriseId() {
      const p = this.properties.find(
          (p) => p.code === enterpriseImageCode
      );
      if (p !== undefined) return p.id;
      return null;
    },
    images() {
      return [];
    },
  },
  methods: {
    uploadEntrepriseImage() {
      // const properties = names.map((n) => {
      //   return { value: n, property_id: this.imageEnterpriseId };
      // });
      // this.$store
      //   .dispatch('enterprise/saveProperties', { properties })
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     console.log(error?.response?.data);
      //   });
    },
  },
};
</script>

<style scoped></style>
