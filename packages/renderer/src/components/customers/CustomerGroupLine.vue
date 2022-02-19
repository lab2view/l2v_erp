<template>
  <tr>
    <td>
      <div class="checkbox checkbox-solid-primary">
        <input v-model="selected" type="checkbox" />
      </div>
    </td>
    <td class="font-primary f-w-600">{{ customerGroupLine.customer.name }}</td>
    <td>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            :title="$t('common.delete')"
            class="btn btn-iconsolid btn-danger btn-sm"
            type="button"
            @click.prevent="removeCustomerGroupLine"
          >
            <i class="fa fa-times" />
          </BaseButton>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import BaseButton from '../common/BaseButton.vue';

export default {
  components: { BaseButton },
  props: {
    customerGroupLine: {
      type: Object,
      required: true,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected', 'unselected'],
  data() {
    return {
      selected: false,
      loading: false,
    };
  },
  watch: {
    selected(value) {
      if (!this.selectAll) this.$emit(`${value ? 'selected' : 'unselected'}`);
    },
  },
  created() {
    if (this.selectAll) this.selected = true;
  },
  methods: {
    removeCustomerGroupLine() {
      if (
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.customerGroupLine.id,
          })
        )
      ) {
        console.log('remove this.customerGroupLine');
        console.log(this.customerGroupLine);
      }
    },
  },
};
</script>

<style scoped></style>
