<template>
  <div id="right-history" ref="verticalPanel" class="show">
    <div class="modal-header p-l-20 p-r-20">
      <h6 class="modal-title w-100">
        {{ title }}
        <span class="pull-right">
          <a href="javascript:void(0)" @click.prevent="closeVerticalModel"
            ><i class="icofont icofont-close"></i>
          </a>
        </span>
      </h6>
    </div>
    <div class="history-details">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['close'],
  methods: {
    closeVerticalModel() {
      this.$refs.verticalPanel.remove();
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
