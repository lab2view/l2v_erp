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
  mounted() {
    this.getCookie();
  },
  methods: {
    submitLoginForm() {
      this.loading = true;
      if (this.loginInput.remember) {
        //Enter account email, password, and save days, 3 parameters
        this.setCookie(
          this.loginInput.email,
          this.loginInput.password,
          this.loginInput.remember,
          30
        );
      } else {
        //Clear cookies
        this.clearCookie();
      }
      this.$store.dispatch('auth/login', this.loginInput).catch((error) => {
        console.log(error);
        this.loading = false;
      });
    },
    setCookie: function (user_email, user_pass, is_remember, expire_date) {
      let date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * expire_date); //here is 3 days
      //splicing cookies
      window.document.cookie =
        'user_email' +
        '=' +
        user_email +
        ';path=/;expires=' +
        date.toUTCString();
      window.document.cookie =
        'user_pass' + '=' + user_pass + ';path=/;expires=' + date.toUTCString();
      window.document.cookie =
        'is_remember' +
        '=' +
        is_remember +
        ';path=/;expires=' +
        date.toUTCString();
    },
    //Clear cookies
    clearCookie() {
      this.setCookie('', '', -1); // modify both values to be empty, and the number of days is negative 1 day
    },
    getCookie() {
      if (document.cookie.length > 0) {
        //Use semicolon (;) as the separator cookie string
        let arr = document.cookie.split(';');
        //loop through the separated string array
        for (let i = 0; i < arr.length; i++) {
          //Then divide the string by the equal sign (=)
          let arr2 = arr[i].split('=');
          //Determine and find the corresponding value, replace(/\s*/g, "") means to remove the spaces in the string
          if (arr2[0].replace(/\s*/g, '') === 'user_email') {
            this.loginInput.email = arr2[1];
          } else if (arr2[0].replace(/\s*/g, '') === 'user_pass') {
            this.loginInput.password = arr2[1];
          } else if (arr2[0].replace(/\s*/g, '') === 'is_remember') {
            this.loginInput.remember = arr2[1];
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
