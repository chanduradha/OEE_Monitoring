<!-- ReportTable.vue -->
<template>
  <div class="report-table-container">
    <button @click="exportToExcel" class="download-btn">Download as Excel</button>
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
</template>

<script setup>
import { defineProps } from 'vue';
import * as XLSX from 'xlsx';

const props = defineProps({
  reportData: Array
});

const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(props.reportData.map(data => ({
    Timestamp: data.timestamp,
    'Machine Name': data.machine_name,
    Status: data.machine_status,
    OEE: (data.oee * 100).toFixed(2) + '%',
    Availability: (data.availability * 100).toFixed(2) + '%',
    Performance: (data.performance * 100).toFixed(2) + '%',
    Quality: (data.quality * 100).toFixed(2) + '%',
    'Operating Time': data.operating_time.toFixed(2),
    'Planned Downtime': data.plandown_time.toFixed(2),
    'Production Time': data.production_time.toFixed(2),
    'Bad Parts': data.bad_parts,
    'Good Units': data.good_units
  })));
  
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'weeklyreport');
  
  XLSX.writeFile(wb, 'weeklyreport.xlsx');
};
</script>
  
  <style scoped>
  .report-table-container {
    width: 1500px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    position: relative;
    z-index: 1000;
    height: 800px;
    max-height: 300px;
    overflow-y: auto;
    overflow-x: auto;
  }
  
  .report-table {
    width: 100%;
    height:300px ;
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

  .download-btn {
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .download-btn:hover {
    background-color: #45a049;
  }
  </style>
  