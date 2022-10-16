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
      <div class="sidebar-main-title m-l-20">
        <div>
          <h6>
            {{ $t('common.sale.list') }}
            <a href="#" class="m-l-50" @click.prevent="handleSearchSaleAction">
              <i class="fa fa-refresh" :class="loading ? 'fa-pulse' : ''" />
            </a>
          </h6>
        </div>
      </div>
      <ul
        class="nav-menu custom-scrollbar align-items-end"
        style="height: 360px"
      >
        <li class="back-btn">
          <div class="mobile-back text-end">
            <span>Back</span
            ><i class="fa fa-angle-right ps-2" aria-hidden="true"></i>
          </div>
        </li>
        <li
          v-for="sale in cashier_sales"
          :key="`sale-history-${sale.id}`"
          class="f-w-400 shadow-sm"
        >
          <router-link
            :to="{
              name: 'sales.session.cashier.sale.detail',
              params: { ...$route.params, sale_id: sale.id },
            }"
            class="nav-link menu-title link-nav"
          >
            <i class="m-r-10 font-secondary f-16">
              {{ `# ${sale.code}` }}
            </i>
            <p>
              <i class="fa fa-calendar m-r-5" />
              {{ $d(sale.created_at, 'short') }}
            </p>
          </router-link>
        </li>
      </ul>
      <div class="m-3">
        <BaseInputGroup
          v-model="keyword"
          :placeholder="$t('common.attributes.search')"
          @keydown.enter="handleSearchSaleAction"
        >
          <BaseButton
            class="btn btn-iconsolid btn-primary"
            :loading="loading"
            @click.prevent="handleSearchSaleAction"
          >
            <i v-if="!loading" class="fa fa-search" />
          </BaseButton>
        </BaseInputGroup>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseInputGroup, BaseSwitchInput, BaseSelect },
  data() {
    return {
      keyword: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('cashier_session', ['currentSession']),
    ...mapGetters('sale', ['cashier_sales']),
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
  },
  methods: {
    handleSearchSaleAction() {
      this.loading = true;
      this.$store
        .dispatch('sale/getCashierSaleList', {
          cashier_id: this.currentSession.cashier_id,
          keyword: this.keyword,
          search: true,
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
