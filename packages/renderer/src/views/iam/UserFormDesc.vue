<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitUserForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >{{ $t('common.fields.required_field_start') }}
          <span class="text-danger">*</span>
          {{ $t('common.fields.required_field_end') }}
        </span>
      </div>
      <div class="card-body">
        <div class="row align-items-center mb-3">
          <div class="form-group col-md">
            <BaseSelect
              v-model.number="userForm.role_id"
              :label="$t('common.attributes.role')"
              :options="selectableRoles"
              key-label="label"
              key-value="id"
              required
              :errors="errors?.role_id"
            />
          </div>
          <div class="form-group col-md">
            <BaseSelect
              v-model.number="userForm.country_id"
              :label="$t('common.attributes.country')"
              :options="activeCountries"
              key-label="name"
              key-value="id"
              required
              :errors="errors?.country_id"
            />
          </div>
          <div v-if="canShowEnterpriseField" class="form-group col-md">
            <BaseSelect
              v-model.number="userForm.enterprise_id"
              :label="$t('common.attributes.structure')"
              :options="enterprises"
              key-label="name"
              key-value="id"
              :disabled="!!enterprise_id"
              :errors="errors?.enterprise_id"
            />
          </div>
        </div>
        <div class="row align-items-center mb-3">
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.first_name"
              :label="$t('common.attributes.first_name')"
              placeholder="..."
              :errors="errors?.first_name"
              required
            />
          </div>
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.last_name"
              :label="$t('common.attributes.last_name')"
              placeholder="..."
              type="text"
              :errors="errors?.last_name"
            />
          </div>
        </div>
        <div class="row align-items-center mb-3">
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.email"
              :label="$t('common.attributes.email')"
              type="email"
              required
              :errors="errors?.email"
            />
          </div>
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.phone"
              :label="$t('common.attributes.phone')"
              placeholder="1"
              type="number"
              required
              :errors="errors?.phone"
            />
          </div>
        </div>
        <div class="form-group mb-3">
          <BaseSelect
            v-model.number="userForm.localization_id"
            :label="$t('common.attributes.localization')"
            :options="selectableLocalizations"
            key-label="label"
            key-value="id"
            :errors="errors?.localization_id"
          />
        </div>
        <div class="form-group mb-3">
          <h6 class="form-label fw-bold">
            {{ $t('common.attributes.gender') }}
          </h6>
          <br />
          <label for="male">
            {{ $t('common.gender.male') }}
            <input
              id="male"
              v-model="userForm.gender"
              value="M"
              type="radio"
              required
            />
          </label>
          <label for="female" class="m-l-5">
            {{ $t('common.gender.female') }}
            <input
              id="female"
              v-model="userForm.gender"
              value="F"
              type="radio"
              required
            />
          </label>
          <div
            v-if="errors?.gender?.length"
            class="invalid-feedback"
            style="display: inline"
          >
            {{ errors.gender[0] }}
          </div>
        </div>
        <div class="col-md">
          <BaseInputGroup
            v-model="userForm.password"
            :label="$t('common.attributes.password')"
            placeholder="********"
            :errors="errors?.password"
            required
            :disabled="!type_password"
          >
            <button
              type="button"
              class="btn btn-info btn-iconsolid"
              :title="
                type_password
                  ? $t('common.generate_password')
                  : $t('common.type')
              "
              @click.prevent="type_password = !type_password"
            >
              <i :class="`fa fa-${type_password ? 'lock' : 'edit'}`"></i>
            </button>
            <button
              type="button"
              class="btn btn-success btn-iconsolid"
              :title="$t('common.shuffle')"
              @click.prevent="generatePassword"
            >
              <i class="fa fa-random"></i>
            </button>
          </BaseInputGroup>
        </div>
        <div class="col-md">
          <BaseInputGroup
            v-model="userForm.password_confirmation"
            :label="$t('common.attributes.password_confirmation')"
            placeholder="********"
            :errors="errors?.password_confirmation"
            required
            :disabled="!type_password"
          >
            <button
              type="button"
              class="btn btn-info btn-iconsolid"
              :title="
                type_password
                  ? $t('common.generate_password')
                  : $t('common.type')
              "
              @click.prevent="type_password = !type_password"
            >
              <i :class="`fa fa-${type_password ? 'lock' : 'edit'}`"></i>
            </button>
            <button
              type="button"
              class="btn btn-success btn-iconsolid"
              :title="$t('common.shuffle')"
              @click.prevent="generatePassword"
            >
              <i class="fa fa-random"></i>
            </button>
          </BaseInputGroup>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.back()"
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
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import ean from '/@/helpers/ean';
import { roleAdminCode } from '/@/helpers/codes.js';

export default {
  name: 'UserFormDesc',
  components: { BaseInputGroup, BaseInput, BaseSelect, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('role/getRolesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('localization/getLocalizationsList', {
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
      type_password: false,
      is_edited: false,
      loading: false,
      userForm: {
        id: null,
        enterprise_id: null,
        role_id: null,
        country_id: null,
        localization_id: null,
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('localization', ['selectableLocalizations']),
    ...mapGetters('country', ['activeCountries']),
    ...mapGetters('role', ['roles', 'actions']),
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('auth', ['currentEnterpriseId']),
    selectableRoles() {
      return this.enterprise_id
        ? this.roles.filter((r) => r.code !== roleAdminCode)
        : this.roles;
    },
    formTitle() {
      return this.user && this.user.id
        ? this.$t('iam.user.formUpdateTitle')
        : this.$t('iam.user.formCreateTitle');
    },
    enterprise_id() {
      return this.$route.query.enterprise_id ?? null;
    },
    canShowEnterpriseField() {
      return !this.currentEnterpriseId;
    },
  },
  watch: {
    userForm: {
      deep: true,
      handler(value) {
        if (value.id) {
          this.is_edited = true;
        }
      },
    },
  },
  created() {
    if (this.user && this.user.id) {
      this.userForm = this.user;
      delete this.userForm.country;
      delete this.userForm.privileges;
      delete this.userForm.role;
      delete this.userForm.enterprise;
      this.is_edited = true;
    }
    if (this.enterprise_id)
      this.userForm.enterprise_id = parseInt(this.enterprise_id);
    if (this.currentEnterpriseId)
      this.userForm.enterprise_id = this.currentEnterpriseId;
  },
  methods: {
    submitUserForm() {
      if (this.loading) return;

      this.loading = true;
      if (this.user && this.user.id) {
        if (this.is_edited) {
          if (this.userForm.password) {
            if (
              this.userForm.password === this.userForm.password_confirmation
            ) {
              this.$store
                .dispatch('user/setUserPassword', this.userForm)
                .then((user) =>
                  this.$router.push({
                    name: 'iam.user.form.privileges',
                    params: { id: user.id },
                    query: this.$route.query,
                  })
                )
                .catch((error) => {
                  this.errors = error.response?.data?.errors;
                  console.log(error);
                })
                .finally(() => (this.loading = false));
            }
          } else
            this.$store
              .dispatch('user/updateUser', this.userForm)
              .then((user) =>
                this.$router.push({
                  name: 'iam.user.form.privileges',
                  params: { id: user.id },
                  query: this.$route.query,
                })
              )
              .catch((error) => {
                this.errors = error.response?.data?.errors;
                console.log(error);
              })
              .finally(() => (this.loading = false));
        } else
          this.$router.push({
            name: 'iam.users',
            params: { id: this.user.id },
            query: this.$route.query,
          });
      } else {
        this.$store
          .dispatch('user/addUser', this.userForm)
          .then((user) => {
            this.$router.push({
              name: 'iam.user.form.privileges',
              params: { id: user.id },
              query: this.$route.query,
            });
          })
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },
    generatePassword() {
      this.userForm.password = ean.generatePassword();
      this.userForm.password_confirmation = this.userForm.password;
    },
  },
};
</script>

<style scoped></style>
