<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-12">
          <div class="login-card">
            <form
              class="theme-form login-form"
              @submit.prevent="submitLoginForm()"
            >
              <h4>{{ $t('common.auth') }}</h4>
              <h6>{{ $t('common.login_to_workspace') }}</h6>

              <div class="form-group">
                <label>{{ $t('common.attributes.email_address') }}</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="icon-email"></i
                  ></span>
                  <BaseInput
                    v-model="loginInput.email"
                    type="text"
                    placeholder="Test@test.test"
                    :errors="errors?.email"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>{{ $t('common.attributes.password') }}</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i
                      :class="[showPassword ? 'icon-unlock' : 'icon-lock']"
                    ></i
                  ></span>
                  <BaseInput
                    v-if="showPassword"
                    v-model="loginInput.password"
                    type="text"
                    placeholder="*********"
                    :errors="errors?.password"
                    required
                  />
                  <BaseInput
                    v-else
                    v-model="loginInput.password"
                    type="password"
                    placeholder="*********"
                    :errors="errors?.password"
                    required
                  />
                  <div class="show-hide" @click="toggleShow">
                    <span class=""> {{ showPasswordLabel }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="checkbox">
                  <input
                    id="check-remember"
                    v-model="loginInput.remember"
                    type="checkbox"
                  />
                  <label for="check-remember">
                    {{ $t('common.attributes.remember_me') }}
                  </label>
                </div>
                <a
                  class="link"
                  href="#"
                  @click.prevent="$router.push({ name: 'forgetPassword' })"
                  >{{ $t('common.fields.forget_password') }}</a
                >
              </div>
              <div class="form-group">
                <BaseButton
                  :text="$t('common.login')"
                  :loading="loading"
                  class="btn btn-primary btn-block"
                />
              </div>
              <div class="login-social-title">
                <h5>.</h5>
              </div>
              <p>
                {{ $t('common.change_workspace') }}
                <a
                  class="ms-2"
                  href="#"
                  @click.prevent="
                    $store.dispatch('workspace/forgetCurrentWorkspace')
                  "
                >
                  {{ $t('common.clic_here') }}</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- page-wrapper end-->
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
export default {
  components: { BaseButton, BaseInput },
  data() {
    return {
      loading: false,
      showPassword: false,
      errors: [],
      loginInput: {
        email: null,
        password: null,
        remember: false,
      },
    };
  },
  computed: {
    showPasswordLabel() {
      return this.showPassword ? 'Hide' : 'Show';
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    submitLoginForm() {
      this.loading = true;
      this.$store.dispatch('auth/login', this.loginInput).catch((error) => {
        this.errors = error.response?.data?.errors;
        console.log(error);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
