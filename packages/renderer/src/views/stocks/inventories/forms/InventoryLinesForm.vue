<template>
  <ArticleSelectableList
    v-if="show_select_form"
    :used-articles="inventory_line_fields"
    :submit-store-action="addInventoryLineFields"
    :can-cancel="false"
    confirm-btn-label="common.add_to_list"
  >
    <div class="card-header p-3">
      <div class="row align-items-center">
        <div class="col">
          <h5>{{ $t('stocks.inventoryLine.articleSelect') }}</h5>
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
            {{ `${$t('stocks.inventoryLine.articleForm')}` }}
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
          type="button"
          :text="$t('common.save')"
          icon="fa fa-save"
          :loading="loading"
          @click.prevent="submitInventoryLinesForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ArticleSelectableList from '/@/components/articles/ArticleSelectableList.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';
import InventoryLineFormField from '/@/components/stocks/inventories/InventoryLineFormField.vue';

export default {
  name: 'InventoryLinesForm',
  components: {
    InventoryLineFormField,
    BaseButton,
    ArticleSelectableList,
  },
  data() {
    return {
      inventory_line_fields: [],
      show_select_form: true,
      errors: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('inventory', ['inventory', 'inventoryLines']),
    inventory_line_fields_to_create() {
      return this.inventory_line_fields.filter((ilf) => ilf.id === null);
    },
  },
  created() {
    this.inventory_line_fields = [...this.inventoryLines];
  },
  methods: {
    addInventoryLineFields(selected) {
      this.inventory_line_fields = [
        ...this.inventory_line_fields,
        ...selected.map((art) => {
          return {
            id: null,
            inventory_id: this.inventory.id,
            article_id: art.id,
            old_value: art.stock?.available ?? null,
            new_value: null,
          };
        }),
      ];
      return Promise.resolve();
    },
    updateInventoryLineField(inventoryLine, index) {
      this.inventory_line_fields.splice(index, 1, inventoryLine);
    },
    removeInventoryLineField(article_id) {
      this.inventory_line_fields = this.inventory_line_fields.filter(
        (s) => s.article_id !== article_id
      );
      if (this.inventory_line_fields_to_create.length === 0)
        this.show_select_form = true;
    },

    submitInventoryLinesForm() {
      if (this.inventory_line_fields_to_create.length) {
        this.loading = true;
        return this.$store
          .dispatch('inventory/addInventoryLines', {
            inventory_lines: this.inventory_line_fields_to_create,
          })
          .then(() => this.$router.back())
          .catch((error) => (this.errors = error.response?.data?.errors))
          .finally(() => (this.loading = false));
      }
    },
    closeArticleSelectable() {
      if (this.inventory_line_fields_to_create.length > 0)
        this.show_select_form = false;
      else
        this.$router.push({
          name: 'inventory.form.article',
          params: this.$route.params,
          query: this.$route.query,
        });
    },
  },
};
</script>

<style scoped></style>
