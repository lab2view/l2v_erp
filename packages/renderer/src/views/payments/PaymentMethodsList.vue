<template>
  <BaseContainer
    :module="$t('menu.modules.payments')"
    :title="$t('payments.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('payments.paymentMethod.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.payments.method.form' }"
              class="btn btn-primary"
              href="#"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
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

export default {
  components: { BaseContainer, BaseDatatable },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('paymentMethod/getPaymentMethodsList', {
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
    ...mapGetters('paymentMethod', ['paymentMethods', 'paymentMethod']),
  },
  created() {
    if (this.paymentMethod)
      this.$store.commit('paymentMethod/SET_CURRENT_PAYMENT_METHOD', null);
  },

  methods: {
    deletePaymentMethod(paymentMethod) {
      if (
        confirm(
          this.$t('messages.confirmDelete', { label: paymentMethod.label })
        )
      )
        this.$store.dispatch(
          'paymentMethod/deletePaymentMethod',
          paymentMethod.id
        );
    },
  },
};
</script>

<style scoped></style>
