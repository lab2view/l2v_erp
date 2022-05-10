<template>
  <div class="card-body row pricing-content justify-content-center">
    <div
      v-for="cashRegister in cashRegisters"
      :key="cashRegister.id"
      class="col-xl-3 col-sm-6 xl-50 box-col-6"
    >
      <div class="card text-center pricing-simple">
        <div class="card-body">
          <h3>{{ cashRegister.label }}</h3>
          <h1>{{ cashRegister.cashier_sessions.length }}</h1>
          <h6 class="mb-0">{{ cashRegister.code }}</h6>
        </div>
        <a class="btn btn-lg btn-primary btn-block" href="javascript:void(0)">
          <h5 class="mb-0">Ouvrir la caisse</h5>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';

export default {
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
  computed: {
    ...mapGetters('cash_register', ['cashRegisters']),
  },
};
</script>

<style scoped></style>
