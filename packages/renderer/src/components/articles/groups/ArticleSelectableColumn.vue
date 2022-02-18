<template>
  <td class="font-primary" colspan="2">
    <div class="checkbox checkbox-primary">
      <input
        :id="`selected-${article.id}`"
        v-model="selected"
        type="checkbox"
      />
      <label
        :for="`selected-${article.id}`"
        class="mt-0 pt-0"
        style="padding-left: 60px"
        >{{ `${article.name}` }}</label
      >
    </div>
  </td>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
    selectedList: {
      type: Array,
      required: true,
    },
  },
  emits: ['selected', 'unselected'],
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    isSelected() {
      return (
        this.selectedList.find((s) => s.id === this.article.id) !== undefined
      );
    },
  },
  watch: {
    selected(value) {
      if (this.isSelected && !value) this.$emit('unselected');
      if (!this.isSelected && value) this.$emit('selected');
    },
    selectedList() {
      this.selected = this.isSelected;
    },
  },
};
</script>

<style scoped></style>
