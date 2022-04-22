<template>
  <BaseEmptyModelList
    v-if="isEmpty"
    :label="'Aucun Enregistrement'"
    :with-action="true"
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
          <slot name="headers" />
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
  mounted() {
    setTimeout(() => {
      (async () => {
        return Promise.all([
          await this.$loadScript(`./src/assets/js/jquery-3.5.1.min.js`),
          await this.$loadScript(
            `./src/assets/js/datatable/datatables/jquery.dataTables.min.js`
          ),
        ]);
      })().then(() => {
        $('#datatable-dt').DataTable({
          info: !!this.tableInfos,
          language: {
            info: this.tableInfos ?? false,
          },
        });
      });
    }, 1);
  },
  methods: {
    executeFetchAction() {
      this.$store.dispatch('setGlobalLoading', true);
      this.fetchAction().finally(() =>
        this.$store.dispatch('setGlobalLoading', false)
      );
    },
  },
};
</script>

<style scoped></style>
