<template>
  <div class="metrics-page" >

  <div class="container p-4">
    <h1 class="text-2xl font-bold mb-4">Monthly Data Analytics</h1>

    <!-- Container for horizontal layout -->
    <div class="flex flex-wrap items-center space-x-4 mb-4">
      <!-- Machine Name Selection -->
      <div class="flex-1 min-w-[200px]">
        <label for="machineName" class="block text-lg font-medium mb-2">Select Machine:</label>
        <select v-model="selectedMachine" id="machineName" class="p-2 border border-gray-300 rounded w-full">
          <option v-for="machine in machineOptions" :key="machine" :value="machine">
            {{ machine }}
          </option>
        </select>
      </div>

      <!-- Date Selection -->
      <div class="flex-1 min-w-[200px]">
        <label for="date" class="block text-lg font-medium mb-2">Select Date:</label>
        <input type="month" v-model="selectedDate" id="date" class="p-2 border border-gray-300 rounded w-full"/>
      </div>

      <!-- Fetch Data Button -->
      <div class="flex-shrink-0 mt-4 md:mt-0">
        <button @click="fetchData" class="bg-blue-500 text-white py-2 px-4 rounded">Fetch Data</button>
      </div>
    </div>

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="text-center mt-4">Loading...</div>
    <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>

    <!-- Data Table -->
    <div class="mt-4 overflow-x-auto">
      <div class="overflow-y-auto" style="max-height: 500px;">
        <table class="min-w-full bg-white border border-gray-200 table-fixed">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 border-b">Timestamp</th>
              <th class="py-2 px-4 border-b">Machine Name</th>
              <th class="py-2 px-4 border-b">Shift</th>
              <th class="py-2 px-4 border-b">Operation Mode</th>
              <th class="py-2 px-4 border-b">Machine Status</th>
              <th class="py-2 px-4 border-b">Production Time</th>
              <th class="py-2 px-4 border-b">Planned Down Time</th>
              <th class="py-2 px-4 border-b">Operating Time</th>
              <th class="py-2 px-4 border-b">Availability</th>
              <th class="py-2 px-4 border-b">Part Count</th>
              <th class="py-2 px-4 border-b">Theoretical Cycle Time</th>
              <th class="py-2 px-4 border-b">Performance</th>
              <th class="py-2 px-4 border-b">Good Units</th>
              <th class="py-2 px-4 border-b">Bad Parts</th>
              <th class="py-2 px-4 border-b">Quality</th>
              <th class="py-2 px-4 border-b">OEE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loading && !error && data.length > 0" v-for="item in data" :key="item.id">
              <td class="py-2 px-4 border-b">{{ new Date(item.timestamp).toLocaleString() }}</td>
              <td class="py-2 px-4 border-b">{{ item.machine_name }}</td>
              <td class="py-2 px-4 border-b">{{ item.shift }}</td>
              <td class="py-2 px-4 border-b">{{ item.operation_mode }}</td>
              <td class="py-2 px-4 border-b">{{ item.machine_status }}</td>
              <td class="py-2 px-4 border-b">{{ item.production_time?.toFixed(2) }}</td>
              <td class="py-2 px-4 border-b">{{ item.plandown_time?.toFixed(2) }}</td>
              <td class="py-2 px-4 border-b">{{ item.operating_time?.toFixed(2) }}</td>
              <td class="py-2 px-4 border-b">{{ (item.availability * 100).toFixed(2) }}%</td>
              <td class="py-2 px-4 border-b">{{ item.part_count }}</td>
              <td class="py-2 px-4 border-b">{{ item.theoretical_cycletime?.toFixed(2) }}</td>
              <td class="py-2 px-4 border-b">{{ (item.performance * 100).toFixed(2) }}%</td>
              <td class="py-2 px-4 border-b">{{ item.good_units }}</td>
              <td class="py-2 px-4 border-b">{{ item.bad_parts }}</td>
              <td class="py-2 px-4 border-b">{{ (item.quality * 100).toFixed(2) }}%</td>
              <td class="py-2 px-4 border-b">{{ (item.oee * 100).toFixed(2) }}%</td>
            </tr>
            <tr v-if="!loading && !error && data.length === 0">
              <td colspan="16" class="py-2 px-4 text-center">No data available for the selected machine and date.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ECharts Area Chart and Stacked Bar Chart -->
    <div v-if="!loading && !error && data.length > 0" class="mt-8">
      <div class="flex space-x-4">
        <div class="w-full md:w-1/2">
          <AreaChart :data="data" />
        </div>
        <div class="w-full md:w-1/2">
          <StackedBarChart :data="data" />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMonthlyDataStore } from '../stores/MonthlyDataStore';
import AreaChart from './AreaChart.vue';
import StackedBarChart from './StackedBarChart.vue';

const store = useMonthlyDataStore();
const selectedMachine = ref('');
const selectedDate = ref('');
const machineOptions = ref([]);
const data = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  if (selectedMachine.value && selectedDate.value) {
    const [year, month] = selectedDate.value.split('-');
    loading.value = true;
    error.value = null;
    
    try {
      await store.fetchMonthlyData(selectedMachine.value, parseInt(month), parseInt(year));
      data.value = store.data;
      console.log("Data fetched successfully:", data.value);
    } catch (err) {
      error.value = 'Failed to fetch data';
      console.error("Error fetching data:", err);
    } finally {
      loading.value = false;
    }
  } else {
    error.value = 'Please select both machine and date.';
  }
};

onMounted(async () => {
  try {
    await store.fetchMachineOptions();
    machineOptions.value = store.machineOptions;
    console.log("Machine options fetched:", machineOptions.value);
    if (machineOptions.value.length) {
      selectedMachine.value = machineOptions.value[0];
    }
  } catch (err) {
    error.value = 'Failed to fetch machine options';
    console.error("Error fetching machine options:", err);
  }     
});
</script>

<style scoped>
/* Ensure container is responsive and positioned */
.container {
  width: calc(100% - 350px); /* Full width minus 350px offset */
  margin: 0 auto; /* Center align with automatic margins */
  padding: 1rem; /* Add padding for responsiveness */
  position: relative; /* Keep relative positioning */
  right: 150px; /* Offset to the right */
}

body {
  margin: 0; /* Remove default body margin */
  padding: 0; /* Remove default body padding */
}

table {
  border-collapse: collapse;
  width: 100%;

}

thead {
  background-color: #f3f4f6;
}

tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

tbody tr:hover {
  background-color: #e5e7eb;
}

th, td {
  border: 1px solid #e5e7eb;
  padding: 0.75rem; /* Increased padding for more space inside the cells */
  min-width: 120px; /* Set a minimum width for each column */
  word-wrap: break-word; /* Wrap long text within the cell */
}

.table-wrapper {
  max-height: 500px; /* Adjust the height as needed */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: auto; /* Enable horizontal scrolling */
}

table {
  width: 100%;
  border-collapse: collapse;
 
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.chart-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.chart {
  flex: 1;
  min-width: 0;
}
.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 1600px; /* Set a minimum width */
  padding: 10px;
  background-color: #f8f9fa;
  height: 1200px;
  position: relative;
  right: 50px;
  bottom:20px;
}
</style>
