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
  name: 'PackageForm',
  components: { BaseButton, BaseFormModal },
  data() {
    return {
      errors: [],
      loading: false,
      packageForm: {
        id: null,
        label: null,
        code: null,
      },
    };
  },
  computed: {
    ...mapGetters('package', ['packageModel']),
    title() {
      return this.packageModel
        ? this.$t('products.package.formUpdateTitle')
        : this.$t('products.package.formCreateTitle');
    },
  },
  created() {
    if (this.packageModel) this.packageForm = this.packageModel;
  },
  beforeUnmount() {
    if (this.packageModel)
      this.$store.commit('package/SET_CURRENT_PACKAGE', null);
  },
  methods: {
    submitPackageForm() {
      this.loading = true;
      if (this.packageModel)
        this.$store
          .dispatch('package/updatePackage', this.packageForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            this.loading = false;
            console.log(error);
          });
      else
        this.$store
          .dispatch('package/addPackage', this.packageForm)
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
