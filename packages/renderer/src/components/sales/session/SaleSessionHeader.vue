<template>
  <div class="card-header mb-0 pb-0">
    <div class="row align-items-center">
      <div class="col">
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
            <a
              href="#"
              title="Scan"
              class="input-group-text font-primary f-24"
              style="background-color: rgba(36, 105, 92, 0.1)"
            >
              <span class="fa fa-barcode"> </span>
            </a>
          </template>
        </BaseFieldGroup>
      </div>
      <div class="col-2">
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
      </div>
    </div>
  </div>
</template>

<script>
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFieldGroup, VSelect },
  computed: {
    ...mapGetters('article', ['sell_articles']),
    articles() {
      return this.data;
    },
  },
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
</style>
