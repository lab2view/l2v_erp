<template>
  <BaseFormModal :submit-form="submitCashierForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="cashierForm.cashier_group_id"
        :errors="errors.cashier_group_id"
        :label="$t('common.attributes.cashier_group')"
        :options="cashierGroups"
        key-label="label"
        key-value="id"
        required
      />
    </div>
    <div class="form-group mb-3">
      <BaseSelect
        v-model="cashierForm.enterprise_id"
        :errors="errors.enterprise_id"
        :label="$t('common.attributes.enterprise')"
        :options="enterprises"
        key-label="label"
        key-value="id"
      />
    </div>
    <div class="form-group mb-3">
      <BaseInput
        v-model="cashierForm.pin"
        :errors="errors.pin"
        :label="$t('common.attributes.pin')"
        placeholder="1010"
        required
        type="text"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="start_at">{{
        $t('common.attributes.start_at')
      }}</label>
      <input
        id="start_at"
        v-model="cashierForm.start_at"
        class="form-control"
        placeholder="..."
        required
        type="text"
      />
      <div
        v-if="errors.start_at && errors.start_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.start_at[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="ended_at">{{
        $t('common.attributes.end_at')
      }}</label>
      <input
        id="ended_at"
        v-model="cashierForm.ended_at"
        class="form-control"
        placeholder="..."
        type="text"
      />
      <div
        v-if="errors.ended_at && errors.ended_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.ended_at[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <BaseTextArea
        v-model="cashierForm.description"
        :errors="errors?.description"
        :label="$t('common.attributes.description')"
        placeholder="..."
        rows="4"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="disabled_at">{{
        $t('common.attributes.disable_date')
      }}</label>
      <input
        id="disabled_at"
        v-model="cashierForm.disabled_at"
        class="form-control"
        placeholder="12/01/2022"
        type="text"
      />
      <div
        v-if="errors.disabled_at && errors.disabled_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.disabled_at[0] }}
      </div>
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
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: { BaseInput, BaseFormModal, BaseSelect, BaseTextArea },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('cashierGroup/getCashierGroupsList', {
        page: 1,
        field: {},
      }),
      store.dispatch('enterprise/getEnterprisesList', {
        page: 1,
        field: {},
      }),
    ])
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
      cashierForm: {
        enterprise_id: null,
        cashier_group_id: null,
        pin: null,
        disabled_at: null,
        start_at: null,
        ended_at: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('cashierGroup', ['cashierGroups']),
    ...mapGetters('cashier', ['cashier']),
    title() {
      return this.cashier && this.cashier.id
        ? this.$t('sales.cashier.formUpdateTitle')
        : this.$t('sales.cashier.formCreateTitle');
    },
  },
  created() {
    if (this.cashier && this.cashier.id) this.cashierForm = this.cashier;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.cashier && this.cashier.id)
      this.$store.commit('cashier/SET_CURRENT_CASHIER', null);
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitCashierForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.cashier && this.cashier.id) {
        this.$store
          .dispatch('cashier/updateCashier', this.cashierForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('cashier/addCashier', this.cashierForm)
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
