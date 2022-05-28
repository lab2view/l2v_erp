<template>
  <BaseContainer :module="$t('menu.modules.sales')" :title="$t('sales.title')">
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.sale.listTitle') }}</h5>
          </div>
        </div>
      </div>
      <div class="card-body">SalesList</div>

      <router-view />
    </div>
  </BaseContainer>
</template>

<script>
import BaseContainer from '/@/components/common/BaseContainer.vue';

export default {
  components: { BaseContainer },
};
</script>

<style scoped></style>
