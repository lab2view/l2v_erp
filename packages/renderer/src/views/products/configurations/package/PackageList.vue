<template>
  <div class="card">
    <BaseTableHeader
      :title="$t('products.package.listTitle')"
      add-action-router-name="config.products.package.form"
      :refresh-action-field="{ page: 1, field: { next: true } }"
      refresh-action-name="package/getPackageList"
    />
    <div class="card-body">
      <BaseDatatable :tfoot="false" :total="packages.length">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="pack in packages" :key="pack.id">
          <td>{{ pack.id }}</td>
          <td>{{ pack.label }}</td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.products.package.form',
                  params: { id: pack.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!pack.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deletePackage(pack)"
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
  name: 'PackageList',
  components: { BaseTableHeader, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('package/getPackageList', {
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
    ...mapGetters('package', ['packages']),
  },
  methods: {
    deletePackage(pack) {
      if (confirm(this.$t('messages.confirmDelete', { label: pack.label })))
        this.$store.dispatch('package/deletePackage', pack.id);
    },
  },
};
</script>

<style scoped></style>
