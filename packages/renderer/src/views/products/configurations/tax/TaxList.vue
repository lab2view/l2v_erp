<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.tax.listTitle')"
      add-action-router-name="config.products.tax.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="tax/getTaxesList"
    />
    <div class="card-body">
      <BaseDatatable
        v-if="!$store.state.globalLoading"
        :tfoot="false"
        :total="taxes.length"
      >
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="tax in taxes" :key="tax.id">
          <td>{{ tax.id }}</td>
          <td>{{ tax.label }}</td>
          <td>
            <BaseActionBtnGroup
              entity="Tax"
              :with-show-btn="false"
              :with-delete-btn="!tax.not_deletable"
              @update="
                $router.push({
                  name: 'config.products.tax.form',
                  params: { id: tax.id },
                })
              "
              @delete="deleteTax(tax)"
            />
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'TaxList',
  components: { BaseActionBtnGroup, BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('tax/getTaxesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  computed: {
    ...mapGetters('tax', ['taxes']),
  },
  methods: {
    deleteTax(tax) {
      if (confirm(this.$t('messages.confirmDelete', { label: tax.label })))
        this.$store.dispatch('tax/deleteTax', tax.id);
    },
  },
};
</script>

<style scoped></style>
