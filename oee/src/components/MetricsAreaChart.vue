<template>
    <div class="parent-container">
      <div class="chart-container" ref="chart"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useAnalyticsStore } from '@/stores/Analyticstore'; // Adjust the import path as necessary
  import * as echarts from 'echarts';
  
  // Ref for the chart container
  const chart = ref(null);
  const store = useAnalyticsStore(); // Get the store instance
  
  // Function to initialize the chart
  const initChart = () => {
    const myChart = echarts.init(chart.value);
  
    const option = {
      title: {
        text: 'Metrics Overview',
        left: 'left',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Availability', 'Performance', 'Quality', 'OEE'],
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
          formatter: (value) => {
            const date = new Date(value);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          },
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Availability (%)',
          min: 0,
          max: 100,
          position: 'left',
          axisLabel: {
            formatter: '{value} %',
          },
        },
        {
          type: 'value',
          name: 'Performance (%)',
          min: 0,
          max: 100,
          position: 'right',
          axisLabel: {
            formatter: '{value} %',
          },
          offset: 80, // Position the yAxis to avoid overlapping
        },
        {
          type: 'value',
          name: 'Quality (%)',
          min: 0,
          max: 100,
          position: 'left',
          axisLabel: {
            formatter: '{value} %',
          },
          offset: 160, // Position the yAxis to avoid overlapping
        },
        {
          type: 'value',
          name: 'OEE (%)',
          min: 0,
          max: 100,
          position: 'right',
          axisLabel: {
            formatter: '{value} %',
          },
          offset: 240, // Position the yAxis to avoid overlapping
        },
      ],
      series: [
        {
          name: 'Availability',
          type: 'line',
          yAxisIndex: 0, // Corresponds to the first yAxis
          areaStyle: {
            color: 'rgba(0, 255, 0, 0.3)', // Light green area
          },
          lineStyle: {
            color: 'rgba(0, 255, 0, 1)', // Green line
          },
          data: store.availabilitySeriesData.map(value => [new Date().getTime(), value]),
        },
        {
          name: 'Performance',
          type: 'line',
          yAxisIndex: 1, // Corresponds to the second yAxis
          areaStyle: {
            color: 'rgba(0, 0, 255, 0.3)', // Light blue area
          },
          lineStyle: {
            color: 'rgba(0, 0, 255, 1)', // Blue line
          },
          data: store.performanceSeriesData.map(value => [new Date().getTime(), value]),
        },
        {
          name: 'Quality',
          type: 'line',
          yAxisIndex: 2, // Corresponds to the third yAxis
          areaStyle: {
            color: 'rgba(255, 0, 0, 0.3)', // Light red area
          },
          lineStyle: {
            color: 'rgba(255, 0, 0, 1)', // Red line
          },
          data: store.qualitySeriesData.map(value => [new Date().getTime(), value]),
        },
        {
          name: 'OEE',
          type: 'line',
          yAxisIndex: 3, // Corresponds to the fourth yAxis
          areaStyle: {
            color: 'rgba(255, 255, 0, 0.3)', // Light yellow area
          },
          lineStyle: {
            color: 'rgba(255, 255, 0, 1)', // Yellow line
          },
          data: store.oeeSeriesData.map(value => [new Date().getTime(), value]),
        },
      ],
    };
  
    myChart.setOption(option);
  
    // Watch for changes in the series data to update the chart
    watch(
      [
        () => store.availabilitySeriesData,
        () => store.performanceSeriesData,
        () => store.qualitySeriesData,
        () => store.oeeSeriesData
      ],
      () => {
        myChart.setOption({
          series: [
            {
              name: 'Availability',
              data: store.availabilitySeriesData.map(value => [new Date().getTime(), value]),
            },
            {
              name: 'Performance',
              data: store.performanceSeriesData.map(value => [new Date().getTime(), value]),
            },
            {
              name: 'Quality',
              data: store.qualitySeriesData.map(value => [new Date().getTime(), value]),
            },
            {
              name: 'OEE',
              data: store.oeeSeriesData.map(value => [new Date().getTime(), value]),
            },
          ],
        });
      },
      { deep: true }
    );
  };
  
  // Initialize the chart when the component is mounted
  onMounted(() => {
    initChart();
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
  