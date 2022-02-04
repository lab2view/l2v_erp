<template>
  <BaseFormModal
    :submit-form="submitCountryForm"
    :title="$t('structures.country.formActivationTitle')"
  >
    <div class="mb-3">
      <BaseSelect
        v-model="country_id"
        :errors="errors?.country_id"
        :label="$t('common.attributes.country')"
        :options="countries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <template #footer>
      <button
        :title="$t('common.activate')"
        class="btn btn-primary"
        type="submit"
      >
        {{ $t('common.activate') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseFormModal, BaseSelect },
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
      country_id: null,
    };
  },
  computed: {
    ...mapGetters('country', ['allCountries']),
    countries() {
      return this.allCountries.filter((country) => country.is_active === false);
    },
  },
  methods: {
    submitCountryForm() {
      if (this.country_id) {
        let countryField = this.allCountries.find(
          (country) => country.id.toString() === this.country_id.toString()
        );
        countryField.is_active = 1;
        this.$store
          .dispatch('country/updateCountry', countryField)
          .then(
            () =>
              this.$router.back() ??
              this.$router.push({
                name: 'localizations.countries',
              })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped></style>
