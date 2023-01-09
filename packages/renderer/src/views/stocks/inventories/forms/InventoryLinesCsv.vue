<template>
  <div class="card mb-0">
    <div class="card-header pb-0">
      <form @submit.prevent="handleFileUpload">
        <div class="row align-items-center">
          <div class="col-sm">
            <span class="f-w-600">{{ $t('common.upload_header') }}</span>
            <pre class="helper-classes p-2">barcode, quantity, other</pre>
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
    <form @submit.prevent="submitInventoryLinesForm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">{{ $t('common.attributes.article_id') }}</th>
                <th class="text-center" scope="col" style="width: 120px">
                  {{ $t('common.headers.stock_in') }}
                </th>
                <th scope="col" style="width: 210px">
                  {{ $t('common.attributes.inventory_qty') }}
                  <span class="text-danger m-l-5">*</span>
                </th>
                <th scope="col">{{ $t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <InventoryLineFormField
                v-for="(inventoryLine, index) in inventory_line_fields"
                :key="`inv-lne-form-${index}`"
                :inventory-line="inventoryLine"
                :index="index"
                :update-field-method="updateInventoryLineField"
                :errors="errors"
                @remove="removeInventoryLineField"
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
                name: 'inventory.form.article',
                params: $route.params,
                query: $route.query,
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
import BaseInputFile from '/@/components/common/BaseInputFile.vue';
import { getContentCsvFileAsArray } from '/@/helpers/utils';
import { sumBy } from 'lodash';
import InventoryLineFormField from '/@/components/stocks/inventories/InventoryLineFormField.vue';

export default {
  name: 'InventoryLinesCsv',
  components: {
    InventoryLineFormField,
    BaseInputFile,
    BaseButton,
  },
  data() {
    return {
      inventory_line_fields: [],
      show_select_form: true,
      errors: [],
      loading: false,
      loadingUpload: false,
      csvFile: null,
    };
  },
  computed: {
    ...mapGetters('inventory', ['inventory', 'inventoryLines']),
    ...mapGetters('article', ['getArticleByBarcode']),
    unsavedInventoryLines() {
      return this.inventory_line_fields.filter((sel) => sel.id === null);
    },
    totalStock() {
      return sumBy(this.unsavedInventoryLines, 'new_value');
    },
  },
  created() {
    if (this.inventoryLines.length)
      this.inventory_line_fields = [...this.inventoryLines];
  },
  methods: {
    updateInventoryLineField(inventoryLine, index) {
      this.inventory_line_fields.splice(index, 1, inventoryLine);
    },
    removeInventoryLineField(article_id) {
      this.inventory_line_fields = this.inventory_line_fields.filter(
        (s) => s.article_id !== article_id
      );
      if (this.inventory_line_fields.length === 0) this.show_select_form = true;
    },

    submitInventoryLinesForm() {
      if (this.loading) return;

      if (this.inventory_line_fields.length) {
        this.loading = true;
        return this.$store
          .dispatch('inventory/addInventoryLines', {
            inventory_lines: this.inventory_line_fields.filter(
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
                this.inventory_line_fields.push({
                  id: null,
                  article_id: article.id,
                  inventory_id: this.inventory.id,
                  enterprise_id: this.inventory.enterprise_id ?? null,
                  old_value: article.stock?.available ?? null,
                  new_value: parseInt(line.quantity),
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
