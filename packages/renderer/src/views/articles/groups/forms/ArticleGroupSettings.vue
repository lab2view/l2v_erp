<template>
  <div class="card mb-0">
    <div class="card-body p-0">
      <div class="row">
        <div class="col-sm-3">
          <div class="card">
            <div class="card-header">
              <h6>
                {{ `${$t('articles.configTitle')}` }}
              </h6>
            </div>
            <div class="list-group p-l-5">
              <router-link
                :to="{
                  name: 'article.group.form.setting.discount',
                  params: { ...$route.params },
                }"
                class="list-group-item list-group-item-action"
              >
                <span class="fa fa-ticket m-r-10" />
                {{ $t('sales.discount.formCreateTitle') }}
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
export default {
  computed: {},
  beforeCreate() {
    if (this.$route.name === 'article.group.form.setting')
      this.$router.push({
        name: 'article.group.form.setting.discount',
        params: this.$route.params,
        query: this.$route.query,
      });
  },
};
</script>

<style scoped></style>
