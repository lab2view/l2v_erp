<template>
  <BaseFormModal :submit-form="submitCountryForm" :title="title">
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.name"
        :errors="errors.name"
        :label="$t('common.attributes.name')"
        placeholder="Cameroon"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.calling_code"
        :errors="errors.calling_code"
        :label="$t('common.attributes.calling_code')"
        placeholder="237"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.iso_3166_2"
        :errors="errors.iso_3166_2"
        :label="$t('common.attributes.iso_3166_2')"
        placeholder="CM"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.iso_3166_3"
        :errors="errors.iso_3166_3"
        :label="$t('common.attributes.iso_3166_3')"
        placeholder="CMR"
        required
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold">
        {{ $t('common.attributes.phone_length') }}
        <span class="text-danger m-l-5">*</span>
      </label>
      <input
        v-model="countryForm.phone_length"
        class="form-control"
        placeholder="9"
        required
        type="number"
      />
      <div
        v-if="errors.phone_length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.phone_length[0] }}
      </div>
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.currency_name"
        :errors="errors.currency_name"
        :label="$t('common.attributes.currency_name')"
        placeholder="FCFA"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.currency"
        :errors="errors.currency"
        :label="$t('common.attributes.currency')"
        placeholder="XAF"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.currency_code"
        :errors="errors.currency_code"
        :label="$t('common.attributes.currency_code')"
        placeholder="XAF"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.currency_symbol"
        :errors="errors.currency_symbol"
        :label="$t('common.attributes.currency_symbol')"
        placeholder="F"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="countryForm.timezone"
        :errors="errors.timezone"
        :label="$t('common.attributes.timezone')"
        placeholder="UTC+1"
        required
      />
    </div>
    <div class="mb-3">
      <BaseSelect
        v-model="countryForm.is_active"
        :errors="errors.is_active"
        :label="$t('common.attributes.status')"
        :options="statuses"
        key-label="name"
        key-value="value"
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

export default {
  components: { BaseFormModal, BaseInput, BaseSelect },
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
      formLoading: false,
      countryForm: {
        id: null,
        name: null,
        calling_code: null,
        iso_3166_2: null,
        iso_3166_3: null,
        currency_code: null,
        currency_symbol: null,
        currency: null,
        phone_length: null,
        timezone: null,
        is_active: null,
      },
    };
  },
  computed: {
    ...mapGetters('country', ['country']),
    title() {
      return this.country && this.country.id
        ? this.$t('structures.country.formUpdateTitle')
        : this.$t('structures.country.formCreateTitle');
    },
  },
  created() {
    if (this.country && this.country.id) this.countryForm = this.country;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.country && this.country.id)
      this.$store.commit('country/SET_CURRENT_COUNTRY', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCountryForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.country && this.country.id) {
        this.$store
          .dispatch('country/updateCountry', this.countryForm)
          .then(
            () =>
              this.$router.back() ??
              this.$router.push({
                name: 'localizations.countries',
              }),
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('country/addCountry', this.countryForm)
          .then(
            () =>
              this.$router.back() ??
              this.$router.push({
                name: 'localizations.countries',
              }),
          )
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
