<template>
  <tr>
    <td class="font-primary">
      <div class="checkbox checkbox-primary">
        <input
          :id="`selected-${customerGroupLine.id}`"
          v-model="selected"
          type="checkbox"
        />
        <label
          :for="`selected-${customerGroupLine.id}`"
          class="mt-0 pt-0"
          style="padding-left: 60px"
        >
          {{ `${customerGroupLine.customer.name}` }}
          <small v-if="customerGroupLine.customer.email">
            - {{ customerGroupLine.customer.email }}
          </small>
        </label>
      </div>
    </td>
    <td class="font-primary">
      {{ customerGroupLine.customer.phone }}
    </td>
    <td>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 p-0">
          <BaseButton
            v-if="!customerGroupLine.not_deletable"
            type="button"
            class="btn btn-iconsolid btn-danger btn-sm"
            :title="$t('common.delete')"
            :loading="loading"
            @click.prevent="removeCustomerGroupLine"
          >
            <i v-if="!loading" class="fa fa-times" />
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
    selectedList: {
      type: Array,
      required: true,
    },
  },
  emits: ['selected', 'unselected', 'deleted'],
  data() {
    return {
      selected: false,
      loading: false,
    };
  },
  computed: {
    isSelected() {
      return (
        this.selectedList.find((id) => id === this.customerGroupLine.id) !==
        undefined
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
  methods: {
    removeCustomerGroupLine() {
      if (
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.customerGroupLine.customer.name,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('customerGroup/removeCustomerGroupLine', [
            this.customerGroupLine.id,
          ])
          .then(() => {
            this.$emit('deleted');
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>
