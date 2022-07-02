<template>
  <div class="height-equal">
    <div class="contact-form border-0">
      <form class="theme-form" :title="$t('common.printer_config')">
        <div class="form-icon">
          <i class="icofont icofont-printer"></i>
        </div>
        <div class="mb-3">
          <BaseSelect
            v-model="defaultPrinter"
            label-class="col-form-label font-primary pt-0"
            class="form-select digits font-primary"
            :label="$t('common.fields.default_printer')"
            :options="getPrinters"
          />
        </div>
        <BaseSwitchInput
          v-model="canPrintAfterSale"
          label-class="font-primary pt-0 form-label fw-bold m-r-10"
          :label="$t('common.print_after_sale')"
        />
      </form>
    </div>
  </div>
  <div class="main-navbar">
    <div id="mainnav">
      <ul class="nav-menu custom-scrollbar">
        <li class="back-btn">
          <div class="mobile-back text-end">
            <span>Back</span
            ><i class="fa fa-angle-right ps-2" aria-hidden="true"></i>
          </div>
        </li>
        <li class="sidebar-main-title">
          <div>
            <h6>Liste des ventes</h6>
          </div>
        </li>
        <li
          v-for="(sale, index) in sales"
          :key="`sale-history-${sale.id}`"
          class="dropdown"
        >
          <a
            href="#"
            class="nav-link menu-title link-nav"
            @click.prevent="printSaleTicket(sale)"
          >
            <i class="m-r-10 font-secondary f-20">{{ `#${index + 1}` }}</i>
            <span>{{ sale.reference }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';

export default {
  components: { BaseSwitchInput, BaseSelect },
  computed: {
    ...mapGetters('cashier_session', ['currentSession']),
    ...mapGetters('sale', ['getSaleByCashierId']),
    ...mapGetters('printer', [
      'getPrinters',
      'getDefaultPrinter',
      'printAfterSale',
    ]),
    defaultPrinter: {
      get() {
        return this.getDefaultPrinter;
      },
      set(value) {
        this.$store.commit('printer/SET_DEFAULT_PRINTER', value);
      },
    },
    canPrintAfterSale: {
      get() {
        return this.printAfterSale;
      },
      set(value) {
        this.$store.commit('printer/SET_PRINT_AFTER_SALE', value);
      },
    },
    sales() {
      return this.getSaleByCashierId(this.currentSession?.cashier_id);
    },
  },
  methods: {
    printSaleTicket(saleOrder) {
      this.$store.dispatch('printer/printSaleBill', saleOrder);
    },
  },
};
</script>

<style scoped></style>
