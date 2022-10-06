<template>
  <BaseFormModal :submit-form="submitCashierForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="cashierForm.cashier_group_id"
        :errors="errors?.cashier_group_id"
        :label="$t('common.attributes.cashier_group')"
        :options="cashierGroups"
        key-label="label"
        key-value="id"
        required
      />
    </div>
    <div class="form-group mb-3" v-if="canShowEnterpriseField">
      <BaseSelect
        v-model="cashierForm.enterprise_id"
        :errors="errors?.enterprise_id"
        :label="$t('common.attributes.enterprise')"
        :options="enterprises"
        key-label="name"
        key-value="id"
      />
    </div>
    <div class="form-group mb-3">
      <BaseInput
        v-model="cashierForm.pin"
        :errors="errors?.pin"
        :label="$t('common.attributes.pin')"
        placeholder="1010"
        required
        type="text"
      />
    </div>
    <div class="form-group mb-3">
      <BaseInput
        v-model="cashierForm.name"
        :errors="errors?.name"
        :label="$t('common.attributes.first_name')"
        placeholder="Eg. Djon doe"
        required
        type="text"
      />
    </div>
    <div class="form-group mb-3">
      <BaseDatetime
        v-model="cashierForm.start_at"
        :label="$t('common.attributes.start_at')"
        label-class="form-label fw-bold"
        placeholder="..."
        required
        type="date"
      />
      <div
        v-if="errors?.start_at && errors?.start_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors?.start_at[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <BaseDatetime
        v-model="cashierForm.ended_at"
        :label="$t('common.attributes.end_at')"
        label-class="form-label fw-bold"
        placeholder="..."
        type="date"
      />
      <div
        v-if="errors?.ended_at && errors?.ended_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors?.ended_at[0] }}
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
    <template #footer>
      <button :title="$t('common.save')" class="btn btn-primary" type="submit">
        {{ $t('common.save') }}
      </button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseDatetime,
    BaseInput,
    BaseFormModal,
    BaseSelect,
    BaseTextArea,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('cashier_group/getCashierGroupsList', {
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
        name: null,
        disabled_at: null,
        start_at: null,
        ended_at: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprises']),
    ...mapGetters('cashier_group', ['cashierGroups']),
    ...mapGetters('cashier', ['cashier']),
    ...mapGetters('auth', ['currentEnterpriseId']),
    title() {
      return this.cashier && this.cashier.id
        ? this.$t('sales.cashier.formUpdateTitle')
        : this.$t('sales.cashier.formCreateTitle');
    },
    canShowEnterpriseField() {
      return !this.currentEnterpriseId;
    },
  },
  created() {
    if (this.cashier && this.cashier.id) this.cashierForm = this.cashier;
    if (this.currentEnterpriseId)
      this.cashierForm.enterprise_id = this.currentEnterpriseId;
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
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch('cashier/addCashier', this.cashierForm)
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      }
    },
  },
};
</script>

<style scoped></style>
