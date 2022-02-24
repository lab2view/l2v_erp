<template>
  <BaseFormModal :submit-form="submitDiscountForm" :title="title">
    <div class="form-group mb-3">
      <BaseSelect
        v-model="discountForm.discount_type_id"
        :label="$t('common.attributes.discount_type')"
        :options="discountTypes"
        key-label="label"
        key-value="id"
        required
        :errors="errors.discount_type_id"
      />
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="label">{{
          $t('common.attributes.label')
        }}</label>
      <input
        id="label"
        v-model="discountForm.label"
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
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="value">{{
          $t('common.attributes.value')
        }}</label>
      <input
        id="value"
        v-model="discountForm.value"
        class="form-control"
        placeholder="..."
        type="number"
      />
      <div
        v-if="errors.value && errors.value.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.value[0] }}
      </div>
    </div>
    <div class="form-group mb-3">
      <label class="form-label fw-bold" for="start_at">{{
          $t('common.attributes.start_at')
        }}</label>
      <input
        id="start_at"
        v-model="discountForm.start_at"
        class="form-control"
        placeholder="..."
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
      <label class="form-label fw-bold" for="end_at">{{
          $t('common.attributes.end_at')
        }}</label>
      <input
        id="end_at"
        v-model="discountForm.end_at"
        class="form-control"
        placeholder="..."
        type="text"
      />
      <div
        v-if="errors.end_at && errors.end_at.length"
        class="invalid-feedback"
        style="display: inline"
      >
        {{ errors.end_at[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="description">{{
          $t('common.attributes.description')
        }}</label>
      <textarea
        id="description"
        v-model="discountForm.description"
        class="form-control"
        placeholder="..."
      ></textarea>
      <div v-if="errors.description" class="invalid-feedback" style="display: inline">
        {{ errors.description[0] }}
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
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseFormModal, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discountType/getDiscountTypesList', {
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
      discountForm: {
        label: null,
        value: null,
        start_at: null,
        end_at: null,
        is_percent: null,
        only_bill: null,
        discount_type_id: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('discountType', ['discountTypes']),
    ...mapGetters('discount', ['discount']),
    title() {
      return this.discount && this.discount.id
        ? this.$t('sales.discount.formUpdateTitle')
        : this.$t('sales.discount.formCreateTitle');
    },
  },
  created() {
    if (this.discount && this.discount.id)
      this.discountForm = this.discount;
  },
  beforeUnmount() {
    this.setLoading();
    if (this.discount && this.discount.id)
      this.$store.commit(
        'discount/SET_CURRENT_DISCOUNT',
        null
      );
  },
  methods: {
    setLoading(value = false) {
      if (value) {
        this.errors = [];
      }

      this.formLoading = value;
    },
    submitDiscountForm() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      if (this.discount && this.discount.id) {
        this.$store.dispatch(
          'discount/updateDiscount',
          this.discountForm,
        )
          .then(() => this.$router.back())
          .catch((error) => {
            this.errors = error.response.data.errors;
            console.log(error);
          })
          .finally(() => this.setLoading());
      } else {
        this.$store
          .dispatch(
            'discount/addDiscount',
            this.discountForm,
          )
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
