<template>
  <tr>
    <td>{{ privilege.id }}</td>
    <td>{{ action?.label }}</td>
    <td>{{ action?.module?.name }}</td>
    <td class="text-center w-auto">
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
        @click.prevent=""
      >
        <i class="fa fa-trash-o" />
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
  },
  computed: {
    action() {
      return this.privilege?.action ?? null;
    },
  },
};
</script>

<style scoped></style>
