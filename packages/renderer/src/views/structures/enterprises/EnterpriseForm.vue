<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitEnterpriseForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="enterpriseForm.enterprise_type_id"
                :errors="errors?.enterprise_type_id"
                :label="$t('structures.enterprise_type')"
                :options="enterpriseTypes"
                key-label="label"
                key-value="id"
                required
              />
            </div>
            <div class="col-md">
              <BaseInput
                v-model="enterpriseForm.name"
                :errors="errors?.name"
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
                :errors="errors?.email"
                :label="$t('common.attributes.email')"
                placeholder="mag1@gmail.com"
                type="email"
                required
              />
            </div>
            <div class="col-md">
              <BaseInputGroup
                v-model="enterpriseForm.phone"
                :errors="errors?.phone"
                :label="$t('common.attributes.phone')"
                placeholder="699.."
                type="number"
                required
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
        <BaseTextArea
          v-model="enterpriseForm.description"
          rows="4"
          :errors="errors?.description"
          :label="$t('common.attributes.description')"
          placeholder="Enterprise description..."
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
  components: {
    BaseInputGroup,
    BaseTextArea,
    BaseButton,
    BaseSelect,
    BaseInput,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('enterpriseTypeConfig/getEnterpriseTypesList', {
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
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprise']),
    ...mapGetters('enterpriseTypeConfig', ['enterpriseTypes']),
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('country', ['countries']),
    formTitle() {
      return this.enterprise
        ? this.$t('structures.enterprise.formUpdateTitle')
        : this.$t('structures.enterprise.formCreateTitle');
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
      this.enterprise_type_id = this.enterprise.enterprise_type_id;
      this.is_edited = false;
    }
  },
  methods: {
    submitEnterpriseForm() {
      if (this.enterprise) {
        if (this.is_edited)
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
            });
        else
          this.$router.push({
            name: 'enterprise.form.setting',
            params: { id: this.enterprise.id },
          });
      } else
        this.$store
          .dispatch('enterprise/addEnterprise', this.enterpriseForm)
          .then((enterprise) =>
            this.$router.push({
              name: 'enterprise.form.setting',
              params: { id: enterprise.id },
            })
          )
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          });
    },
    generateBarCode() {
      this.enterpriseForm.code = ean.generateEan13();
    },
  },
};
</script>

<style scoped></style>
