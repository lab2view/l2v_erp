<template>
  <BaseFormModal :submit-form="submitDiscountTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="discountTypeForm.label"
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
    <div class="mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="discountTypeForm.description"
        class="form-control"
        placeholder="..."
      ></textarea>
      <div
        v-if="errors.description"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.description[0] }}
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
      formLoading: false,
      errors: [],
      discountTypeForm: {
        label: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('discount_type', ['discountType']),
    title() {
      return this.discountType && this.discountType.id
        ? this.$t('sales.discountType.formUpdateTitle')
        : this.$t('sales.discountType.formCreateTitle');
    },
  },
  created() {
    if (this.discountType && this.discountType.id)
      this.discountTypeForm = this.discountType;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.discountType && this.discountType.id)
      this.$store.commit('discount_type/SET_CURRENT_DISCOUNT_TYPE', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitDiscountTypeForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.discountType && this.discountType.id) {
        this.$store
          .dispatch('discount_type/updateDiscountType', this.discountTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('discount_type/addDiscountType', this.discountTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error?.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
