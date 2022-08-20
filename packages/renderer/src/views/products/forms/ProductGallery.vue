<template>
  <div class="card-body">
    <div class="row align-items-center">
      <div class="col-md-4">
        <div class="card-body p-0 avatar-showcase">
          <div class="avatars">
            <div class="avatar">
              <img
                class="img-bi rounded-circle"
                :src="article.cover_thumb_url"
                width="200"
                height="200"
                alt="Couverture"
                title="Image de couverture"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-md p-0 m-0">
        <BaseDropzone
          :loading="loadingUpload"
          @uploading="uploadProductImage"
        />
      </div>
    </div>
    <BaseGallery
      v-if="article.media.length"
      :medias="images"
      @cover="setMediaAsArticleCover"
      @delete="deleteArticleMedia"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseDropzone from '/@/components/common/BaseDropzone.vue';
import BaseGallery from '/@/components/common/BaseGallery.vue';

export default {
  components: { BaseGallery, BaseDropzone },
  data() {
    return {
      loadingUpload: false,
    };
  },
  computed: {
    ...mapGetters('product', ['product']),
    ...mapGetters('article', ['articles']),
    ...mapGetters('property', ['properties']),

    article() {
      const article = this.product.articles[1];
      return (
        this.articles.find((a) => a.product_id === this.product.id) ?? article
      );
    },

    images() {
      return (
        this.article?.media.filter((m) => m.collection_name === 'images') ?? []
      );
    },
  },
  methods: {
    uploadProductImage(formData) {
      this.loadingUpload = true;
      this.$store
        .dispatch('article/addImages', {
          article_id: this.article.id,
          formData,
        })
        .finally(() => (this.loadingUpload = false));
    },
    setMediaAsArticleCover(media_id) {
      this.$store.dispatch('article/setArticleMediaAsCover', {
        article_id: this.article.id,
        media_id,
      });
    },
    deleteArticleMedia(media_id) {
      this.$store.dispatch('article/deleteImages', {
        article_id: this.article.id,
        mediaIds: [media_id],
      });
    },
  },
};
</script>

<style scoped></style>
