<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitCustomerSettingForm">
      <div class="card-header pb-0">
        <h5>{{ $t('customers.customer.settingTitle') }}</h5>
        <span>
          Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.
        </span>
      </div>
      <template v-if="customer">
        <div class="card-body">
          <div
            v-if="customer.customer_modules && customer.customer_modules.length"
            class="row align-items-center mb-3"
          >
            <div v-for="module in activeModules" :key="module.id" class="card">
              <div
                class="media p-20"
                @click="deleteModule(module.customerModule)"
              >
                <div class="radio radio-primary me-3">
                  <input
                    :id="`module${module.id}`"
                    :name="`module${module.id}`"
                    checked
                    type="radio"
                    value="{{ module.id }}"
                  />
                  <label :for="`module${module.id}`"></label>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mega-title-badge">
                    {{ module.name }}
                    <span class="badge badge-primary pull-right digits">
                      {{ $t('common.actif') }}
                    </span>
                  </h6>
                  <p>
                    {{ module.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="modules.length && customer_modules.length < modules.length"
            class="row align-items-center"
          >
            <template v-for="module in modules" :key="module.id">
              <div v-if="!isSelected(module.id)" class="card">
                <div class="media p-20" @click="addModule(module.id)">
                  <div class="radio radio-secondary me-3">
                    <input
                      :id="`module${module.id}`"
                      :name="`module${module.id}`"
                      type="radio"
                      value="{{ module.id }}"
                    />
                    <label :for="`module${module.id}`"></label>
                  </div>
                  <div class="media-body">
                    <h6 class="mt-0 mega-title-badge">
                      {{ module.name }}
                      <span class="badge badge-secondary pull-right digits">
                        {{ $t('common.inactif') }}
                      </span>
                    </h6>
                    <p>
                      {{ module.description }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="card-footer">
          <div class="row justify-content-end">
            <BaseButton
              :text="$t('common.previous')"
              class="btn btn-secondary col-auto m-r-5"
              type="button"
              @click.prevent="$router.push({ name: 'customer.form.desc' })"
            />
            <BaseButton
              :text="$t('common.save')"
              class="btn btn-primary col-auto"
              icon="fa fa-save"
              @click.prevent="
                $router.push({
                  name: 'customer.form.iam',
                  params: { id: customer.id },
                })
              "
            />
          </div>
        </div>
      </template>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '/@/store';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch('module/getModulesList', {
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
      customer_modules: [],
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('customer', ['customer']),
    customerContext() {
      return `customers/${this.customer.id}`;
    },
    customerModules() {
      return this.customer.customer_modules &&
        this.customer.customer_modules.length
        ? this.customer.customer_modules.map((customerModule) =>
            customerModule.module_id.toString()
          )
        : [];
    },
    activeModules() {
      let modules = [];
      this.modules.map((module) => {
        if (this.isSelected(module.id)) {
          module.customerModule = this.customer.customer_modules.find(
            (em) => em.module_id.toString() === module.id.toString()
          );
          modules.push(module);
        }
      });

      return modules;
    },
  },
  mounted() {
    if (
      this.customer.customer_modules &&
      this.customer.customer_modules.length
    ) {
      this.customer_modules = this.customer.customer_modules.map(
        (customerModule) => customerModule.module_id.toString()
      );
    } else if (!this.customer) {
      this.$router.push({ name: 'customers' });
    }
  },
  methods: {
    isSelected(moduleId) {
      return (
        this.customerModules &&
        this.customerModules.includes(moduleId.toString())
      );
    },
    addModule(moduleId) {
      if (!this.isSelected(moduleId) && !this.formLoading) {
        this.formLoading = true;
        store
          .dispatch('customer/addCustomerModule', {
            moduleId,
            customerId: this.customer.id,
          })
          .then(() => {
            this.customer_modules.push(moduleId);
            this.formLoading = false;
          });
      }
    },
    deleteModule(customerModule) {
      if (
        customerModule.id &&
        this.isSelected(customerModule.module_id) &&
        !this.formLoading
      ) {
        this.formLoading = true;
        store
          .dispatch('customer/deleteCustomerModule', customerModule)
          .then(() => {
            this.customer_modules = this.customer_modules.filter(
              (em) => em.toString() !== customerModule.module_id.toString()
            );
            this.formLoading = false;
          });
      }
    },
    submitCustomerSettingForm() {},
  },
};
</script>

<style scoped></style>
