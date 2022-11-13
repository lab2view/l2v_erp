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
        <div class="row align-items-end">
          <div class="col-md">
            <div class="form-group">
              <BaseSelect
                v-model="discountForm.discount_type_id"
                :label="$t('common.attributes.discount_type')"
                :options="discountTypes"
                key-label="label"
                key-value="id"
                required
                :errors="errors?.discount_type_id"
              />
            </div>
          </div>
          <div class="col-md">
            <div class="form-group">
              <BaseInput
                v-model="discountForm.label"
                :label="$t('common.attributes.label')"
                placeholder="..."
                required
                type="text"
                :errors="errors?.label"
              />
            </div>
          </div>
        </div>
        <div class="row align-items-end">
          <div class="col-md">
            <div class="form-group">
              <BaseInput
                v-model="discountForm.value"
                :label="$t('common.attributes.value')"
                placeholder="1"
                type="text"
                step=".01"
                required
                :errors="errors?.value"
              />
            </div>
          </div>
          <div class="col-md">
            <div class="form-group">
              <BaseSwitchInput
                v-model="discountForm.is_percent"
                :errors="errors?.is_percent"
                :label="$t('common.attributes.is_percent')"
              />
            </div>
          </div>
          <div class="col-md">
            <div class="form-group">
              <BaseSwitchInput
                v-model="discountForm.only_bill"
                :errors="errors?.only_bill"
                :label="$t('common.attributes.only_bill')"
              />
            </div>
          </div>
        </div>
        <div class="row align-items-end">
          <div class="col-md">
            <div class="form-group">
              <BaseDatetime
                id="start_at"
                v-model="discountForm.start_at"
                :label="$t('common.attributes.start_at')"
                placeholder="..."
                type="date"
              />
            </div>
          </div>
          <div class="col-md">
            <div class="form-group">
              <BaseDatetime
                id="end_at"
                v-model="discountForm.end_at"
                :label="$t('common.attributes.end_at')"
                placeholder="..."
                type="date"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <BaseTextArea
            v-model="discountForm.description"
            :label="$t('common.attributes.description')"
            placeholder="..."
            :errors="errors?.description"
          />
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
import BaseInput from '/@/components/common/BaseInput.vue';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import BaseTextArea from '/@/components/common/BaseTextArea.vue';

export default {
  name: 'DiscountFormDesc',
  components: {
    BaseTextArea,
    BaseSwitchInput,
    BaseInput,
    BaseButton,
    BaseDatetime,
    BaseSelect,
  },
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
