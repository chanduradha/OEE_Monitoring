<template>
    <div class="horizontal-layered-chart">
      <div ref="chartContainer" style="width: 100%; height: 300px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import Highcharts from 'highcharts';
  import { useAnalyticsStore } from '@/stores/Analyticstore';
  
  const chartContainer = ref(null);
  const store = useAnalyticsStore();
  
  const chartOptions = () => ({
    chart: {
      type: 'bar',
      zoomType: 'xy',
    },
    title: {
      text: 'Machine Metrics'
    },
    xAxis: {
      categories: ['Machine'], // Replace with your machine names or identifiers
    },
    yAxis: {
      title: {
        text: 'Time (hours)'
      }
    },
    plotOptions: {
      bar: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Runtime',
        data: [{ y: store.metricsData.runtime, color: '#228B22' }] // Green color
      },
      {
        name: 'Idle Time',
        data: [{ y: store.metricsData.idletime, color: '#F1C40F' }] // Yellow color
      },
      {
        name: 'Off Time',
        data: [{ y: store.metricsData.offtime, color: '#FF0000' }] // Red color
      }
    ]
  });
  
  onMounted(() => {
    if (chartContainer.value) {
      Highcharts.chart(chartContainer.value, chartOptions());
    }
  });
  
  watch(() => store.metricsData, () => {
    if (chartContainer.value) {
      Highcharts.chart(chartContainer.value, chartOptions());
    }
  });
  </script>
  
  <style scoped>
  .horizontal-layered-chart {
    width: 100%;
  
  }
  </style>
  