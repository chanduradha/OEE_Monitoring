<template>
    <div ref="barChart" style="width: 100%; height: 350px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  import { useAnalyticsStore } from '../stores/Analyticstore';
  
  const store = useAnalyticsStore();
  const barChart = ref(null);
  let chartInstance = null;
  
  const computeMetrics = () => {
    return {
      availability: store.metricsData.availability || 0,
      performance: store.metricsData.performance || 0,
      quality: store.metricsData.quality || 0,
      oee: store.metricsData.oee || 0
    };
  };
  
  const initChart = () => {
    if (!barChart.value) {
      console.error('barChart element is not available');
      return;
    }
  
    chartInstance = echarts.init(barChart.value);
  
    const metrics = computeMetrics();
  
    const option = {
        title: {
    text: 'Averaged Metrics Data',
    left: '240px', // or 'left', 'right'
    top: '290px', // or 'bottom'
    textStyle: {
      fontSize: 15, // Set font size
      fontWeight: 'bold', // Set font weight
      color: '#333' // Set text color
    }
  },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        data: ['OEE', 'Availability', 'Performance', 'Quality']
      },
      xAxis: {
        type: 'category',
        data: ['Metrics'] // Single category
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      series: [
        {
          name: 'OEE',
          type: 'bar',
          data: [metrics.oee]
        },
        {
          name: 'Availability',
          type: 'bar',
          data: [metrics.availability]
        },
        {
          name: 'Performance',
          type: 'bar',
          data: [metrics.performance]
        },
        {
          name: 'Quality',
          type: 'bar',
          data: [metrics.quality]
        }
      ]
    };
  
    chartInstance.setOption(option);
  };
  
  onMounted(() => {
    initChart();
    window.addEventListener('resize', () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    });
  });
  
  watch(
    () => store.metricsData,
    () => {
      if (chartInstance) {
        const metrics = computeMetrics();
        chartInstance.setOption({
          xAxis: {
            data: ['Metrics']
          },
          series: [
            {
              name: 'OEE',
              data: [metrics.oee],
              itemStyle: {
                color: '#2ecc71' // Light green color for OEE
              }
              
            },
            {
              name: 'Availability',
              data: [metrics.availability],
              itemStyle: {
                color: '#3498db' // Blue color for Availability
              }
            },
            {
              name: 'Performance',
              data: [metrics.performance],
              itemStyle: {
                color: '#e67e22' // Orange color for Performance
              }
            },
            {
              name: 'Quality',
              data: [metrics.quality],
              itemStyle: {
                color: '#f1c40f' // Yellow color for Quality
              }
            }
          ]
        });
      }
    },
    { deep: true }
  );
  </script>
  
  <style scoped>
  /* Add any necessary styling here */
  
  </style>
  