<template>
  <BaseButton
    v-if="canShowBtn"
    type="button"
    class="btn btn-success btn-xs"
    data-original-title="btn btn-success btn-xs"
    :title="$t('common.detail')"
    :text="iconVersion ? null : $t('common.show')"
    @click.prevent="$emit('show')"
  >
    <i v-if="iconVersion" class="fa fa-eye" />
  </BaseButton>

  <slot />

  <BaseButton
    v-if="canUpdateBtn"
    type="button"
    class="btn btn-secondary btn-xs m-l-5"
    data-original-title="btn btn-secondary btn-xs"
    :title="$t('common.update')"
    :text="iconVersion ? null : $t('common.update')"
    @click.prevent="$emit('update')"
  >
    <i v-if="iconVersion" class="fa fa-edit" />
  </BaseButton>
  <BaseButton
    v-if="canDeleteBtn"
    type="button"
    class="btn btn-danger btn-xs m-l-5"
    data-original-title="btn btn-danger btn-xs"
    :title="$t('common.delete')"
    @click.prevent="$emit('delete')"
  >
    <i class="fa fa-trash-o" />
  </BaseButton>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'BaseActionBtnGroup',
  components: { BaseButton },
  props: {
    entity: {
      type: String,
      required: true,
    },
    withShowBtn: {
      type: Boolean,
      default: true,
    },
    withUpdateBtn: {
      type: Boolean,
      default: true,
    },
    withDeleteBtn: {
      type: Boolean,
      default: true,
    },
    iconVersion: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['delete', 'update', 'show'],
  computed: {
    ...mapGetters('auth', ['isGrantedAction']),
    canShowBtn() {
      return this.withShowBtn && this.isGrantedAction(`${this.entity}.view`);
    },
    canUpdateBtn() {
      return (
        this.withUpdateBtn && this.isGrantedAction(`${this.entity}.update`)
      );
    },
    canDeleteBtn() {
      return (
        this.withDeleteBtn && this.isGrantedAction(`${this.entity}.delete`)
      );
    },
  },
};
</script>

<style scoped></style>
