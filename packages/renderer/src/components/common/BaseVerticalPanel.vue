<template>
  <transition appear name="slide-fade">
    <div id="right-history" class="show">
      <div class="modal-header p-l-20 p-r-20">
        <h6 class="modal-title w-100">
          {{ title }}
          <span class="pull-right">
            <a href="javascript:void(0)" @click.prevent="$router.back()"
              ><i class="icofont icofont-close"></i>
            </a>
          </span>
        </h6>
      </div>
      <div class="history-details">
        <slot />
      </div>
    </div>
  </transition>
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
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
