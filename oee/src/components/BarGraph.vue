<template>
    <div ref="barChart" class="chart"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  // Define daily chart data for OEE, availability, performance, and quality
  const chartData = [
    { day: 'June1', oee: 60, availability: 70, performance: 70, quality: 85 },
    { day: 'July2', oee: 72.33, availability: 75, performance: 72, quality: 89 },
    // Add more daily data here...
    { day: 'July3', oee: 75.33, availability: 72, performance: 78, quality: 83 },
    { day: 'July4', oee: 76.45, availability: 73, performance: 74.33, quality: 85.33 },
    { day: 'July5', oee: 72.45, availability: 79, performance: 71.33, quality: 83.33 },
    { day: 'July6', oee: 74.45, availability: 74, performance: 76.33, quality: 80.33 },
    { day: 'July7', oee: 73.45, availability: 73, performance: 72.33, quality: 82.33 },
  ];
  
  // Create a reference for the chart instance and chart element
  const chartInstance = ref(null);
  const barChart = ref(null);
  
  // Initialize the chart
  const initChart = () => {
    if (!chartData || chartData.length === 0) {
      console.warn('No chart data available');
      return;
    }
  
    // Dispose of the previous instance if it exists
    if (chartInstance.value) {
      chartInstance.value.dispose();
    }
  
    // Initialize a new chart instance
    chartInstance.value = echarts.init(barChart.value);
  
    // Set chart options
    const option = {
      title: {
        text: 'Weekly Analysis',
        left: 'center',
        top: 'top',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          const { name, value, seriesName } = params;
          return `${name}<br/>${seriesName}: ${value}%`;
        }
      },
      legend: {
        data: ['OEE', 'Availability', 'Performance', 'Quality'],
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: chartData.map(item => item.day)
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: 'OEE',
          data: chartData.map(item => item.oee),
          type: 'bar',
          color: 'green'
        },
        {
          name: 'Availability',
          data: chartData.map(item => item.availability),
          type: 'bar',
          color: 'blue'
        },
        {
          name: 'Performance',
          data: chartData.map(item => item.performance),
          type: 'bar',
          color: 'orange'
        },
        {
          name: 'Quality',
          data: chartData.map(item => item.quality),
          type: 'bar',
          color: 'yellow'
        }
      ]
    };
  
    // Set the options for the chart
    chartInstance.value.setOption(option);
  };
  
  // Call initChart on component mount
  onMounted(initChart);
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 300px;
  }
  </style>
  