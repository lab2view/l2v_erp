<template>
  <BaseFormModal :submit-form="submitCashRegisterForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="cashRegisterForm.enterprise_id"
        :errors="errors.enterprise_id"
        :label="$t('common.attributes.enterprise')"
        :options="enterprises"
        key-label="name"
        key-value="id"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
        $t('common.attributes.label')
      }}</label>
      <input
        id="label"
        v-model="cashRegisterForm.label"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />

      <div
        v-if="errors.label && errors.label.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.label[0] }}
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label fw-bold">{{
        $t('common.attributes.description')
      }}</label>
      <textarea
        v-model="cashRegisterForm.description"
        class="form-control"
      ></textarea>
    </div>

    <div class="mb-3">
      <input id="customFile" ref="file" type="file" @change="uploadFile" />
    </div>
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import { mapGetters } from 'vuex';
import store from '/@/store/index.js';
import BaseSelect from '/@/components/common/BaseSelect.vue';

export default {
  components: { BaseSelect, BaseFormModal },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('enterprise/getEnterprisesList', {
        page: 1,
        field: {},
      })
      .then(() => {
        next();
      })
      .catch((error) => {
        console.log(error);
        next();
      });
  },
  data() {
    return {
      formLoading: false,
      errors: [],
      cashRegisterForm: {
        enterprise_id: null,
        label: null,
        code: null,
        description: null,
        avatar: null,
      },
    };
  },
  computed: {
    ...mapGetters('cash_register', ['cashRegister']),
    ...mapGetters('enterprise', ['enterprises']),
    title() {
      return this.cashRegister && this.cashRegister.id
        ? this.$t('sales.cashRegister.formUpdateTitle')
        : this.$t('sales.cashRegister.formCreateTitle');
    },
  },
  created() {
    if (this.cashRegister && this.cashRegister.id)
      this.cashRegisterForm = this.cashRegister;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.cashRegister && this.cashRegister.id)
      this.$store.commit('cash_register/SET_CURRENT_CASH_REGISTER', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },

    uploadFile() {
      this.avatar = this.$refs.file.files[0];
    },

    submitCashRegisterForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.cashRegister && this.cashRegister.id) {
        this.$store
          .dispatch('cash_register/updateCashRegister', this.cashRegisterForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('cash_register/addCashRegister', this.cashRegisterForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
