<template>
  <div class="card m-0 p-0">
    <SaleSessionHeader />

    <div class="card-body">
      <div class="row align-items-center">
        <SaleSessionSelectedArticleList />
      </div>
    </div>

    <SaleSessionState />
  </div>
</template>

<script>
import SaleSessionHeader from '/@/components/sales/session/SaleSessionHeader.vue';
import SaleSessionSelectedArticleList from '/@/components/sales/session/SaleSessionSelectedArticleList.vue';
import SaleSessionState from '/@/components/sales/session/SaleSessionState.vue';

export default {
  components: {
    SaleSessionState,
    SaleSessionSelectedArticleList,
    SaleSessionHeader,
  },
};
</script>
