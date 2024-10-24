import { defineStore } from 'pinia';
import axios from 'axios';

export const useMonthlyDataStore = defineStore('monthlyData', {
  state: () => ({
    data: [],
    machineOptions: [],
    dateOptions: [], // State to store fetched dates
    loading: false,
    error: null,
  }),

  actions: {
    async fetchMachineOptions() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/');
        // Ensure uniqueness using a Set
        const uniqueMachines = [...new Set(response.data.map(machine => machine.machine_name))];
        this.machineOptions = uniqueMachines;
      } catch (err) {
        this.error = err.response?.data?.detail || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },

    async fetchDateOptions() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/');
        // Extract unique dates using a Set
        const uniqueDates = [...new Set(response.data.map(machine => machine.date))];
        this.dateOptions = uniqueDates;
      } catch (err) {
        this.error = err.response?.data?.detail || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },

    async fetchMonthlyData(machineName, month, year) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get('http://172.18.100.214:8084/cnc_machine_data/month/', {
          params: {
            machine_name: machineName,
            month: month,
            year: year,
          },
        });
        this.data = response.data || [];
      } catch (err) {
        this.error = err.response?.data?.detail || 'An error occurred';
      } finally {
        this.loading = false;
      }
    },
  },
});
