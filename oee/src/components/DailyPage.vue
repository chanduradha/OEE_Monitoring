<!-- <template>
    <div class="daily">
      <h1>Welcome to Daily Page</h1>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .daily {
    padding: 20px;
    text-align: center;
  }
  </style> -->
  

  <template>
    <div class="charts-and-image-container">
      <h1 id="tittle"><strong>Live Data Analysis</strong></h1>
      <div class="charts-row">
        <!-- OEE Gauge Chart -->
        <div class="chart-container">
          <div class="chart-label">OEE</div>
          <div id="oeeChartRef" class="chart"></div>
        </div>
  
        <!-- Performance Gauge Chart -->
        <div class="chart-container">
          <div class="chart-label">Performance</div>
          <div id="performanceChartRef" class="chart"></div>
        </div>
  
        <!-- Quality Gauge Chart -->
        <div class="chart-container">
          <div class="chart-label">Quality</div>
          <div id="qualityChartRef" class="chart"></div>
        </div>
  
        <!-- Availability Gauge Chart -->
        <div class="chart-container">
          <div class="chart-label">Availability</div>
          <div id="availabilityChartRef" class="chart"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  let oeeChart, performanceChart, qualityChart, availabilityChart;
  
  // Function to create gauge charts with random data updating every 3 seconds
 // Function to create gauge charts with random data updating every 3 seconds
const createGaugeChart = (chart, value, name, color) => {
  chart.setOption({
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        center: ['50%', '60%'],
        pointer: {
          show: true,
          length: '80%',
          width: 6,
        },
        progress: {
          show: true,
          width: 14,
        },
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [value / 100, color],
              [1, '#E0E0E0'],
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false, // Hide axis labels for a cleaner look
        },
        title: {
          show: true,
          offsetCenter: [0, '70%'], // Adjusted title position
          fontSize: 12,
          color: '#333', // Color for better readability
        },
        detail: {
          valueAnimation: true,
          fontSize: 24, // Increased font size for better readability
          offsetCenter: [0, '30%'], // Adjusted position to center better
          formatter: '{value}%',
          color: '#333', // Color for better readability
        },
        data: [
          {
            value: value,
            name: name,
          },
        ],
      },
    ],
  });
};

  // Function to update the gauge chart value with new random data
  const updateGaugeChart = (chart, name, color) => {
    const randomValue = Math.floor(Math.random() * 101); // Random value between 0 and 100
    createGaugeChart(chart, randomValue, name, color);
  };
  
  onMounted(() => {
    const oeeChartRef = document.getElementById('oeeChartRef');
    const performanceChartRef = document.getElementById('performanceChartRef');
    const qualityChartRef = document.getElementById('qualityChartRef');
    const availabilityChartRef = document.getElementById('availabilityChartRef');
  
    // Initialize charts
    oeeChart = echarts.init(oeeChartRef);
    performanceChart = echarts.init(performanceChartRef);
    qualityChart = echarts.init(qualityChartRef);
    availabilityChart = echarts.init(availabilityChartRef);
  
    // Initial rendering with random values
    updateGaugeChart(oeeChart, 'OEE', '#4CAF50');
    updateGaugeChart(performanceChart, 'Performance', '#2196F3');
    updateGaugeChart(qualityChart, 'Quality', '#2196F3');
    updateGaugeChart(availabilityChart, 'Availability', '#2196F3');
  
    // Update charts with random data every 3 seconds
    setInterval(() => {
      updateGaugeChart(oeeChart, 'OEE', '#4CAF50');
      updateGaugeChart(performanceChart, 'Performance', '#2196F3');
      updateGaugeChart(qualityChart, 'Quality', '#2196F3');
      updateGaugeChart(availabilityChart, 'Availability', '#2196F3');
    }, 6000);
  });
  </script>
  
  <style scoped>
  .charts-and-image-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns charts to the left */
    justify-content: center;
    padding: 20px;
  }
  
  .charts-row {
    display: flex;
    gap: 20px;
  }
  
  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px; /* Increased width for better readability */
    height: 250px; /* Increased height for better readability */
  }
  
  .chart-label {
    margin-bottom: 8px;
    font-weight: bold;
    text-align: center;
  }
  
  .chart {
    width: 100%;
    height: 100%;
  }
  #tittle{
    position: relative;
    font-size: 35px;
    left: 200px;
    bottom: 35px;
  }
  </style>
  