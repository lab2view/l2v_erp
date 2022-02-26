<template>
  <BaseFormModal :submit-form="submitStockTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="provisionForm.label"
        class="form-control"
        placeholder="..."
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
// import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      formLoading: false,
      provisionForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    title() {
      // return this.provision && this.provision.id
      //   ? this.$t('stock.provision.formUpdateTitle')
      //   : this.$t('stock.provision.formCreateTitle');
      return this.$t('stock.provision.formCreateTitle');
    },
  },
  created() {
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitStockTypeForm() {
      // if (this.formLoading) {
      //   return;
      // }
      //
      // this.setLoading(true);
    },
  },
};
</script>

<style scoped></style>
