<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitDiscountForm">
      <div class="card-header pb-0">
        <h5>{{ formTitle }}</h5>
        <span
          >{{ $t('common.fields.required_field_start') }}
          <span class="text-danger">*</span>
          {{ $t('common.fields.required_field_end') }}</span
        >
      </div>
      <div class="card-body">
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
            placeholder="1"
            type="number"
            step=".01"
            required
          />
          <div
            v-if="errors.value && errors.value.length"
            class="invalid-feedback"
            style="display: inline"
          >
            {{ errors.value[0] }}
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="form-group col-md">
              <label class="form-label fw-bold" for="is_percent">{{
                $t('common.attributes.is_percent')
              }}</label>
              <input
                id="is_percent"
                v-model="discountForm.is_percent"
                type="checkbox"
              />
              <div
                v-if="errors.is_percent && errors.is_percent.length"
                class="invalid-feedback"
                style="display: inline"
              >
                {{ errors.is_percent[0] }}
              </div>
            </div>
            <div class="form-group col-md">
              <label class="form-label fw-bold" for="only_bill">{{
                $t('common.attributes.only_bill')
              }}</label>
              <input
                id="only_bill"
                v-model="discountForm.only_bill"
                type="checkbox"
              />
              <div
                v-if="errors.only_bill && errors.only_bill.length"
                class="invalid-feedback"
                style="display: inline"
              >
                {{ errors.only_bill[0] }}
              </div>
            </div>
          </div>
        </div>
        <div class="form-group mb-3">
          <BaseDatetime
            id="start_at"
            v-model="discountForm.start_at"
            :label="$t('common.attributes.start_at')"
            placeholder="..."
            type="date"
          />
        </div>
        <div class="form-group mb-3">
          <BaseDatetime
            id="end_at"
            v-model="discountForm.end_at"
            :label="$t('common.attributes.end_at')"
            placeholder="..."
            type="date"
          />
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
          <div
            v-if="errors.description"
            class="invalid-feedback"
            style="display: inline"
          >
            {{ errors.description[0] }}
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'sales.discounts' })"
          />
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary col-auto"
            icon="fa fa-save"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseDatetime from '/@/components/common/BaseDatetime.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseButton, BaseDatetime, BaseSelect },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discount_type/getDiscountTypesList', {
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
      errors: [],
      is_edited: true,
      formLoading: false,
      discountForm: {
        label: null,
        value: null,
        start_at: null,
        end_at: null,
        is_percent: false,
        only_bill: false,
        discount_type_id: null,
        description: null,
      },
    };
  },
  computed: {
    ...mapGetters('discount_type', ['discountTypes']),
    ...mapGetters('discount', ['discount']),
    formTitle() {
      return this.discount && this.discount.id
        ? this.$t('sales.discount.formUpdateTitle')
        : this.$t('sales.discount.formCreateTitle');
    },
  },
  watch: {
    discountForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.discount && this.discount.id) {
      this.discountForm = this.discount;
      this.is_edited = false;
    }
  },
  beforeUnmount() {
    this.setLoading();
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
        if (this.is_edited) {
          this.$store
            .dispatch('discount/updateDiscount', this.discountForm)
            .then((discount) =>
              this.$router.push({
                name: 'sales.discount.form.articles',
                params: { id: discount.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            })
            .finally(() => this.setLoading());
        } else
          this.$router.push({
            name: 'sales.discount.form.articles',
            params: { id: this.discount.id },
          });
      } else {
        this.$store
          .dispatch('discount/addDiscount', this.discountForm)
          .then((discount) => {
            this.setLoading();
            this.$router.push({
              name: 'sales.discount.form.articles',
              params: { id: discount.id },
            });
          })
          .catch((error) => {
            this.errors = error.response?.data?.errors;
            console.log(error);
            this.setLoading();
          });
      }
    },
  },
};
</script>

<style scoped></style>
