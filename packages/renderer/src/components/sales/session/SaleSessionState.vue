<template>
  <div class="card-body">
    <div class="row align-items-end">
      <div class="col">
        <div class="row">
          <div class="col">
            <span class="font-primary"> Méthode de paiement ? </span>
            <div class="form-group m-b-0 m-l-5 m-checkbox-inline font-primary">
              <div class="checkbox checkbox-primary checkbox-solid-success">
                <input id="inline-1" type="checkbox" />
                <label for="inline-1">CASH</label>
              </div>
              <div class="checkbox checkbox-primary">
                <input id="inline-2" type="checkbox" />
                <label for="inline-2">ORANGE MONEY</label>
              </div>
              <div class="checkbox checkbox-primary">
                <input id="inline-3" type="checkbox" />
                <label for="inline-3">MTN MOBILE MONEY</label>
              </div>
            </div>
          </div>
          <div class="col-3 align-items-start">
            <span class="font-primary"> Type de vente ?</span>
            <select class="form-select digits font-primary">
              <option>Vente en gros</option>
              <option>Vente en details</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <table class="table table-bordered">
              <tbody>
                <tr class="table-success">
                  <td class="font-primary bg-white" style="width: 20%">
                    <h6 class="mb-0">SOUS TOTAL :</h6>
                  </td>
                  <td class="font-primary bg-white" style="width: 30%">
                    <h5 class="mb-0 f-w-600 p-l-10">7 500 CFA</h5>
                  </td>
                  <td
                    class="font-primary"
                    style="width: 50%"
                    rowspan="2"
                    colspan="2"
                  >
                    <h6 class="mb-0">PRIX TOTAL</h6>
                    <h3 class="text-center text- f-w-800">7 500 CFA</h3>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary" style="width: 20%">
                    <h6 class="mb-0">REMISE :</h6>
                  </td>
                  <td class="font-primary" style="width: 30%">
                    <h5 class="mb-0 f-w-600 p-l-10">0 CFA</h5>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary">
                    <h6 class="mb-0">TVA :</h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 f-w-600 p-l-10">800 CFA</h5>
                  </td>
                  <td class="font-primary">
                    <h6 class="mb-0 f-w-600 p-l-10">MONTANT RECU :</h6>
                  </td>
                  <td class="font-primary">
                    <BaseInputGroup
                      type="number"
                      min="0"
                      class="font-primary f-w-600 form-control f-40"
                      autofocus
                      model-value="10000"
                    >
                      <span class="input-group-text font-primary pt-1 pb-1"
                        >CFA</span
                      >
                    </BaseInputGroup>
                  </td>
                </tr>
                <tr>
                  <td class="font-primary">
                    <h6 class="mb-0">TOTAL ARTICLES :</h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 f-w-600 p-l-10">8</h5>
                  </td>
                  <td class="font-primary">
                    <h6 class="mb-0 f-w-600 p-l-10">RESTE :</h6>
                  </td>
                  <td class="font-primary">
                    <h5 class="mb-0 p-l-10">2 500 CFA</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="row">
          <BaseButton
            type="button"
            text="Mettre en attente"
            class="btn btn-outline-primary btn-block mb-3"
          />
        </div>
        <div class="row">
          <BaseButton
            type="button"
            text="Faire une remise"
            class="btn btn-outline-primary btn-block mb-3"
          />
        </div>
        <div class="row">
          <BaseButton
            type="button"
            text="ENCAISSER"
            class="btn btn-primary-light btn-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  components: { BaseButton, BaseInputGroup },
};
</script>

<style scoped>
.btn-lg {
  font-size: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
