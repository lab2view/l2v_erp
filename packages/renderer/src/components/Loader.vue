<template>
  <div v-if="globalLoading" class="loader-wrapper">
    <div class="theme-loader">
      <div class="loader-p">
        <div
          v-if="cashShowProgressBar"
          style="margin-top: 150px"
          class="text-center"
        >
          <i v-if="globalProgress.label" class="font-primary">
            {{ `${globalProgress.label} {${progress}%)` }}
          </i>
          <BaseProgressBar
            :max="globalProgress?.max"
            :min="globalProgress?.min"
            :value="globalProgress?.value"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import BaseProgressBar from '/@/components/common/BaseProgressBar.vue';
export default defineComponent({
  components: { BaseProgressBar },
  computed: {
    ...mapState(['globalLoading']),
    ...mapState(['globalProgress']),
    cashShowProgressBar() {
      return this.globalProgress.value > 0;
    },
    progress() {
      return (
        (this.globalProgress.value * 100) /
        this.globalProgress.max
      ).toFixed();
    },
  },
});
</script>

<style scoped></style>
