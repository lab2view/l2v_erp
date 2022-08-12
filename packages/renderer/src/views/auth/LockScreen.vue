<template>
  <!-- page-wrapper Start-->
  <section>
    <div class="container-fluid p-0">
      <div class="row m-0">
        <div class="col-12 p-0">
          <div class="login-card">
            <div class="login-main">
              <form class="theme-form login-form">
                <h4>unlock</h4>
                <div class="form-group">
                  <label>Password</label>
                  <div class="input-group">
                    <span class="input-group-text"
                      ><i class="icon-lock"></i
                    ></span>
                    <BaseInput
                      v-model="loginInput.password"
                      type="password"
                      placeholder="**********"
                      :errors="errors?.password"
                      required
                    />
                    <div class="show-hide"><span class="show"> </span></div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="checkbox p-0">
                    <input id="checkbox1" type="checkbox" />
                    <label class="text-muted" for="checkbox1"
                      >Remember password</label
                    >
                  </div>
                </div>
                <div class="form-group">
                  <button
                    class="btn btn-primary btn-block"
                    type="submit"
                    @click.prevent="$router.back()"
                  >
                    Unlock
                  </button>
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
import BaseInput from '/@/components/common/BaseInput.vue';
export default {
  components: {
    BaseInput,
  },
  data() {
    return {
      loading: false,
      loginInput: {
        password: null,
        remember: false,
      },
    };
  },
  mounted() {
    this.getCookie();
  },
};
</script>

<style scoped></style>
