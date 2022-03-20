<template>
  <div class="card mb-0">
    <form class="theme-form" @submit.prevent="submitEnterpriseIAMForm">
      <div class="card-header pb-0">
        <h5>{{ $t('enterprise.enterprise.iamTitle') }}</h5>
        <span>
          Using the <a href="#">card</a> component, you can extend the default
          collapse behavior to create an accordion.
        </span>
      </div>
      <div class="card-body">
        <p>Just wait for IAM module</p>
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
            type="submit"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  components: { BaseButton },
  beforeRouteEnter(routeTo, routeFrom, next) {
    next();
  },
  data() {
    return {
      errors: [],
    };
  },
  computed: {
    ...mapGetters('enterprise', ['enterprise']),
    enterpriseContext() {
      return `enterprises/${this.enterprise.id}`;
    },
  },
  mounted() {
    // if (this.enterprise) {}
  },
  methods: {
    submitEnterpriseIAMForm() {
      this.$router.push({ name: 'enterprises' });
    },
  },
};
</script>

<style scoped></style>
