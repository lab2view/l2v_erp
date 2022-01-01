<template>
  <div class="card">
    <div class="card-header pb-2 border-bottom border-bottom-">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>Order history</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <a href="#" class="btn btn-primary" type="button">
            <i class="fa fa-plus m-r-5" />
            Ajouter
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <BaseDatatable :tfoot="false">
        <template #headers>
          <th>sadfsdf</th>
        </template>
        <tr>
          <td>safdasd</td>
        </tr>
      </BaseDatatable>
    </div>
  </div>
</template>

<script>
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
export default {
  components: { BaseDatatable },
};
</script>

<style scoped></style>
