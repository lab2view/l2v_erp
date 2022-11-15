<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <form @submit.prevent="handleFileUpload">
        <div class="row align-items-center">
          <div class="col-sm">
            <span class="f-w-600">{{ $t('common.upload_header') }}</span>
            <pre class="helper-classes p-2" v-if="stockEntryIsCommand">
barcode, provider_id, provider_price, quantity, buying_price, other
            </pre>
            <pre class="helper-classes p-2" v-else>
barcode, quantity, buying_price, other
            </pre>
          </div>
          <div class="col-sm">
            <BaseInputFile
              v-model="csvFile"
              type="file"
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
    <form @submit.prevent="submitEntryLinesForm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  {{ $t('common.attributes.article_id') }}
                </th>
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
                @remove="removeStockEntryLineField"
              />
            </tbody>
            <tfoot v-if="unsavedStockEntryLines.length">
              <tr>
                <th>
                  {{
                    `${unsavedStockEntryLines.length} ${$tc(
                      'common.fields.article',
                      unsavedStockEntryLines.length
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
import { sumBy } from 'lodash';
import EntryLineFormField from '/@/components/stocks/EntryLineFormField.vue';

export default {
  name: 'ExitLinesCsv',
  components: {
    EntryLineFormField,
    BaseInputFile,
    ExitLineFormField,
    BaseButton,
  },
  data() {
    return {
      stock_entry_line_fields: [],
      show_select_form: true,
      errors: [],
      loading: false,
      loadingUpload: false,
      csvFile: null,
    };
  },
  computed: {
    ...mapGetters('stock_entry', ['stockEntry', 'stockEntryIsCommand']),
    ...mapGetters('article', ['getArticleByBarcode']),
    unsavedStockEntryLines() {
      return this.stock_entry_line_fields.filter((sel) => sel.id === null);
    },
    totalStock() {
      return sumBy(this.unsavedStockEntryLines, 'quantity');
    },
    totalBuyingPrice() {
      return sumBy(this.unsavedStockEntryLines, 'buying_price');
    },
  },
  methods: {
    addStockExitLineFields(selected) {
      this.stock_entry_line_fields = [
        ...this.stock_entry_line_fields,
        ...selected.map((art) => {
          return {
            id: null,
            stock_entry_id: this.stockEntry.id,
            article_id: art.id,
            quantity: 0,
            price: null,
          };
        }),
      ];
      this.show_select_form = false;
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
                this.stock_entry_line_fields.push({
                  id: null,
                  stock_entry_id: this.stockEntry.id,
                  article_id: article.id,
                  quantity: parseInt(line.quantity),
                  provider_id:
                    this.stockEntryIsCommand && line.provider_id
                      ? parseInt(line.provider_id)
                      : null,
                  provider_price:
                    this.stockEntryIsCommand && line.provider_price
                      ? parseFloat(line.provider_price)
                      : null,
                  buying_price: line.buying_price
                    ? parseFloat(line.buying_price)
                    : null,
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
