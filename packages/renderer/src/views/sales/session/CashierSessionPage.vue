<template>
  <div class="card m-0 p-0">
    <div class="card-header mb-0 pb-0">
      <BaseFieldGroup>
        <VSelect
          class="form-control"
          style="background-color: rgba(36, 105, 92, 0.1); color: #24695c"
          :options="[
            { label: 'Canada', code: 'ca' },
            { label: 'Cameroun', code: 'cm' },
          ]"
          placeholder="Rechercher un produit ou scanner"
        />
        <template #append>
          <span
            class="input-group-text font-primary f-24"
            style="background-color: rgba(36, 105, 92, 0.1)"
          >
            <label class="fa fa-barcode"> </label>
          </span>
        </template>
      </BaseFieldGroup>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <div class="card table-responsive" style="height: 39vh">
            <table class="table table-lg table-hover">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Articles</th>
                  <th scope="col">Prix Unit</th>
                  <th scope="col" class="text-center" style="width: 220px">
                    Qte
                  </th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="bd-t-none u-s-tb">
                    <div class="media">
                      <img
                        class="img-30 me-4 rounded-circle"
                        src="../../../assets/images/user/3.jpg"
                        alt=""
                        data-original-title=""
                        title=""
                      />
                      <div class="media-body">
                        <div class="font-primary f-w-500">
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
                        class="img-30 me-4 rounded-circle"
                        src="../../../assets/images/user/3.jpg"
                        alt=""
                        data-original-title=""
                        title=""
                      />
                      <div class="media-body">
                        <div class="font-primary f-w-500">
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
                        class="img-30 me-4 rounded-circle"
                        src="../../../assets/images/user/3.jpg"
                        alt=""
                        data-original-title=""
                        title=""
                      />
                      <div class="media-body">
                        <div class="font-primary f-w-500">
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
          <div class="mb-3">
            <label
              class="col-form-label font-primary pt-0"
              for="exampleInputEmail1"
            >
              Type de prix ?
            </label>
            <select
              id="exampleInputEmail1"
              class="form-select digits font-primary"
            >
              <option>Prix de vente</option>
              <option>Prix de gros</option>
            </select>
          </div>
          <hr />
          <BaseButton
            type="button"
            text="Vider la liste"
            class="btn btn-outline-secondary"
            icon="fa fa-trash"
          />
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row align-items-end">
        <div class="col">
          <div class="row">
            <div class="col">
              <span class="font-primary"> Méthode de paiement ? </span>
              <div
                class="form-group m-b-0 m-l-5 m-checkbox-inline font-primary"
              >
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
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';

export default {
  components: { BaseFieldGroup, BaseInputGroup, BaseButton, VSelect },
};
</script>

<style scoped>
>>> {
  /* Font */
  --vs-font-size: 1rem;
  --vs-line-height: 1.4;

  /* Borders */
  --vs-border-width: 0px;
  --vs-border-radius: 0px;

  /* Component Controls: Clear, Open Indicator */
  --vs-controls-size: 0;

  /* Active State */
  --vs-dropdown-option--active-bg: #24695c;
  --vs-dropdown-option--active-color: #fff;
}
.btn-lg {
  font-size: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
