<template>
  <BaseFormModal :title="title" :submit-form="submitEnterpriseForm">
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="name">{{
        $t('common.attributes.name')
      }}</label>
      <input
        id="name"
        v-model="enterpriseForm.name"
        class="form-control"
        type="text"
        placeholder="Achat, Sell..."
        required
      />
      <div v-if="errors.name" class="invalid-feedback" style="display: inline">
        {{ errors.name[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="phone">{{
        $t('common.attributes.phone')
      }}</label>
      <input
        id="phone"
        v-model="enterpriseForm.phone"
        class="form-control"
        type="text"
        placeholder="Achat, Sell..."
        required
      />
      <div v-if="errors.phone" class="invalid-feedback" style="display: inline">
        {{ errors.phone[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="description">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        id="description"
        v-model="enterpriseForm.description"
        class="form-control"
        type="text"
        placeholder="Petite description.."
        required
      ></textarea>
      <div v-if="errors.description" class="invalid-feedback" style="display: inline">
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
      enterpriseForm: {
        id: null,
        name: null,
        phone: null,
        description: null,
        currency: null,
        po_box: null,
        website: null,
        slogan: null,
        email: null,
        logo: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprise']),
    title() {
      return this.enterprise
        ? this.$t('structures.enterprise.formUpdateTitle')
        : this.$t('structures.enterprise.formCreateTitle');
    },
  },
  created() {
    if (this.enterprise) this.enterpriseForm = this.enterprise;
  },
  beforeUnmount() {
    if (this.enterprise)
      this.$store.commit('enterprise/SET_CURRENT_ENTERPRISE', null);
  },
  methods: {
    submitEnterpriseForm() {
      if (this.enterprise)
        this.$store
          .dispatch('enterprise/updateEnterprise', this.enterpriseForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('enterprise/addEnterprise', this.enterpriseForm)
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
