<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h6>{{ $t('stock.provision.list') }}</h6>
        </div>
        <div class="col-sm-auto align-items-end">
          <router-link
            :to="{ name: 'product.form.desc' }"
            href="#"
            class="btn btn-primary"
            type="button"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('stock.provision.add') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="card-body pb-0">
      <BaseDatatable :tfoot="false" :total="0">
        <template #headers>
          <th>#</th>
          <th>{{ $t('common.attributes.article_id') }}</th>
          <th>{{ $t('common.attributes.stock_entry_id') }}</th>
          <th>{{ $t('common.attributes.provider_id') }}</th>
          <th>{{ $t('common.attributes.stock_entry_type_id') }}</th>
          <th>{{ $t('common.attributes.quantity') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </template>
        <tr v-for="product in []" :key="product.id">
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
            <button
              class="btn btn-secondary btn-xs"
              type="button"
              data-original-title="btn btn-secondary btn-xs"
              :title="$t('common.update')"
              @click.prevent="
                $router.push({
                  name: 'product.form.desc',
                  params: { id: product.id },
                })
              "
            >
              {{ $t('common.update') }}
            </button>
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
</template>

<script>
import BaseDatatable from '../../../components/common/BaseDatatable.vue';
export default {
  components: { BaseDatatable },
  props: {
    useCurrentProduct: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
