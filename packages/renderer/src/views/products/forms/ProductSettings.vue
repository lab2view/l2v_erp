<template>
  <div class="card mb-0">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">
              <h6>
                {{ `${$t('product.configTitle')}` }}
              </h6>
            </div>
            <div class="list-group p-l-5">
              <router-link
                :to="{
                  name: 'product.form.setting.gallery',
                  params: { ...$route.params },
                }"
                class="list-group-item list-group-item-action"
              >
                <span class="fa fa-file-image-o m-r-10" />
                {{ $t('product.form.setting.gallery') }}
              </router-link>
              <router-link
                :to="{
                  name: 'product.form.setting.tax',
                  params: { ...$route.params },
                }"
                class="list-group-item list-group-item-action mt-3"
              >
                <span class="fa fa-percent m-r-10" />
                {{ $t('product.form.setting.tax') }}
              </router-link>
              <router-link
                :to="{
                  name: 'product.form.setting.desc',
                  params: { ...$route.params },
                }"
                class="list-group-item list-group-item-action mt-3"
              >
                <span class="fa fa-file-text m-r-10" />
                {{ $t('product.form.setting.desc') }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('product', ['product']),
  },
};
</script>

<style scoped></style>
