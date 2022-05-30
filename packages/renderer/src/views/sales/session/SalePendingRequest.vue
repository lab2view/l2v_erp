<template>
  <BaseVerticalPanel :title="'LISTE DES REQUETES'">
    <div class="text-center">
      <i class="icofont icofont-ui-edit"></i>
      <p>Contact has not been modified yet.</p>
    </div>
    <div class="media">
      <i class="icofont icofont-star me-3"></i>
      <div class="media-body mt-0">
        <h6 class="mt-0">Contact Created</h6>
        <p class="mb-0">Contact is created via mail</p>
        <span class="f-12">Sep 10, 2019 4:00</span>
      </div>
    </div>
  </BaseVerticalPanel>
</template>

<script>
import BaseVerticalPanel from '/@/components/common/BaseVerticalPanel.vue';
export default {
  components: { BaseVerticalPanel },
};
</script>

<style scoped></style>
