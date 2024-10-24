<template>
  <div class="metrics-page">
    <div class="controls-row">
      <div class="control">
        <label for="machineSelect" style="color:white;">Select Machine:</label>
        <select id="machineSelect" v-model="selectedMachine" @change="handleMachineChange" class="styled-select">
          <option value="">Overall Metrics</option>
          <option v-for="machine in Object.keys(store.machines)" :key="machine" :value="machine">{{ machine }}</option>
        </select>
      </div>
      <div class="control">
        <label for="dateSelect" style="color:white;">Select Date:</label>
        <input type="date" id="dateSelect" v-model="selectedDate" @change="handleDateChange" class="styled-select" />
      </div>
      <div class="control" v-if="selectedMachine && store.shifts.length > 0">
        <label for="shiftSelect" style="color:white;">Select Shift:</label>
        <select id="shiftSelect" v-model="selectedShift" @change="updateMetrics" class="styled-select">
          <option v-for="shift in store.shifts" :key="shift" :value="shift">{{ shift }}</option>
        </select>
      </div>
    </div>
    <!-- Metrics and chart display row -->
    <div class="metrics-chart-row">
      <!-- Metrics display -->
      <div class="metrics-container">
        <div class="metrics-box">
          <div class="top-row">
            <div class="metric" :class="getMetricClass('availability')">
              <h3><strong>Availability</strong></h3>
              <div class="metric-value">{{ metricsData.availability }}%</div>
            </div>
            <div class="metric" :class="getMetricClass('performance')">
              <h3><strong>Performance</strong></h3>
              <div class="metric-value">{{ metricsData.performance }}%</div>
            </div>
            <div class="metric" :class="getMetricClass('quality')">
              <h3><strong>Quality</strong></h3>
              <div class="metric-value">{{ metricsData.quality }}%</div>
            </div>
            <div class="metric" :class="getMetricClass('oee')">
              <h3><strong>OEE</strong></h3>
              <div class="metric-value">{{ metricsData.oee }}%</div>
            </div>
          </div>
          <div class="bottom-row">
            <div class="metric" :class="getMetricClass('runtime')">
              <img src="../assets/run_icon.png" alt="Runtime Icon" class="metric-icon" />
              <h3><strong>Runtime</strong></h3>
              <div class="metric-value">{{ metricsData.runtime }} hrs</div>
            </div>
            <div class="metric" :class="getMetricClass('idletime')">
              <img src="../assets/idle_icon.png" alt="Idle Time Icon" class="metric-icon" />
              <h3><strong>Idle Time</strong></h3>
              <div class="metric-value">{{ metricsData.idletime }} hrs</div>
            </div>
            <div class="metric" :class="getMetricClass('offtime')">
              <img src="../assets/image.png" alt="Off Time Icon" class="metric-icon" />
              <h3><strong>Off Time</strong></h3>
              <div class="metric-value">{{ metricsData.offtime }} hrs</div>
            </div>
            <div class="metric" :class="getMetricClass('badparts')">
              <h3><strong>Bad Parts</strong></h3>
              <div class="metric-value">{{ metricsData.badparts }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart display -->
      <div class="chart-container pie-chart">
        <PieChart :data="metricsData"></PieChart>
      </div>
    </div>
    
    <!-- New Horizontal Layered Chart -->
    <div class="additional-charts-row">
      <div class="chart-container horizontal-layered-chart">
        <HorizontalLayeredChart />
      </div>
      <div class="chart-container oee-area-chart">
        <OeeAreaChart />
      </div>
      <div class="chart-container bar-chart">
        <BarChart />
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAnalyticsStore } from '@/stores/Analyticstore';
import PieChart from '@/components/PieChart.vue';
import HorizontalLayeredChart from '@/components/HorizontalLayeredChart.vue';
import OeeAreaChart from '@/components/OeeAreaChart.vue';
import BarChart from '@/components/BarChart.vue';

// import MetricsAreaChart from '@/components/MetricsAreaChart.vue';

const store = useAnalyticsStore();

const selectedDate = ref('');
const selectedMachine = ref('');
const selectedShift = ref('');
const metricsData = computed(() => {
  return {
    availability: store.metricsData.availability.toFixed(2),
    performance: store.metricsData.performance.toFixed(2),
    quality: store.metricsData.quality.toFixed(2),
    oee: store.metricsData.oee.toFixed(2),
    runtime: store.metricsData.runtime.toFixed(2),
    idletime: store.metricsData.idletime.toFixed(2),
    offtime: store.metricsData.offtime.toFixed(2),
    badparts: store.metricsData.badparts.toFixed(2),
    goodparts: store.metricsData.goodparts.toFixed(2),
    partcount: store.metricsData.partcount.toFixed(2),
  };
});

onMounted(async () => {
  await store.fetchMachines();
  await store.fetchShifts(); // Ensure that shifts are fetched when component mounts
});

watch([selectedMachine, selectedDate], () => {
  store.selectedMachine = selectedMachine.value;
  store.selectedDate = selectedDate.value;
  store.updateShifts(); // Update shifts based on selected machine and date
  updateMetrics();
});

const handleMachineChange = () => {
  store.selectedMachine = selectedMachine.value;
  store.updateShifts(); // Update shifts based on selected machine
  updateMetrics();
};

const handleDateChange = () => {
  store.selectedDate = selectedDate.value;
  store.updateShifts(); // Update shifts based on selected date
  updateMetrics();
};

const updateMetrics = () => {
  store.selectedShift = selectedShift.value;
  store.updateMetrics(); // Update metrics based on selected shift
};

const getMetricClass = (metric) => {
  switch (metric) {
    case 'availability':
      return 'metric-blue';
    case 'performance':
      return 'metric-orange1';
    case 'quality':
      return 'metric-yellow';
    case 'oee':
      return 'metric-light-green';
    case 'runtime':
      return 'metric-dark-green';
    case 'idletime':
      return 'metric-orange';
    case 'offtime':
      return 'metric-gray';
    case 'badparts':
      return 'metric-red';
    default:
      return '';
  }
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 1750px; /* Set a minimum width */
  padding: 10px;
  background-color: #f8f9fa;
  height: 820px;
  position: relative;
  right: 50px;
  bottom:20px;
}

.controls-row {         
  display: flex;
  justify-content: space-between;
  width: 100%;   
  margin-bottom: 20px;
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
}

.styled-select {
  width: 200px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
  color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.metrics-chart-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
}
.metrics-container {
  display: flex;
  flex-direction: column; /* Change to column layout */
  align-items: center;
  width: 66%;
  height: 350px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.metrics-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.top-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.bottom-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px; /* Space between rows */
}

.metric {
  width: calc(50% - 10px); /* Adjust width to fit 4 boxes in a row */
  height: 100px;
  margin: 5px;
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chart-container {
  width: 33%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  height: 330px;
}



.metric h3 {
  font-size: 16px;
  margin-bottom: 5px;
}

.metric-value {
  font-size: 18px;
  font-weight: bold;
}

.metric-icon {
  position: absolute; /* Use position: absolute to position the icons */
  top: 10px; /* Adjust top position as needed */
  left: 10px; /* Adjust left position as needed */
  width: 30px; /* Adjust width as needed */
  height: 30px; /* Adjust height as needed */
}



.pie-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.additional-charts-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top:50px;
  gap: 60px;
}

.additional-charts-row .chart-container {
  width: 480px; /* Increase the width of each chart container */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  height: 330px;
}


.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.metric-blue {
  background-color: #3498db;
  color: white;
}
.metric-orange1 {
  background-color: #e67e22;
  color: white;
 
}
.metric-orange {
  background-color: white;
  color: black;
  border: 1px solid black;
}



.metric-yellow {
  background-color: #f1c40f;
  color: white;

}

.metric-light-green {
  background-color: #2ecc71;
  color: white;
}

.metric-dark-green {
  background-color: white;
  color: black;
  border: 1px solid black;
}

.metric-gray {
  background-color: white;
  color: black;
  border: 1px solid black;
}

.metric-red {
  background-color: white;
  color: black;
  border: 1px solid black;
}



@media screen and (max-width: 768px) {
  .metrics-container, .chart-container {
    width: 100%;
    margin-bottom: 20px;
  }

  .top-row, .bottom-row {
    flex-direction: column;
  }

  .metric {
    width: 100%; /* Adjust for smaller screens */
    margin: 5px 0; /* Adjust spacing for smaller screens */
  }
}
</style>
