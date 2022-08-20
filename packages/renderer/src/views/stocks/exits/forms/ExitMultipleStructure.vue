<template>
  <ArticleSelectableList
    v-if="show_select_form"
    :used-articles="stock_exit_line_fields"
    :submit-store-action="addStockExitLineFields"
    :can-cancel="false"
    confirm-btn-label="common.add_to_list"
  >
    <div class="card-header p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5>{{ $t('stocks.exitLine.articleSelect') }}</h5>
        </div>
        <div v-if="stock_exit_line_fields.length" class="col-auto">
          <BaseButton
            type="button"
            class="btn btn-outline-secondary"
            icon="fa fa-times"
            :text="$t('common.close')"
            @click.prevent="show_select_form = false"
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
            {{ `${$t('stocks.exitLine.articleForm')}` }}
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
              <th scope="col">
                {{ `${$t('common.fields.multi_quantity')}` }}
                <span class="text-danger m-l-5">*</span>
              </th>
              <th scope="col">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <ExitLineFormField
              v-for="(stockExitLine, index) in stock_exit_line_fields"
              :key="`stc-ext-lne-form-${index}`"
              :stock-exit-line="stockExitLine"
              :index="index"
              is-multiple
              :update-field-method="updateStockExitLineField"
              :errors="errors"
              @remove="removeStockExitLineField"
            />
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
          @click.prevent="$router.push({ name: 'stocks.exit.form.article' })"
        />
        <BaseButton
          class="btn btn-primary col-auto"
          type="button"
          :text="$t('common.save')"
          icon="fa fa-save"
          :loading="loading"
          @click.prevent="submitExitLinesForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import ExitLineFormField from '/@/components/stocks/ExitLineFormField.vue';
import { mapGetters } from 'vuex';

export default {
  components: { ExitLineFormField, BaseButton, ArticleSelectableList },
  data() {
    return {
      stock_exit_line_fields: [],
      show_select_form: true,
      errors: {},
      loading: false,
    };
  },
  computed: {
    ...mapGetters('stock_exit', ['getMultipleStockExits']),
  },
  beforeUnmount() {
    this.$store.commit('stock_exit/RESET_MULTIPLE_STOCK_EXIT');
    this.$store.commit('stock_exit/SET_CURRENT_STOCK_EXIT', null);
  },
  methods: {
    addStockExitLineFields(selected) {
      this.stock_exit_line_fields = [
        ...this.stock_exit_line_fields,
        ...selected.map((art) => {
          return {
            stock_exit_id: null,
            article_id: art.id,
            quantities: [],
          };
        }),
      ];
      this.show_select_form = false;
      return Promise.resolve();
    },
    updateStockExitLineField(stockExitLine, index) {
      this.stock_exit_line_fields.splice(index, 1, stockExitLine);
    },
    removeStockExitLineField(article_id) {
      this.stock_exit_line_fields = this.stock_exit_line_fields.filter(
        (s) => s.article_id !== article_id
      );
      if (this.stock_exit_line_fields.length === 0)
        this.show_select_form = true;
    },

    submitExitLinesForm() {
      if (this.stock_exit_line_fields.length) {
        this.loading = true;
        Promise.all(
          this.getMultipleStockExits.map(async (stockExit) => {
            this.$store.commit('stock_exit/SET_CURRENT_STOCK_EXIT', stockExit);
            await this.$store
              .dispatch('stock_exit/addStockExitLines', {
                stock_exit_lines: this.stock_exit_line_fields.map((slf) => {
                  return {
                    stock_exit_id: stockExit.id,
                    article_id: slf.article_id,
                    quantity: slf.quantities[stockExit.id],
                  };
                }),
              })
              .catch(
                (error) =>
                  (this.errors[stockExit.id] = error.response?.data?.errors)
              );
          })
        ).finally(() => this.$router.push({ name: 'stocks.exits' }));
      }
    },
  },
};
</script>

<style scoped></style>
