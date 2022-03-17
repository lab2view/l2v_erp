<template>
  <BaseFormModal :submit-form="submitLocalizationForm" :title="title">
    <div class="mb-3">
      <BaseSelect
        v-model="localizationForm.country_id"
        :errors="errors.country_id"
        :label="$t('common.attributes.country')"
        :options="activeCountries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="mb-3">
      <BaseFieldGroup
        :label="$t('common.attributes.region')"
        :errors="errors.region_id"
        required
        @btn-click="
          $router.push({ name: 'region.form' })
        "
      >
        <BaseSelect
          v-model="localizationForm.region_id"
          :options="active_regions"
          key-label="name"
          key-value="id"
          required
        />
      </BaseFieldGroup>
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.city"
        :errors="errors.city"
        :label="$t('common.attributes.city')"
        placeholder="City"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.address"
        :errors="errors.address"
        :label="$t('common.attributes.address')"
        placeholder="Address"
        required
      />
    </div>
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
  <br/>
  <router-view />
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseFormModal,
    BaseFieldGroup
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('region/getRegionsList', {
        page: 1,
        field: {},
      }),
    ]).then(() => {
      next();
    }).catch((error) => {
      console.log(error);
      next();
    });
  },
  data() {
    return {
      errors: [],
      formLoading: false,
      localizationForm: {
        id: null,
        address: null,
        latitude: null,
        longitude: null,
        country_id: null,
        region_id: null,
        city: null,
      },
    };
  },
  computed: {
    ...mapGetters('country', ['activeCountries']),
    ...mapGetters('region', ['regions']),
    ...mapGetters('localization', ['localization']),
    title() {
      return this.localization && this.localization.id
        ? this.$t('enterprise.localization.formUpdateTitle')
        : this.$t('enterprise.localization.formCreateTitle');
    },
    active_regions() {
      return this.localizationForm.country_id
        ? this.regions.filter(
          (region) =>
            region.country_id.toString() ===
            this.localizationForm.country_id.toString()
        )
        : this.regions;
    },
  },
  created() {
    if (this.localization && this.localization.id)
      this.localizationForm = this.localization;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.localization && this.localization.id)
      this.$store.commit('localization/SET_CURRENT_LOCALIZATION', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitLocalizationForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.localization && this.localization.id) {
        this.$store
          .dispatch('localization/updateLocalization', this.localizationForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('localization/addLocalization', this.localizationForm)
          .then(() => this.$router.back())
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
