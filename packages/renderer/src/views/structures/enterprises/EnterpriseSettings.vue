<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitEnterpriseSettingForm">
      <div class="card-header pb-0">
        <h5>{{ $t('enterprise.enterprise.settingTitle') }}</h5>
        <span>
          Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.
        </span>
      </div>
      <template v-if="enterprise">
        <div class="card-body">
          <div
            v-if="
              enterprise.enterprise_modules &&
              enterprise.enterprise_modules.length
            "
            class="row align-items-center mb-3"
          >
            <div v-for="module in activeModules" :key="module.id" class="card">
              <div
                class="media p-20"
                @click="deleteModule(module.enterpriseModule)"
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
            v-if="modules.length && enterprise_modules.length < modules.length"
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
              :text="$t('common.prev')"
              class="btn btn-secondary col-auto m-r-5"
              type="button"
              @click.prevent="$router.push({ name: 'enterprise.form.desc' })"
            />
            <BaseButton
              :text="$t('common.save')"
              class="btn btn-primary col-auto"
              icon="fa fa-save"
              @click.prevent="
                $router.push({
                  name: 'enterprise.form.iam',
                  params: { id: enterprise.id },
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
      enterprise_modules: [],
    };
  },
  computed: {
    ...mapGetters('module', ['modules']),
    ...mapGetters('enterprise', ['enterprise']),
    enterpriseContext() {
      return `enterprises/${this.enterprise.id}`;
    },
    enterpriseModules() {
      return this.enterprise.enterprise_modules &&
        this.enterprise.enterprise_modules.length
        ? this.enterprise.enterprise_modules.map((enterpriseModule) =>
            enterpriseModule.module_id.toString()
          )
        : [];
    },
    activeModules() {
      let modules = [];
      this.modules.map((module) => {
        if (this.isSelected(module.id)) {
          module.enterpriseModule = this.enterprise.enterprise_modules.find(
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
      this.enterprise.enterprise_modules &&
      this.enterprise.enterprise_modules.length
    ) {
      this.enterprise_modules = this.enterprise.enterprise_modules.map(
        (enterpriseModule) => enterpriseModule.module_id.toString()
      );
    } else if (!this.enterprise) {
      this.$router.push({ name: 'enterprises' });
    }
  },
  methods: {
    isSelected(moduleId) {
      return (
        this.enterpriseModules &&
        this.enterpriseModules.includes(moduleId.toString())
      );
    },
    addModule(moduleId) {
      if (!this.isSelected(moduleId) && !this.formLoading) {
        this.formLoading = true;
        store
          .dispatch('enterprise/addEnterpriseModule', {
            moduleId,
            enterpriseId: this.enterprise.id,
          })
          .then(() => {
            this.enterprise_modules.push(moduleId);
            this.formLoading = false;
          });
      }
    },
    deleteModule(enterpriseModule) {
      if (
        enterpriseModule.id &&
        this.isSelected(enterpriseModule.module_id) &&
        !this.formLoading
      ) {
        this.formLoading = true;
        store
          .dispatch('enterprise/deleteEnterpriseModule', enterpriseModule)
          .then(() => {
            this.enterprise_modules = this.enterprise_modules.filter(
              (em) => em.toString() !== enterpriseModule.module_id.toString()
            );
            this.formLoading = false;
          });
      }
    },
    submitEnterpriseSettingForm() {},
  },
};
</script>

<style scoped></style>
