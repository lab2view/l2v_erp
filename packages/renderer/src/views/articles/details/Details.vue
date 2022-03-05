<template>
  <div class="card border-top-0">
    <div class="card-header">
      <div class="header-top d-sm-flex align-items-center">
        <h5>Sell Overview</h5>
        <div class="center-content">
          <p class="d-flex align-items-center">
            <i class="toprightarrow-primary fa fa-arrow-up me-2"> </i>
            86% Growth
          </p>
        </div>
        <div class="setting-list">
          <ul class="list-unstyled setting-option">
            <li>
              <div class="setting-primary"><i class="icon-settings"></i></div>
            </li>
            <li><i class="view-html fa fa-code font-primary"></i></li>
            <li>
              <i class="icofont icofont-maximize full-card font-primary"></i>
            </li>
            <li>
              <i class="icofont icofont-minus minimize-card font-primary"></i>
            </li>
            <li>
              <i class="icofont icofont-refresh reload-card font-primary"></i>
            </li>
            <li>
              <i class="icofont icofont-error close-card font-primary"> </i>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body p-0">
      <div id="chart-dashbord"></div>
    </div>
  </div>
</template>

<script>
import ArticleMixin from '/@/mixins/ArticleMixin';

export default {
  mixins: [ArticleMixin],
};
</script>

<style scoped></style>
