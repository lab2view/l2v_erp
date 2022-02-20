<template>
  <BaseFormModal :submit-form="submitInventoryForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="inventoryForm.label"
        class="form-control"
        placeholder="Particular, Agency..."
        required
        type="text"
      />
      <div
        v-if="errors.label && errors.label.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      inventoryForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    ...mapGetters('inventory', ['inventory']),
    title() {
      return this.inventory && this.inventory.id
        ? this.$t('stocks.inventory.formUpdateTitle')
        : this.$t('stocks.inventory.formCreateTitle');
    },
  },
  created() {
    if (this.inventory && this.inventory.id)
      this.inventoryForm = this.inventory;
  },
  beforeUnmount() {
    if (this.inventory && this.inventory.id)
      this.$store.commit('inventory/SET_CURRENT_INVENTORY', null);
  },
  methods: {
    submitInventoryForm() {
      if (this.inventory && this.inventory.id)
        this.$store
          .dispatch('inventory/updateInventory', this.inventoryForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('inventory/addInventory', this.inventoryForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
