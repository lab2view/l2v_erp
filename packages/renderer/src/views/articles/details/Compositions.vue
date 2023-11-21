<template>
  <div class="card mb-0 border-top-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>
            {{ $t('articles.detail.composition.title') }}
          </h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <BaseButton
            v-if="canMakeComposition"
            class="btn btn-primary"
            type="button"
            icon="fa fa-plus-circle"
            :text="$t('common.makeComposition')"
            :loading="loading"
            @click.prevent="makeComposition"
          />
          <router-link
            :to="{
              name: 'article.compositions.config',
              params: { ...$route.params },
            }"
            class="btn btn-secondary m-l-5"
            type="button"
          >
            <i class="fa fa-cog m-r-5" />
            {{ $t('common.configuration') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div
        v-for="(composition, index) in compositions"
        :key="`group-${index}`"
        class="ribbon-wrapper card mb-2 border-bottom-0"
      >
        <div class="card-body">
          <div class="ribbon ribbon-bookmark ribbon-success">
            {{ composition.lot }}
          </div>
          <div class="ribbon ribbon-info ribbon-right">
            {{ $d(composition.created_at, 'short') }}
          </div>
          <CompositionListLine
            v-for="item in composition.items"
            :key="`item-${item.id}`"
            :composition="item"
          />
        </div>
      </div>
    </div>
    <div v-if="canDecompose" class="card-footer text-center">
      <BaseButton
        class="btn btn-danger"
        type="button"
        icon="fa fa-times"
        :text="$t('common.unmakeComposition')"
        :loading="loading"
        @click.prevent="unmakeComposition"
      />
    </div>
  </div>
</template>

<script>
import store from '/@/store';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import FilterMixin from '/@/mixins/FilterMixin.js';
import CompositionListLine from '/@/components/articles/CompositionListLine.vue';

export default {
  name: 'Compositions',
  components: { CompositionListLine, BaseButton },
  mixins: [ArticleMixin, FilterMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getArticlesList', {
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
  data() {
    return {
      loading: false,
      loadingDecomposition: false,
    };
  },
  computed: {
    compositions() {
      let result = [];
      this.article.compositions.forEach((composition) => {
        let r = result.find((r) => r.lot === composition.lot);
        if (r !== undefined) {
          r.items.push(composition);
        } else
          result.push({
            lot: composition.lot,
            created_at: composition.created_at,
            items: [composition],
          });
      });
      return result;
    },
    canMakeComposition() {
      return this.article.composition_presets.length > 0;
    },

    canDecompose() {
      return this.compositions.length > 0 && this.totalStock > 0;
    },
  },
  methods: {
    makeComposition() {
      if (this.canMakeComposition && confirm(this.$t('messages.composition'))) {
        this.loading = true;
        this.$store
          .dispatch('article/makeComposition', this.article)
          .finally(() => (this.loading = false));
      }
    },

    unmakeComposition() {
      if (
        this.canMakeComposition &&
        confirm(this.$t('messages.decomposition'))
      ) {
        this.loadingDecomposition = true;
        this.$store
          .dispatch('article/makeDecomposition', this.article)
          .finally(() => (this.loadingDecomposition = false));
      }
    },
  },
};
</script>

<style scoped></style>
