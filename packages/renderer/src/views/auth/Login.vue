<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-12">
          <div class="login-card">
            <form class="theme-form login-form" @submit.prevent="submitLoginForm()">
              <h4>Login</h4>
              <h6>Welcome back! Log in to your account.</h6>

              <div class="form-group">
                <label>Email Address</label>
                <div class="input-group"><span class="input-group-text"><i class="icon-email"></i></span>
                  <input class="form-control" type="email" required="" value="Test@gmail.com">
                </div>
              </div>
              <div class="form-group">
                <label>Password</label>
                <div class="input-group"><span class="input-group-text"><i class="icon-lock"></i></span>
                  <input class="form-control" type="password" name="login[password]" required="" value="*********">
                  <div class="show-hide"><span class="show">                         </span></div>
                </div>
              </div>
              <div class="form-group">
                <div class="checkbox">
                  <input id="checkbox1" type="checkbox">
                  <label for="checkbox1">Remember password</label>
                </div><a class="link" href="#" @click.prevent="$router.push({name: 'forgetPassword'})">Forgot password?</a>
              </div>
              <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Sign in</button>
              </div>
              <div class="login-social-title">
                <h5>.</h5>
              </div>
              <p>Don't have account?<a class="ms-2" href="#" @click.prevent="openRegisterPage">Create Account</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- page-wrapper end-->
</template>

<script>
export default {
  name: 'Login',
  methods: {
    openRegisterPage() {
      this.$router.push({name: 'register'});
    },
    submitLoginForm() {
      this.$router.push({name: 'dashboard'});
    }
  }
};
</script>

<style scoped>

</style>
