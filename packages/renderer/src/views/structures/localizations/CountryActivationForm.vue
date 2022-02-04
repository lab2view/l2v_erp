<template>
  <BaseFormModal :submit-form="submitCountryForm" :title="title">
    <div class="mb-3">
      <BaseSelect
        v-model="countryForm.id"
        :disabled="country.id"
        :errors="errors?.country_id"
        :label="$t('common.attributes.country')"
        :options="countries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="mb-3">
      <BaseSelect
        v-model="countryForm.is_active"
        :errors="errors?.is_active"
        :label="$t('common.attributes.status')"
        :options="statuses"
        key-label="name"
        key-value="value"
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
      statuses: [
        {
          name: 'ACTIF',
          value: 1,
        },
        {
          name: 'INACTIF',
          value: 0,
        },
      ],
      countryForm: {
        id: null,
        is_active: null,
      },
    };
  },
  computed: {
    ...mapGetters('country', ['allCountries', 'country']),
    title() {
      return this.country && this.country.id
        ? this.$t('structures.country.formUpdateTitle')
        : this.$t('structures.country.formActivationTitle');
    },
    countries() {
      return this.country && this.country.id
        ? this.allCountries.filter(
            (country) =>
              country.id === this.country.id || country.is_active === false
          )
        : this.allCountries.filter((country) => country.is_active === false);
    },
  },
  created() {
    if (this.country && this.country.id) {
      this.countryForm = this.country;
      this.countryForm.is_active = this.country.is_active ? '1' : '0';
    }
  },
  beforeUnmount() {
    if (this.country && this.country.id)
      this.$store.commit('country/SET_CURRENT_COUNTRY', null);
  },
  methods: {
    submitCountryForm() {
      if (this.countryForm.id)
        this.$store
          .dispatch('country/updateCountryStatus', this.countryForm)
          .then(
            () =>
              this.$router.back() ??
              this.$router.push({
                name: 'countries',
              })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
  },
};
</script>

<style scoped></style>
