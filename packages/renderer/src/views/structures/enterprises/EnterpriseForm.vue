<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitEnterpriseForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >{{ $t('common.fields.required_field_start') }}
          <span class="text-danger">*</span>
          {{ $t('common.fields.required_field_end') }}
        </span>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="enterpriseForm.enterprise_type_id"
                :errors="errors.enterprise_type_id"
                :label="$t('enterprise.enterprise_type')"
                :options="enterpriseTypes"
                key-label="label"
                key-value="id"
                required
              />
            </div>
            <div class="col-md">
              <BaseInput
                v-model="enterpriseForm.name"
                :errors="errors.name"
                :label="$t('common.attributes.name')"
                placeholder="E.g. Ets Tangui"
                required
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInput
                v-model="enterpriseForm.email"
                :errors="errors.email"
                :label="$t('common.attributes.email')"
                placeholder="mag1@gmail.com"
                required
                type="email"
              />
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="enterpriseForm.phone"
                :errors="errors.phone"
                :label="$t('common.attributes.phone')"
                placeholder="699.."
                type="number"
              >
                <template v-if="callingCode" #prefix>
                  <div class="input-group-text">
                    {{ callingCode }}
                  </div>
                </template>
              </BaseInputGroup>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInput
                v-model="enterpriseForm.trade_register"
                :errors="errors.trade_register"
                :label="$t('common.attributes.trade_register')"
                placeholder="E.g. RC/..."
                type="text"
              />
            </div>
            <div class="col-md">
              <BaseInput
                v-model="enterpriseForm.matriculation"
                :errors="errors.matriculation"
                :label="$t('common.attributes.matriculation')"
                placeholder="E.g. NIU..."
                type="text"
              />
            </div>
          </div>
        </div>
        <BaseTextArea
          v-model="enterpriseForm.description"
          :errors="errors.description"
          :label="$t('common.attributes.description')"
          placeholder="Enterprise description..."
          rows="4"
        />
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'enterprises' })"
          />
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary col-auto"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import ean from '/@/helpers/ean';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';

export default {
  name: 'EnterpriseForm',
  components: {
    BaseInputGroup,
    BaseTextArea,
    BaseButton,
    BaseSelect,
    BaseInput,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('enterprise_type/getEnterpriseTypesList', {
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
      is_edited: true,
      formLoading: false,
      enterpriseForm: {
        user_id: null,
        enterprise_type_id: null,
        name: null,
        reference: null,
        email: null,
        phone: null,
        logo: null,
        slogan: null,
        description: null,
        po_box: null,
        currency: null,
        domain: null,
        database: null,
        website: null,
        trade_register: null,
        matriculation: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprise']),
    ...mapGetters('enterprise_type', ['enterpriseTypes']),
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('country', ['countries']),
    formTitle() {
      return this.enterprise
        ? this.$t('enterprise.enterprise.formUpdateTitle')
        : this.$t('enterprise.enterprise.formCreateTitle');
    },
    userCountry() {
      return this.countries.find((c) => c.id === this.currentUser.country_id);
    },
    callingCode() {
      return this.userCountry !== undefined
        ? `+${this.userCountry.calling_code}`
        : null;
    },
  },
  watch: {
    enterpriseForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.enterprise) {
      this.enterpriseForm = Object.assign({}, this.enterprise);
      this.is_edited = false;
    }
  },
  beforeUnmount() {
    this.setLoading();
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitEnterpriseForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.enterprise) {
        if (this.is_edited) {
          this.$store
            .dispatch('enterprise/updateEnterprise', this.enterpriseForm)
            .then((enterprise) =>
              this.$router.push({
                name: 'enterprise.form.setting',
                params: { id: enterprise.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        } else
          this.$router.push({
            name: 'enterprise.form.setting',
            params: { id: this.enterprise.id },
          });
      } else {
        this.$store
          .dispatch('enterprise/addEnterprise', this.enterpriseForm)
          .then((enterprise) => {
            this.$router.push({
              name: 'enterprise.form.setting',
              params: { id: enterprise.id },
            });
          })
          .catch((error) => {
            console.log(error);
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
    generateBarCode() {
      this.enterpriseForm.code = ean.generateEan13();
    },
  },
};
</script>

<style scoped></style>
