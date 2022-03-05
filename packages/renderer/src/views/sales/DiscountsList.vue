<template>
  <BaseContainer
    :module="$t('menu.modules.sales')"
    :title="$t('sales.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.discount.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'sales.discount.form.desc' }"
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
        <BaseDatatable :tfoot="false" :total="discounts.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.discount_type') }}</th>
            <th>{{ $t('common.attributes.enterprise') }}</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.attributes.value') }}</th>
            <th>{{ $t('common.attributes.start_at') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="discount in discounts" :key="discount.id">
            <td>{{ discount.id }}</td>
            <td>{{ discount.discount_type.label }}</td>
            <td>{{ discount.enterprise?.label }}</td>
            <td>{{ discount.label }}</td>
            <td>{{ discount.value }}</td>
            <td>{{ discount.start_at }}</td>
            <td>
              <button
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
                @click.prevent="
                  $router.push({
                    name: 'sales.discount.form.desc',
                    params: { id: discount.id },
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
                @click.prevent="deleteDiscount(discount)"
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
