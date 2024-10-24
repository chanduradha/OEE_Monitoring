
import { defineStore } from 'pinia';

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    machines: {
      MazakH_400: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 90, availability: 85, performance: 80, runtime: 6, idletime: 1, offtime: 1, badparts: 2 },
            { timestamp: '2024-06-01 16:00:00', quality: 91.36, availability: 87, performance: 82, runtime: 7, idletime: 1, offtime: 0.5, badparts: 3 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 93, availability: 88, performance: 84, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 1 },
            { timestamp: '2024-06-01 16:00:00', quality: 94.36, availability: 83.41, performance: 82, runtime: 7, idletime: 1, offtime: 0.5, badparts: 2 },
          ],
        },
      },
      HMT_STALLION_200: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 89, availability: 84, performance: 79, runtime: 5, idletime: 1.5, offtime: 1.5, badparts: 1 },
            { timestamp: '2024-06-01 16:00:00', quality: 90.45, availability: 86, performance: 81, runtime: 6, idletime: 1, offtime: 1, badparts: 2 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 92, availability: 87, performance: 83, runtime: 6, idletime: 0.5, offtime: 1.5, badparts: 1 },
            { timestamp: '2024-06-01 16:00:00', quality: 93.36, availability: 84, performance: 82, runtime: 7, idletime: 0.5, offtime: 1, badparts: 2 },
          ],
        },
      },
      HMT_VTC_800: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 88, availability: 83, performance: 78, runtime: 6, idletime: 1, offtime: 1, badparts: 3 },
            { timestamp: '2024-06-01 16:00:00', quality: 89.36, availability: 85, performance: 80, runtime: 7, idletime: 1, offtime: 0.5, badparts: 4 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 91, availability: 86, performance: 82, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 2 },
            { timestamp: '2024-06-01 16:00:00', quality: 92.36, availability: 82.41, performance: 81, runtime: 7, idletime: 1, offtime: 0.5, badparts: 3 },
          ],
        },
      },
      SCHAUBLIN_33: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 87, availability: 82, performance: 77, runtime: 6, idletime: 1, offtime: 1, badparts: 4 },
            { timestamp: '2024-06-01 16:00:00', quality: 88.36, availability: 84, performance: 79, runtime: 7, idletime: 1, offtime: 0.5, badparts: 5 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 90, availability: 85, performance: 81, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 3 },
            { timestamp: '2024-06-01 16:00:00', quality: 91.36, availability: 81.41, performance: 80, runtime: 7, idletime: 1, offtime: 0.5, badparts: 4 },
          ],
        },
      },
     Macpower_mono_200: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 86, availability: 81, performance: 76, runtime: 6, idletime: 1, offtime: 1, badparts: 5 },
            { timestamp: '2024-06-01 16:00:00', quality: 87.36, availability: 83, performance: 78, runtime: 7, idletime: 1, offtime: 0.5, badparts: 6 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 89, availability: 84, performance: 80, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 4 },
            { timestamp: '2024-06-01 16:00:00', quality: 90.36, availability: 80.41, performance: 79, runtime: 7, idletime: 1, offtime: 0.5, badparts: 5 },
          ],
        },
      },
      AMS_VMC: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 85, availability: 80, performance: 75, runtime: 6, idletime: 1, offtime: 1, badparts: 6 },
            { timestamp: '2024-06-01 16:00:00', quality: 86.36, availability: 82, performance: 77, runtime: 7, idletime: 1, offtime: 0.5, badparts: 7 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 88, availability: 83, performance: 79, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 5 },
            { timestamp: '2024-06-01 16:00:00', quality: 89.36, availability: 79.41, performance: 78, runtime: 7, idletime: 1, offtime: 0.5, badparts: 6 },
          ],
        },
      },
      DMG_Mori: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 84, availability: 79, performance: 74, runtime: 6, idletime: 1, offtime: 1, badparts: 7 },
            { timestamp: '2024-06-01 16:00:00', quality: 85.36, availability: 81, performance: 76, runtime: 7, idletime: 1, offtime: 0.5, badparts: 8 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 87, availability: 82, performance: 78, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 6 },
            { timestamp: '2024-06-01 16:00:00', quality: 88.36, availability: 78.41, performance: 77, runtime: 7, idletime: 1, offtime: 0.5, badparts: 7 },
          ],
        },
      },
      HurcoVMX: {
        shifts: {
          shift1: [
            { timestamp: '2024-06-01 08:00:00', quality: 83, availability: 78, performance: 73, runtime: 6, idletime: 1, offtime: 1, badparts: 8 },
            { timestamp: '2024-06-01 16:00:00', quality: 84.36, availability: 80, performance: 75, runtime: 7, idletime: 1, offtime: 0.5, badparts: 9 },
          ],
          shift2: [
            { timestamp: '2024-06-01 08:00:00', quality: 86, availability: 81, performance: 77, runtime: 6.5, idletime: 0.5, offtime: 1, badparts: 7 },
            { timestamp: '2024-06-01 16:00:00', quality: 87.36, availability: 77.41, performance: 76, runtime: 7, idletime: 1, offtime: 0.5, badparts: 8 },
          ],
        },
      },
    },
    selectedMachine: 'overall', // Default selected machine to 'overall'
    selectedShift: 'shift1', // Default selected shift
    selectedDate: '', // Selected date state
    overallAverageData: {
      quality: 0,
      availability: 0,
      performance: 0,
      oee: 0,
      runtime: 0,
      idletime: 0,
      offtime: 0,
      badparts: 0,
    },
  }),
  getters: {
    overallAverageMetrics(state) {
      // Calculate overall averages across all machines
      const allMachineMetrics = Object.values(state.machines).flatMap(machine =>
        Object.values(machine.shifts).flatMap(shift => shift)
      );

      if (allMachineMetrics.length === 0) {
        return {
          quality: 0,
          availability: 0,
          performance: 0,
          oee: 0,
          runtime: 0,
          idletime: 0,
          offtime: 0,
          badparts: 0,
        };
      }

      const totalMetrics = allMachineMetrics.length;
      const avgAvailability = allMachineMetrics.reduce((acc, curr) => acc + curr.availability, 0) / totalMetrics;
      const avgPerformance = allMachineMetrics.reduce((acc, curr) => acc + curr.performance, 0) / totalMetrics;
      const avgQuality = allMachineMetrics.reduce((acc, curr) => acc + curr.quality, 0) / totalMetrics;
      const avgOEE = (avgQuality / 100) * (avgAvailability / 100) * (avgPerformance / 100) * 100;

      const totalRuntime = allMachineMetrics.reduce((acc, curr) => acc + (curr.runtime || 0), 0);
      const totalIdletime = allMachineMetrics.reduce((acc, curr) => acc + (curr.idletime || 0), 0);
      const totalOfftime = allMachineMetrics.reduce((acc, curr) => acc + (curr.offtime || 0), 0);
      const totalBadparts = allMachineMetrics.reduce((acc, curr) => acc + (curr.badparts || 0), 0);

      return {
        quality: avgQuality.toFixed(2),
        availability: avgAvailability.toFixed(2),
        performance: avgPerformance.toFixed(2),
        oee: avgOEE.toFixed(2),
        runtime: (totalRuntime / totalMetrics).toFixed(2),
        idletime: (totalIdletime / totalMetrics).toFixed(2),
        offtime: (totalOfftime / totalMetrics).toFixed(2),
        badparts: totalBadparts.toFixed(2),
      };
    },
  },
  actions: {
    calculateAverages() {
      // Check if overall metrics is selected
      if (this.selectedMachine !== 'overall') {
        console.warn("calculateAverages should only be called when 'overall' machine is selected.");
        return;
      }

      // Filter metrics based on selected date
      const allMachineMetrics = Object.values(this.machines).flatMap(machine =>
        Object.values(machine.shifts).flatMap(shift => shift)
      );

      const selectedDateMetrics = allMachineMetrics.filter(metric => {
        const metricDate = metric.timestamp.split(' ')[0];
        return metricDate === this.selectedDate;
      });

      if (selectedDateMetrics.length === 0) {
        console.warn(`No data found for selected date '${this.selectedDate}'`);
        this.overallAverageData = {
          quality: 0,
          availability: 0,
          performance: 0,
          oee: 0,
          runtime: 0,
          idletime: 0,
          offtime: 0,
          badparts: 0,
        };
        return;
      }

      const totalMetrics = selectedDateMetrics.length;
      const avgAvailability = selectedDateMetrics.reduce((acc, curr) => acc + curr.availability, 0) / totalMetrics;
      const avgPerformance = selectedDateMetrics.reduce((acc, curr) => acc + curr.performance, 0) / totalMetrics;
      const avgQuality = selectedDateMetrics.reduce((acc, curr) => acc + curr.quality, 0) / totalMetrics;
      const avgOEE = (avgQuality / 100) * (avgAvailability / 100) * (avgPerformance / 100) * 100;

      const totalRuntime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.runtime || 0), 0);
      const totalIdletime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.idletime || 0), 0);
      const totalOfftime = selectedDateMetrics.reduce((acc, curr) => acc + (curr.offtime || 0), 0);
      const totalBadparts = selectedDateMetrics.reduce((acc, curr) => acc + (curr.badparts || 0), 0);

      this.overallAverageData = {
        quality: avgQuality.toFixed(2),
        availability: avgAvailability.toFixed(2),
        performance: avgPerformance.toFixed(2),
        oee: avgOEE.toFixed(2),
        runtime: (totalRuntime / totalMetrics).toFixed(2),
        idletime: (totalIdletime / totalMetrics).toFixed(2),
        offtime: (totalOfftime / totalMetrics).toFixed(2),
        badparts: totalBadparts.toFixed(2),
      };
    },
  },
});