<template>
  <BaseFormModal :submit-form="submitShippingForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="shippingForm.label"
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
      formLoading: false,
      shippingForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    ...mapGetters('shipping', ['shipping']),
    title() {
      return this.shipping && this.shipping.id
        ? this.$t('stocks.shipping.formUpdateTitle')
        : this.$t('stocks.shipping.formCreateTitle');
    },
  },
  created() {
    if (this.shipping && this.shipping.id) this.shippingForm = this.shipping;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.shipping && this.shipping.id)
      this.$store.commit('shipping/SET_CURRENT_SHIPPING', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitShippingForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.shipping && this.shipping.id) {
        this.$store
          .dispatch('shipping/updateShipping', this.shippingForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('shipping/addShipping', this.shippingForm)
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
