<template>
  <BaseVerticalPanel :title="panelTitle">
    <div
      v-for="(saleRequest, index) in saleRequests"
      :key="saleRequest.id"
      class="media"
    >
      <a
        href="#"
        :title="$t('common.close')"
        @click.prevent="removePendingRequest(index)"
      >
        <i class="icofont icofont-close me-3"></i>
      </a>
      <div class="media-body mt-0">
        <h6 class="mt-0">
          {{
            `${$t('common.attributes.amount')} : ${
              saleRequest.amount
            } ${currency}`
          }}
        </h6>
        <p class="mb-0">
          <span class="icofont icofont-shopping-cart me-3" />
          <b>{{ saleRequest.stock_exit_lines.length }}</b>
          {{
            `${$t(
              'common.fields.article',
              saleRequest.stock_exit_lines.length
            )}`
          }}
          <a
            href="#"
            @click.prevent="setPendingToCurrentRequest(saleRequest, index)"
          >
            <span class="badge badge-primary pull-right">Finaliser</span>
          </a>
        </p>
        <span class="f-12">
          {{ date(saleRequest.background_at, true) }}
        </span>
      </div>
    </div>
  </BaseVerticalPanel>
</template>

<script>
import BaseVerticalPanel from '/@/components/common/BaseVerticalPanel.vue';
import { mapGetters } from 'vuex';
import FilterMixin from '/@/mixins/FilterMixin.js';

export default {
  components: { BaseVerticalPanel },
  mixins: [FilterMixin],
  computed: {
    ...mapGetters('cashier_session', ['saleRequests']),
    ...mapGetters('workspace', ['currency']),
    panelTitle() {
      const length = this.saleRequests.length;
      return `${this.$t(
        'common.pending_sale',
        length
      )} (${length})`.toUpperCase();
    },
  },
  methods: {
    removePendingRequest(index) {
      this.$store.commit('cashier_session/REMOVE_SALE_REQUEST', index);
    },

    setPendingToCurrentRequest(saleRequest, index) {
      this.$store.commit(
        'cashier_session/RESTORE_CURRENT_SALE_REQUEST',
        saleRequest
      );
      this.$store.commit('cashier_session/REMOVE_SALE_REQUEST', index);
      this.$router.back();
    },
  },
};
</script>

<style scoped></style>
