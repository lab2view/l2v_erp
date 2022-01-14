<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ $t('article.priceType.listTitle') }}</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'config.product.priceType.form' }"
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
          <th>{{ $t('common.attributes.code') }}</th>
          <th>{{ $t('common.attributes.label') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="priceType in priceTypes" :key="priceType.id">
          <td>{{ priceType.id }}</td>
          <td>{{ priceType.code }}</td>
          <td>{{ priceType.label }}</td>
          <td>
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'config.product.priceType.form',
                  params: { id: priceType.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
            <button
              v-if="!priceType.not_deletable"
              class="btn btn-danger btn-xs m-l-5"
              type="button"
              data-original-title="btn btn-danger btn-xs"
              :title="$t('common.delete')"
              @click.prevent="deletePriceType(priceType)"
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
      .dispatch('priceTypeConfig/getPriceTypeList', {
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
    ...mapGetters('priceTypeConfig', ['priceTypes']),
  },
  methods: {
    deletePriceType(priceType) {
      if (
        confirm(this.$t('messages.confirmDelete', { label: priceType.label }))
      )
        this.$store.dispatch('priceTypeConfig/deletePriceType', priceType.id);
    },
  },
};
</script>

<style scoped></style>
