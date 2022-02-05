<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <router-view />
    </div>
  </div>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('article.group.listTitle')} - ${articleGroup.code}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'article.group.form.setting'"
          class="col-sm-auto align-items-end"
        >
          <router-link
            :to="{ name: 'product.form.article.form' }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="user-status table-responsive">
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th :title="$t('common.select_all')">
                <div class="checkbox checkbox-solid-success">
                  <input v-if="partialSelect" type="checkbox" />
                  <input v-else v-model="selectAll" type="checkbox" />
                </div>
              </th>
              <th scope="col">{{ $t('common.attributes.name') }}</th>
              <th scope="col">{{ $t('common.attributes.quantity') }}</th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ArticleGroupLine
              v-for="articleGroupLine in articleGroupLines"
              :key="articleGroupLine.id"
              :article-group-line="articleGroupLine"
              :select-all="selectAll"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '/@/store';
import ArticleGroupMixin from '/@/mixins/ArticleGroupMixin';
import ArticleGroupLine from '/@/components/articles/groups/ArticleGroupLine.vue';

export default {
  components: { ArticleGroupLine },
  mixins: [ArticleGroupMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product/getProductsList', {
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
      selectAll: false,
      selected: [],
    };
  },
  computed: {
    articleGroupLines() {
      return this.haveArticleGroup ? this.articleGroup.article_group_lines : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.articleGroupLines.length
      );
    },
  },
  watch: {
    selectAll(value) {
      if (value) {
        this.selected = this.articleGroupLines.map((agl) => {
          agl.id;
        });
      } else this.selected = [];
    },
  },
};
</script>

<style scoped></style>
