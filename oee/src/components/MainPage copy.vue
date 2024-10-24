<template>
    <div>
      <div class="button-container">
        <!-- Button to add machines -->
      
  
        <!-- Dropdown for selecting machine metrics -->
        <div class="dropdown-container">
          <label for="metricsSelect">Select Machine</label>
          <select id="metricsSelect" v-model="selectedMachine" @change="updateSelectedMetrics">
            <option value="">Overall machines data</option>
            <option v-for="machine in machines" :key="machine.name" :value="machine.name">{{ machine.name }}</option>
          </select>
        </div>
      </div>
  
      <div class="charts-and-image-container">
        <div class="charts-row">
          <!-- Chart containers -->
          <div class="chart-container">
            <div class="chart-label">OEE</div>
            <div id="oeeChartRef" class="chart"></div>
          </div>
  
          <div class="chart-container">
            <div class="chart-label">Performance</div>
            <div id="performanceChartRef" class="chart"></div>
          </div>
  
          <div class="chart-container">
            <div class="chart-label">Quality</div>
            <div id="qualityChartRef" class="chart"></div>
          </div>
  
          <div class="chart-container">
            <div class="chart-label">Availability</div>
            <div id="availabilityChartRef" class="chart"></div>
          </div>
  
          <div v-if="selectedMachine" class="chart-container image-container">
            <img :src="selectedMachineImage" alt="Machine Image" class="machine-image">
          </div>
          <div v-else class="chart-container image-container">
            <img src="@/assets/overallequipment_img.png" alt="Default Machine Image" class="machine-image">
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, computed } from 'vue';
  import { useCncMachineStore } from '@/stores/oeestore';
  import * as echarts from 'echarts';
  
  const cncMachineStore = useCncMachineStore();
  
  const selectedMachine = ref('');
  const machines = ref([]);
  
  
  const fetchMachines = async () => {
    try {
      await cncMachineStore.fetchCncMachineData();
      machines.value = cncMachineStore.machineNames;
      console.log('Machines fetched:', machines.value);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };
  
  const updateCharts = () => {
    const { quality, availability, performance, oee } = cncMachineStore.selectedMetricsData;
  
    console.log('Metrics data:', { quality, availability, performance, oee });
  
    const qualityChart = echarts.init(document.getElementById('qualityChartRef'));
    const availabilityChart = echarts.init(document.getElementById('availabilityChartRef'));
    const performanceChart = echarts.init(document.getElementById('performanceChartRef'));
    const oeeChart = echarts.init(document.getElementById('oeeChartRef'));
    const updateChart = (chart, data, name, color) => {
    // Convert to percentage and format to two decimal places
    const percentage = (data * 100).toFixed(2); // Convert to percentage and round to 2 decimal places
  
    chart.setOption({
      series: [{
        name,
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        startAngle: 180,
        endAngle: 0,
        data: [
          { value: percentage, itemStyle: { color: color } },
          { value: 100 - percentage, itemStyle: { color: '#FF0000' } } // Fill remaining with red color
        ],
        label: {
          show: true,
          position: 'inside',
          fontSize: 16,
          fontWeight: 'bold',
          formatter: function (params) {
            // Display only the percentage for the visible data part
            if (params.value === percentage) {
              return `${params.name}\n${params.percent}%`;
            }
            return '';
          }
        },
        labelLine: { show: false },
      }],
      tooltip: {
        trigger: 'item',
        formatter: `{b}: {c}%`, // Tooltip to show name and percentage
      }
    });
  };
  
  
    // Update charts
    updateChart(qualityChart, quality, 'Quality', '#2196F3');
    updateChart(availabilityChart, availability, 'Availability', '#2196F3');
    updateChart(performanceChart, performance, 'Performance', '#2196F3');
    updateChart(oeeChart, oee, 'OEE', '#4CAF50');
  
    console.log('Charts updated with:', { quality: quality * 100, availability: availability * 100, performance: performance * 100, oee: oee * 100 });
  };
  
  const updateSelectedMetrics = async () => {
    await cncMachineStore.setSelectedMetrics(selectedMachine.value);
    updateCharts();
  };
  
  onMounted(() => {
    fetchMachines();
  });
  
  watch(selectedMachine, (newValue) => {
    if (newValue) {
      updateSelectedMetrics();
      console.log('New selected machine name:', newValue);
    }
  });
  
  watch(() => cncMachineStore.selectedMetricsData, () => {
    updateCharts();
    console.log('Updated charts data:', cncMachineStore.selectedMetricsData);
  });
  
  // Computed property to get selected machine image
  const selectedMachineImage = computed(() => {
    if (selectedMachine.value) {
      return cncMachineStore.getSelectedMachineImage(selectedMachine.value);
    } else {
      // Return a default image path or placeholder when no machine is selected
      return require('@/assets/overallequipment_img.png');
    }
  });
  </script>
  
  <style scoped>
  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Apply styles directly to the button */
  .button-container button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* Adjust hover effect for the button */
  .button-container button:hover {
    background-color: #0056b3;
  }
  
  .charts-and-image-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .charts-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 200%;
  }
  
  .chart-container {
    flex: 1 1 calc(25% - 20px);
    height: 300px;
    margin: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  
    min-width: 280px; /* Ensure a minimum width for each chart */
    position: relative; /* Make the image container position relative */
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    bottom: 33px;
    right: 200px;
    width: 70%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
  }
  
  
  .chart {
    width: 100%;
    height: 100%;
  }
  
  .image-container {
    flex: 1 1 calc(25% - 20px); /* Adjust image container flex properties */
    margin: 10px; /* Adjust margin for spacing */
    max-width: 290px; /* Limit maximum width */
    position: relative; /* Ensure relative positioning for contained elements */
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
  }
  
  .machine-image {
    max-width: 100%; /* Ensure image does not exceed container width */
    max-height: 100%; /* Ensure image does not exceed container height */
  }
  
  .chart-label {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    z-index: 10; /* Ensure labels are above charts */
  }
  
  .dropdown-container {
    margin-bottom: 20px;
    text-align: center;
  }
  
  #metricsSelect {
    padding: 8px 12px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #metricsSelect:hover {
    background-color: #e0e0e0;
  }
  
  @media (max-width: 1024px) {
    .charts-row {
      flex-direction: column;
      align-items: center;
    }
  
    .chart-container {
      width: 100%;
      margin-bottom: 20px;
    }
  
    .image-container {
      width: 100%; /* Ensure full width on smaller screens */
      margin-bottom: 20px; /* Adjust margin for spacing */
      max-width: 150px; /* Adjust maximum width */
    }
  }
  </style>
  