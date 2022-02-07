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
          <div class="row align-items-center">
            <div class="col-md">
              <BaseSelect
                  v-model="enterpriseForm.module_id"
                  :errors="errors?.module_id"
                  :label="$t('structures.attributes.module')"
                  :options="modules"
                  key-label="name"
                  key-value="id"
                  required
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="row align-items-center">
            <div class="col-md">
              <BaseInput
                  v-model="enterpriseForm.details"
                  :errors="errors?.details"
                  :label="$t('common.attributes.details')"
                  placeholder="mag1@gmail.com"
                  type="text"
                  required
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseSelect from '/@/components/common/BaseSelect.vue';
import BaseInput from '/@/components/common/BaseInput.vue';
import { mapGetters } from 'vuex';
import store from '/@/store';

export default {
  components: { BaseInput, BaseSelect },
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
        module_id: null,
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
  methods: {
    submitEnterpriseSettingForm() {}
  },
};
</script>

<style scoped></style>
