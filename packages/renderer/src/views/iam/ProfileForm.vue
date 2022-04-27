<template>
  <BaseContainer
    :module="$t('menu.modules.iam')"
    :title="$t('iam.title')"
  >
    <h1>Profile</h1>
    <div class="card">
      <form @submit.prevent="submitForm">
        <div class="card-header">
          <h3>{{ $t('common.update_profile') }}</h3>
        </div>
        <div class="card-body">
          <div class="row">
            <span>
              {{ loading ? 'Loading...' : '' }}
            </span>
          </div>
          <div class="row align-items-center mb-3">
            <div class="form-group col-md">
              <BaseInput
                v-model="authUser.first_name"
                :label="$t('common.attributes.first_name')"
                placeholder="..."
                :errors="errors.first_name"
                required
              />
            </div>
            <div class="form-group col-md">
              <BaseInput
                v-model="authUser.last_name"
                :label="$t('common.attributes.last_name')"
                placeholder="..."
                :errors="errors.last_name"
                required
              />
            </div>
          </div>
          <div class="row align-items-center mb-3">
            <div class="form-group col-md">
              <BaseInput
                v-model="authUser.email"
                :label="$t('common.attributes.email')"
                placeholder="..."
                :errors="errors.email"
                required
              />
            </div>
            <div class="form-group col-md">
              <BaseInput
                v-model="authUser.phone"
                :label="$t('common.attributes.phone')"
                placeholder="..."
                :errors="errors.phone"
                required
              />
            </div>
          </div>
          <div class="row align-items-center mb-3">
            <div class="form-group col-md">
              <BaseSelect
                v-model="authUser.country_id"
                :label="$t('common.attributes.country')"
                placeholder="..."
                :errors="errors.country_id"
                :options="countries"
                key-label="name"
                key-value="id"
                required
              />
            </div>
            <div class="form-group col-md">
              <BaseFieldGroup
                :label="$t('common.attributes.localization')"
                :errors="errors.localization_id"
                @btn-click="$router.push({ name: 'localization.form' })"
              >
                <BaseSelect
                  v-model="authUser.localization_id"
                  placeholder="..."
                  key-label="address"
                  key-value="id"
                  :options="localizations"
                />
              </BaseFieldGroup>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-group col-md">
              <BaseSelect
                v-model="authUser.locale"
                :label="$t('common.attributes.locale')"
                placeholder="..."
                :errors="errors.locale"
                :options="['fr', 'en']"
                required
              />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <template v-if="update_password">
            <div class="form-group mb-3">
              <BaseInput
                v-model="old_password"
                :label="$t('common.attributes.old_password')"
                placeholder="..."
                type="password"
                :errors="errors.old_password"
                :required="update_password"
              />
            </div>
            <div class="form-group mb-3">
              <BaseInput
                v-model="password"
                :label="$t('common.attributes.new_password')"
                placeholder="..."
                type="password"
                :errors="errors.password"
                :required="update_password"
              />
            </div>
            <div class="form-group mb-3">
              <BaseInput
                v-model="password_confirmation"
                :label="$t('common.attributes.new_password_confirmation')"
                placeholder="..."
                type="password"
                :errors="errors.password_confirmation"
                :required="update_password"
              />
            </div>
          </template>
          <div class="row">
            <div class="col-md">
              <BaseButton
                :text="$t('common.update_password')"
                class="btn btn-danger col-auto m-l-5"
                type="button"
                @click="update_password = !update_password"
              />
            </div>
            <div class="col-md d-flex justify-content-end">
              <BaseButton
                :text="$t('common.cancel')"
                class="btn btn-secondary col-auto m-r-5"
                type="button"
                @click.prevent="$router.push({ name: 'dashboard' })"
              />
              <BaseButton
                :text="$t('common.save')"
                class="btn btn-primary col-auto"
                type="submit"
                icon="fa fa-save"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </BaseContainer>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseContainer from '/@/components/common/BaseContainer.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';
import { notify } from "/@/helpers/notify";
import store from '/@/store';

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('country/getCountriesList', {
        page: 1,
        field: {},
      }),
      store.dispatch('localization/getLocalizationsList', {
        page: 1,
        field: {},
      }),
    ])
      .catch((error) => console.log(error))
      .finally(() => next());
  },
  components: { BaseFieldGroup, BaseButton, BaseContainer, BaseInput, BaseSelect },
  data() {
    return {
      loading: false,
      update_password: false,
      errors: [],
      authUser: {
        id: null,
        role_id: null,
        country_id: null,
        localization_id: null,
        email: null,
        phone: null,
        first_name: null,
        last_name: null,
        gender: null,
        locale: 'fr',
      },
      old_password: '',
      password: '',
      password_confirmation: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('localization', ['localizations']),
    ...mapGetters('country', ['countries']),
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.loading = true;
      let data = this.authUser
      if (this.password) {
        if (this.password !== this.password_confirmation) {
          this.errors = {
            password: [this.$t('messages.errors.password_not_match')]
          }
          return
        }
        data = {
          ...data,
          password: this.password,
          password_confirmation: this.password_confirmation,
          old_password: this.old_password
        }
      }
      store.dispatch('auth/updateAuthUser', data)
        .then(() => {
          notify(
            this.$t('messages.update_user_successfully'),
            'New Event',
            'success'
          );
          this.password_confirmation = null;
          this.password = null;
          this.old_password = null;
        })
        .catch((error) => {
          if (error.errors) {
            this.errors = error.errors
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  beforeMount() {
    this.authUser = this.currentUser
  }
};
</script>

<style scoped></style>
