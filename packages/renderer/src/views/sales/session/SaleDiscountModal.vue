<template>
  <BaseModal :title="'APPLIQUER UNE REDUCTION'" modal-size="lg">
    <div class="card-body pt-0">
      <div class="row align-items-end">
        <div v-if="canShowDiscountForm" class="col-md-4">
          <div v-if="customerDiscounts.length" class="mb-3">
            <BaseSelect
              v-model.number="client_discount_id"
              :label="$t('common.select_discount')"
              :options="customerDiscounts"
              key-label="label"
              key-value="id"
            />
          </div>
          <div class="mb-3">
            <BaseInput
              v-model="discountCode"
              :label="$t('common.discount_code')"
              placeholder="code"
              type="text"
            />
          </div>
          <div class="mb-3">
            <BaseButton
              type="button"
              icon="fa fa-eye"
              :disabled="!canSearchDiscount"
              class="btn btn-outline-success btn-sm m-r-5 float-end"
              :text="$t('common.show')"
              @click.prevent="searchDiscount"
            />
          </div>
        </div>
        <div class="col">
          <div v-if="discountArticles.length" class="table-responsive">
            <table class="table table-sm">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Articles</th>
                  <th scope="col">Prix</th>
                  <th scope="col">Reduct.</th>
                  <th scope="col" class="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(discountArticle, index) in discountArticles"
                  :key="`discount-art-${index}`"
                >
                  <td>{{ discountArticle.label }}</td>
                  <td class="f-right">
                    {{ discountArticle.sup_price }}
                    <span class="super">{{ currency }}</span>
                  </td>
                  <td class="">
                    {{ discountArticle.discount_price }}
                    <span class="super">{{ currency }}</span>
                  </td>
                  <td class="text-center">
                    <span class="badge badge-primary">
                      {{
                        parseFloat(discountArticle.sup_price) -
                        parseFloat(discountArticle.discount_price)
                      }}
                      {{ currency }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card browser-widget pb-0 mb-0">
            <div class="media card-body">
              <div class="media-body align-self-center">
                <div>
                  <p>Prix total</p>
                  <h4 class="font-info">
                    {{ `${getCurrentSaleTotalAmount} ${currency}` }}
                  </h4>
                </div>
                <div>
                  <p>Reduction</p>
                  <h4 class="font-info">
                    {{ `${totalDiscountAmount} ${currency}` }}
                  </h4>
                </div>
                <div>
                  <p>Nouveau prix</p>
                  <h4 class="font-primary">
                    {{ `${amountAfterDiscount} ${currency}` }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <BaseButton
        type="button"
        class="btn btn-secondary m-r-5"
        :text="$t('common.cancel')"
        @click.prevent="cancelAction"
      />
      <BaseButton
        type="button"
        icon="fa fa-check"
        class="btn btn-primary"
        :text="$t('common.apply')"
        @click.prevent="applyDiscount"
      />
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from '/@/components/common/BaseModal.vue';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import { mapGetters } from 'vuex';
import { sumBy } from 'lodash';
export default {
  components: { BaseInput, BaseSelect, BaseButton, BaseModal },
  data() {
    return {
      client_discount_id: null,
      discountCode: null,
      discount: null,
    };
  },
  computed: {
    ...mapGetters('discount', [
      'getDiscountByCustomerId',
      'getDiscountByCode',
      'discounts',
    ]),
    ...mapGetters('cashier_session', [
      'currentSaleRequest',
      'stock_exit_lines',
      'getCurrentSaleTotalAmount',
    ]),
    ...mapGetters('workspace', ['currency']),
    customerDiscounts() {
      return this.currentSaleRequest.customer_id
        ? this.getDiscountByCustomerId(this.currentSaleRequest.customer_id)
        : [];
    },
    canSearchDiscount() {
      return !!this.client_discount_id || !!this.discountCode;
    },
    discountArticles() {
      if (this.discount) {
        if (!this.discount.only_bill) {
          return this.stock_exit_lines
            .filter(
              (sel) =>
                this.discount?.discount_articles?.find(
                  (da) => da.article_id === sel.article_id
                ) !== undefined
            )
            .map((stockExitLine) => {
              return {
                ...stockExitLine,
                discount_id: this.discount.id,
                discount_price: this.discount.is_percent
                  ? (parseFloat(this.discount.value) *
                      parseFloat(stockExitLine.sup_price)) /
                    100
                  : this.discount.value,
              };
            });
        }
      }
      return [];
    },
    discountArticleAmount() {
      return sumBy(this.discountArticles, 'discount_price');
    },
    discountBillAmount() {
      return this.discount?.only_bill
        ? (parseFloat(this.discount.value) *
            parseFloat(this.getCurrentSaleTotalAmount)) /
            100
        : 0;
    },
    totalDiscountAmount() {
      return this.discountArticleAmount + this.discountBillAmount;
    },
    amountAfterDiscount() {
      return this.getCurrentSaleTotalAmount - this.totalDiscountAmount;
    },
    canShowDiscountForm() {
      return this.discount
        ? this.discount.only_bill
          ? true
          : this.discountArticles.length === 0
        : true;
    },
  },
  created() {
    if (this.currentSaleRequest.discount_id)
      this.discount =
        this.discounts.find(
          (d) => d.id === this.currentSaleRequest.discount_id
        ) ?? null;
  },
  methods: {
    searchDiscount() {
      if (this.client_discount_id) {
        this.discount =
          this.customerDiscounts.find(
            (cd) => cd.id === this.client_discount_id
          ) ?? null;
      }
      if (!this.discount && this.discountCode) {
        this.discount = this.getDiscountByCode(this.discountCode) ?? null;
        if (this.discount == null) this.discountCode = null;
      }
    },
    cancelAction() {
      if (this.discount) {
        this.discount = null;
      } else this.$router.back();
    },
    applyDiscount() {
      if (this.discount) {
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: this.discount.id,
          field: 'discount_id',
        });
        this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
          value: this.totalDiscountAmount,
          field: 'discount',
        });
        if (this.discountCode)
          this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
            value: this.discountCode,
            field: 'discount_code',
          });
        if (this.discountArticles.length) {
          let stock_exit_lines = this.stock_exit_lines.map((sel) => {
            const articleDiscount = this.discountArticles.find(
              (da) => da.article_id === sel.article_id
            );
            if (articleDiscount !== undefined)
              return {
                ...sel,
                discount_id: articleDiscount.discount_id,
              };
            else return sel;
          });
          this.$store.commit(
            'cashier_session/SET_CURRENT_SALE_REQUEST_ARTICLE_LINES',
            stock_exit_lines
          );
        }
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped></style>
