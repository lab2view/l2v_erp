<template>
  <label v-if="label" :class="labelClass">
    {{ label }}
    <span v-if="required" class="text-danger m-l-5">*</span>
  </label>
  <div class="input-group">
    <slot name="prepend">
      <button
        v-if="withRefresh"
        type="button"
        class="btn btn-sm btn-iconsolid2 btn-outline-primary"
        :title="btnTitle"
        :disabled="!canProcessToRefresh"
        @click.prevent="refreshDataFormActions"
      >
        <span :class="refreshBtnIconClass"></span>
      </button>
    </slot>
    <slot v-bind="$attrs"></slot>
    <slot name="append">
      <button
        v-if="withAppend"
        type="button"
        class="btn text-primary btn-iconsolid btn-success"
        :title="$t('common.refresh')"
        @click.prevent="$emit('btn-click')"
      >
        <i :class="btnIcon"></i>
      </button>
    </slot>
  </div>
  <div v-if="errors" class="invalid-feedback" style="display: inline">
    {{ errors[0] }}
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    labelClass: {
      type: String,
      default: null,
    },
    required: {
      type: [Boolean],
      default: false,
    },
    errors: {
      type: [Array, Object],
      default: null,
    },
    btnIcon: {
      type: String,
      default: 'fa fa-plus-square',
    },
    btnTitle: {
      type: String,
      default: null,
    },
    withRefresh: {
      type: Boolean,
      default: false,
    },
    withAppend: {
      type: Boolean,
      default: true,
    },
    refreshActionName: {
      type: String,
      default: null,
    },
    refreshActionField: {
      type: Object,
      default: { page: 1, field: { next: true } },
    },
    withGlobalLoad: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['btn-click'],
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    refreshBtnIconClass() {
      return this.loading ? 'fa fa-refresh fa-spin' : 'fa fa-refresh';
    },
    canProcessToRefresh() {
      return this.refreshActionName && this.refreshActionField;
    },
  },

  methods: {
    refreshDataFormActions() {
      if (this.canProcessToRefresh) {
        if (this.withGlobalLoad) this.$store.commit('SET_GLOBAL_LOADING', true);
        else this.loading = true;
        this.$store
          .dispatch(this.refreshActionName, this.refreshActionField)
          .finally(() =>
            this.withGlobalLoad
              ? this.$store.commit('SET_GLOBAL_LOADING', false)
              : (this.loading = false)
          );
      }
    },
  },
};
</script>

<style scoped>
.btn-iconsolid2 {
  border-radius: 5px;
  border-color: #e6edef;
  padding: 8px 12px;
}
</style>
