<template>
  <BaseFormModal :submit-form="submitEnterpriseTypeForm" :title="title">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="enterpriseTypeForm.label"
        class="form-control"
        placeholder="Branch, Agency..."
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
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="enterpriseTypeForm.description"
        class="form-control"
        placeholder="Petite description.."
        type="text"
      ></textarea>
      <div
        v-if="errors.description && errors.description.length"
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
    if (this.enterpriseType && this.enterpriseType.id)
      this.enterpriseTypeForm = this.enterpriseType;
  },
  beforeUnmount() {
    if (this.enterpriseType && this.enterpriseType.id)
      this.$store.commit(
        'enterpriseTypeConfig/SET_CURRENT_ENTERPRISE_TYPE',
        null
      );
  },
  methods: {
    submitEnterpriseTypeForm() {
      if (this.enterpriseType && this.enterpriseType.id)
        this.$store
          .dispatch(
            'enterpriseTypeConfig/updateEnterpriseType',
            this.enterpriseTypeForm
          )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch(
            'enterpriseTypeConfig/addEnterpriseType',
            this.enterpriseTypeForm
          )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
