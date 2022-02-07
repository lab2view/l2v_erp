<template>
  <BaseFormModal :submit-form="submitRegionForm" :title="title">
    <div class="mb-3">
      <BaseSelect
        v-model="regionForm.country_id"
        :errors="errors?.country_id"
        :label="$t('common.attributes.country')"
        :options="activeCountries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="regionForm.name"
        :errors="errors?.name"
        :label="$t('common.attributes.name')"
        placeholder="Douala"
        required
      />
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
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseInput, BaseSelect, BaseFormModal },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      errors: [],
      regionForm: {
        id: null,
        name: null,
        code: null,
        country_id: null,
      },
    };
  },
  computed: {
    ...mapGetters('country', ['activeCountries']),
    ...mapGetters('region', ['region']),
    title() {
      return this.region && this.region.id
        ? this.$t('structures.region.formUpdateTitle')
        : this.$t('structures.region.formCreateTitle');
    },
  },
  created() {
    if (this.region && this.region.id) this.regionForm = this.region;
  },
  beforeUnmount() {
    if (this.region && this.region.id)
      this.$store.commit('region/SET_CURRENT_REGION', null);
  },
  methods: {
    submitRegionForm() {
      if (this.region && this.region.id)
        this.$store
          .dispatch('region/updateRegion', this.regionForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('region/addRegion', this.regionForm)
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
