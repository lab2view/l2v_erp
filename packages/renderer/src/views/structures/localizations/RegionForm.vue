<template>
  <BaseFormModal :title="title" :submit-form="submitEnterpriseTypeForm">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.name')
      }}</label>
      <input
        id="label"
        v-model="enterpriseTypeForm.name"
        class="form-control"
        type="text"
        placeholder="Branch, Agency..."
        required
      />
      <div v-if="errors.name && errors.name.length" class="invalid-feedback" style="display: inline">
        {{ errors.name[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="enterpriseTypeForm.description"
        class="form-control"
        type="text"
        placeholder="Petite description.."
      ></textarea>
      <div v-if="errors.description && errors.description.length" class="invalid-feedback" style="display: inline">
        {{ errors.description[0] }}
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
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';

export default {
  components: { BaseFormModal },
  data() {
    return {
      errors: [],
      enterpriseTypeForm: {
        id: null,
        label: null,
        code: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterpriseTypeConfig', ['enterpriseType']),
    title() {
      return this.enterpriseType && this.enterpriseType.id
        ? this.$t('structures.enterpriseType.formUpdateTitle')
        : this.$t('structures.enterpriseType.formCreateTitle');
    },
  },
  created() {
    if (this.enterpriseType && this.enterpriseType.id) this.enterpriseTypeForm = this.enterpriseType;
  },
  beforeUnmount() {
    if (this.enterpriseType && this.enterpriseType.id)
      this.$store.commit('enterpriseTypeConfig/SET_CURRENT_ENTERPRISE_TYPE', null);
  },
  methods: {
    submitEnterpriseTypeForm() {
      if (this.enterpriseType && this.enterpriseType.id)
        this.$store
          .dispatch('enterpriseTypeConfig/updateEnterpriseType', this.enterpriseTypeForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('enterpriseTypeConfig/addEnterpriseType', this.enterpriseTypeForm)
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
