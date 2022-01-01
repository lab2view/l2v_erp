<template>
  <div class="table-responsive">
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
          safdasd
          <slot name="headers" />
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseDatatable',
  props: {
    tfoot: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    $('#datatable-dt').DataTable();
  },
};
</script>

<style scoped></style>
