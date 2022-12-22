<template>
  <tr>
    <td class="text-start">
      <div class="checkbox checkbox-primary" @click.prevent="updateCheckState">
        <input
          :id="`selected-${privilege.id}`"
          :checked="isSelected"
          type="checkbox"
          style="height: 10px"
        />
        <label class="m-0 f-w-500">{{ action?.label }}</label>
      </div>
    </td>
    <td>{{ action?.module?.name }}</td>
    <td class="text-center">
      <BaseButton
        type="button"
        class="btn btn-info btn-iconsolid btn-sm m-r-10"
        :title="$t('common.show')"
        @click.prevent="
          $router.push({
            name: 'iam.config.role.action',
            params: { ...$route.params, action_id: action.id },
          })
        "
      >
        <i class="fa fa-eye" />
      </BaseButton>
      <BaseButton
        type="button"
        class="btn btn-danger btn-iconsolid btn-sm"
        :title="$t('common.delete')"
        @click.prevent="removePrivilege"
      >
        <i class="fa fa-spinner fa-spin" v-if="loading" />
        <i class="fa fa-trash-o" v-else />
      </BaseButton>
    </td>
  </tr>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';

export default {
  name: 'RoleConfigTableLine',
  components: { BaseButton },
  props: {
    privilege: {
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
      loading: false,
    };
  },
  computed: {
    action() {
      return this.privilege?.action ?? null;
    },
    isSelected() {
      return (
        this.selectedList.find((s) => s === this.privilege.id) !== undefined
      );
    },
  },
  watch: {
    selectedList() {
      this.selected = this.isSelected;
    },
  },
  methods: {
    updateCheckState() {
      if (this.isSelected) this.$emit('unselected');
      if (!this.isSelected) this.$emit('selected');
    },

    removePrivilege() {
      if (this.loading) return;
      if (
        confirm(
          this.$t('messages.confirmDelete', {
            label: this.privilege.action.label,
          })
        )
      ) {
        this.loading = true;
        this.$store
          .dispatch('role/removeRolePrivileges', [this.privilege.id])
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
