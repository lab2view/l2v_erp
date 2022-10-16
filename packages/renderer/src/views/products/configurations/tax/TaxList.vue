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
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.products.tax.form',
                  params: { id: tax.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!tax.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteTax(tax)"
            >
              <i class="fa fa-trash-o" />
            </button>
          </td>
        </tr>
      </BaseDatatable>
    </div>

    <router-view />
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../../../store';
import { mapGetters } from 'vuex';
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseDatatable },
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
