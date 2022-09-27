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
                  @submit.prevent="
                    haveValidOtp ? handleResetPassword : handleResetPasswordForm
                  "
                  v-if="!haveValidOtp"
                >
                  <h4 class="mb-3">Reset Your Password</h4>
                  <div v-if="isOtpField" class="form-group">
                    <span class="reset-password-link">
                      If don't receive OTP ?
                      <a
                        class="btn-link text-danger"
                        href="javascript:void(0)"
                        @click.prevent="submitFormInput"
                      >
                        Resend
                      </a>
                    </span>
                  </div>
                  <div v-if="!isOtpField" class="form-group">
                    <label>Enter Your Mobile Number</label>
                    <div class="row">
                      <div class="col-8 col-sm-9">
                        <BaseInput
                          v-model.number="inputField.phone"
                          type="number"
                          placeholder="000-000-000"
                          :errors="errors?.phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div v-else class="form-group">
                    <label>Enter OTP</label>
                    <div class="row">
                      <div class="col-8 col-sm-9">
                        <BaseInput
                          v-model="inputField.otp_code"
                          class="form-control opt-text"
                          :errors="errors?.otp_code"
                          placeholder="000000"
                          maxlength="6"
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

                  <div class="form-group">
                    <BaseButton
                      type="submit"
                      class="btn btn-primary btn-block"
                      :text="
                        isOtpField ? $t('common.verify') : $t('common.send')
                      "
                    />
                  </div>

                  <div v-if="haveValidOtp">
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
                          required
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
                          required
                          placeholder="*********"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary btn-block" type="submit">
                        Done
                      </button>
                    </div>
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
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'ForgetPassword',
  components: { BaseButton, BaseInput },

  data() {
    return {
      loading: false,
      errors: [],
      inputField: {
        phone: null,
        otp_code: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['requestId']),
    ...mapState('auth', ['resetPasswordToken']),
    haveValidOtp() {
      return !!this.resetPasswordToken;
    },
    isOtpField() {
      return !!this.requestId;
    },
  },
  methods: {
    handleResetPasswordForm() {
      if (!this.isOtpField) {
        return this.$store
          .dispatch('auth/sendResetPasswordCode', '' + this.inputField.phone)
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      } else {
        return this.$store
          .dispatch('auth/verifyOtpCode', {
            code: this.inputField.otp_code,
            request_id: this.requestId,
          })
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => (this.loading = false));
      }
    },

    handleResetPassword() {
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
