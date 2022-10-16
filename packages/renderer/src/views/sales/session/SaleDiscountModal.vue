<template>
  <BaseModal :title="'APPLIQUER UNE REDUCTION'" modal-size="lg">
    <div class="card-body pt-0">
      <div class="row align-items-center">
        <div v-if="canShowDiscountForm" class="col-md-4">
          <div v-if="selectableDiscounts.length" class="mb-3">
            <BaseSelect
              v-model.number="client_discount_id"
              :label="$t('common.select_discount')"
              :options="selectableDiscounts"
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
              icon="fa fa-check"
              :disabled="!canSearchDiscount"
              class="btn btn-outline-success btn-sm m-r-5 float-end"
              :text="$t('common.apply')"
              :loading="loading"
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
            <div v-if="haveCurrentDiscount" class="alert alert-secondary p-2">
              {{ $t('common.sale.discount_note') }}
            </div>
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
                    {{ `${totalDiscountAmount.toFixed(2)} ${currency}` }}
                  </h4>
                </div>
                <div>
                  <p>Nouveau prix</p>
                  <h4 class="font-primary">
                    {{ `${amountAfterDiscount.toFixed(2)} ${currency}` }}
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
        icon="fa fa-save"
        class="btn btn-primary"
        :text="$t('common.save')"
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
import store from '/@/store/index.js';
import { notify } from '/@/helpers/notify.js';
export default {
  name: 'SaleDiscountModel',
  components: { BaseInput, BaseSelect, BaseButton, BaseModal },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('discount/getDiscountsList', {
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
      loading: false,
      client_discount_id: null,
      discountCode: null,
      discount: null,
    };
  },
  computed: {
    ...mapGetters('discount', [
      'getSaleDiscountSelectable',
      'getDiscountByCode',
      'discounts',
    ]),
    ...mapGetters('cashier_session', [
      'currentSaleRequest',
      'stock_exit_lines',
      'getCurrentSaleTotalAmount',
    ]),
    ...mapGetters('workspace', ['currency']),
    selectableDiscounts() {
      return this.getSaleDiscountSelectable(
        this.currentSaleRequest.customer_id
      );
    },
    canSearchDiscount() {
      return (
        !!this.client_discount_id ||
        !!this.discountCode ||
        !this.haveCurrentDiscount
      );
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
      if (this.discount?.only_bill) {
        const DiscountValue = parseFloat(this.discount.value);
        return this.discount.is_percent
          ? (DiscountValue * parseFloat(this.getCurrentSaleTotalAmount)) / 100
          : DiscountValue;
      } else return 0;
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
    haveCurrentDiscount() {
      return (
        this.currentSaleRequest.discount || this.currentSaleRequest.discount_id
      );
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
          this.selectableDiscounts.find(
            (cd) => cd.id === this.client_discount_id
          ) ?? null;
      }
      if (!this.discount && this.discountCode) {
        this.loading = true;
        this.$store
          .dispatch('discount_code/getDiscountCodeByCode', this.discountCode)
          .then((discountCode) => {
            if (discountCode.is_active)
              this.discount = this.getDiscountByCode(this.discountCode) ?? null;
            else notify('Code de reduction invalid', 'Erreur', 'danger');
            if (this.discount == null) this.discountCode = null;
          })
          .finally(() => (this.loading = false));
      }
    },
    cancelAction() {
      if (this.discount) {
        this.discount = null;
        this.cancelDiscount();
      }
      this.$router.back();
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

    cancelDiscount() {
      this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
        value: null,
        field: 'discount_id',
      });
      this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
        value: null,
        field: 'discount',
      });
      this.$store.commit('cashier_session/SET_CURRENT_SALE_REQUEST_FIELD', {
        value: null,
        field: 'discount_code',
      });
      this.$store.commit(
        'cashier_session/SET_CURRENT_SALE_REQUEST_ARTICLE_LINES',
        this.stock_exit_lines.map((sel) => {
          return { ...sel, discount_id: null };
        })
      );
    },
  },
};
</script>

<style scoped></style>
