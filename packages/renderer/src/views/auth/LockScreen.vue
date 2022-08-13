<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form
                class="theme-form login-form"
                @submit.prevent="submitLockForm"
              >
                <h4>unlock</h4>
                <div class="form-group">
                  <label class="col-form-label">Enter your Password</label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="icon-lock"></i
                    ></span>
                    <BaseInput
                      v-model="loginInput.password"
                      type="password"
                      placeholder="*********"
                      :errors="errors?.password"
                      required
                    />
                    <div class="show-hide"><span class="show"> </span></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="checkbox p-0">
                    <input
                      id="checkbox1"
                      type="checkbox"
                      v-model="loginInput.remember"
                    />
                    <label class="text-muted" for="checkbox1"
                      >Remember password</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <BaseButton
                    :text="$t('common.unlock')"
                    :loading="loading"
                    class="btn btn-primary btn-block"
                  />
                </div>
                <p>
                  Already have an account?<a
                    class="ms-2"
                    href="#"
                    @click.prevent="$router.push({ name: 'login' })"
                    >Sign in
                  </a>
                </p>
              </form>
            </div>
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
  props: {
    rememb: Boolean,
    disableUnlock: function () {},
  },
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
    submitLockForm() {
      this.loading = true;
      if (this.loginInput.remember) {
        //Enter account email, password, and save days, 3 parameters
        this.setCookie(this.loginInput.password, this.loginInput.remember, 30);
      } else {
        //Clear cookies
        this.clearCookie();
      }
      this.disableUnlock();
    },
    setCookie: function (user_pass, is_remember, expire_date) {
      let date = new Date();
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * expire_date); //here is 3 days
      //splicing cookies
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
          if (arr2[0].replace(/\s*/g, '') === 'user_pass') {
            this.loginInput.user_pass = arr2[1];
          } else if (arr2[0].replace(/\s*/g, '') === 'is_remember') {
            this.loginInput.is_remember = arr2[1];
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
