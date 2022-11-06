<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <form @submit.prevent="handleFileUpload">
        <div class="row align-items-center">
          <div class="col-sm">
            <span class="f-w-600">{{ $t('common.upload_header') }}</span>
            <pre class="helper-classes p-2">barcode, quantity</pre>
          </div>
          <div class="col-sm">
            <BaseInputFile
              type="file"
              v-model="csvFile"
              accept=".csv"
              required
            />
          </div>
          <div class="col-sm-auto align-items-end">
            <BaseButton
              type="submit"
              class="btn btn-sm btn-outline-primary m-r-5"
              icon="fa fa-upload"
              :loading="loadingUpload"
              :text="$t('common.upload_file')"
            />
          </div>
        </div>
      </form>
    </div>
    <form @submit.prevent="submitExitLinesForm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">{{ $t('common.attributes.article_id') }}</th>
                <th v-if="manage_price" scope="col" style="width: 210px">
                  {{ $t('common.attributes.buying_price') }}
                  <span class="text-danger m-l-5">*</span>
                </th>
                <th class="text-center" scope="col" style="width: 120px">
                  {{ $t('common.attributes.quantity') }}
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
            @click.prevent="
              $router.push({
                name: 'stocks.exit.form.article',
                params: $route.params,
              })
            "
          />
          <BaseButton
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :loading="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import ExitLineFormField from '/@/components/stocks/ExitLineFormField.vue';
import BaseInputFile from '/@/components/common/BaseInputFile.vue';
import { getContentCsvFileAsArray } from '/@/helpers/utils';

export default {
  name: 'ExitLinesCsv',
  components: { BaseInputFile, ExitLineFormField, BaseButton },
  data() {
    return {
      stock_exit_line_fields: [],
      show_select_form: true,
      errors: [],
      loading: false,
      loadingUpload: false,
      csvFile: null,
    };
  },
  computed: {
    ...mapGetters('stock_exit', [
      'stockExit',
      'manage_price',
      'stockExitLines',
    ]),
    ...mapGetters('article', ['getArticleByBarcode']),
  },
  created() {
    if (this.stockExitLines.length)
      this.stock_exit_line_fields = [
        ...this.stockExitLines.map((art) => {
          return {
            id: art.id,
            stock_exit_id: art.stock_exit_id,
            article_id: art.article_id,
            quantity: art.quantity,
            price: art.price,
          };
        }),
      ];
  },
  methods: {
    addStockExitLineFields(selected) {
      this.stock_exit_line_fields = [
        ...this.stock_exit_line_fields,
        ...selected.map((art) => {
          return {
            id: null,
            stock_exit_id: this.stockExit.id,
            article_id: art.id,
            quantity: 0,
            price: null,
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
      if (this.loading) return;

      if (this.stock_exit_line_fields.length) {
        this.loading = true;
        return this.$store
          .dispatch('stock_exit/addStockExitLines', {
            stock_exit_lines: this.stock_exit_line_fields.filter(
              (sf) => sf.id === null
            ),
          })
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      }
    },
    handleFileUpload() {
      this.loadingUpload = true;
      getContentCsvFileAsArray(this.csvFile)
        .then((lines) => {
          lines.forEach((line) => {
            if (line.barcode) {
              const article = this.getArticleByBarcode(
                parseFloat(line.barcode)
              );
              if (article !== undefined) {
                this.stock_exit_line_fields.push({
                  id: null,
                  stock_exit_id: this.stockExit.id,
                  article_id: article.id,
                  quantity: parseInt(line.quantity),
                });
              }
            }
          });
        })
        .finally(() => (this.loadingUpload = false));
    },
  },
};
</script>

<style scoped></style>
