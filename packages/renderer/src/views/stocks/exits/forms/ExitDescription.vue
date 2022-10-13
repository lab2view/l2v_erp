<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitStockEntryForm">
      <div class="card-header pb-0">
        <div class="row">
          <div class="col-md">
            <h5>{{ formTitle }}</h5>
          </div>
          <div v-if="!isUpdating" class="col-auto">
            <BaseSwitchInput
              v-model="is_multi_enterprise"
              :label="$t('common.fields.multi_enterprise')"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseFieldGroup
                :with-refresh="true"
                refresh-action-name="stock_type/getStockTypesList"
                :label="$t('common.attributes.stock_exit_type_id')"
                :errors="errors?.stock_type_id"
                @btn-click="
                  $router.push({
                    name: 'stocks.exit.form.desc.stockType',
                    params: { ...$route.params },
                    query: { type_for: stockTypeFor.exit },
                  })
                "
              >
                <BaseSelect
                  v-model="stockExitForm.stock_type_id"
                  :options="stockTypes"
                  key-label="label"
                  key-value="id"
                  required
                  :disabled="isUpdating"
                />
              </BaseFieldGroup>
            </div>
            <div v-if="!is_multi_enterprise" class="col-md">
              <BaseInputGroup
                v-model="stockExitForm.reference"
                :label="$t('common.attributes.reference')"
                placeholder="E.g. STOCK-AP00001..."
                :errors="errors?.reference"
                required
                :disabled="isUpdating"
              >
                <button
                  :disabled="isUpdating"
                  type="button"
                  class="btn btn-success btn-iconsolid"
                  :title="$t('common.shuffle')"
                  @click.prevent="generateReference"
                >
                  <i class="fa fa-random"></i>
                </button>
              </BaseInputGroup>
            </div>
            <div v-else class="col-md">
              <div v-if="receiverEnterprises.length">
                <p>
                  <span
                    v-for="(receiveEnt, ind) in receiverEnterprises"
                    :key="`ent-${ind}`"
                    class="badge badge-primary"
                    @contextmenu.prevent="removeReceiveEnterprise(receiveEnt)"
                  >
                    {{ receiveEnt.name }}
                  </span>
                </p>
                <i class="text-warning"
                  >Clic droit pour supprimer une structure</i
                >
              </div>
              <p v-else>{{ $t('common.fields.select_structures') }}</p>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                v-model="stockExitForm.enterprise_id"
                :label="$t('common.fields.enterprise_from')"
                :options="sourceEnterprises"
                key-label="name"
                key-value="id"
                :errors="errors?.enterprise_id"
                :disabled="isUpdating"
              />
            </div>
            <div class="col-md">
              <BaseFieldGroup
                :with-refresh="true"
                :with-append="false"
                refresh-action-name="enterprise/getEnterprisesList"
                :label="$t('common.fields.enterprise_to')"
                :errors="errors?.enterprise_receiver_id"
              >
                <BaseSelect
                  v-model.number="stockExitForm.enterprise_receiver_id"
                  :options="
                    is_multi_enterprise
                      ? uniqueTargetEnterprises
                      : targetEnterprises
                  "
                  key-label="name"
                  key-value="id"
                  :required="!is_multi_enterprise"
                  :disabled="isUpdating"
                  @input="selectReceiverEnterprise"
                />
              </BaseFieldGroup>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div
          :class="`row ${
            stockExitIsConfirm
              ? 'justify-content-center'
              : 'justify-content-end'
          }`"
        >
          <BaseButton
            type="button"
            class="btn btn-secondary col-auto m-r-5"
            :text="$t('common.cancel')"
            @click.prevent="$router.push({ name: 'stocks.exits' })"
          />
          <BaseButton
            v-if="!stockExitIsConfirm"
            class="btn btn-primary col-auto"
            :text="$t('common.save')"
            icon="fa fa-save"
            :loading="loading"
          />
        </div>
      </div>
    </form>

    <router-view />
  </div>
</template>

<script>
import store from '/@/store';
import { mapGetters } from 'vuex';
import { stockFor, stockTypeCode } from '/@/helpers/codes.js';
import BaseButton from '/@/components/common/BaseButton.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInputGroup from '/@/components/common/BaseInputGroup.vue';
import { random } from 'lodash/number.js';
import BaseSwitchInput from '/@/components/common/BaseSwitchInput.vue';
import BaseFieldGroup from '/@/components/common/BaseFieldGroup.vue';

export default {
  name: 'ExitDescription',
  components: {
    BaseFieldGroup,
    BaseSwitchInput,
    BaseInputGroup,
    BaseSelect,
    BaseButton,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    Promise.all([
      store.dispatch('stock_type/getStockTypesList', {
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
      value: null,
      errors: [],
      loading: false,
      is_edited: false,
      is_multi_enterprise: false,
      stockExitForm: {
        id: null,
        stock_type_id: null,
        enterprise_id: null,
        enterprise_receiver_id: null,
        reference: null,
      },
      receiverEnterprises: [],
    };
  },
  computed: {
    ...mapGetters('stock_type', ['getListByTypeFor']),
    ...mapGetters('stock_exit', ['stockExit', 'stockExitIsConfirm']),
    ...mapGetters('enterprise', ['enterprises']),
    stockTypeFor() {
      return stockFor;
    },
    stockTypes() {
      return this.getListByTypeFor(this.stockTypeFor.exit).filter(
        (t) => t.code !== stockTypeCode.sale
      );
    },
    sourceEnterprises() {
      return [
        { id: '', name: this.$t('common.parent') },
        ...this.enterprises.filter(
          (ent) =>
            ent.id.toString() !== this.stockExitForm.enterprise_receiver_id
        ),
      ];
    },
    targetEnterprises() {
      return this.enterprises.filter(
        (ent) => ent.id.toString() !== this.stockExitForm.enterprise_id
      );
    },
    uniqueTargetEnterprises() {
      return this.targetEnterprises.filter(
        (tent) =>
          this.receiverEnterprises.find((ent) => ent.id === tent.id) ===
          undefined
      );
    },
    formTitle() {
      return this.stockExit
        ? this.$t('stocks.form.exit.updateTitle')
        : this.$t('stocks.form.exit.createTitle');
    },
    isUpdating() {
      return !!this.stockExit;
    },
  },
  watch: {
    stockExitForm: {
      deep: true,
      handler() {
        this.is_edited = true;
      },
    },
  },
  created() {
    if (this.stockExit) {
      this.stockExitForm = { ...this.stockExit };
      this.is_edited = false;
    }
  },
  methods: {
    submitStockEntryForm() {
      if (this.loading) return;

      if (this.isUpdating) {
        if (this.is_edited)
          this.$store
            .dispatch('stock_exit/updateStockExit', this.stockExitForm)
            .then((stockExit) =>
              this.$router.push({
                name: 'stocks.exit.form.article',
                params: { id: stockExit.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else
          this.$router.push({
            name: 'stocks.exit.form.article',
            params: { id: this.stockExit.id },
          });
      } else {
        if (!this.is_multi_enterprise)
          this.$store
            .dispatch('stock_exit/addStockExit', this.stockExitForm)
            .then((stockExit) =>
              this.$router.push({
                name: 'stocks.exit.form.article',
                params: { id: stockExit.id },
              })
            )
            .catch((error) => {
              this.errors = error.response?.data?.errors;
              console.log(error);
            });
        else {
          this.generateReference();
          this.$store
            .dispatch('stock_exit/addStockExitToMultipleStructures', {
              stockExitField: this.stockExitForm,
              receiverEnterprises: this.receiverEnterprises,
            })
            .then(() =>
              this.$router.push({
                name: 'stocks.exit.form.multiple',
              })
            )
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    generateReference() {
      //todo complete generating ref algorithm for exit stock
      this.stockExitForm.reference = `STE-EXIT-${new Date().getDay()}-${random(
        1000,
        1000000
      )}`;
    },
    removeReceiveEnterprise(receiveEnt) {
      this.receiverEnterprises = this.receiverEnterprises.filter(
        (ent) => ent.id !== receiveEnt.id
      );
    },
    selectReceiverEnterprise(event) {
      if (this.is_multi_enterprise) {
        const ent = this.targetEnterprises.find(
          (t) => t.id.toString() === event.target.value
        );
        if (ent !== undefined) {
          this.receiverEnterprises.push(ent);
        }
      }
    },
  },
};
</script>

<style scoped></style>
