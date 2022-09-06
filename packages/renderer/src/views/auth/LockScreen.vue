<template>
  <!-- page-wrapper Start-->
  <BaseFormModal
    title="Déverrouiller la session"
    :with-close-action="false"
    :submit-form="submitLockForm"
  >
    <div class="form-group">
      <label>{{
        isSaleSession
          ? $t('common.fields.pin')
          : $t('common.attributes.password')
      }}</label>
      <div class="input-group">
        <span class="input-group-text"
          ><i :class="[showPassword ? 'icon-unlock' : 'icon-lock']"></i
        ></span>
        <BaseInput
          v-model="checkInput.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="*********"
          :errors="errors?.password"
          required
        />
        <div class="show-hide" @click="toggleShow">
          <span class=""> {{ showPasswordLabel }}</span>
        </div>
      </div>
      <span v-if="error" class="text-danger">{{ error }}</span>
    </div>
    <template #footer>
      <BaseButton
        :text="$t('common.unlock')"
        :loading="loading"
        class="btn btn-primary btn-block"
        type="submit"
      />
    </template>
  </BaseFormModal>
  <!-- page-wrapper end-->
</template>
<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';

export default {
  components: { BaseFormModal, BaseButton, BaseInput },
  props: {},
  data() {
    return {
      loading: false,
      error: null,
      errors: [],
      showPassword: false,
      checkInput: {
        password: null,
      },
    };
  },
  computed: {
    showPasswordLabel() {
      return this.showPassword ? 'Hide' : 'Show';
    },
    isSaleSession() {
      return this.$route.meta.requireCashierSession;
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    submitLockForm() {
      if (this.checkInput.password) {
        this.loading = true;
        this.error = null;
        this.$store
          .dispatch(
            this.isSaleSession
              ? 'cashier_session/unlockCurrentSession'
              : 'auth/checkPassword',
            this.checkInput
          )
          .then((data) => {
            if (!data.unlock) this.error = this.$t('common.unlock_error');
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
