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
        <div class="form-group mb-3">
          <BaseSelect
              v-model="userForm.role_id"
              :label="$t('common.attributes.role')"
              :options="roles"
              key-label="label"
              key-value="id"
              required
              :errors="errors.role_id"
          />
        </div>
        <div class="form-group mb-3">
          <BaseSelect
              v-model="userForm.country_id"
              :label="$t('common.attributes.country')"
              :options="activeCountries"
              key-label="name"
              key-value="id"
              required
              :errors="errors.country_id"
          />
        </div>
        <div class="form-group mb-3">
          <BaseSelect
              v-model="userForm.localization_id"
              :label="$t('common.attributes.localization')"
              :options="localizations"
              key-label="label"
              key-value="id"
              :errors="errors.localization_id"
          />
        </div>
        <div class="form-group mb-3">
          <label class="form-label fw-bold" for="first_name">{{
              $t('common.attributes.first_name')
            }}</label>
          <input
              id="first_name"
              v-model="userForm.first_name"
              class="form-control"
              placeholder="..."
              required
              type="text"
          />
          <div
              v-if="errors.first_name && errors.first_name.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.first_name[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label fw-bold" for="first_name">{{
              $t('common.attributes.last_name')
            }}</label>
          <input
              id="last_name"
              v-model="userForm.last_name"
              class="form-control"
              placeholder="..."
              type="text"
          />
          <div
              v-if="errors.last_name && errors.last_name.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.last_name[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label fw-bold" for="email">{{
              $t('common.attributes.email')
            }}</label>
          <input
              id="email"
              v-model="userForm.email"
              class="form-control"
              placeholder="..."
              type="email"
              required
          />
          <div
              v-if="errors.email && errors.email.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.email[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label fw-bold" for="phone">{{
              $t('common.attributes.phone')
            }}</label>
          <input
              id="phone"
              v-model="userForm.phone"
              class="form-control"
              placeholder="1"
              type="number"
              required
          />
          <div
              v-if="errors.phone && errors.phone.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.phone[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <h3 class="form-label fw-bold">{{
              $t('common.attributes.gender')
            }}</h3>
          <br/>
          <label for="male">
            {{ $t('common.gender.male') }}
            <input
                id="male"
                v-model="userForm.gender"
                value="H"
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
          <label class="form-label fw-bold" for="password">{{
              $t('common.attributes.password')
            }}</label>
          <input
              id="password"
              v-model="userForm.password"
              class="form-control"
              placeholder="******"
              type="password"
              :required="!is_edited"
          />
          <div
              v-if="errors.password && errors.password.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.password[0] }}
          </div>
        </div>
        <div class="form-group mb-3">
          <label class="form-label fw-bold" for="password_confirmation">{{
              $t('common.attributes.password_confirmation')
            }}</label>
          <input
              id="password_confirmation"
              v-model="userForm.password_confirmation"
              class="form-control"
              placeholder="*******"
              type="password"
              :required="!is_edited"
          />
          <div
              v-if="errors.password_confirmation && errors.password_confirmation.length"
              class="invalid-feedback"
              style="display: inline"
          >
            {{ errors.password_confirmation[0] }}
          </div>
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
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseSelect, BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store
          .dispatch('role/getRolesList', {
            page: 1,
            field: {},
          }),
      store
          .dispatch('country/getCountriesList', {
            page: 1,
            field: {},
          }),
      store
          .dispatch('localization/getLocalizationsList', {
            page: 1,
            field: {},
          })
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
      handler() {
        this.is_edited = true;
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
          this.$store.dispatch(
              'user/updateUser',
              this.userForm,
          )
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
            .dispatch(
                'user/addUser',
                this.userForm,
            )
            .then((user) => {
              this.setLoading();
              this.$router.push({
                name: 'iam.user.form.privileges',
                params: {id: user.id},
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
