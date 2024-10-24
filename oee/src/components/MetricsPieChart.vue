<template>
    <div class="pie-chart" ref="pieChartContainer"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { useWeeklyMetricsStore } from '@/stores/WeeklyMetricsStore';
  import * as echarts from 'echarts';
  
  // Access the store
  const store = useWeeklyMetricsStore();
  const pieChartContainer = ref(null);
  
  // Computed property to get metrics data from the store
  const metricsData = computed(() => {
    if (!store.metricsData || store.metricsData.length === 0) {
      return {
        runtime: '0',
        idletime: '0',
        offtime: '0',
        badparts: '0'
      };
    }
  
    const totalMetrics = {
      runtime: 0,
      idletime: 0,
      offtime: 0,
      badparts: 0
    };
  
    store.metricsData.forEach(item => {
      totalMetrics.runtime += item.operating_time || 0;
      totalMetrics.idletime += item.plandown_time || 0;
      totalMetrics.offtime += item.off_time || 0; // Ensure correct key
      totalMetrics.badparts += item.bad_parts || 0;
    });
  
    const count = store.metricsData.length;
  
    return {
      runtime: (totalMetrics.runtime / count).toFixed(2),
      idletime: (totalMetrics.idletime / count).toFixed(2),
      offtime: (totalMetrics.offtime / count).toFixed(2),
      badparts: (totalMetrics.badparts / count).toFixed(2),
    };
  });
  
  const renderChart = () => {
    if (!pieChartContainer.value) return;
  
    const chart = echarts.init(pieChartContainer.value);
  
    const chartOptions = {
      title: {
        text: '',
        left: 'center',
        top: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} hrs ({d}%)' // Format tooltip to show percentage
      },
      series: [
        {
          name: 'Metrics',
          type: 'pie',
          radius: '60%',
          data: [
            { value: parseFloat(metricsData.value.runtime), name: 'Runtime' },
            { value: parseFloat(metricsData.value.idletime), name: 'Idle Time' },
            { value: parseFloat(metricsData.value.offtime), name: 'Off Time' },
          ],
          label: {
            formatter: '{b}: {c} hrs', // Format label to show value in hours
          },
        }
      ],
      color: ['#2ca02c', '#ffcc00', '#e67e22'], // Green for runtime, yellow for idle time, orange for off time
    };
  
    chart.setOption(chartOptions);
  
    window.addEventListener('resize', () => {
      chart.resize();
    });
  };
  
  onMounted(() => {
    renderChart();
  });
  
  watch(metricsData, renderChart, { deep: true });
  </script>
  
  <style scoped>
  .pie-chart {
    width: 100%;
    height: 100%;
  }
  </style>
  