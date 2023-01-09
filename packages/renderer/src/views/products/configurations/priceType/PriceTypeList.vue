<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('articles.priceType.listTitle')"
      add-action-router-name="config.products.priceType.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="price_type/getPriceTypeList"
      entity="PriceType"
    />
    <div class="card-body">
      <BaseDatatable v-if="!$store.state.globalLoading" :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="priceType in priceTypes" :key="priceType.id">
          <td>{{ priceType.id }}</td>
          <td>{{ priceType.label }}</td>
          <td>
            <BaseActionBtnGroup
              entity="PriceType"
              :with-show-btn="false"
              :with-delete-btn="!priceType.not_deletable"
              @update="
                $router.push({
                  name: 'config.products.priceType.form',
                  params: { id: priceType.id },
                })
              "
              @delete="deletePriceType(priceType)"
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
  name: 'PriceTypeList',
  components: { BaseActionBtnGroup, BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('price_type/getPriceTypeList', {
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
    ...mapGetters('price_type', ['priceTypes']),
  },
  methods: {
    deletePriceType(priceType) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: priceType.label }))
      )
        this.$store.dispatch('price_type/deletePriceType', priceType.id);
    },
  },
};
</script>

<style scoped></style>
