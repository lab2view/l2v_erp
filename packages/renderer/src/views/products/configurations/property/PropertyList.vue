<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ $t('products.property.listTitle') }}</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'config.products.property.form' }"
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.add') }}
          </router-link>
        </div>
      </div>
    </div>
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

export default {
  components: { BaseDatatable },
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
