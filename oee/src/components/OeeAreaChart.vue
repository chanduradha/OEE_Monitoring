<template>
  <div class="parent-container">
    <div class="chart-container" ref="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAnalyticsStore } from '@/stores/Analyticstore'; // Adjust the import path as necessary
import * as echarts from 'echarts';

const chart = ref(null);
const store = useAnalyticsStore(); // Get the store instance

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const updateChart = () => {
    const option = {
      title: {
        text: '',
        left: 'left',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['OEE', 'Availability', 'Performance', 'Quality'],
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: store.timestamps, // Dynamically set X-axis data
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          formatter: '{value} %',
        },
      },
      series: [
        {
          name: 'OEE',
          type: 'line',
          data: store.oeeSeriesData,
          areaStyle: {
            color: 'rgba(50, 205, 50, 0.6)', // Green area
          },
          lineStyle: {
            color: 'rgba(50, 205, 50, 1)', // Green line
          },
          showSymbol: false,
        },
        {
          name: 'Availability',
          type: 'line',
          data: store.availabilitySeriesData,
          areaStyle: {
            color: 'rgba(30, 144, 255, 0.6)', // Blue area
          },
          lineStyle: {
            color: 'rgba(30, 144, 255, 1)', // Blue line
          },
          showSymbol: false,
        },
        {
          name: 'Performance',
          type: 'line',
          data: store.performanceSeriesData,
          areaStyle: {
            color: 'rgba(255, 165, 0, 0.6)', // Orange area
          },
          lineStyle: {
            color: 'rgba(255, 165, 0, 1)', // Orange line
          },
          showSymbol: false,
        },
        {
          name: 'Quality',
          type: 'line',
          data: store.qualitySeriesData,
          areaStyle: {
            color: 'rgba(255, 69, 0, 0.6)', // Red area
          },
          lineStyle: {
            color: 'rgba(255, 69, 0, 1)', // Red line
          },
          showSymbol: false,
        },
      ],
    };

    myChart.setOption(option);
  };

  updateChart(); // Initialize chart with default data

  // Watch for changes in store data and update the chart
  watch(
    () => [
      store.oeeSeriesData,
      store.availabilitySeriesData,
      store.performanceSeriesData,
      store.qualitySeriesData,
      store.timestamps,
    ],
    ([newOeeData, newAvailabilityData, newPerformanceData, newQualityData, newTimestamps]) => {
      myChart.setOption({
        xAxis: {
          data: newTimestamps,
        },
        series: [
          {
            data: newOeeData,
          },
          {
            data: newAvailabilityData,
          },
          {
            data: newPerformanceData,
          },
          {
            data: newQualityData,
          },
        ],
      });
    },
    { deep: true } // Watch deeply to handle array changes
  );

  // Optional: Handle resize event
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});
</script>

<style scoped>
.parent-container {
  width: 100%;
}

.chart-container {
  width: 100%;
  height: 320px;
  margin-bottom: 200px;
}
</style>
