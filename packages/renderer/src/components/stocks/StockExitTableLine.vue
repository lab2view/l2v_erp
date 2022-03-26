<template>
  <tr>
    <td>{{ stockExit.id }}</td>
    <td>{{ stockExit.stock_type.label }}</td>
    <td v-if="isRoleAdmin">
      {{
        stockExit.enterprise ? stockExit.enterprise.name : $t('common.parent')
      }}
    </td>
    <td>{{ stockExit.enterprise_receiver?.name }}</td>
    <td>{{ stockExit.reference }}</td>
    <td>
      {{ stockExit.current_state?.stock_state.label || $t('common.not_set') }}
    </td>
    <td>{{ $d(stockExit.created_at, 'short') }}</td>
    <td>
      <BaseButton
        type="button"
        class="btn btn-iconsolid btn-secondary btn-sm"
        :title="$t('common.update')"
        @click.prevent="
          $router.push({
            name: 'stocks.exit.form.desc',
            params: { id: stockExit.id },
          })
        "
      >
        {{ $t('common.update') }}
      </BaseButton>
      <button
        v-if="!stockExit.not_deletable"
        class="btn btn-danger btn-xs m-l-5"
        data-original-title="btn btn-danger btn-xs"
        type="button"
        @click.prevent="deleteStockExit(stockExit)"
      >
        <i class="fa fa-trash-o" />
      </button>
    </td>
  </tr>
</template>

<script>
import BaseButton from '/@/components/common/BaseButton.vue';
export default {
  components: { BaseButton },
  props: {
    stockExit: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
