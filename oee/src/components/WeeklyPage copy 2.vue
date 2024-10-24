<template>
  <div class="metrics-page">
    <div class="controls-row">
      <div class="control">
        <button @click="generateReport" class="report-button">Generate Report</button>
      </div>
      <div class="control">
        <label for="machineSelect" style="color:white;">Select Machine:</label>
        <select id="machineSelect" v-model="selectedMachine" @change="updateMetrics" class="styled-select">
          <option value="">Overall Metrics</option>
          <option v-for="machine in uniqueMachines" :key="machine" :value="machine">{{ machine }}</option>
        </select>
      </div>
      <div class="control">
        <label for="dateSelect" style="color:white;">Select Date:</label>
        <input type="date" id="dateSelect" v-model="selectedDate" @change="updateMetrics" class="styled-select" />
      </div>
    </div>

    <!-- Loading and error messages -->
    <div v-if="store.isLoading" class="loading">Loading...</div>
    <div v-if="store.error" class="error">{{ store.error }}</div>

    <!-- Metrics and chart display row -->
    <div class="metrics-chart-row">
      <!-- Metrics display -->
      <div class="metrics-container" v-if="metricsData">
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
        <MetricsPieChart :data="metricsData" />
      </div>
    </div>
    
    <!-- New Horizontal Layered Chart -->
    <div class="additional-charts-row">
      <!-- Add additional charts here -->
      <div class="chart-container bar-chart">
        <BarChart1 :metricsData="store.metricsData" />
      </div>
    </div>

    <!-- Report table -->
<div v-if="reportData.length > 0" class="report-table-container">
  <table class="report-table">
    <thead>
      <tr>
        <th>Timestamp</th>
        <th>Machine Name</th>
        <th>Status</th>
        <th>OEE</th>
        <th>Availability</th>
        <th>Performance</th>
        <th>Quality</th>
        <th>Operating Time</th>
        <th>Planned Downtime</th>
        <th>Production Time</th>
        <th>Bad Parts</th>
        <th>Good Units</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in reportData" :key="data.id">
        <td>{{ data.timestamp }}</td>
        <td>{{ data.machine_name }}</td>
        <td>{{ data.machine_status }}</td>
        <td>{{ (data.oee * 100).toFixed(2) }}%</td>
        <td>{{ (data.availability * 100).toFixed(2) }}%</td>
        <td>{{ (data.performance * 100).toFixed(2) }}%</td>
        <td>{{ (data.quality * 100).toFixed(2) }}%</td>
        <td>{{ data.operating_time.toFixed(2) }} hrs</td>
        <td>{{ data.plandown_time.toFixed(2) }} hrs</td>
        <td>{{ data.production_time.toFixed(2) }} hrs</td>
        <td>{{ data.bad_parts }}</td>
        <td>{{ data.good_units }}</td>
      </tr>
    </tbody>
  </table>
</div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useWeeklyMetricsStore } from '@/stores/WeeklyMetricsStore';
import MetricsPieChart from '@/components/MetricsPieChart.vue';
import BarChart1 from '@/components/BarChart1.vue';



const reportData = ref([]);

const generateReport = async () => {
  if (!selectedMachine.value || !selectedDate.value) return;

  // Fetch the data (this assumes the store's fetchWeeklyData method can be reused)
  await store.fetchWeeklyData(selectedMachine.value, selectedDate.value);

  // Update the report data
  reportData.value = store.metricsData;
};
const store = useWeeklyMetricsStore();

const selectedDate = ref('');
const selectedMachine = ref('');

const metricsData = computed(() => {
  if (!store.metricsData || store.metricsData.length === 0) {
    return {
      availability: '0',
      performance: '0',
      quality: '0',
      oee: '0',
      runtime: '0',
      idletime: '0',
      offtime: '0',
      badparts: '0'
    };
  }

  const totalMetrics = {
    availability: 0,
    performance: 0,
    quality: 0,
    oee: 0,
    runtime: 0,
    idletime: 0,
    offtime: 0,
    badparts: 0,
  };

  store.metricsData.forEach(item => {
    totalMetrics.availability += item.availability || 0;
    totalMetrics.performance += item.performance || 0;
    totalMetrics.quality += item.quality || 0;
    totalMetrics.oee += item.oee || 0;
    totalMetrics.runtime += item.operating_time || 0;
    totalMetrics.idletime += item.plandown_time || 0;
    totalMetrics.offtime += item.off_time || item.plandown_time || 0;
    totalMetrics.badparts += item.bad_parts || 0;
  });

  const count = store.metricsData.length;

  return {
    availability: ((totalMetrics.availability / count) * 100).toFixed(2),
    performance: ((totalMetrics.performance / count) * 100).toFixed(2),
    quality: ((totalMetrics.quality / count) * 100).toFixed(2),
    oee: ((totalMetrics.oee / count) * 100).toFixed(2),
    runtime: (totalMetrics.runtime / count).toFixed(2),
    idletime: (totalMetrics.idletime / count).toFixed(2),
    offtime: (totalMetrics.offtime / count).toFixed(2),
    badparts: (totalMetrics.badparts / count).toFixed(2),
  };
});
const uniqueMachines = computed(() => {
  const unique = [...new Set(store.machines)];
  return unique;
});

onMounted(() => {
  store.fetchMachines(); // Fetch machines on mount
});

const updateMetrics = async () => {
  if (!selectedMachine.value || !selectedDate.value) return;

  await store.fetchWeeklyData(selectedMachine.value, selectedDate.value);
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
  width: 115%;
  padding: 10px;
  background-color: #f8f9fa;
  height: 820px;
  position:relative;
  right: 240px;
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
  width: 60%;
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
  width: calc(25% - 10px); /* Adjust width to fit 4 boxes in a row */
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

.chart-container {
  width: 35%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.pie-chart {
  display: flex;
  justify-content: center;
  align-items: center;
}

.additional-charts-row {
  display: flex;
  justify-content: space-between;
  width: 300%;
  position: relative;
  top:50px;
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

.chart-container {
  width: 33%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  height: 330px;
  
}

.report-table-container {
  width: 50%;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.report-table {
  width: 60%;
  border-collapse: collapse;
 
}

.report-table th,
.report-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.report-table th {
  background-color: #333;
  color: white;
}

.report-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.report-button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.report-button:hover {
  background-color: #2980b9;
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
