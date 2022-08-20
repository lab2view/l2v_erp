<template>
  <!-- page-wrapper Start-->
  <BaseModal title="Déverrouiller" :with-close-action="false">
    <form
      class="theme-form p-0 m-0 login-form"
      @submit.prevent="submitLockForm"
    >
      <div class="form-group">
        <label>{{ $t('common.attributes.password') }}</label>
        <div class="input-group">
          <span class="input-group-text"
            ><i :class="[showPassword ? 'icon-unlock' : 'icon-lock']"></i
          ></span>
          <BaseInput
            v-if="showPassword"
            v-model="checkInput.password"
            type="text"
            placeholder="*********"
            :errors="errors?.password"
            required
          />
          <BaseInput
            v-else
            v-model="checkInput.password"
            type="password"
            placeholder="*********"
            required
            @keydown.enter="submitLockForm"
          />
          <div class="show-hide" @click="toggleShow">
            <span class=""> {{ showPasswordLabel }}</span>
          </div>
        </div>
        <span v-if="error" class="text-danger">{{ error }}</span>
      </div>
    </form>
    <template #footer>
      <BaseButton
        :text="$t('common.unlock')"
        :loading="loading"
        class="btn btn-primary btn-block"
        @click.prevent="submitLockForm"
      />
    </template>
  </BaseModal>
  <!-- page-wrapper end-->
</template>
<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseModal from '/@/components/common/BaseModal.vue';

export default {
  components: { BaseModal, BaseButton, BaseInput },
  props: {},
  data() {
    return {
      loading: false,
      error: null,
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
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    submitLockForm() {
      if (this.checkInput.password) {
        this.loading = true;
        this.$store
          .dispatch('auth/checkPassword', this.checkInput)
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
