<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitEnterpriseSettingForm">
      <div class="card-header pb-0">
        <h5>{{ $t('structures.enterprise.settingTitle') }}</h5>
        <span
          >Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.</span
        >
      </div>
      <div class="card-body">
        <div class="mb-3">
          {{ enterpriseForm.modules.join(',') }}
          <div v-if="modules.length" class="row align-items-center">
            <div
              v-for="(module, index) in modules"
              :key="index"
              class="col-md-6 mb-3"
            >
              <label
                :class="['card cursor-pointer', isSelected(module.id)]"
                :for="`enterprise_module${index}`"
              >
                <div class="card-body">
                  <input
                    :id="`enterprise_module${index}`"
                    v-model="enterpriseForm.modules"
                    :value="module.id"
                    class="d-none"
                    type="checkbox"
                    @click="selectModule(module.id)"
                  />
                  {{ module.name }}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row justify-content-end">
          <BaseButton
            :text="$t('common.cancel')"
            class="btn btn-secondary col-auto m-r-5"
            type="button"
            @click.prevent="$router.push({ name: 'enterprise.form.setting' })"
          />
          <BaseButton
            :text="$t('common.save')"
            class="btn btn-primary col-auto"
            icon="fa fa-save"
            @click.prevent="$router.push({ name: 'enterprises' })"
          />
        </div>
      </div>
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
      errors: [],
      enterpriseForm: {
        modules: [],
        details: null,
      },
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('enterprise', ['enterprise']),
    enterpriseContext() {
      return `enterprises/${this.enterprise?.id}`;
    },
  },
  mounted() {
    if (this.enterprise) {
      this.enterpriseForm = this.enterprise;
      this.enterpriseForm.modules =
        this.enterprise.enterprise_modules &&
        this.enterprise.enterprise_modules.length
          ? this.enterprise.enterprise_modules.map((module) => module.module_id)
          : [];
    }
  },
  methods: {
    isSelected(moduleId) {
      return this.enterpriseForm.modules.includes(moduleId) ? 'bg-primary' : '';
    },
    selectModule(moduleId) {
      if (this.enterpriseForm.modules.includes(moduleId)) {
        const enterpriseModule = this.enterpriseForm.enterprise_modules.find(
          (enterprise_module) => {
            return (
              enterprise_module.module_id.toString() === moduleId.toString()
            );
          }
        );
        store
          .dispatch('enterprise/deleteEnterpriseModule', enterpriseModule.id)
          .then(() => {
            this.enterpriseForm.modules = this.enterpriseForm.modules.filter(
              (module) => {
                return module.toString() !== moduleId.toString();
              }
            );
          });
      } else {
        store
          .dispatch('enterprise/addEnterpriseModule', {
            enterpriseId: this.enterprise.id,
            moduleId,
          })
          .then(() => {
            this.enterpriseForm.modules.push(moduleId);
          });
      }
    },
    submitEnterpriseSettingForm() {},
  },
};
</script>

<style scoped></style>
