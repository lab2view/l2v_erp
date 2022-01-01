<template>
  <div class="card-body">
    <div class="row mt-2 m-r-10 pt-1 align-items-center">
      <div class="col-sm-auto ml-3">
        <div class="dataTables_length">
          <label>
            Page
            <select aria-controls="basic-1" class="round">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
      <div class="col"></div>
      <div class="col-sm-auto">
        <BasePagination />
      </div>
    </div>
  </div>
</template>

<script>
import BasePagination from './BasePagination.vue';
export default {
  name: 'BaseDatatableFooter',
  components: { BasePagination },
};
</script>

<style scoped>
div.dataTables_length label {
  float: left;
  text-align: left;
  margin-bottom: 0;
}
div.dataTables_length select {
  width: 75px;
  margin-bottom: 0;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}
</style>
