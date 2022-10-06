<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form
                class="theme-form login-form"
                @submit.prevent="submitCashierSessionForm()"
              >
                <h4>{{ $t('sales.cashRegister.open') }}</h4>
                <h6>{{ $t('sales.cashRegister.openLabel') }}</h6>

                <div class="form-group">
                  <BaseSelect
                    v-model.number="cashierSessionField.cash_register_id"
                    :label="$t('common.attributes.cash_register_id')"
                    label-class="col-form-label"
                    :options="cashRegisters"
                    required
                    :errors="errors.cash_register_id"
                    key-label="label"
                    key-value="id"
                  />
                </div>
                <div class="form-group">
                  <BaseInput
                    v-model="cashierSessionField.pin"
                    :label="$t('common.fields.pin')"
                    label-class="col-form-label"
                    placeholder="****"
                    type="password"
                    required
                    :errors="errors.pin"
                  />
                </div>
                <div class="form-group">
                  <BaseButton
                    :text="$t('common.open_cash_register')"
                    :loading="loading"
                    class="btn btn-primary btn-block"
                  />
                </div>
                <div class="login-social-title">
                  <h5>.</h5>
                </div>
                <p>
                  {{ $t('common.use_another_account') }}
                  <a class="ms-2" href="#" @click.prevent="closeSessionAuth">
                    {{ $t('common.logout') }}
                    <span
                      v-if="loadingDisconnect"
                      class="fa fa-spinner fa-spin m-l-10"
                    />
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- page-wrapper end-->
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';

export default {
  name: 'CashierSessionAuth',
  components: { BaseInput, BaseSelect, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('cash_register/getCashRegistersList', {
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
  data() {
    return {
      loading: false,
      loadingDisconnect: false,
      cashierSessionField: {
        cash_register_id: null,
        pin: null,
      },
      errors: [],
    };
  },
  computed: {
    ...mapGetters('cash_register', ['cashRegisters']),
  },
  methods: {
    submitCashierSessionForm() {
      this.loading = true;
      this.$store
        .dispatch('cashier_session/openSession', this.cashierSessionField)
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
    closeSessionAuth() {
      this.loadingDisconnect = true;
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style scoped></style>
