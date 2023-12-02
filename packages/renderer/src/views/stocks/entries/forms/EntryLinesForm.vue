<template>
  <ArticleSelectableList
    v-if="show_select_form"
    :used-articles="stock_entry_line_fields"
    :submit-store-action="addStockEntryLineFields"
    :can-cancel="false"
    confirm-btn-label="common.add_to_list"
  >
    <div class="card-header p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5>{{ $t('stocks.entryLine.articleSelect') }}</h5>
        </div>
        <div class="col-auto">
          <BaseButton
            type="button"
            class="btn btn-outline-secondary"
            icon="fa fa-times"
            :text="$t('common.close')"
            @click.prevent="closeArticleSelectable"
          />
        </div>
      </div>
    </div>
  </ArticleSelectableList>
  <div v-else class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('stocks.entryLine.articleForm')}` }}
          </h5>
        </div>
        <div v-if="!show_select_form" class="col-sm-auto align-items-end">
          <BaseButton
            type="button"
            class="btn btn-outline-primary m-r-5"
            icon="fa fa-plus"
            :text="$t('common.selected_article')"
            @click.prevent="show_select_form = true"
          />
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">{{ $t('common.attributes.article_id') }}</th>
              <th v-if="stockEntryIsCommand" scope="col">
                {{ $t('common.attributes.provider_id') }}
              </th>
              <th v-if="stockEntryIsCommand" scope="col" style="width: 210px">
                {{ $t('common.attributes.provider_price') }}
                (<span class="font-secondary f-w-600">{{ currency }}</span> )
              </th>
              <th class="text-center" scope="col" style="width: 120px">
                {{ $t('common.attributes.quantity') }}
                <span class="text-danger m-l-5">*</span>
              </th>
              <th scope="col" style="width: 210px">
                {{ $t('common.attributes.prices') }}
                (<span class="font-secondary f-w-600">{{ currency }}</span> )
                <span class="text-danger m-l-5">*</span>
              </th>
              <th scope="col" style="width: 210px">
                {{ $t('common.attributes.expires_at') }}
              </th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <EntryLineFormField
              v-for="(stockEntryLine, index) in stock_entry_line_fields"
              :key="`stc-ent-lne-form-${index}`"
              :stock-entry-line="stockEntryLine"
              :index="index"
              :update-field-method="updateStockEntryLineField"
              :errors="errors"
              :enterprise-id="stockEntry.enterprise_id"
              @remove="removeStockEntryLineField"
            />
          </tbody>
          <tfoot>
            <tr>
              <th>
                {{
                  `${stock_entry_line_fields.length} ${$tc(
                    'common.fields.article',
                    stock_entry_line_fields.length
                  )} `
                }}
              </th>
              <th v-if="stockEntryIsCommand" colspan="2"></th>
              <th class="text-center">{{ totalStock }}</th>
              <th class="text-center">{{ totalBuyingPrice }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="card-footer border-top-0">
      <div class="row justify-content-center">
        <BaseButton
          type="button"
          class="btn btn-secondary col-auto m-r-5"
          :text="$t('common.cancel')"
          @click.prevent="
            $router.push({
              name: 'stocks.entry.form.article',
              params: $route.params,
              query: $route.query,
            })
          "
        />
        <BaseButton
          class="btn btn-primary col-auto"
          type="button"
          :text="$t('common.save')"
          icon="fa fa-save"
          :loading="loading"
          @click.prevent="submitEntryLinesForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import EntryLineFormField from '/@/components/stocks/EntryLineFormField.vue';
import store from '/@/store/index.js';
import { sumBy } from 'lodash';

export default {
  name: 'EntryLinesForm',
  components: { EntryLineFormField, BaseButton, ArticleSelectableList },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('provider/getStockProvidersList', {
        page: 1,
        field: {},
      })
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  data() {
    return {
      stock_entry_line_fields: [],
      show_select_form: true,
      errors: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('stock_entry', ['stockEntry', 'stockEntryIsCommand']),
    ...mapGetters('workspace', ['currency']),
    totalStock() {
      return sumBy(this.stock_entry_line_fields, 'quantity');
    },
    totalBuyingPrice() {
      return sumBy(this.stock_entry_line_fields, 'buying_price');
    },
  },
  methods: {
    addStockEntryLineFields(selected) {
      this.stock_entry_line_fields = [
        ...this.stock_entry_line_fields,
        ...selected.map((art) => {
          return {
            stock_entry_id: this.stockEntry.id,
            article_id: art.id,
            provider_id: null,
            quantity: 1,
            provider_price: null,
            buying_price: null,
            selling_price: null,
            expires_at: '',
          };
        }),
      ];
      return Promise.resolve();
    },
    updateStockEntryLineField(stockEntryLine, index) {
      this.stock_entry_line_fields.splice(index, 1, stockEntryLine);
    },
    removeStockEntryLineField(article_id) {
      this.stock_entry_line_fields = this.stock_entry_line_fields.filter(
        (s) => s.article_id !== article_id
      );
      if (this.stock_entry_line_fields.length === 0)
        this.show_select_form = true;
    },

    submitEntryLinesForm() {
      if (this.loading) return;

      if (this.stock_entry_line_fields.length) {
        this.loading = true;
        return this.$store
          .dispatch('stock_entry/addStockEntryLines', {
            stock_entry_lines: this.stock_entry_line_fields,
          })
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      }
    },
    closeArticleSelectable() {
      if (this.stock_entry_line_fields.length > 0)
        this.show_select_form = false;
      else
        this.$router.push({
          name: 'stocks.entry.form.article',
          params: this.$route.params,
          query: this.$route.query,
        });
    },
  },
};
</script>

<style scoped></style>
