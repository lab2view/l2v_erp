<template>
  <router-view :article="article" />
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>
            {{ $t('articles.detail.composition.config.title') }} :
            <em class="f-12">{{ article.name }}</em>
          </h6>
        </div>
        <div
          v-if="$route.name === 'article.compositions.config'"
          class="col-sm-auto align-items-end"
        >
          <BaseButton
            type="button"
            class="btn btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedCompositionPreset"
          />
          <router-link
            :to="{ name: 'article.compositions.config.from' }"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add_article') }}
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
                    {{
                      `${$t('common.attributes.article_id')} ${countSelected}`
                    }}</label
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
              v-for="(compositionPreset, index) in compositionPresets"
              :key="`comp-pre-${index}`"
              :model="compositionPreset"
              :selected-list="selected"
              update-dispatch-name="article/updateCompositionPreset"
              remove-dispatch-name="article/removeCompositionPresets"
              @deleted="selected = []"
              @selected="selectCompositionPreset(compositionPreset, true)"
              @unselected="selectCompositionPreset(compositionPreset, false)"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import store from '/@/store';
import ArticleMixin from '/@/mixins/ArticleMixin.js';
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, ArticleLineSelectable },
  mixins: [ArticleMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('article/getArticlesList', {
        page: 1,
        field: {},
      })
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
    compositionPresets() {
      return this.article
        ? this.article.composition_presets.map((cp) => {
            return { ...cp, article_id: cp.child_article_id };
          })
        : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.compositionPresets.length
      );
    },
    selectedAllCompositionPreset() {
      if (this.compositionPresets.length)
        return this.selected.length === this.compositionPresets.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllCompositionPreset;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.compositionPresets.forEach((ag) => result.push(ag.id));
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
    selectCompositionPreset(compositionPreset, adding) {
      if (adding) this.selected.push(compositionPreset.id);
      else
        this.selected = this.selected.filter(
          (id) => id !== compositionPreset.id
        );
    },
    deleteSelectedCompositionPreset() {
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
          .dispatch('article/removeCompositionPresets', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>
