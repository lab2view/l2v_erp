<template>
  <td class="font-primary" colspan="2">
    <div class="checkbox checkbox-primary">
      <input
        :id="`selected-${customer.id}`"
        v-model="selected"
        type="checkbox"
      />
      <label
        :for="`selected-${customer.id}`"
        class="mt-0 pt-0"
        style="padding-left: 60px"
        >{{
          `${customer.first_name} ${customer.name} - ${customer.phone}`
        }}</label
      >
    </div>
  </td>
</template>

<script>
export default {
  props: {
    customer: {
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
        this.selectedList.find((s) => s.id === this.customer.id) !== undefined
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
