<template>
    <div ref="chartContainer" class="w-full h-80"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  
  // Define props for data
  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  });
  
  const chartContainer = ref(null);
  
  // Function to calculate averages for each day/month
  const calculateAverages = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.timestamp).toISOString().split('T')[0]; // Get date part only
      if (!acc[date]) {
        acc[date] = { oee: 0, performance: 0, quality: 0, availability: 0, count: 0 };
      }
      acc[date].oee += item.oee;
      acc[date].performance += item.performance;
      acc[date].quality += item.quality;
      acc[date].availability += item.availability;
      acc[date].count += 1;
      return acc;
    }, {});
  
    return Object.keys(groupedData).map(date => {
      const avg = groupedData[date];
      return {
        timestamp: new Date(date).getTime(),
        oee: avg.oee / avg.count * 100,
        performance: avg.performance / avg.count * 100,
        quality: avg.quality / avg.count * 100,
        availability: avg.availability / avg.count * 100
      };
    });
  };
  
  const initChart = () => {
    if (chartContainer.value) {
      const chart = echarts.init(chartContainer.value);
      const averagedData = calculateAverages(props.data);
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['OEE', 'Performance', 'Quality', 'Availability']
        },
        xAxis: {
          type: 'time',
          axisLabel: {
            formatter: (value) => new Date(value).toLocaleDateString()
          }
        },
        yAxis: [
          {
            type: 'value',
            name: 'Percentage',
            min: 0,
            max: 100,
            position: 'left'
          }
        ],
        series: [
          {
            name: 'OEE',
            type: 'line',
            areaStyle: {}, // Enable area styling
            data: averagedData.map(item => [item.timestamp, item.oee])
          },
          {
            name: 'Performance',
            type: 'line',
            areaStyle: {}, // Enable area styling
            data: averagedData.map(item => [item.timestamp, item.performance])
          },
          {
            name: 'Quality',
            type: 'line',
            areaStyle: {}, // Enable area styling
            data: averagedData.map(item => [item.timestamp, item.quality])
          },
          {
            name: 'Availability',
            type: 'line',
            areaStyle: {}, // Enable area styling
            data: averagedData.map(item => [item.timestamp, item.availability])
          }
        ]
      };
  
      chart.setOption(option);
    }
  };
  
  onMounted(() => {
    if (chartContainer.value) {
      initChart();
    }
  });
  
  watch(() => props.data, (newData) => {
    if (newData.length > 0 && chartContainer.value) {
      initChart();
    }
  }, { immediate: true });
  </script>
  
  <style scoped>
  /* Add any specific styles for the chart container here */
  </style>
  