<template>
  <router-view :discount="discount"/>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('sales.discount.articles')} - ${discount.label}` }}
          </h5>
        </div>
        <div
          v-if="$route.name === 'sales.discount.form.articles'"
          class="col-sm-auto align-items-end"
        >
          <BaseButton
            type="button"
            class="btn btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedArticleDiscounts"
          />
          <router-link
            :to="{ name: 'sales.discount.form.articles.form' }"
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
      <div class="table-responsive mb-3">
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
                  {{ `${$t('article.listTitle')} ${countSelected}` }}</label
                >
              </div>
            </th>
            <th scope="col">{{ $t('common.actions') }}</th>
          </tr>
          </thead>
          <tbody>
          <ArticleLineSelectable
            v-for="(articleDiscount, index) in articleDiscounts"
            :key="`art-grp-lne-${index}`"
            :model="articleDiscount"
            :selected-list="selected"
            remove-dispatch-name="discount/removeArticleDiscounts"
            @deleted="selected = []"
            @selected="selectArticleDiscount(articleDiscount, true)"
            @unselected="selectArticleDiscount(articleDiscount, false)"
          />
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div class="row justify-content-end">
        <BaseButton
          :text="$t('common.prev')"
          class="btn btn-secondary col-auto m-r-5"
          type="button"
          @click.prevent="$router.push({ name: 'sales.discount.form.desc' })"
        />
        <BaseButton
          :text="$t('common.next')"
          class="btn btn-primary col-auto"
          icon="fa fa-save"
          @click.prevent="$router.push({
            name: 'sales.discount.form.customers',
            params: { id: discount.id },
          })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  components: { ArticleLineSelectable, BaseButton },
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
    haveDiscount() {
      return !!this.discount;
    },
    articleDiscounts() {
      return this.haveDiscount ? this.discount.article_discounts : [];
    },
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.articleDiscounts.length
      );
    },
    selectedAllArticleDiscounts() {
      if (this.articleDiscounts.length)
        return this.selected.length === this.articleDiscounts.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllArticleDiscounts;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.articleDiscounts.forEach((ag) => result.push(ag.id));
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
    selectArticleDiscount(articleDiscount, adding) {
      if (adding) this.selected.push(articleDiscount.id);
      else
        this.selected = this.selected.filter(
          (id) => id !== articleDiscount.id
        );
    },
    deleteSelectedArticleDiscounts() {
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
          .dispatch('discount/removeArticleDiscounts', this.selected)
          .finally(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
  },
};
</script>

<style scoped></style>
