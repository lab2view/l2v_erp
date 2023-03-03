<template>
  <div class="row align-items-center">
    <div class="col text-end f-w-600">Filter by year</div>
    <div class="col-md-4">
      <BaseSelect v-model.number="year" :options="[2022, 2023]" />
    </div>
  </div>
  <BaseLoader v-if="loading" />
  <Bar
    v-else
    id="my-chart-id"
    :options="chartOptions"
    :data="getStatsChartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import BaseLoader from '/@/components/common/BaseLoader.vue';
import BaseSelect from '/@/components/common/BaseSelect.vue';
import { mapGetters } from 'vuex';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'CustomerBuyingStats',
  components: { BaseSelect, BaseLoader, Bar },
  props: {
    customerId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters('customer', ['getStatsChartData']),
    year: {
      get() {
        return this.$store.getters['customer/year'];
      },
      set(value) {
        this.getStats(value);
      },
    },
    chartOptions() {
      return {
        responsive: true,
      };
    },
  },
  created() {
    this.getStats();
  },
  methods: {
    getStats(year) {
      this.loading = true;
      this.$store
        .dispatch('customer/getCustomerStats', {
          customer_id: this.customerId,
          year,
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
