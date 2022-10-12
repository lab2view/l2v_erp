<template>
  <BaseFormModal :title="title" :submit-form="submitPriceTypeForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="priceTypeForm.label"
        class="form-control"
        type="text"
        placeholder="Achat, Sell..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <BaseButton
        class="btn btn-primary col-auto"
        :text="$t('common.save')"
        icon="fa fa-save"
        :loading="loading"
      />
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton, BaseFormModal },
  data() {
    return {
      errors: [],
      loading: false,
      priceTypeForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('price_type', ['priceType']),
    title() {
      return this.priceType
        ? this.$t('articles.priceType.formUpdateTitle')
        : this.$t('articles.priceType.formCreateTitle');
    },
  },
  created() {
    if (this.priceType) this.priceTypeForm = this.priceType;
  },
  beforeUnmount() {
    if (this.priceType)
      this.$store.commit('price_type/SET_CURRENT_PRICE_TYPE', null);
  },
  methods: {
    submitPriceTypeForm() {
      this.loading = true;
      if (this.priceType)
        this.$store
          .dispatch('price_type/updatePriceType', this.priceTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('price_type/addPriceType', this.priceTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
