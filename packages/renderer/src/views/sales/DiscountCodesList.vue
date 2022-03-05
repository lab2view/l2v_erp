<template>
  <div class="card mb-0">
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-sm">
          <h5>{{ $t('sales.discount.codes') }}</h5>
        </div>
        <div class="col-sm-auto align-items-end">
          <BaseButton
            class="btn btn-primary"
            type="button"
            @click.prevent="showModal = true"
          >
            <i class="fa fa-plus m-r-5" />
            {{ $t('common.generate_code') }}
          </BaseButton>
        </div>
      </div>
      <div class="mt-2">
        <BaseDatatable :tfoot="false" :total="discount_codes.length">
          <template #headers>
<!--            <th>#</th>-->
            <th>{{ $t('common.code') }}</th>
<!--
            <th>{{ $t('common.actions') }}</th>
-->
          </template>
          <tr v-for="discountCode in discount_codes" :key="discountCode.id">
<!--            <td>{{ discountCode.id }}</td>-->
            <td>{{ discountCode.code }}</td>
<!--
            <td>
              <button
                class="btn btn-danger btn-xs m-l-5"
                type="button"
                data-original-title="btn btn-danger btn-xs"
                :title="$t('common.delete')"
                @click.prevent="deleteCode(discountCode.id)"
              >
                <i class="fa fa-trash-o" />
              </button>
            </td>
-->
          </tr>
        </BaseDatatable>
      </div>
    </div>
    <div class="card-footer">
      <div class="row justify-content-end">
        <BaseButton
          class="btn btn-primary col-auto"
          icon="fa fa-save"
          type="button"
          :text="$t('common.close')"
          @click.prevent="$router.push({ name: 'sales.discounts' })"
        />
      </div>
    </div>
  </div>
  <BaseFormModal v-if="showModal" :submit-form="generateCode" :title="$t('common.generate_code')">
    <div class="mb-3">
      <label class="form-label fw-bold" for="count">{{
          $t('common.size')
        }}</label>
      <BaseInput
        id="count"
        v-model="discountCodeForm.count"
        class="form-control"
        type="number"
        placeholder="4"
        required
      />
      <div v-if="errors.count" class="invalid-feedback" style="display: inline">
        {{ errors.count[0] }}
      </div>
    </div>
    <div class="mb-3">
      <label class="form-label fw-bold" for="how_many_code">{{
          $t('common.attributes.number')
        }}</label>
      <BaseInput
        id="how_many_code"
        v-model="discountCodeForm.how_many_code"
        class="form-control"
        type="number"
        placeholder="2"
        required
      />
      <div v-if="errors.how_many_code" class="invalid-feedback" style="display: inline">
        {{ errors.how_many_code[0] }}
      </div>
    </div>
    <template #footer>
      <button class="btn btn-primary" type="submit" :title="$t('common.save')">
        {{ $t('common.save') }}
      </button>
    </template>
    <template #close>
      <button
        class="btn-close"
        type="button"
        data-bs-dismiss="modal"
        aria-label="Close"
        @click.prevent="showModal = false"
      ></button>
    </template>
  </BaseFormModal>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseDatatable from '/@/components/common/BaseDatatable.vue';
import BaseFormModal from '/@/components/common/BaseFormModal.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import store from '/@/store';
import { mapGetters } from 'vuex';

export default {
  components: {
    BaseInput,
    BaseFormModal,
    BaseButton,
    BaseDatatable
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discountCode/getDiscountCodesList', {
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
      loading: false,
      showModal: false,
      discountCodeForm: {
        count: null,
        how_many_code: null,
        is_active: true,
      }
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
    ...mapGetters('discountCode', ['discountCodes']),
    discount_codes() {
      return this.discountCodes?.filter((dc) => dc.discount_id === this.discount.id) ?? [];
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
    generateCode() {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      this.$store
        .dispatch('discountCode/generateCodes', {
          discount_id: this.discount.id,
          count: this.discountCodeForm.count,
          is_active: this.discountCodeForm.is_active,
          how_many_code: this.discountCodeForm.how_many_code,
        })
        .then(() => this.showModal = false)
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log('this.errors');
          console.log(this.errors);
        })
        .finally(() => this.setLoading());
    },
    deleteCode(discountCodeId) {
      if (this.formLoading) {
        return;
      }

      this.setLoading(true);
      this.$store
        .dispatch('discountCode/deleteDiscountCodes', [discountCodeId])
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log('this.errors');
          console.log(this.errors);
        })
        .finally(() => this.setLoading());
    },
  },
};
</script>

<style scoped></style>
