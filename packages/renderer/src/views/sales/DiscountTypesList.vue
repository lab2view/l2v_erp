<template>
  <BaseContainer
    :module="$t('menu.modules.sales')"
    :title="$t('sales.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.discountType.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.sales.discount.type.form' }"
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
        <BaseDatatable :tfoot="false" :total="discountTypes.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.description') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="discountType in discountTypes" :key="discountType.id">
            <td>{{ discountType.id }}</td>
            <td>{{ discountType.label }}</td>
            <td>{{ truncate(discountType.description) }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'config.sales.discount.type.form',
                    params: { id: discountType.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteDiscountType(discountType)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
          </tr>
        </BaseDatatable>
      </div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discountType/getDiscountTypesList', {
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
    ...mapGetters('discountType', ['discountTypes', 'discountType']),
  },
  created() {
    if (this.discountType)
      this.$store.commit('discountType/SET_CURRENT_DISCOUNT_TYPE', null);
  },

  methods: {
    truncate(source, size = 100) {
      if (! source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + "…" : source;
    },
    deleteDiscountType(discountType) {
      if (confirm(this.$t('messages.confirmDelete', { label: discountType.label })))
        this.$store.dispatch('discountType/deleteDiscountType', discountType.id);
    },
  },
};
</script>

<style scoped></style>
