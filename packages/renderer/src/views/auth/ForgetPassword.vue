<template>
  <div>
    <!-- page-wrapper Start-->
    <section>
      <div class="container-fluid p-0">
        <div class="row m-0">
          <div class="col-12 p-0">
            <div class="login-card">
              <div class="login-main">
                <form
                  class="theme-form login-form"
                  @submit.prevent="submitFormInput"
                >
                  <h4 class="mb-3">Reset Your Password</h4>
                  <div class="form-group">
                    <label>Enter Your Mobile Number</label>
                    <div class="row">
                      <div class="col-8 col-sm-9">
                        <BaseInput
                          v-model="inputField.phone"
                          type="text"
                          placeholder="000-000-000"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <BaseButton
                      type="submit"
                      class="btn btn-primary btn-block"
                      :text="$t('common.send')"
                    />
                  </div>

                  <div v-if="showOtpField" class="form-group">
                    <span class="reset-password-link">
                      If don't receive OTP ?
                      <a
                        class="btn-link text-danger"
                        href="javascript:void(0)"
                        @click="submitFormInput"
                      >
                        Resend
                      </a>
                    </span>
                  </div>

                  <div v-if="showOtpField" class="form-group">
                    <label>Enter OTP</label>
                    <div class="row">
                      <div class="col-8 col-sm-9">
                        <BaseInput
                          v-model="inputField.otp_code"
                          class="form-control text-center opt-text"
                          type="text"
                          placeholder="000000"
                          maxlength="6"
                          @click="submitOtp"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <BaseButton
                        type="submit"
                        class="btn btn-primary btn-block"
                        :text="$t('common.verify')"
                      />
                    </div>
                  </div>
                </form>

                <form
                  v-if="showPasswordField"
                  class="theme-form login-form"
                  @submit.prevent="resetPassword"
                >
                  <h6>Create Your Password</h6>
                  <div class="form-group">
                    <label>New Password</label>
                    <div class="input-group">
                      <span class="input-group-text"
                      ><i class="icon-lock"></i
                      ></span>
                      <BaseInput
                        v-model="inputField.password"
                        class="form-control"
                        type="password"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                      />
                      <div class="show-hide"><span class="show"></span></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Retype Password</label>
                    <div class="input-group">
                      <span class="input-group-text"
                      ><i class="icon-lock"></i
                      ></span>
                      <BaseInput
                        v-model="inputField.password_confirmation"
                        class="form-control"
                        type="password"
                        name="login[password]"
                        required=""
                        placeholder="*********"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary btn-block" @click="resetPassword">
                      Done
                    </button>
                  </div>
                  <p>
                    Already have an password?<a
                    class="ms-2"
                    href="#"
                    @click.prevent="$router.push({ name: 'login' })"
                  >Sign in</a
                  >
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- page-wrapper end-->
  </div>
</template>

<script>
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import {mapGetters, mapState} from 'vuex';

export default {
  name: 'ForgetPassword',
  components: {BaseButton, BaseInput},

  data() {
    return {
      loading: false,
      errors: [],
      inputField: {
        phone: '',
        otp_code: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  computed: {
    showOtpField() {
      if (this.requestId) {
        return true;
      } else {
        return false;
      }
    },

    showPasswordField() {
      if (this.resetPasswordToken) {
        return true;
      } else {
        return false;
      }
    },
    ...mapGetters('auth', ['requestId']),
    ...mapState('auth', ['resetPasswordToken']),
  },
  methods: {
    submitFormInput() {
      this.$store
        .dispatch('auth/sendResetPasswordCode', this.inputField.phone)
        .catch((error) => {
          this.errors = error.response?.data?.errors;
          console.log(error);
          this.loading = false;
        });
    },

    submitOtp() {
      this.$store
        .dispatch('auth/verifyOtpCode', {
          code: this.inputField.otp_code,
          request_id: this.requestId,
        })
        .catch((error) => {
          this.errors = error.response?.data?.errors;
          console.log(error);
          this.loading = false;
        });
    },

    resetPassword() {
      this.$store
        .dispatch('auth/resetPassword', {
          password: this.inputField.password,
          password_confirmation: this.inputField.password_confirmation,
          token: this.resetPasswordToken,
          request_id: this.requestId,
        })
        .then(() => this.$router.back())
        .catch((error) => {
          this.errors = error.response?.data?.errors;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
