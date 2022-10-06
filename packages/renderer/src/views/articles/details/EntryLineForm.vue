<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>
            {{ `${$t('stocks.entryLine.articleForm')}` }}
          </h5>
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
              </th>
              <th class="text-center" scope="col" style="width: 120px">
                {{ $t('common.attributes.quantity') }}
                <span class="text-danger m-l-5">*</span>
              </th>
              <th scope="col" style="width: 210px">
                {{ $t('common.attributes.buying_price') }}
                <span class="text-danger m-l-5">*</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!--            <ArticleEntryLineFormField-->
            <!--              :stock-entry-line="stock_entry_line_fields"-->
            <!--              :errors="errors"-->
            <!--              :article="article"-->
            <!--            />-->
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer border-top-0">
      <div class="row justify-content-center">
        <BaseButton
          type="button"
          class="btn btn-secondary col-auto m-r-5"
          :text="$t('common.cancel')"
          @click.prevent="$router.push({ name: 'stocks.entry.form.article' })"
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
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store/index.js';

export default {
  name: 'EntryLineForm',
  components: { BaseButton },
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
      stock_entry_line_fields: {
        article_id: null,
        provider_price: null,
        buying_price: null,
        provider_id: null,
        stock_entry_id: null,
      },
      show_select_form: false,
      errors: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('stock_entry', ['stockEntry', 'stockEntryIsCommand']),
    ...mapGetters('article', ['article']),
  },
  created() {
    if (this.stockEntry) {
      this.stock_entry_line_fields = {
        article_id: this.article_id,
        provider_price: null,
        buying_price: null,
        provider_id: null,
        quantity: 1,
        stock_entry_id: this.stockEntry.id,
      };
    }
  },
  methods: {
    submitEntryLinesForm() {
      if (this.stock_entry_line_fields) {
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
  },
};
</script>

<style scoped></style>
