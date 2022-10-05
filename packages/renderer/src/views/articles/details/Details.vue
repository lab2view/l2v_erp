<template>
  <div class="card border-top-0 mt-2 container-fluid dashboard-default-sec">
    <div class="row">
      <div class="col-md box-col-3 des-xl-25 rate-sec">
        <div class="card income-card card-primary">
          <div class="card-body text-center">
            <h5>{{ totalEntry }}</h5>
            <p class="text-uppercase">{{ $t('stocks.fields.total_entry') }}</p>
            <!--            <a class="btn-arrow arrow-primary" href="javascript:void(0)"-->
            <!--              ><i class="toprightarrow-primary fa fa-arrow-up me-2"></i>95.54%-->
            <!--            </a>-->
          </div>
        </div>
      </div>
      <div class="col-md box-col-3 des-xl-25 rate-sec">
        <div class="card income-card card-secondary">
          <div class="card-body text-center">
            <h5>{{ totalExit }}</h5>
            <p class="text-uppercase">{{ $t('stocks.fields.total_exit') }}</p>
            <!--            <a class="btn-arrow arrow-secondary" href="javascript:void(0)"-->
            <!--              ><i class="toprightarrow-secondary fa fa-arrow-up me-2"></i>90.54%-->
            <!--            </a>-->
          </div>
        </div>
      </div>
      <div class="col-md box-col-3 des-xl-25 rate-sec">
        <div class="card income-card">
          <div class="card-body text-center">
            <h5 :class="`text-${stockClassState}`">{{ totalStock }}</h5>
            <p class="text-uppercase">{{ $t('stocks.fields.total_stock') }}</p>
            <!--            <a class="btn-arrow arrow-secondary" href="javascript:void(0)"-->
            <!--              ><i class="toprightarrow-secondary fa fa-arrow-up me-2"></i>90.54%-->
            <!--            </a>-->
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="table-responsive">
        <h5>{{ $t('stocks.fields.structure_stocks') }}</h5>
        <table class="table table-bordernone">
          <thead>
            <tr>
              <th>{{ $t('common.attributes.structure') }}</th>
              <th>{{ $t('common.headers.stock_entry_qty') }}</th>
              <th>{{ $t('common.headers.stock_exit_qty') }}</th>
              <th>{{ $t('common.headers.stock_in') }}</th>
            </tr>
          </thead>
          <tbody>
            <ArticleStructureMovementLine
              v-for="(distribution, index) in distributions"
              :key="index"
              :distribution="distribution"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';
import { mapGetters } from 'vuex';
import ArticleStructureMovementLine from '/@/views/articles/details/ArticleStructureMovementLine.vue';

export default {
  components: { ArticleStructureMovementLine },
  mixins: [ArticleMixin],
  computed: {
    ...mapGetters('auth', ['currentEnterprise']),
    distributions() {
      return this.article.stats?.distributions.filter((d) =>
        this.currentEnterprise ? d.id !== this.currentEnterprise.id : true
      );
    },
  },
};
</script>

<style scoped></style>
