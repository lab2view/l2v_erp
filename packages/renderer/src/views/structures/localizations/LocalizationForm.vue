<template>
  <BaseFormModal :submit-form="submitLocalizationForm" :title="title">
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.address"
        :errors="errors?.address"
        :label="$t('common.attributes.address')"
        placeholder="Address"
        required
      />
    </div>
    <div class="mb-3">
      <BaseSelect
        v-model="localizationForm.country_id"
        :errors="errors?.country_id"
        :label="$t('common.attributes.country')"
        :options="countries"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.city"
        :errors="errors?.city"
        :label="$t('common.attributes.city')"
        placeholder="City"
        required
      />
    </div>
    <div class="mb-3">
      <BaseSelect
        v-model="localizationForm.region_id"
        :errors="errors?.region_id"
        :label="$t('common.attributes.region')"
        :options="active_regions"
        key-label="name"
        key-value="id"
        required
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.longitude"
        :errors="errors?.longitude"
        :label="$t('common.attributes.longitude')"
        placeholder="Longitude"
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="localizationForm.latitude"
        :errors="errors?.latitude"
        :label="$t('common.attributes.latitude')"
        placeholder="Latitude"
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
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseInput, BaseSelect, BaseFormModal },
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
    ])
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
    ...mapGetters('country', ['countries']),
    ...mapGetters('region', ['regions']),
    ...mapGetters('localization', ['localization']),
    title() {
      return this.localization && this.localization.id
        ? this.$t('structures.localization.formUpdateTitle')
        : this.$t('structures.localization.formCreateTitle');
    },
    active_regions() {
      console.log('this.regions');
      console.log(this.regions);
      return this.localizationForm.country_id
        ? this.regions.filter(
            (region) =>
              region.country_id?.toString() ===
              this.localizationForm.country_id.toString()
          )
        : [];
    },
  },
  created() {
    if (this.localization && this.localization.id)
      this.localizationForm = this.localization;
  },
  beforeUnmount() {
    if (this.localization && this.localization.id)
      this.$store.commit('localization/SET_CURRENT_LOCALIZATION', null);
  },
  methods: {
    submitLocalizationForm() {
      if (this.localization && this.localization.id)
        this.$store
          .dispatch('localization/updateLocalization', this.localizationForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
      else
        this.$store
          .dispatch('localization/addLocalization', this.localizationForm)
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
