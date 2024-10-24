// src/stores/WeeklyMetricsStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useWeeklyMetricsStore = defineStore('weeklyMetrics', {
  state: () => ({
    metricsData: [],
    machines: [], // State to store machine names
    isLoading: false,
    error: null,
    calculatedMetrics: {
      totalRuntime: 0,
      totalIdleTime: 0,
      totalOffTime: 0,
    }
  }),
  actions: {
    async fetchMachines() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/');
        const machineNames = response.data.map(machine => machine.machine_name);
        this.machines = [...new Set(machineNames)]; // Remove duplicates
      } catch (error) {
        console.error('Error fetching machine names:', error);
        this.error = 'Failed to fetch machine names';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchWeeklyData(machineName, startDate) {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://172.18.100.214:8084/cnc_machine_data/week/?machine_name=${machineName}&start_date=${startDate}`);
        console.log('API Response:', response.data); // Log the response

        // Calculate runtime, idletime, and offtime
        let totalRuntime = 0;
        let totalIdleTime = 0;
        let totalOffTime = 0;

        response.data.forEach(row => {
          totalRuntime += row.operating_time || 0;
          totalIdleTime += row.plandown_time || 0;
          // Assuming off time can be derived from some calculation
          totalOffTime += row.offtime || (100 - (row.operating_time || 0) - (row.plandown_time || 0));
        });

        this.calculatedMetrics = {
          totalRuntime,
          totalIdleTime,
          totalOffTime
        };

        // Store the raw data if needed
        this.metricsData = response.data;
      } catch (error) {
        console.error('Error fetching weekly data:', error);
        this.error = 'Failed to fetch weekly data';
      } finally {
        this.isLoading = false;
      }
    }
  }
});



