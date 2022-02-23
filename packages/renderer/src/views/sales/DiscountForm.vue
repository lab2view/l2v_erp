<template>
  <BaseFormModal :submit-form="submitDiscountForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="name">{{
        $t('common.attributes.name')
      }}</label>
      <input
        id="name"
        v-model="discountForm.name"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />
      <div
        v-if="errors.name && errors.name.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.name[0] }}
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

export default {
  components: { BaseFormModal },
  data() {
    return {
      formLoading: false,
      errors: [],
      discountForm: {
        name: null,
      },
    };
  },
  computed: {
    title() {
      // return this.discount && this.discount.id
      //   ? this.$t('sales.discount.formUpdateTitle')
      //   : this.$t('sales.discount.formCreateTitle');
      return this.$t('sales.discount.formCreateTitle');
    },
  },
  created() {
  },
  beforeUnmount() {
    this.setLoading();
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitDiscountForm() {
    },
  },
};
</script>

<style scoped></style>
