<template></template>

<script>
import ArticleLineSelectable from '/@/components/articles/ArticleLineSelectable.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import store from '/@/store/index.js';
import { mapGetters } from 'vuex';
import { stockStateCode } from '/@/helpers/codes.js';

export default {
  components: { ArticleLineSelectable, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('stock_state/getStockStatesList', {
        page: 1,
        field: {},
      })
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  data() {
    return {
      selected: [],
      loading: false,
    };
  },
  computed: {
    ...mapGetters('stock_exit', [
      'stockExitLines',
      'stockExitReference',
      'stockExitIsConfirm',
      'currentStockExitStateDate',
    ]),
    ...mapGetters('stock_state', ['getStockStateByCode']),
    partialSelect() {
      return (
        this.selected.length > 0 &&
        this.selected.length < this.stockExitLines.length
      );
    },
    selectedAllStockExitLine() {
      if (this.stockExitLines.length)
        return this.selected.length === this.stockExitLines.length;
      else return false;
    },
    selectAll: {
      get() {
        return this.selectedAllStockExitLine;
      },
      set(value) {
        if (!value) this.selected = [];
        else {
          let result = [];
          this.stockExitLines.forEach((ag) => result.push(ag.id));
          this.selected = result;
        }
      },
    },
    isSelected() {
      return this.selected.length > 0;
    },
    countSelected() {
      return this.isSelected ? `( ${this.selected.length} )` : '';
    },
  },
  methods: {
    selectStockExitLine(stockExitLine, adding) {
      if (adding) this.selected.push(stockExitLine.id);
      else
        this.selected = this.selected.filter((id) => id !== stockExitLine.id);
    },
    deleteSelectedStockExitLine() {
      if (
        this.selected.length &&
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.$t('common.deleted_selection'),
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('stock_exit/removeStockExitLines', this.selected)
          .then(() => {
            this.loading = false;
            this.selected = [];
          });
      }
    },
    confirmStockEntrySate() {
      if (confirm(this.$t('messages.confirmFinishEntryStock', { label: '' }))) {
        const state = this.getStockStateByCode(stockStateCode.success);
        if (state !== undefined) {
          this.loading = true;
          this.$store
            .dispatch('stock_entry/changeStockEntryState', state.id)
            .finally(() => (this.loading = false));
        }
      }
    },
  },
};
</script>

<style scoped></style>
