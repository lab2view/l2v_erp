<template>
  <div class="card mb-0 border-top-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>
            {{ $t('article.detail.composition.title') }} :
            <em class="f-12">{{ article.name }}</em>
          </h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <BaseButton
            class="btn btn-primary"
            type="button"
            icon="fa fa-plus-circle"
            :text="$t('common.makeComposition')"
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
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.reference') }}</th>
              <th scope="col">{{ $t('common.attributes.article_id') }}</th>
              <th scope="col">{{ $t('common.attributes.quantity') }}</th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <CompositionTableLine
              v-for="(composition, index) in compositions"
              :key="`composition-${index}`"
              :composition="composition"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '/@/store';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import CompositionTableLine from '/@/components/articles/CompositionTableLine.vue';

export default {
  components: { CompositionTableLine, BaseButton },
  mixins: [ArticleMixin],
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
  computed: {
    compositions() {
      return this.article.compositions;
    },
  },
};
</script>

<style scoped></style>
