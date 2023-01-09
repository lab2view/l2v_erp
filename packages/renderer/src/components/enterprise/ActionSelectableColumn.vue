<template>
  <td class="font-primary" colspan="2">
    <div class="checkbox checkbox-primary">
      <input :id="`selected-${action.id}`" v-model="selected" type="checkbox" />
      <label
        :for="`selected-${action.id}`"
        class="mt-0 pt-0"
        style="padding-left: 60px"
        >{{ `${action.code} - ${action.label}` }}</label
      >
    </div>
  </td>
</template>

<script>
export default {
  props: {
    action: {
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
        this.selectedList.find((s) => s.id === this.action.id) !== undefined
      );
    },
  },
  watch: {
    selected(value) {
      if (this.isSelected && !value) this.$emit('unselected');
      if (!this.isSelected && value) this.$emit('selected');
    },
    selectedList() {
      // selectedList(value) {
      // console.log('list value')
      // console.log(value)
      this.selected = this.isSelected;
    },
  },
};
</script>

<style scoped></style>
