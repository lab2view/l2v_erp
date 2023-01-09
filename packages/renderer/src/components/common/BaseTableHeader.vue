<template>
  <div class="card-header pt-2 pb-1 border-bottom border-bottom-">
    <div class="row align-items-center">
      <div class="col-sm">
        <h6>{{ title }}</h6>
      </div>
      <div class="col-auto">
        <a
          v-if="canShowRefreshAction"
          href="#"
          class="f-w-500"
          @click.prevent="refreshDataFormActions"
        >
          <span class="fa fa-refresh m-r-5" />
          {{ $t('common.refresh') }}
        </a>
        <router-link
          v-if="canOpenAddingForm"
          :to="{ name: addActionRouterName, params, query }"
          href="#"
          class="btn btn-primary btn-sm m-l-30"
          type="button"
        >
          <i :class="`${addActionIcon} m-r-5`" />
          {{ $t(addActionLabel) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    params: {
      type: Object,
      default: null,
    },
    query: {
      type: Object,
      default: null,
    },
    addActionIcon: {
      type: String,
      default: 'fa fa-plus',
    },
    entity: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters('auth', ['isGrantedAction']),
    canShowRefreshAction() {
      return (
        this.refreshActionName !== null && this.refreshActionField !== null
      );
    },
    canOpenAddingForm() {
      return this.entity
        ? this.addActionRouterName &&
            this.isGrantedAction(`${this.entity}.create`)
        : this.addActionRouterName;
    },
  },
  methods: {
    refreshDataFormActions() {
      this.$store.commit('SET_GLOBAL_LOADING', true);
      this.$store
        .dispatch(this.refreshActionName, this.refreshActionField)
        .finally(() => this.$store.commit('SET_GLOBAL_LOADING', false));
    },
  },
};
</script>

<style scoped></style>
