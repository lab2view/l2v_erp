<template>
  <BaseFormModal :submit-form="submitSaleTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
          $t('common.attributes.label')
        }}</label>
      <input
        id="label"
        v-model="saleTypeForm.label"
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
import {mapGetters} from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      formLoading: false,
      errors: [],
      saleTypeForm: {
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('sale_type', ['saleType']),
    title() {
      return this.saleType && this.saleType.id
        ? this.$t('sales.saleType.formUpdateTitle')
        : this.$t('sales.saleType.formCreateTitle');
    },
  },
  created() {
    if (this.saleType && this.saleType.id)
      this.saleTypeForm = this.saleType;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.saleType && this.saleType.id)
      this.$store.commit(
        'sale_type/SET_CURRENT_SALE_TYPE',
        null
      );
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitSaleTypeForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.saleType && this.saleType.id) {
        this.$store.dispatch(
          'sale_type/updateSaleType',
          this.saleTypeForm,
        )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch(
            'sale_type/addSaleType',
            this.saleTypeForm,
          )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
