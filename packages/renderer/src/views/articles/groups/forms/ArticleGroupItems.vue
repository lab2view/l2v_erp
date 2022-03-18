<template>
  <router-view :article-group="articleGroup" />
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('articles.group.listTitle')} - ${articleGroup.label}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'article.group.form.item'"
          class="col-sm-auto align-items-end"
        >
          <BaseButton
            type="button"
            class="btn btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedArticleGroupLine"
          />
          <router-link
            :to="{ name: 'article.group.form.item.form' }"
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
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th :title="$t('common.select_all')">
                <div
                  class="checkbox"
                  :class="
                    partialSelect
                      ? 'checkbox-solid-success'
                      : 'checkbox-primary'
                  "
                >
                  <input
                    id="checkbox-primary-1"
                    v-model="selectAll"
                    type="checkbox"
                  />
                  <label
                    class="m-0 pt-0 pb-0 p-l-5"
                    for="checkbox-primary-1"
                    style="padding-left: 60px"
                  >
                    {{ `${$t('articles.listTitle')} ${countSelected}` }}</label
                  >
                </div>
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.quantity') }}
              </th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ArticleLineSelectable
              v-for="(articleGroupLine, index) in articleGroupLines"
              :key="`art-grp-lne-${index}`"
              :model="articleGroupLine"
              :selected-list="selected"
              update-dispatch-name="article_group/updateArticleGroupLine"
              remove-dispatch-name="article_group/removeArticleGroupLines"
              @deleted="selected = []"
              @selected="selectArticleGroupLine(articleGroupLine, true)"
              @unselected="selectArticleGroupLine(articleGroupLine, false)"
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
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';

export default {
  components: { ArticleLineSelectable, BaseButton },
  mixins: [ArticleGroupMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('product/getProductsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      }),
    ])
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('article_group', ['articleGroup']),
    articleGroupLines() {
      return this.haveArticleGroup ? this.articleGroup.article_group_lines : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.articleGroupLines.length
      );
    },
    selectedAllArticleGroupLine() {
      if (this.articleGroupLines.length)
        return this.selected.length === this.articleGroupLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllArticleGroupLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.articleGroupLines.forEach((ag) => result.push(ag.id));
          this.selected = result;
        }
      },
    },
    isSelected() {
      return this.selected.length > 0;
    },
    countSelected() {
      return this.isSelected ? `( ${this.selected.length} )` : '';
    },
  },
  methods: {
    selectArticleGroupLine(articleGroupLine, adding) {
      if (adding) this.selected.push(articleGroupLine.id);
      else
        this.selected = this.selected.filter(
          (id) => id !== articleGroupLine.id
        );
    },
    deleteSelectedArticleGroupLine() {
      if (
        this.selected.length &&
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.$t('common.deleted_selection'),
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('article_group/removeArticleGroupLines', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>

<style scoped></style>
