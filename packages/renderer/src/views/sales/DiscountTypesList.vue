<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.discountType.listTitle')"
        add-action-router-name="config.sales.discount.type.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="discount_type/getDiscountTypesList"
      />
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
import BaseTableHeader from '/@/components/common/BaseTableHeader.vue';

export default {
  components: { BaseTableHeader, BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discount_type/getDiscountTypesList', {
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
    ...mapGetters('discount_type', ['discountTypes', 'discountType']),
  },
  created() {
    if (this.discountType)
      this.$store.commit('discount_type/SET_CURRENT_DISCOUNT_TYPE', null);
  },

  methods: {
    truncate(source, size = 100) {
      if (!source) {
        return '';
      }
      return source.length > size ? source.slice(0, size - 1) + '…' : source;
    },
    deleteDiscountType(discountType) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: discountType.label })
        )
      )
        this.$store.dispatch(
          'discount_type/deleteDiscountType',
          discountType.id
        );
    },
  },
};
</script>

<style scoped></style>
