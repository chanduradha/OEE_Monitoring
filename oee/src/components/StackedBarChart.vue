<template>
    <div ref="chartContainer" class="w-full h-80"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import * as echarts from 'echarts';
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    }
  });
  
  const chartContainer = ref(null);
  
  // Function to transform data into doughnut chart format
  const transformData = (data) => {
    const transformedData = {
      runtime: 0,
      idletime: 0,
      offtime: 0
    };
  
    data.forEach(item => {
      // Calculate runtime, idletime, and offtime based on machine_status
      const operatingTimeInHours = (item.operating_time || 0) / 60; // Convert minutes to hours
  
      if (item.machine_status === 'Running') {
        transformedData.runtime += operatingTimeInHours;
      } else if (item.machine_status === 'Idle') {
        transformedData.idletime += operatingTimeInHours;
      } else if (item.machine_status === 'Off') {
        transformedData.offtime += operatingTimeInHours;
      }
    });
  
    // Convert to format suitable for doughnut chart
    return Object.keys(transformedData).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
      value: transformedData[key]
    }));
  };
  
  const initChart = () => {
    if (chartContainer.value) {
      const chart = echarts.init(chartContainer.value);
      const transformedData = transformData(props.data);
  
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} hours ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: transformedData.map(item => item.name)
        },
        series: [
          {
            name: 'Machine Status',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside'
            },
            labelLine: {
              show: true
            },
            data: transformedData
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
  /* Add any specific styles for the doughnut chart container here */
  </style>
  