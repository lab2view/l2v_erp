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
            <th>#</th>
            <th>{{ $t('common.code') }}</th>
            <th>{{ $t('common.headers.usage') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </template>
          <tr
            v-for="(discountCode, index) in discount_codes"
            :key="discountCode.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ discountCode.code }}</td>
            <td>{{ `${discountCode.usage} / ${discountCode.count}` }}</td>
            <td>
              <BaseButton
                type="button"
                class="btn btn-iconsolid btn-danger btn-sm m-l-5"
                :title="$t('common.delete')"
                @click.prevent="deleteDiscountCode(discountCode.id)"
              >
                <i class="fa fa-times" />
              </BaseButton>
            </td>
          </tr>
        </BaseDatatable>
      </div>
    </div>
    <div class="card-footer">
      <div class="row justify-content-end">
        <BaseButton
          class="btn btn-sm btn-outline-info col-auto"
          icon="fa fa-arrow-left"
          type="button"
          :text="$t('common.back_to_list')"
          @click.prevent="$router.push({ name: 'sales.discounts' })"
        />
      </div>
    </div>
  </div>
  <BaseFormModal
    v-if="showModal"
    :submit-form="generateCode"
    :title="$t('common.generate_code')"
  >
    <div class="mb-3">
      <BaseInput
        v-model="discountCodeForm.code_length"
        :label="$t('common.attributes.code_length')"
        :min="4"
        type="number"
        placeholder="4"
        required
        :errors="errors?.code_length"
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="discountCodeForm.code_count"
        :label="$t('common.attributes.code_count')"
        :min="1"
        type="number"
        placeholder="1"
        required
        :errors="errors?.code_count"
      />
    </div>
    <div class="mb-3">
      <BaseInput
        v-model="discountCodeForm.count"
        :label="$t('common.attributes.code_usage')"
        :min="1"
        type="number"
        placeholder="1"
        required
        :errors="errors?.count"
      />
    </div>
    <template #footer>
      <BaseButton
        class="btn btn-primary col-auto"
        :text="$t('common.save')"
        icon="fa fa-save"
        :loading="loading"
      />
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
    BaseDatatable,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discount_code/getDiscountCodesList', {
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
        count: 1,
        code_count: null,
        code_length: null,
      },
    };
  },
  computed: {
    ...mapGetters('discount', ['discount']),
    ...mapGetters('discount_code', ['getDiscountCodeByDiscountId']),
    discount_codes() {
      return this.getDiscountCodeByDiscountId(this.discount.id);
    },
  },

  methods: {
    generateCode() {
      this.loading = true;
      this.errors = [];
      this.$store
        .dispatch('discount_code/generateCodes', {
          ...this.discountCodeForm,
          discount_id: this.discount.id,
        })
        .then(() => (this.showModal = false))
        .catch((error) => {
          this.errors = error.response?.data?.errors;
        })
        .finally(() => (this.loading = false));
    },

    deleteDiscountCode(discountCodeId) {
      this.loading = true;
      this.$store
        .dispatch('discount_code/deleteDiscountCodes', [discountCodeId])
        .catch((error) => {
          this.errors = error.response?.data?.errors;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
