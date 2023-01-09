<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.property.listTitle')"
      add-action-router-name="config.products.property.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="property/getPropertiesList"
    />
    <div class="card-body">
      <BaseDatatable v-if="!$store.state.globalLoading" :tfoot="false">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.product_family') }}</th>
          <th>{{ $t('common.attributes.product_type') }}</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.attributes.type') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="property in properties" :key="property.id">
          <td>{{ property.id }}</td>
          <td class="text-center">
            {{ property.product_family?.label ?? '--' }}
          </td>
          <td class="text-center">
            {{ property.product_type?.label ?? '--' }}
          </td>
          <td>{{ property.label }}</td>
          <td>{{ property.property_type?.label }}</td>
          <td>
            <BaseActionBtnGroup
              entity="Tax"
              :with-show-btn="false"
              :with-delete-btn="!property.not_deletable"
              @update="
                $router.push({
                  name: 'config.products.property.form',
                  params: { id: property.id },
                })
              "
              @delete="deleteProperty(property)"
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
  name: 'PropertyList',
  components: { BaseActionBtnGroup, BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('property/getPropertiesList', {
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
    ...mapGetters('property', ['properties']),
  },
  methods: {
    deleteProperty(property) {
      if (confirm(this.$t('messages.confirmDelete', { label: property.label })))
        this.$store.dispatch('property/deleteProperty', property.id);
    },
  },
};
</script>

<style scoped></style>
