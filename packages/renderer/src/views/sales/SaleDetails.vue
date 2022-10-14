<template>
  <BaseModal
    modal-size="lg"
    :title="`Details de la vente - ${sale.code}`"
  ></BaseModal>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseModal from '/@/components/common/BaseModal.vue';

export default {
  name: 'SaleDetails',
  components: { BaseModal },
  computed: {
    ...mapGetters('sale', ['sale', 'getSelectedSaleById']),
    selectableSale() {
      return this.getSelectedSaleById(this.sale.id);
    },
  },
};
</script>

<style scoped></style>
