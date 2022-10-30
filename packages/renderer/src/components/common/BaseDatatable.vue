<template>
  <BaseEmptyModelList
    v-if="isEmpty"
    :label="'Aucun Enregistrement'"
    :with-action="hasAction"
    @click="executeFetchAction"
  />

  <div v-else class="product-table">
    <table id="datatable-dt" class="display" style="width: 100%">
      <thead>
        <tr>
          <slot name="headers" />
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
      <tfoot v-if="tfoot">
        <tr>
          <slot name="footers" />
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import BaseEmptyModelList from './BaseEmptyModelList.vue';
export default {
  name: 'BaseDatatable',
  components: { BaseEmptyModelList },
  props: {
    tfoot: {
      type: Boolean,
      default: false,
    },
    hasAction: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: null,
    },
    pageLength: {
      type: Number,
      default: 10,
    },
    scrollY: {
      type: [String, Boolean],
      default: false,
    },
    fetchAction: {
      type: Function,
      default: () => Promise.resolve(),
    },
    buttons: {
      type: Array,
      default: null,
    },
  },
  computed: {
    tableInfos() {
      return this.total ? `${this.total} lines` : false;
    },
    isEmpty() {
      return this.total === 0;
    },
  },
  watch: {
    total(newValue, oldValue) {
      if (oldValue === 0 && newValue > 0)
        setTimeout(() => this.initDatatable(), 100);
    },
  },
  mounted() {
    Promise.all([
      this.$loadScript(`./src/assets/js/jquery-3.5.1.min.js`),
      this.$loadScript(
        `./src/assets/js/datatable/datatables/jquery.dataTables.min.js`
      ),
    ]).finally(() => this.initDatatable());
  },
  methods: {
    initDatatable() {
      let dataTableOption = {
        pageLength: this.pageLength,
        responsive: true,
        info: !!this.tableInfos,
        language: {
          info: this.tableInfos ?? false,
        },
      };
      if (this.buttons?.length) {
        dataTableOption.dom = 'Blfrtip';
        dataTableOption.buttons = this.buttons;
      }
      if (this.scrollY) dataTableOption.scrollY = this.scrollY;
      $('#datatable-dt').DataTable(dataTableOption);
    },
    executeFetchAction() {
      this.$store.dispatch('setGlobalLoading', true);
      this.fetchAction().finally(() => {
        this.$store.dispatch('setGlobalLoading', false);
      });
    },
  },
};
</script>

<style scoped></style>
