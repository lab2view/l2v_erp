<template>
  <BaseFormModal :title="title" :submit-form="submitPackageForm">
    <div class="mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="packageForm.label"
        class="form-control"
        type="text"
        placeholder="Palette, Carton, ..."
        required
      />
      <div v-if="errors.label" class="invalid-feedback" style="display: inline">
        {{ errors.label[0] }}
      </div>
    </div>
    <template #footer>
      <button class="btn btn-primary" type="submit" :title="$t('common.save')">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '../../../../components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      packageForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('packageConfig', ['packageModel']),
    title() {
      return this.packageModel
        ? this.$t('product.package.formUpdateTitle')
        : this.$t('product.package.formCreateTitle');
    },
  },
  created() {
    if (this.packageModel) this.packageForm = this.packageModel;
  },
  beforeUnmount() {
    if (this.packageModel)
      this.$store.commit('packageConfig/SET_CURRENT_PACKAGE', null);
  },
  methods: {
    submitPackageForm() {
      if (this.packageModel)
        this.$store
          .dispatch('packageConfig/updatePackage', this.packageForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('packageConfig/addPackage', this.packageForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
