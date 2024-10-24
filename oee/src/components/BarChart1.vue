<template>
    <div ref="barChart" style="width: 100%; height: 350px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  import { useWeeklyMetricsStore } from '@/stores/WeeklyMetricsStore'; // Adjust the path according to your project
  
  const store = useWeeklyMetricsStore();
  const barChart = ref(null);
  let chartInstance = null;
  
  const averageMetricsByDay = (data) => {
    const metricsMap = {};
  
    // Group data by date
    data.forEach(item => {
      const date = new Date(item.timestamp).toDateString(); // Convert timestamp to date string for grouping
  
      if (!metricsMap[date]) {
        metricsMap[date] = { 
          availability: item.availability, 
          performance: item.performance, 
          quality: item.quality, 
          oee: item.oee, 
          count: 1 
        };
      } else {
        metricsMap[date].availability += item.availability;
        metricsMap[date].performance += item.performance;
        metricsMap[date].quality += item.quality;
        metricsMap[date].oee += item.oee;
        metricsMap[date].count += 1;
      }
    });
  
    // Compute averages for each day
    return Object.entries(metricsMap).map(([date, metrics]) => ({
      timestamp: date,
      availability: metrics.availability / metrics.count,
      performance: metrics.performance / metrics.count,
      quality: metrics.quality / metrics.count,
      oee: metrics.oee / metrics.count,
    }));
  };
  
  const computeMetrics = () => {
    const weeklyData = store.metricsData || [];
    const averagedData = averageMetricsByDay(weeklyData);
    const timestamps = averagedData.map(item => item.timestamp);
    const availabilityData = averagedData.map(item => item.availability);
    const performanceData = averagedData.map(item => item.performance);
    const qualityData = averagedData.map(item => item.quality);
    const oeeData = averagedData.map(item => item.oee);
  
    return { timestamps, availabilityData, performanceData, qualityData, oeeData };
  };
  
  const initChart = () => {
    if (!barChart.value) {
      console.error('barChart element is not available');
      return;
    }
  
    chartInstance = echarts.init(barChart.value);
  
    const { timestamps, availabilityData, performanceData, qualityData, oeeData } = computeMetrics();
  
    const option = {
      title: {
        text: 'Weekly Metrics Overview',
        left: 'center',
        top: '40px',
        textStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['OEE', 'Availability', 'Performance', 'Quality']
      },
      xAxis: {
        type: 'category',
        data: timestamps // Use timestamps for the x-axis
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
          data: oeeData
        },
        {
          name: 'Availability',
          type: 'bar',
          data: availabilityData
        },
        {
          name: 'Performance',
          type: 'bar',
          data: performanceData
        },
        {
          name: 'Quality',
          type: 'bar',
          data: qualityData
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
        const { timestamps, availabilityData, performanceData, qualityData, oeeData } = computeMetrics();
        chartInstance.setOption({
          xAxis: {
            data: timestamps
          },
          series: [
            {
              name: 'OEE',
              data: oeeData
            },
            {
              name: 'Availability',
              data: availabilityData
            },
            {
              name: 'Performance',
              data: performanceData
            },
            {
              name: 'Quality',
              data: qualityData
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
  