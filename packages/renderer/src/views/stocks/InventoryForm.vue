<template>
  <BaseFormModal :submit-form="submitInventoryForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="reference">{{
        $t('common.attributes.reference')
      }}</label>
      <input
        id="reference"
        v-model="inventoryForm.reference"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />
      <div
        v-if="errors.reference && errors.reference.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.reference[0] }}
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
  name: 'InventoryForm',
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      inventoryForm: {
        id: null,
        reference: null,
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
    this.setLoading();
    if (this.inventory && this.inventory.id)
      this.$store.commit('inventory/SET_CURRENT_INVENTORY', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitInventoryForm() {
      if (this.formLoading) {
        return;
      }

      // todo: validate and user_id form
      this.setLoading(true);
      if (this.inventory && this.inventory.id) {
        this.$store
          .dispatch('inventory/updateInventory', this.inventoryForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('inventory/addInventory', this.inventoryForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
