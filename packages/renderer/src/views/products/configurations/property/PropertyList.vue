<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.property.listTitle')"
      add-action-router-name="config.products.property.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="property/getPropertiesList"
    />
    <div class="card-body">
      <BaseDatatable :tfoot="false">
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
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.products.property.form',
                  params: { id: property.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!property.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deleteProperty(property)"
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
