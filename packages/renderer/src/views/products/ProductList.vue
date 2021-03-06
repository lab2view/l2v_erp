<template>
  <BaseContainer
    :title="$t('products.title')"
    :module="$t('menu.modules.products')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('products.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'product.form.desc' }"
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
        <BaseDatatable :tfoot="false" :total="products.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.type') }}</th>
            <th>{{ $t('common.attributes.name') }}</th>
            <th>{{ $t('common.attributes.barcode') }}</th>
            <th>{{ $t('common.attributes.state') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.product_type.label }}</td>
            <td>{{ product.name }}</td>
            <td>{{ `${product.code} / ${product.reference}` }}</td>
            <td>
              <span
                :class="`badge text-white badge-${
                  product.can_be_sell ? 'dark' : 'info'
                }`"
              >
                {{
                  product.can_be_sell
                    ? $t('common.states.can_be_sell')
                    : `${$t('common.states.no')} ${$t(
                        'common.states.can_be_sell'
                      )}`
                }}
              </span>
              <span
                :class="`badge text-white badge-${
                  product.disabled_at ? 'danger' : 'primary'
                }`"
              >
                {{
                  product.disabled_at
                    ? $t('common.states.disabled')
                    : $t('common.states.enabled')
                }}
              </span>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'product.form.desc',
                  params: { id: product.id },
                }"
                class="btn btn-secondary btn-xs"
                type="button"
                data-original-title="btn btn-secondary btn-xs"
                :title="$t('common.update')"
              >
                {{ $t('common.update') }}
              </router-link>
              <button
                v-if="!product.not_deletable"
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteProduct(product)"
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
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import store from '../../store';
import { mapGetters } from 'vuex';
import BaseContainer from '../../components/common/BaseContainer.vue';

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('product/getProductsList', {
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
    ...mapGetters('product', ['products', 'product']),
  },

  methods: {
    deleteProduct(product) {
      if (confirm(this.$t('messages.confirmDelete', { label: product.name })))
        this.$store.dispatch('product/deleteProduct', product.id);
    },
  },
};
</script>

<style scoped></style>
