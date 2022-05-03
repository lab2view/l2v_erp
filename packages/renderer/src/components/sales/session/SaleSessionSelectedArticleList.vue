<template>
  <div class="col">
    <div class="card table-responsive" style="height: 37vh">
      <table class="table table-lg table-hover">
        <thead class="table-primary">
          <tr>
            <th>Articles</th>
            <th>Prix Unit</th>
            <th class="text-center" style="width: 220px">Qte</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bd-t-none u-s-tb">
              <div class="media">
                <img
                  class="img-20 me-4 rounded-circle"
                  src="../../../assets/images/user/3.jpg"
                  alt=""
                  data-original-title=""
                  title=""
                />
                <div class="media-body">
                  <div class="font-primary f-w-500 f-12">
                    Carton de 50 Pagnes \ TESTPRODUCT - 1 YARD
                    <span class="text-muted">(14+ Online)</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="font-primary">
              1 500 CFA
              <span class="font-secondary m-l-5 fa fa-edit" />
            </td>
            <td>
              <BaseInputGroup
                type="number"
                min="1"
                class="font-primary f-w-600 form-control-sm f-40"
                model-value="05"
              >
                <template #prefix>
                  <button
                    class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                  >
                    <span class="fa fa-minus" />
                  </button>
                </template>
                <button
                  class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                >
                  <span class="fa fa-plus" />
                </button>
              </BaseInputGroup>
            </td>
            <td class="font-primary">
              <span class="f-w-600"> 7 500 CFA </span>
            </td>
          </tr>
          <tr>
            <td class="bd-t-none u-s-tb">
              <div class="media">
                <img
                  class="img-20 me-4 rounded-circle"
                  src="../../../assets/images/user/3.jpg"
                  alt=""
                  data-original-title=""
                  title=""
                />
                <div class="media-body">
                  <div class="font-primary f-w-500 f-12">
                    Carton de 50 Pagnes \ TESTPRODUCT - 1 YARD
                    <span class="text-muted">(14+ Online)</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="font-primary">1 500 CFA</td>
            <td>
              <BaseInputGroup
                type="number"
                min="1"
                class="font-primary f-w-600 form-control-sm f-40"
                model-value="05"
              >
                <template #prefix>
                  <button
                    class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                  >
                    <span class="fa fa-minus" />
                  </button>
                </template>
                <button
                  class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                >
                  <span class="fa fa-plus" />
                </button>
              </BaseInputGroup>
            </td>
            <td class="font-primary">
              <span class="f-w-600"> 7 500 CFA </span>
            </td>
          </tr>
          <tr>
            <td class="bd-t-none u-s-tb">
              <div class="media">
                <img
                  class="img-20 me-4 rounded-circle"
                  src="../../../assets/images/user/3.jpg"
                  alt=""
                  data-original-title=""
                  title=""
                />
                <div class="media-body">
                  <div class="font-primary f-w-500 f-12">
                    Carton de 50 Pagnes \ TESTPRODUCT - 1 YARD
                    <span class="text-muted">(14+ Online)</span>
                  </div>
                </div>
              </div>
            </td>
            <td class="font-primary">1 500 CFA</td>
            <td>
              <BaseInputGroup
                type="number"
                min="1"
                class="font-primary f-w-600 form-control-sm f-40"
                model-value="05"
              >
                <template #prefix>
                  <button
                    class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                  >
                    <span class="fa fa-minus" />
                  </button>
                </template>
                <button
                  class="input-group-text btn btn-primary btn-iconsolid pt-1 pb-1"
                >
                  <span class="fa fa-plus" />
                </button>
              </BaseInputGroup>
            </td>
            <td class="font-primary">
              <span class="f-w-600"> 7 500 CFA </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="col-auto">
    <BaseButton
      type="button"
      text="Vider la liste"
      class="btn btn-outline-secondary"
      icon="fa fa-trash"
    />
  </div>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  components: { BaseButton, BaseInputGroup },
};
</script>

<style scoped></style>
