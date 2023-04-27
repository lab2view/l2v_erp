<template>
  <router-view v-if="!stockEntryIsConfirm" />
  <div v-if="$route.name === 'stocks.entry.form.article'" class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${stockEntryTitleName} - ${stockEntryReference}` }}
          </h5>
        </div>
        <div v-if="canEditStockEntry" class="col-sm-auto align-items-end">
          <BaseButton
            type="button"
            class="btn btn-sm btn-outline-danger m-r-5"
            :disabled="!isSelected"
            icon="fa fa-trash-o"
            :text="$t('common.delete_all')"
            :loading="loading"
            @click.prevent="deleteSelectedStockEntryLine"
          />
          <router-link
            :to="{
              name: 'stocks.entry.form.article.form',
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
              name: 'stocks.entry.form.article.csv',
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
          v-else-if="currentStockEntryStateDate"
          class="col-sm-auto align-items-end"
        >
          {{ $t('stocks.stockEntry.state_date') }} :
          <span class="f-w-700">{{
            $d(currentStockEntryStateDate, 'long')
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
                      ${canEditStockEntry ? 'checkbox' : ''}
                  `"
                >
                  <input
                    v-if="canEditStockEntry"
                    id="checkbox-stock-line-1"
                    v-model="selectAll"
                    type="checkbox"
                  />
                  <label
                    class="m-0 pt-0 pb-0 p-l-5"
                    for="checkbox-stock-line-1"
                    :style="{ 'padding-left: 60px': !stockEntryIsConfirm }"
                  >
                    {{ `${$t('articles.listTitle')} ${countSelected}` }}</label
                  >
                </div>
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.quantity') }}
              </th>
              <th v-if="stockEntryIsCommand" class="text-center" scope="col">
                {{ $t('common.attributes.provider_id') }}
              </th>
              <th v-if="stockEntryIsCommand" class="text-center" scope="col">
                {{ $t('common.attributes.provider_price') }}
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.buying_price') }}
              </th>
              <th class="text-center" scope="col">
                {{ $t('common.attributes.expires_at') }}
              </th>
              <th v-if="canEditStockEntry" scope="col">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <ArticleLineSelectable
              v-for="(stockEntryLine, index) in stockEntryLines"
              :key="`sck-ent-lne-${index}`"
              :model="stockEntryLine"
              :selected-list="selected"
              update-dispatch-name="stock_entry/updateStockEntryLine"
              remove-dispatch-name="stock_entry/removeStockEntryLines"
              :cancel-selection="!canEditStockEntry"
              @deleted="selected = []"
              @selected="selectStockEntryLine(stockEntryLine, true)"
              @unselected="selectStockEntryLine(stockEntryLine, false)"
            >
              <td v-if="stockEntryIsCommand">
                {{ stockEntryLine.provider?.name }}
              </td>
              <td v-if="stockEntryIsCommand">
                {{ stockEntryLine.provider_price }}
              </td>
              <td class="text-center">{{ stockEntryLine.buying_price }}</td>
              <td class="text-center">
                {{ stockEntryLine.expires_at }}
              </td>
            </ArticleLineSelectable>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2">
                {{
                  `${stockEntryLines.length} ${$tc(
                    'common.fields.article',
                    stockEntryLines.length
                  )} `
                }}
                <span class="m-l-15">
                  {{
                    `${$t('common.headers.total')} ${$t(
                      'common.attributes.stock_entry'
                    )}`
                  }}: <span class="f-w-600">{{ totalArticleQuantity }}</span>
                </span>
              </th>
              <th v-if="stockEntryIsCommand" colspan="2"></th>
              <th class="text-center">{{ totalArticlePrice }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div
      v-if="!stockEntryIsConfirm && stockEntryLines.length"
      class="card-footer border-top-0"
    >
      <div class="row justify-content-center">
        <BaseButton
          class="btn btn-success col-auto"
          type="button"
          :text="
            stockEntryIsCommand
              ? $t('common.confirm_command')
              : $t('common.confirm_provision')
          "
          icon="fa fa-check-circle"
          :loading="loading"
          @click.prevent="confirmStockEntrySate"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';
import store from '/@/store/index.js';
import { stockStateCode } from '/@/helpers/codes.js';
import { sumBy } from 'lodash';

export default {
  name: 'EntryLineList',
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
    ...mapGetters('stock_entry', [
      'stockEntryLines',
      'stockEntryReference',
      'stockEntryTitleName',
      'stockEntryIsCommand',
      'stockEntryIsConfirm',
      'currentStockEntryStateDate',
      'canEditStockEntry',
    ]),
    ...mapGetters('stock_state', ['getStockStateByCode']),
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.stockEntryLines.length
      );
    },
    selectedAllStockEntryLine() {
      if (this.stockEntryLines.length)
        return this.selected.length === this.stockEntryLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllStockEntryLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.stockEntryLines.forEach((ag) => result.push(ag.id));
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
    totalArticleQuantity() {
      return sumBy(this.stockEntryLines, 'quantity');
    },
    totalArticlePrice() {
      return sumBy(this.stockEntryLines, 'buying_price');
    },
  },
  methods: {
    selectStockEntryLine(stockEntryLine, adding) {
      if (adding) this.selected.push(stockEntryLine.id);
      else
        this.selected = this.selected.filter((id) => id !== stockEntryLine.id);
    },
    deleteSelectedStockEntryLine() {
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
          .dispatch('stock_entry/removeStockEntryLines', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
    confirmStockEntrySate() {
      if (!this.stockEntryIsCommand) {
        if (confirm(this.$t('messages.confirmFinishStock', { label: '' }))) {
          const state = this.getStockStateByCode(stockStateCode.success);
          if (state !== undefined) {
            this.loading = true;
            this.$store
              .dispatch('stock_entry/changeStockEntryState', state.id)
              .finally(() => (this.loading = false));
          }
        }
      } else {
        //todo redirection to shipping form
        alert("la reception de livraison n'est pas encore disposible");
      }
    },
  },
};
</script>

<style scoped></style>
