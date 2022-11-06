<template>
  <router-view v-if="!stockExitIsConfirm" />
  <div v-if="$route.name === 'stocks.exit.form.article'" class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${stockExitTitleName} - ${stockExitReference}` }}
          </h5>
        </div>
        <div v-if="!stockExitIsConfirm" class="col-sm-auto align-items-end">
          <BaseButton
            type="button"
            class="btn btn-sm btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedStockExitLine"
          />
          <router-link
            :to="{
              name: 'stocks.exit.form.article.form',
              params: $route.params,
              query: $route.query,
            }"
            class="btn btn-sm btn-primary m-r-5"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add_article') }}
          </router-link>
          <router-link
            :to="{
              name: 'stocks.exit.form.article.csv',
              params: $route.params,
              query: $route.query,
            }"
            class="btn btn-sm btn-info"
            type="button"
          >
            <i class="fa fa-upload m-r-5" />
            {{ $t('common.upload_csv') }}
          </router-link>
        </div>
        <div
          v-else-if="currentStockExitStateDate"
          class="col-sm-auto align-items-end"
        >
          {{ $t('stocks.stockExit.state_date') }} :
          <span class="f-w-700">{{
            $d(currentStockExitStateDate, 'long')
          }}</span>
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
                  :class="`${
                    partialSelect
                      ? 'checkbox-solid-success'
                      : 'checkbox-primary'
                  }
                      ${!stockExitIsConfirm ? 'checkbox' : ''}
                  `"
                >
                  <input
                    v-if="!stockExitIsConfirm"
                    id="checkbox-stock-line-1"
                    v-model="selectAll"
                    type="checkbox"
                  />
                  <label
                    class="m-0 pt-0 pb-0 p-l-5"
                    for="checkbox-stock-line-1"
                    :style="{ 'padding-left: 60px': !stockExitIsConfirm }"
                  >
                    {{ `${$t('articles.listTitle')} ${countSelected}` }}</label
                  >
                </div>
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.quantity') }}
              </th>
              <th v-if="manage_price" class="text-center" scope="col">
                {{ $t('common.attributes.buying_price') }}
              </th>
              <th v-if="manage_price" class="text-center" scope="col">
                {{ $t('common.headers.total_price') }}
              </th>
              <th v-if="!stockExitIsConfirm" scope="col">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ArticleLineSelectable
              v-for="(stockExitLine, index) in stockExitLines"
              :key="`sck-ent-lne-${index}`"
              :model="stockExitLine"
              :selected-list="selected"
              update-dispatch-name="stock_exit/updateStockExitLine"
              remove-dispatch-name="stock_exit/removeStockExitLines"
              :cancel-selection="stockExitIsConfirm"
              :for-exit="true"
              @deleted="selected = []"
              @selected="selectStockExitLine(stockExitLine, true)"
              @unselected="selectStockExitLine(stockExitLine, false)"
            >
              <td v-if="manage_price" class="text-center">
                {{ stockExitLine.price }}
              </td>
              <td v-if="manage_price" class="text-center">
                {{ stockExitLine.sub_price }}
              </td>
            </ArticleLineSelectable>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="!stockExitIsConfirm && canConfirm"
      class="card-footer border-top-0"
    >
      <div class="row justify-content-center">
        <BaseButton
          class="btn btn-success col-auto"
          type="button"
          :text="$t('common.confirm_operation')"
          icon="fa fa-check-circle"
          :loading="loading"
          @click.prevent="confirmStockExitSate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import { stockStateCode } from '/@/helpers/codes.js';

export default {
  name: 'ExitLineList',
  components: { ArticleLineSelectable, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_state/getStockStatesList', {
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
    ...mapGetters('stock_exit', [
      'stockExitLines',
      'stockExitTitleName',
      'stockExitReference',
      'stockExitIsConfirm',
      'currentStockExitStateDate',
      'manage_price',
    ]),
    ...mapGetters('stock_state', ['getStockStateByCode']),
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.stockExitLines.length
      );
    },
    canConfirm() {
      return this.stockExitLines.length > 0;
    },
    selectedAllStockExitLine() {
      if (this.stockExitLines.length)
        return this.selected.length === this.stockExitLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllStockExitLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.stockExitLines.forEach((ag) => result.push(ag.id));
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
    selectStockExitLine(stockExitLine, adding) {
      if (adding) this.selected.push(stockExitLine.id);
      else
        this.selected = this.selected.filter((id) => id !== stockExitLine.id);
    },
    deleteSelectedStockExitLine() {
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
          .dispatch('stock_exit/removeStockExitLines', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
    confirmStockExitSate() {
      if (confirm(this.$t('messages.confirmFinishStock', { label: '' }))) {
        const state = this.getStockStateByCode(stockStateCode.success);
        if (state !== undefined) {
          this.loading = true;
          this.$store
            .dispatch('stock_exit/changeStockExitState', state.id)
            .finally(() => (this.loading = false));
        }
      }
    },
  },
};
</script>

<style scoped></style>
