<!-- <template>
    <div class="daily">
      <h1>Welcome to Download Report Page</h1>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .daily {
    padding: 20px;
    text-align: center;
  }
  </style>
   -->
   <template>
    <div class="metrics-page">
      <div class="container mx-auto p-4">
        <!-- Container for horizontal layout -->
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <!-- Dropdown for machine selection -->
          <div class="flex-1 min-w-[150px]">
            <label for="machine" class="block text-sm font-medium text-gray-700">Select Machine</label>
            <select id="machine" v-model="selectedMachine" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option v-for="machine in uniqueMachines" :key="machine" :value="machine">
                {{ machine }}
              </option>
            </select>
          </div>
  
          <!-- Date selectors for start and end dates -->
          <div class="flex flex-col md:flex-row md:space-x-4 flex-1">
            <div class="flex-1 min-w-[150px]">
              <label for="start-date" class="block text-lg font-medium mb-2">Start Date:</label>
              <input type="date" v-model="startDate" id="start-date" class="p-2 border border-gray-300 rounded w-full"/>
            </div>
            <div class="flex-1 min-w-[150px]">
              <label for="end-date" class="block text-lg font-medium mb-2">End Date:</label>
              <input type="date" v-model="endDate" id="end-date" class="p-2 border border-gray-300 rounded w-full"/>
            </div>
          </div>
  
          <!-- Button container for proper alignment -->
          <div class="flex flex-col md:flex-row md:space-x-4">
            <!-- Fetch Button -->
            <div class="flex-1 min-w-[150px]">
              <button @click="fetchData" class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm w-full">
                Fetch Data
              </button>
            </div>
  
            <!-- Download Button -->
            <div class="flex-1 min-w-[180px]">
              <button @click="downloadExcel" class="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm w-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7 7 7-7M12 3v12" />
                </svg>
                Download Excel
              </button>
            </div>
          </div>
        </div>
  
        <!-- Data Table -->
        <div class="">
          <div class="table-container">
            <table class="min-w-full divide-y divide-gray-300 border border-gray-300">
              <thead>
                <tr>
                  <!-- Table headers with adjusted widths -->
                  <th class="py-2 px-4 border-b border-gray-300">Timestamp</th>
                  <th class="py-2 px-4 border-b border-gray-300">Machine Name</th>
                  <th class="py-2 px-4 border-b border-gray-300">Shift</th>
                  <th class="py-2 px-4 border-b border-gray-300">Operation Mode</th>
                  <th class="py-2 px-4 border-b border-gray-300">Machine Status</th>
                  <th class="py-2 px-4 border-b border-gray-300">Production Time</th>
                  <th class="py-2 px-4 border-b border-gray-300">Planned Down Time</th>
                  <th class="py-2 px-4 border-b border-gray-300">Operating Time</th>
                  <th class="py-2 px-4 border-b border-gray-300">Availability</th>
                  <th class="py-2 px-4 border-b border-gray-300">Part Count</th>
                  <th class="py-2 px-4 border-b border-gray-300">Theoretical Cycle Time</th>
                  <th class="py-2 px-4 border-b border-gray-300">Performance</th>
                  <th class="py-2 px-4 border-b border-gray-300">Good Units</th>
                  <th class="py-2 px-4 border-b border-gray-300">Bad Parts</th>
                  <th class="py-2 px-4 border-b border-gray-300">Quality</th>
                  <th class="py-2 px-4 border-b border-gray-300">OEE</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in paginatedData" :key="index">
                  <!-- Table data -->
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.timestamp }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.machine_name }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.shift }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.operation_mode }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.machine_status }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.production_time }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.planned_down_time }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.operating_time }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.availability }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.part_count }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.theoretical_cycle_time }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.performance }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.good_units }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.bad_parts }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.quality }}</td>
                  <td class="py-2 px-4 border-b border-gray-300">{{ item.oee }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- Pagination Controls -->
        <div class="mt-4 flex justify-between items-center">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  
  // Data state
  const machines = ref([]);
  const uniqueMachines = computed(() => Array.from(new Set(machines.value))); // Filter unique machine names
  const selectedMachine = ref('');
  const startDate = ref(new Date().toISOString().split('T')[0]); // Initial value for date format
  const endDate = ref(new Date().toISOString().split('T')[0]); // Initial value for date format
  const data = ref([]);
  const currentPage = ref(1);
  const rowsPerPage = computed(() => {
    // Compute rows per page to fit exactly 7 pages
    const totalRecords = data.value.length;
    return totalRecords > 0 ? Math.ceil(totalRecords / 7) : 0;
  });
  const totalPages = 7; // Fixed number of pages
  
  // Fetch machines data
  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/');
      const machineNames = response.data.map(item => item.machine_name);
      machines.value = Array.from(new Set(machineNames));
      selectedMachine.value = machines.value[0] || ''; // Set default machine
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };
  
  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/date_range/?machine_name=MazakH_400&start_date=2024-08-09&end_date=2024-08-14', {
        params: {
          machine_name: selectedMachine.value,
          start_date: startDate.value,
          end_date: endDate.value
        }
      });
      data.value = response.data;
      currentPage.value = 1; // Reset to first page after fetching new data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Download data as Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'OEEReport.xlsx');
  };
  
  // Paginated data computation
  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return data.value.slice(start, end);
  });
  
  // Pagination methods
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages) currentPage.value++;
  };
  
  // On mounted, fetch machine names
  onMounted(() => {
    fetchMachines();
  });
  </script>

  
<style scoped>
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

.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 1600px; /* Set a minimum width */
  padding: 10px;
  background-color: #f8f9fa;
  height: 1200; /* Adjust height based on content */
  position: relative;
  right: 80px;
  bottom: 20px;
}

table {
  width: 100%; /* Full width of the container */
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #1a1e8b;
  color: white;
}

th, td {
  white-space: nowrap; /* Prevent text from wrapping */
}

.table-header th {
  padding: 10px;
}

.table-body td {
  padding: 8px;
}

.table-body tr:nth-child(even) {
  background-color: #f9fafb;
}

.table-body tr:nth-child(odd) {
  background-color: #ffffff;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}

.table-container {
  max-height: 500px; /* Adjust as necessary */
  overflow-y: auto;

}

.table-container table {
  min-width: 1200px; /* Adjust as needed */
}

@media (max-width: 768px) {
  /* Stack elements vertically on smaller screens */
  .metrics-page .flex-wrap {
    flex-direction: column;
  }
  .metrics-page .container {
    padding: 8px;
  }
  .table-container {
    overflow-x: auto;
  }
  .table-container table {
    min-width: 600px; /* Minimum width for table to maintain readability */
  }
  .table-container th, .table-container td {
    padding: 8px;
    font-size: 12px;
  }
}
</style>

  