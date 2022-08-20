<template>
  <nav aria-label="...">
    <ul class="pagination pagination-primary" v-bind="$attrs">
      <li
        v-for="(link, index) in links"
        :key="`p-link-${index}`"
        class="page-item"
        :class="{ active: link.active, disabled: !link.url }"
      >
        <a
          class="page-link"
          href="javascript:void(0)"
          :tabindex="index"
          @click.prevent="handleNewPage(link)"
        >
          <span v-html="link.label" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'BasePaginate',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  emits: ['change'],
  methods: {
    handleNewPage(link) {
      if (link.url && !link.active) {
        const page = link.url.toString().split('page=');
        this.$emit('change', page[1]);
      }
    },
  },
};
</script>

<style scoped></style>
