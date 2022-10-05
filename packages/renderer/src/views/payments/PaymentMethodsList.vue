<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <BaseTableHeader
        :title="$t('payments.paymentMethod.listTitle')"
        add-action-router-name="config.payments.method.form"
        :refresh-action-field="{ page: 1, field: { next: true } }"
        refresh-action-name="payment_method/getPaymentMethodsList"
      />
      <div class="card-body">
        <BaseDatatable :tfoot="false" :total="paymentMethods.length">
          <template #headers>
            <th>#</th>
            <th>{{ $t('common.attributes.label') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr v-for="paymentMethod in paymentMethods" :key="paymentMethod.id">
            <td>{{ paymentMethod.id }}</td>
            <td>{{ paymentMethod.label }}</td>
            <td>
              <button
                :title="$t('common.update')"
                class="btn btn-secondary btn-xs"
                data-original-title="btn btn-secondary btn-xs"
                type="button"
                @click.prevent="
                  $router.push({
                    name: 'config.payments.method.form',
                    params: { id: paymentMethod.id },
                  })
                "
              >
                {{ $t('common.update') }}
              </button>
              <button
                :title="$t('common.delete')"
                class="btn btn-danger btn-xs m-l-5"
                data-original-title="btn btn-danger btn-xs"
                type="button"
                @click.prevent="deletePaymentMethod(paymentMethod)"
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
      .dispatch('payment_method/getPaymentMethodsList', {
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
    ...mapGetters('payment_method', ['paymentMethods', 'paymentMethod']),
  },
  created() {
    if (this.paymentMethod)
      this.$store.commit('payment_method/SET_CURRENT_PAYMENT_METHOD', null);
  },

  methods: {
    deletePaymentMethod(paymentMethod) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: paymentMethod.label })
        )
      )
        this.$store.dispatch(
          'payment_method/deletePaymentMethod',
          paymentMethod.id
        );
    },
  },
};
</script>

<style scoped></style>
