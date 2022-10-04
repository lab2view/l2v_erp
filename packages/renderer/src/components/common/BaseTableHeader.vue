<template>
  <div class="card-header pt-2 pb-1 border-bottom border-bottom-">
    <div class="row align-items-center">
      <div class="col-sm">
        <h6>{{ title }}</h6>
      </div>
      <div class="col-auto" v-if="canShowRefreshAction">
        <a href="#" class="f-w-500" @click.prevent="refreshArticles">
          <span class="fa fa-refresh m-r-5" />
          {{ $t('common.refresh') }}
        </a>
        <router-link
          v-if="addActionRouterName"
          :to="{ name: this.addActionRouterName }"
          href="#"
          class="btn btn-primary btn-sm m-l-30"
          type="button"
        >
          <i class="fa fa-plus m-r-5" />
          {{ $t(this.addActionLabel) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTableHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    refreshActionName: {
      type: String,
      default: null,
    },
    refreshActionField: {
      type: Object,
      default: null,
    },
    addActionRouterName: {
      type: String,
      default: null,
    },
    addActionLabel: {
      type: String,
      default: 'common.add',
    },
  },
  computed: {
    canShowRefreshAction() {
      return (
        this.refreshActionName !== null && this.refreshActionField !== null
      );
    },
  },
  methods: {
    refreshArticles() {
      this.$store.commit('SET_GLOBAL_LOADING', true);
      this.$store
        .dispatch(this.refreshActionName, this.refreshActionField)
        .finally(() => this.$store.commit('SET_GLOBAL_LOADING', false));
    },
  },
};
</script>

<style scoped></style>
