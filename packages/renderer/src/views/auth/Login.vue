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
              <h4>Login</h4>
              <h6>Welcome back! Log in to your account.</h6>

              <div class="form-group">
                <label>Email Address</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="icon-email"></i
                  ></span>
                  <input
                    v-model="loginInput.email"
                    class="form-control"
                    type="email"
                    required
                    placeholder="Test@test.test"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="icon-lock"></i
                  ></span>
                  <input
                    v-model="loginInput.password"
                    class="form-control"
                    type="password"
                    required
                    placeholder="*********"
                  />
                  <div class="show-hide"><span class="show"> </span></div>
                </div>
              </div>
              <div class="form-group">
                <div class="checkbox">
                  <input
                    id="check-remember"
                    v-model="loginInput.remember"
                    type="checkbox"
                  />
                  <label for="check-remember">Remember password</label>
                </div>
                <a
                  class="link"
                  href="#"
                  @click.prevent="$router.push({ name: 'forgetPassword' })"
                  >Forgot password?</a
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
                Changer l'espace de travail ?<a
                  class="ms-2"
                  href="#"
                  @click.prevent="
                    $store.dispatch('workspace/forgetCurrentWorkspace')
                  "
                  >Cliquez ici</a
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
export default {
  components: { BaseButton },
  data() {
    return {
      loading: false,
      loginInput: {
        email: null,
        password: null,
        remember: false,
      },
    };
  },
  methods: {
    submitLoginForm() {
      this.loading = true;
      this.$store.dispatch('auth/login', this.loginInput).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
