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
                    {{ $t('common.attributes.remember_password') }}
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
                  {{ $t('common.click_here') }}</a
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
  name: 'Login',
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
  mounted() {
    this.getCookie();
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    submitLoginForm() {
      if (this.loading) return;

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
        this.errors = error.response?.data?.errors;
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
