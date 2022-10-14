<template>
  <BaseEmptyModelList
    v-if="isEmpty"
    :label="'Aucun Enregistrement'"
    :with-action="hasAction"
    @click="executeFetchAction"
  />

  <div v-else class="table-responsive product-table">
    <table id="datatable-dt" class="display">
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
    fetchAction: {
      type: Function,
      default: () => Promise.resolve(),
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
      $('#datatable-dt').DataTable({
        info: !!this.tableInfos,
        dom: 'rt<"bottom"lpf><"clear">',
        language: {
          info: this.tableInfos ?? false,
        },
      });
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
