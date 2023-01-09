<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <BaseTableHeader
        :title="$t('sales.discount.listTitle')"
        add-action-router-name="sales.discount.form.desc"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="discount/getDiscountsList"
      />
      <div class="card-body">
        <BaseDatatable
          v-if="!$store.state.globalLoading"
          :tfoot="false"
          :total="discounts.length"
        >
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.discount_type') }}</th>
            <th>{{ $t('common.attributes.enterprise') }}</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.value') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="discount in discounts" :key="discount.id">
            <td>{{ discount.id }}</td>
            <td>{{ discount.discount_type.label }}</td>
            <td class="text-center">
              {{ discount.enterprise?.label ?? '---' }}
            </td>
            <td>{{ discount.label }}</td>
            <td>{{ `${discount.value}${discount.is_percent ? '%' : ''}` }}</td>
            <td>
              <BaseActionBtnGroup
                entity="Discount"
                :with-show-btn="false"
                @update="
                  $router.push({
                    name: 'sales.discount.form.desc',
                    params: { id: discount.id },
                  })
                "
                @delete="deleteDiscount(discount)"
              />
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
import BaseActionBtnGroup from '/@/components/common/BaseActionBtnGroup.vue';

export default {
  name: 'DiscountsList',
  components: {
    BaseActionBtnGroup,
    BaseTableHeader,
    BaseContainer,
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discount/getDiscountsList', {
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
    ...mapGetters('discount', ['discounts', 'discount']),
  },
  created() {
    if (this.discount)
      this.$store.commit('discount/SET_CURRENT_DISCOUNT', null);
  },

  methods: {
    deleteDiscount(discount) {
      if (confirm(this.$t('messages.confirmDelete', { label: discount.label })))
        this.$store.dispatch('discount/deleteDiscount', discount.id);
    },
  },
};
</script>

<style scoped></style>
