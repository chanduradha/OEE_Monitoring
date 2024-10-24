<template>
  <div class="metrics-page">
    <div class="button-container">
  <!-- Input box for entering machine name and IP address -->
  <div class="machine-input">
        <label for="machineName" style="position: relative;left:100px;width:120px;">Machine Name</label>
    <input 
      type="text" 
      v-model="machineName" 
      placeholder="Enter machine name"
    />


    <input 
      type="text" 
      v-model="machineIp" 
      placeholder="Enter machine IP address"
    />
    <!-- <label for="machineIp">Machine IP</label> -->

    <!-- Add Machine Button to save the machine name and IP address -->
    <button @click="saveMachine">Add Machine</button>
  </div>
      <!-- Dropdown for selecting machine metrics -->
      <div class="dropdown-container">
        <label for="metricsSelect">Select Machine</label>
        <select id="metricsSelect" v-model="selectedMachine" @change="updateSelectedMetrics">
          <option value="">Overall machines data</option>
          <option v-for="machine in machines" :key="machine.name" :value="machine.name">{{ machine.name }}</option>
        </select>
      </div>
    </div>
 <!-- Metrics Display -->
 <div v-if="selectedMachineMetrics" class="metrics-display">
  <div class="metrics-box good-parts">
    <strong>Good Parts:</strong> {{ selectedMachineMetrics.goodParts.toFixed(2) }}
  </div>
  <div class="metrics-box bad-parts">
    <strong>Bad Parts:</strong> {{ selectedMachineMetrics.badParts.toFixed(2) }}
  </div>
  <div class="metrics-box part-count">
    <strong>Part Count:</strong> {{ selectedMachineMetrics.partCount.toFixed(2) }}
  </div>
<!-- to add another three boxe to show runtime,idletime,offtime -->

  <!-- <div class="metrics-box good-parts">
    <strong>Good Parts:</strong> {{ selectedMachineMetrics.goodParts.toFixed(2) }}
  </div>
  <div class="metrics-box bad-parts">
    <strong>Bad Parts:</strong> {{ selectedMachineMetrics.badParts.toFixed(2) }}
  </div>
  <div class="metrics-box part-count">
    <strong>Part Count:</strong> {{ selectedMachineMetrics.partCount.toFixed(2) }}
  </div> -->



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

         <!-- Line Chart container -->
         <div class="chart-container ">
        <div class="chart-label" >Metrics Over Time</div>
        <div id="lineChartRef" class="chart"></div>
      </div>

      </div>

   
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch,computed  } from 'vue';
import { useCncMachineStore } from '@/stores/oeestore';
import * as echarts from 'echarts';
import { useMachineStore } from '@/stores/machinestore';



const machineName = ref('');
const machineIp = ref('');
const machineStore = useMachineStore();

const saveMachine = () => {
  if (machineName.value.trim() !== '' && machineIp.value.trim() !== '') {
    const newMachine = {
      id: Date.now(),
      name: machineName.value,
      ipAddress: machineIp.value,
    };
    
    machineStore.addMachine(newMachine); // Call the store action to add the machine

    // Log the newly added machine
    console.log('Newly added machine:', newMachine);

    machineName.value = '';
    machineIp.value = ''; // Clear the IP address field
  }
};
const cncMachineStore = useCncMachineStore();

const selectedMachine = ref('');
const machines = ref([]);
const selectedMachineMetrics = ref({
  goodParts: 0,
  badParts: 0,
  partCount: 0
});


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

  console.log('Metrics data for charts:', { quality, availability, performance, oee });

  const qualityChart = echarts.init(document.getElementById('qualityChartRef'));
  const availabilityChart = echarts.init(document.getElementById('availabilityChartRef'));
  const performanceChart = echarts.init(document.getElementById('performanceChartRef'));
  const oeeChart = echarts.init(document.getElementById('oeeChartRef'));

  const updateChart = (chart, data, name, color) => {
    const percentage = (data * 100).toFixed(2);

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
          { value: 100 - percentage, itemStyle: { color: '#FF0000' } }
        ],
        label: {
          show: true,
          position: 'inside',
          fontSize: 16,
          fontWeight: 'bold',
          formatter: function (params) {
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
        formatter: `{b}: {c}%`,
      }
    });
  };

  updateChart(qualityChart, quality, 'Quality', '#2196F3');
  updateChart(availabilityChart, availability, 'Availability', '#2196F3');
  updateChart(performanceChart, performance, 'Performance', '#2196F3');
  updateChart(oeeChart, oee, 'OEE', '#4CAF50');

  console.log('Charts updated with:', { quality: quality * 100, availability: availability * 100, performance: performance * 100, oee: oee * 100 });
};

const updateLineChartData = async (machineName) => {
  try {
    const data = await cncMachineStore.fetchCncMachineDataByName(machineName);
    const lineChart = echarts.init(document.getElementById('lineChartRef'));

    const option = {
      color: ['#5470C6', '#91CC75', '#EE6666', '#EEA236'],
      xAxis: { type: 'category', data: data.map(item => item.timestamp) },
      yAxis: { type: 'value' },
      series: [
        { name: 'Quality', type: 'line', data: data.map(item => item.quality) },
        { name: 'Availability', type: 'line', data: data.map(item => item.availability) },
        { name: 'Performance', type: 'line', data: data.map(item => item.performance) },
        { name: 'OEE', type: 'line', data: data.map(item => item.oee) },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: function (params) {
          const tooltipContent = params.map(param => {
            let seriesData = '';
            if (param.seriesName === 'Quality') {
              seriesData = `Quality: ${param.value.toFixed(2)}`;
            } else if (param.seriesName === 'Availability') {
              seriesData = `Availability: ${param.value.toFixed(2)}`;
            } else if (param.seriesName === 'Performance') {
              seriesData = `Performance: ${param.value.toFixed(2)}`;
            } else if (param.seriesName === 'OEE') {
              seriesData = `OEE: ${param.value.toFixed(2)}`;
            }
            return seriesData;
          }).join('<br>');
          
          return `${params[0].name}<br>${tooltipContent}`;
        }
      },
      legend: {
        data: ['Quality', 'Availability', 'Performance', 'OEE'],
        textStyle: {
          color: '#333'
        }
      }
    };

    lineChart.setOption(option);

    console.log('Line chart updated with data:', data);
  } catch (error) {
    console.error('Error updating line chart data:', error);
  }
};

const updateSelectedMetrics = async () => {
  try {
    cncMachineStore.setSelectedMetrics(selectedMachine.value);
    updateCharts();
    if (selectedMachine.value) {
      await updateLineChartData(selectedMachine.value);
      const selectedMachineData = cncMachineStore.machineNames.find(machine => machine.name === selectedMachine.value);
      if (selectedMachineData) {
        selectedMachineMetrics.value = {
          goodParts: selectedMachineData.averageMetrics.goodUnits,
          badParts: selectedMachineData.averageMetrics.badParts,
          partCount: selectedMachineData.averageMetrics.partCount
        };
        console.log('Selected machine metrics updated:', selectedMachineMetrics.value);
      }
    } else {
      selectedMachineMetrics.value = {
        goodParts: cncMachineStore.getOverallMetrics().goodUnits,
        badParts: cncMachineStore.getOverallMetrics().badParts,
        partCount: cncMachineStore.getOverallMetrics().partCount
      };
      console.log('Overall metrics updated:', selectedMachineMetrics.value);
    }
  } catch (error) {
    console.error('Error updating selected metrics:', error);
  }
};

onMounted(fetchMachines);

watch(selectedMachine, updateSelectedMetrics);

const selectedMachineImage = computed(() => {
  return cncMachineStore.getSelectedMachineImage(selectedMachine.value);
});



</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  left: 480px;
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
  width: 250%;
}

.chart-container {
  flex: 1 1 calc(25% - 20px);
  height: 300px;
  margin: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  min-width: 300px; /* Ensure a minimum width for each chart */
  position: relative; /* Make the image container position relative */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  bottom: 33px;
  right: 100px;
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
  top: 150px; /* Adjust top position as needed */
  left: 40%; /* Adjust left position as needed */
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
  position: relative;

}


.metrics-display {

  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-around;
  width: 600px;
  position: relative;
  bottom: 80px;
  right:80px;
}

.metrics-box {
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-weight: bold; 
}

.good-parts {
  background-color: #1c7e1f; /* Green */
}

.bad-parts {
  background-color: #f55a54; /* Red */
}

.part-count {
  background-color: #2196F3; /* Blue */
}

.dropdown-container {
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  right: 350px; /* Adjusted to be centered based on the window size */
  width: 100%; /* Ensures full width on smaller screens */
  max-width: 400px; /* Limits maximum width */
  margin-left: auto; /* Aligns to the right on larger screens */
  margin-right: auto; /* Aligns to the left on larger screens */
  bottom: 70px;
}

#metricsSelect {
  width: 50%;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}


.machine-input {
  display: flex;
  align-items: center;
  margin-left: 10px; /* Adjust margin for spacing */
}

.machine-input input {
  margin-right: 10px; /* Adjust margin for spacing */
  padding: 5px;
  width: 200px;
  border: solid 1px ;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
  position: relative;
  left: 100px;
}

.machine-input button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  position: relative;
  left: 100px;
}

.metrics-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  min-width: 1700px; /* this is where the entire page width is Set to  minimum width */
  padding: 10px;

  height: 820px;
  position: relative;
  right: 50px;
  bottom:20px;
}
@media screen and (max-width: 768px) {
  .charts-row {
    flex-direction: column;
    align-items: center;
  }
  
  .chart-container, .image-container {
    flex: 1 1 calc(50% - 20px);
  }
}
.linechart-container {
  flex: 1 1 calc(100% - 20px); /* Full width on smaller screens */
}


@media screen and (max-width: 480px) {
  .chart-container, .image-container .linechart-container{
    flex: 1 1 100%;
  }
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
