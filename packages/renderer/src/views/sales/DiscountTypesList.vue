<template>
  <BaseContainer
    :module="$t('menu.modules.sales')"
    :title="$t('sales.title')"
  >
    <div class="card">
      <div class="card-header pb-2 border-bottom border-bottom-">
        <div class="row align-items-center">
          <div class="col-sm">
            <h5>{{ $t('sales.discountType.listTitle') }}</h5>
          </div>
          <div class="col-sm-auto align-items-end">
            <router-link
              :to="{ name: 'config.sales.discount.type.form' }"
              href="#"
              class="btn btn-primary"
              type="button"
            >
              <i class="fa fa-plus m-r-5" />
              {{ $t('common.add') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="card-body">
        DiscountTypesList
      </div>

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
