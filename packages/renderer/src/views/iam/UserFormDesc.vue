<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitUserForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="row align-items-center mb-3">
          <div class="form-group col-md">
            <BaseSelect
              v-model.number="userForm.role_id"
              :label="$t('common.attributes.role')"
              :options="roles"
              key-label="label"
              key-value="id"
              required
              :errors="errors.role_id"
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
              :errors="errors.country_id"
            />
          </div>
        </div>
        <div class="row align-items-center mb-3">
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.first_name"
              :label="$t('common.attributes.first_name')"
              placeholder="..."
              :errors="errors.first_name"
              required
            />
          </div>
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.last_name"
              :label="$t('common.attributes.last_name')"
              placeholder="..."
              type="text"
              :errors="errors.last_name"
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
              :errors="errors.email"
            />
          </div>
          <div class="form-group col-md">
            <BaseInput
              v-model="userForm.phone"
              :label="$t('common.attributes.phone')"
              placeholder="1"
              type="number"
              required
              :errors="errors.phone"
            />
          </div>
        </div>
        <div class="form-group mb-3">
          <BaseSelect
            v-model.number="userForm.localization_id"
            :label="$t('common.attributes.localization')"
            :options="localizations"
            key-label="label"
            key-value="id"
            :errors="errors.localization_id"
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
            v-if="errors.gender && errors.gender.length"
            class="invalid-feedback"
            style="display: inline"
          >
            {{ errors.gender[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <BaseInput
            v-model="userForm.password"
            :label="$t('common.attributes.password')"
            placeholder="******"
            type="password"
            :errors="errors.password"
            :required="!is_edited"
          />
        </div>
        <div class="form-group mb-3">
          <BaseInput
            v-model="userForm.password_confirmation"
            :label="$t('common.attributes.password_confirmation')"
            placeholder="******"
            type="password"
            :errors="errors.password_confirmation"
            :required="!is_edited"
          />
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'iam.user.form.privileges' })"
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

export default {
  components: { BaseInput, BaseSelect, BaseButton },
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
      is_edited: false,
      formLoading: false,
      userForm: {
        id: null,
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
    ...mapGetters('localization', ['localizations']),
    ...mapGetters('country', ['activeCountries']),
    ...mapGetters('role', ['roles', 'actions']),
    formTitle() {
      return this.user && this.user.id
        ? this.$t('iam.user.formUpdateTitle')
        : this.$t('iam.user.formCreateTitle');
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
      this.is_edited = true;
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
    submitUserForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.user && this.user.id) {
        if (this.is_edited) {
          this.$store
            .dispatch('user/updateUser', this.userForm)
            .then((user) =>
              this.$router.push({
                name: 'iam.user.form.privileges',
                params: { id: user.id },
              })
            )
            .catch((error) => {
              this.errors = error.response.data.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        } else
          this.$router.push({
            name: 'iam.users',
            params: { id: this.user.id },
          });
      } else {
        this.$store
          .dispatch('user/addUser', this.userForm)
          .then((user) => {
            this.setLoading();
            this.$router.push({
              name: 'iam.user.form.privileges',
              params: { id: user.id },
            });
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
            this.setLoading();
          });
      }
    },
  },
};
</script>

<style scoped></style>
