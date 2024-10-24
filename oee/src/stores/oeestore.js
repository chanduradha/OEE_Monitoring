// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useCncMachineStore = defineStore('cncMachineStore', {
//   state: () => ({
//     machineNames: [],
//     machinesData: [], // Store all machine data
//     selectedMetricsData: {
//       quality: 0,
//       availability: 0,
//       performance: 0,
//       oee: 0
//     },
//     machineImages: { // Define paths to machine images
//       'MazakH_400': require('@/assets/Mazak H-400.png'),
//       'HMT_STALLION_200': require('@/assets/HMT_STALLION-200.png'),
//       'SCHAUBLIN_33': require('@/assets/HMT VTC 800.png'),
//       'HMT_VTC_800': require('@/assets/AMS-VMC.png'),
//       'Macpower_mono_200': require('@/assets/SCHAUBLIN-33.png'),
//       'AMS_VMC': require('@/assets/SCHAUBLIN-33.png'),
//       // Add more as needed for each machine
//     }
//   }),

//   actions: {
//     async fetchCncMachineData() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8005/average_machine_data/');
//         const data = response.data;

//         console.log('Fetched machine data:', data);
//         this.machinesData = data;

//         // Group by machine name
//         const groupedData = data.reduce((acc, item) => {
//           if (!acc[item.machine_name]) {
//             acc[item.machine_name] = [];
//           }
//           acc[item.machine_name].push(item);
//           return acc;
//         }, {});

//         // Calculate average metrics for each machine
//         this.machineNames = Object.keys(groupedData).map(name => {
//           const machineData = groupedData[name];
//           const totalMetrics = machineData.reduce((acc, item) => {
//             acc.quality += item.average_quality;
//             acc.availability += item.average_availability;
//             acc.performance += item.average_performance;
//             acc.oee += item.average_oee;
//             return acc;
//           }, { quality: 0, availability: 0, performance: 0, oee: 0 });

//           const count = machineData.length;
//           return {
//             name,
//             data: machineData,
//             averageMetrics: {
//               quality: totalMetrics.quality / count,
//               availability: totalMetrics.availability / count,
//               performance: totalMetrics.performance / count,
//               oee: totalMetrics.oee / count
//             }
//           };
//         });

//         console.log('Grouped and averaged machine data:', this.machineNames);
//       } catch (error) {
//         console.error('Error fetching CNC machine data:', error);
//       }
//     },

//     async fetchAverageMachineDataByName(machineName) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8005/average_machine_data/${machineName}`);
//         const data = response.data;

//         console.log(`Fetched average data for ${machineName}:`, data);
//         // Handle updating state or use directly as needed in your application

//       } catch (error) {
//         console.error(`Error fetching average data for ${machineName}:`, error);
//       }
//     },

//     setSelectedMetrics(machineName) {
//       try {
//         const selectedMachine = this.machineNames.find(machine => machine.name === machineName);

//         if (selectedMachine) {
//           this.selectedMetricsData = { ...selectedMachine.averageMetrics };
//         }

//         console.log('Updated selectedMetricsData:', this.selectedMetricsData);
//       } catch (error) {
//         console.error(`Error setting selected metrics for machine name ${machineName}:`, error);
//       }
//     },

//     getSelectedMachineImage(machineName) {
//       return this.machineImages[machineName] || null;
//     }
//   }
// });


import { defineStore } from 'pinia';
import axios from 'axios';

export const useCncMachineStore = defineStore('cncMachineStore', {
  state: () => ({
    machineNames: [],
    machinesData: [], // Store all machine data
    selectedMetricsData: {
      quality: 0,
      availability: 0,
      performance: 0,
      oee: 0,
      partCount: 0,
      goodUnits: 0,
      badParts: 0 // Initialize badParts
    },
    machineImages: { // Define paths to machine images
      'MazakH_400': require('@/assets/Mazak H-400.png'),
      'HMT_STALLION_200': require('@/assets/HMT_STALLION-200.png'),
      'SCHAUBLIN_33': require('@/assets/HMT VTC 800.png'),
      'HMT_VTC_800': require('@/assets/AMS-VMC.png'),
      'Macpower_mono_200': require('@/assets/SCHAUBLIN-33.png'),
      'AMS_VMC': require('@/assets/SCHAUBLIN-33.png'),
      'Machine7': require('@/assets/SCHAUBLIN-33.png'),
      'Machine8': require('@/assets/HMT VTC 800.png'),
      // Add more as needed for each machine
    }
  }),

  actions: {
    async fetchCncMachineData() {
      try {
        const response = await axios.get('http://172.18.100.214:8084/average_machine_data/');
        const data = response.data;

        console.log('Fetched machine data:', data);
        this.machinesData = data;

        // Group by machine name
        const groupedData = data.reduce((acc, item) => {
          if (!acc[item.machine_name]) {
            acc[item.machine_name] = [];
          }
          acc[item.machine_name].push(item);
          return acc;
        }, {});

        // Calculate average metrics for each machine
        this.machineNames = Object.keys(groupedData).map(name => {
          const machineData = groupedData[name];
          const totalMetrics = machineData.reduce((acc, item) => {
            acc.goodUnits += item.average_good_units || 0;
            acc.badParts += item.average_bad_parts || 0;
            acc.partCount += item.average_part_count || 0;
            acc.quality += item.average_quality || 0;
            acc.availability += item.average_availability || 0;
            acc.performance += item.average_performance || 0;
            acc.oee += item.average_oee || 0;
            return acc;
          }, { goodUnits: 0, badParts: 0, partCount: 0, quality: 0, availability: 0, performance: 0, oee: 0 });

          const count = machineData.length;
          return {
            name,
            data: machineData,
            averageMetrics: {
              goodUnits: totalMetrics.goodUnits / count,
              badParts: totalMetrics.badParts / count,
              partCount: totalMetrics.partCount / count,
              quality: totalMetrics.quality / count,
              availability: totalMetrics.availability / count,
              performance: totalMetrics.performance / count,
              oee: totalMetrics.oee / count
            }
          };
        });

        console.log('Grouped and averaged machine data:', this.machineNames);
      } catch (error) {
        console.error('Error fetching CNC machine data:', error);
      }
    },

    async fetchAverageMachineDataByName(machineName) {
      try {
        const response = await axios.get(`http://172.18.100.214:8084/average_machine_data/${machineName}`);
        const data = response.data;

        console.log(`Fetched average data for ${machineName}:`, data);

        // Process data and calculate averages
        if (Array.isArray(data) && data.length > 0) {
          const totalMetrics = data.reduce((acc, item) => {
            acc.goodUnits += item.average_good_units || 0;
            acc.badParts += item.average_bad_parts || 0;
            acc.partCount += item.average_part_count || 0;
            return acc;
          }, { goodUnits: 0, badParts: 0, partCount: 0 });

          const count = data.length;
          const averageMetrics = {
            goodUnits: totalMetrics.goodUnits / count,
            badParts: totalMetrics.badParts / count,
            partCount: totalMetrics.partCount / count
          };

          // Update the store's state with the average metrics
          this.selectedMetricsData = { 
            ...this.selectedMetricsData,
            goodUnits: averageMetrics.goodUnits,
            badParts: averageMetrics.badParts,
            partCount: averageMetrics.partCount
          };

          console.log('Updated selectedMetricsData with averages:', this.selectedMetricsData);
        } else {
          console.warn(`No data found for ${machineName}`);
        }
      } catch (error) {
        console.error(`Error fetching average data for ${machineName}:`, error);
      }
    },

    async fetchCncMachineDataByName(machineName) {
      try {
        const response = await axios.get(`http://172.18.100.214:8084/cnc_machine_data/name/${machineName}`);
        const data = response.data;

        console.log(`Fetched data for ${machineName}:`, data);
        return data; // Return data for use in line graph

      } catch (error) {
        console.error(`Error fetching data for ${machineName}:`, error);
        throw error;
      }
    },

    setSelectedMetrics(machineName) {
      try {
        const selectedMachine = this.machineNames.find(machine => machine.name === machineName);

        if (selectedMachine) {
          this.selectedMetricsData = { 
            quality: selectedMachine.averageMetrics.quality || 0,
            availability: selectedMachine.averageMetrics.availability || 0,
            performance: selectedMachine.averageMetrics.performance || 0,
            oee: selectedMachine.averageMetrics.oee || 0,
            partCount: selectedMachine.averageMetrics.partCount || 0,
            goodUnits: selectedMachine.averageMetrics.goodUnits || 0,
            badParts: selectedMachine.averageMetrics.badParts || 0
          };
        } else {
          this.selectedMetricsData = {
            quality: 0,
            availability: 0,
            performance: 0,
            oee: 0,
            partCount: 0,
            goodUnits: 0,
            badParts: 0
          };
        }

        console.log('Updated selectedMetricsData:', this.selectedMetricsData);
      } catch (error) {
        console.error(`Error setting selected metrics for machine name ${machineName}:`, error);
      }
    },

    getSelectedMachineImage(machineName) {
      return this.machineImages[machineName] || null;
    }
  }
});
