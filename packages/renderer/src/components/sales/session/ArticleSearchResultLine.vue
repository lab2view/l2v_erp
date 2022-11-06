<template>
  <div class="info-block">
    <div class="row">
      <div class="col-md">
        <h6 class="f-12">{{ articleName }}</h6>
        <div class="star-ratings">
          <ul class="search-info">
            <li>{{ currentEnterprise?.name || 'Principale' }}</li>
            <li>
              {{ $t('common.headers.stock_in') }}
              <div class="span badge f-14" :class="`text-${stockClassState}`">
                {{ currentDistributionTotalStock }}
              </div>
            </li>
          </ul>
        </div>
        <div class="row">
          <div v-if="article.cover_thumb_url" class="col text-center">
            <img
              class="rounded img-optimize"
              :src="article.cover_thumb_url"
              :alt="article.article_id"
              :title="article.label"
            />
          </div>
        </div>
      </div>
      <div class="col-md">
        <p class="text-center f-w-700">{{ $t('common.headers.stock_in') }}</p>
        <ul class="list-group">
          <ArticleDistributionLine
            v-for="distribution in article.stats.distributions"
            :key="`distribution-${distribution.id}`"
            :distribution="distribution"
            :article="article"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import { getDistributionCurrentStock } from '/@/helpers/utils.js';
import ArticleDistributionLine from '/@/components/sales/session/ArticleDistributionLine.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ArticleSearchResultLine',
  components: { ArticleDistributionLine },
  mixins: [ArticleMixin],
  computed: {
    ...mapGetters('auth', ['currentEnterprise']),
    currentDistribution() {
      return this.article.stats.distributions.find(
        (d) => d.id === this.currentEnterprise.id
      );
    },
    currentDistributionTotalStock() {
      if (this.currentDistribution) {
        return getDistributionCurrentStock(this.currentDistribution);
      } else return 0;
    },
    articleName() {
      return `(${(this.currentDistributionTotalStock / 6).toFixed(2)}) ${
        this.article.product.code
      } / ${this.article.product.reference} - ${this.article.name}`;
    },
  },
};
</script>

<style scoped>
.img-optimize {
  max-width: 100%;
  height: auto;
  max-height: 200px;
}
</style>
