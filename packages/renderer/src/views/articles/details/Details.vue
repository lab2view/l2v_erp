<template>
  <div class="card">
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
  mounted() {
    setTimeout(() => {
      (async () => {
        await this.$loadScript(`../assets/js/chart/apex-chart/apex-chart.js`);
        await this.$loadScript(`../assets/js/chart/apex-chart/stock-prices.js`);
        window.vihoAdminConfig = {
          // Theme Primary Color
          primary: '#24695c',
          // theme secondary color
          secondary: '#ba895d',
        };

        let options17 = {
          series: [76, 67, 61, 90],
          chart: {
            height: 380,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: '30%',
                background: 'transparent',
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          colors: [
            window.vihoAdminConfig.primary,
            window.vihoAdminConfig.secondary,
            window.vihoAdminConfig.primary,
            window.vihoAdminConfig.secondary,
          ],
          labels: ['Total order', 'Total product', 'Quantity', 'Page views'],
          legend: {
            show: true,
            floating: true,
            fontSize: '14px',
            position: 'left',
            fontFamily: 'Roboto',
            fontweight: 400,
            // offsetX:30,
            offsetY: 20,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0,
              show: false,
            },
            formatter: function (seriesName, opts) {
              return (
                seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
              );
            },
            itemMargin: {
              vertical: 5,
              horizontal: 2,
            },
          },
          stroke: {
            lineCap: 'round',
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: true,
                  fontSize: '10px',
                },
              },
            },
          ],
        };

        var chart17 = new ApexCharts(
          document.querySelector('#chart-dashbord'),
          options17
        );
        chart17.render();
      })();
    }, 1000);
  },
};
</script>

<style scoped></style>
