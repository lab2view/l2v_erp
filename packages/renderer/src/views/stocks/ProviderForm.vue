<template>
  <BaseFormModal :submit-form="submitStockProviderForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="providerForm.country_id"
        :label="$t('common.attributes.country')"
        :options="activeCountries"
        key-label="name"
        key-value="id"
        required
        :errors="errors.country_id"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="name">{{
        $t('common.attributes.name')
      }}</label>
      <input
        id="name"
        v-model="providerForm.name"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />
      <div
        v-if="errors.name && errors.name.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.name[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <BaseInputGroup
        v-model="providerForm.phone"
        :errors="errors.phone"
        :label="$t('common.attributes.phone')"
        placeholder="699.."
        required
        type="number"
      >
        <template v-if="callingCode" #prefix>
          <div class="input-group-text">
            {{ callingCode }}
          </div>
        </template>
      </BaseInputGroup>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="email">{{
          $t('common.attributes.email')
        }}</label>
      <input
        id="email"
        v-model="providerForm.email"
        class="form-control"
        placeholder="..."
        type="email"
      />
      <div
        v-if="errors.email && errors.email.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.email[0] }}
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
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseFormModal, BaseInputGroup, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('country/getCountriesList', {
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
      formLoading: false,
      providerForm: {
        id: null,
        label: null,
      },
    };
  },
  computed: {
    ...mapGetters('provider', ['provider']),
    ...mapGetters('country', ['countries', 'activeCountries']),
    ...mapGetters('auth', ['currentUser']),
    title() {
      return this.provider && this.provider.id
        ? this.$t('stocks.provider.formUpdateTitle')
        : this.$t('stocks.provider.formCreateTitle');
    },
    userCountry() {
      return this.countries.find(
        (c) => c.id === this.currentUser.user.country_id
      );
    },
    callingCode() {
      return this.userCountry !== undefined
        ? `+${this.userCountry.calling_code}`
        : null;
    },
  },
  created() {
    if (this.provider && this.provider.id)
      this.providerForm = this.provider;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.provider && this.provider.id)
      this.$store.commit('provider/SET_CURRENT_PROVIDER', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitStockProviderForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.provider && this.provider.id) {
        this.$store
          .dispatch('provider/updateStockProvider', this.providerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('provider/addStockProvider', this.providerForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
