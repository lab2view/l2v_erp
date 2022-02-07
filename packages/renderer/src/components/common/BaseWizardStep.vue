<template>
  <div v-if="links.length > 0" class="f1">
    <div class="f1-steps mb-1">
      <div class="f1-progress">
        <div
          class="f1-progress-line"
          :data-number-of-steps="links.length"
          :style="progressLineStyle"
        ></div>
      </div>
      <template v-for="(link, index) in links" :key="index">
        <router-link
          v-if="!link.disabled"
          :to="{ name: link.name }"
          class="f1-step"
          :style="`width: ${100 / links.length}%`"
          :class="link.class"
        >
          <div class="f1-step-icon">
            <i v-if="link.icon" :class="link.icon"></i>
            <i v-else>{{ index }}</i>
          </div>
          <p>
            {{ link.title ?? $t(`menu.${link.code.toString().toLowerCase()}`) }}
          </p>
        </router-link>
        <div v-else class="f1-step" :style="`width: ${100 / links.length}%`">
          <div class="f1-step-icon">
            <i v-if="link.icon" :class="link.icon"></i>
            <i v-else>{{ index }}</i>
          </div>
          <p>
            {{ link.title ?? $t(`menu.${link.code.toString().toLowerCase()}`) }}
          </p>
        </div>
      </template>
    </div>
  </div>

  <router-view />
</template>

<script>
export default {
  name: 'BaseWizardStep',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  computed: {
    progressLineStyle() {
      const index = this.links.findIndex((l) =>
        RegExp(`^${l.name}*`).test(this.$route.name.toString())
      );
      const space = 100 / this.links.length / 2;
      const percent = ((index + 1) * 100) / this.links.length;
      return index !== -1 ? `width: ${percent / 2 + index * space}%;` : '';
    },
  },
};
</script>

<style scoped></style>
