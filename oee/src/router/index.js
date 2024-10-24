// import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../views/HomePage.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'HomePage',
//     component: HomePage
//   },
//   {
//     path: '/oee',
//     name: 'OEE',
//     component: () => window.location.href = 'http://172.18.100.214:8082/' // Handle external link
//   },
//   {
//     path: '/maintenance',
//     name: 'Maintenance',
//     component: () => window.location.href = 'http://localhost:8080/tiei_dynamic/#/' // Handle external link
//   },
//   {
//     path: '/energy-monitoring',
//     name: 'EnergyMonitoring',
//     component: () => window.location.href = 'https://example.com/energy-monitoring' // Handle external link
//   },
//   {
//     path: '/cbm',
//     name: 'CBM',
//     component: () => window.location.href = 'https://example.com/cbm' // Handle external link
//   },
//   {
//     path: '/iot',
//     name: 'IoT',
//     component: () => window.location.href = 'https://example.com/iot' // Handle external link
//   },
//   {
//     path: '/quality',
//     name: 'Quality',
//     component: () => window.location.href = 'https://example.com/quality' // Handle external link
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;



// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import AnalyticsPage from '../components/AnalyticsPage.vue';
import DailyPage from '../components/DailyPage.vue';
import WeeklyPage from '../components/WeeklyPage.vue';
import DownloadPage from '../components/DownloadPage.vue';
import MonthlyPage from '../components/MonthlyPage.vue';
import HomePage from '../views/HomePage.vue';
import HomePage1 from '../views/HomePage1.vue'; // Import HomePage1 as the parent layout


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/oee',
    component: HomePage1,
    children: [
      {
        path: '',
        name: 'Home',
        component: MainPage
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: AnalyticsPage
      },
      {
        path: 'daily',
        name: 'Daily',
        component: DailyPage
      },
      {
        path: 'weekly',
        name: 'Weekly',
        component: WeeklyPage,
    
      },
      {
        path: 'monthly',
        name: 'Monthly',
        component: MonthlyPage // Add MonthlyPage route
      },
      {
        path: 'download',
        name: 'Download',
        component: DownloadPage
      },
      {
        path: 'back',
        name: 'Back',
        component: HomePage // New "Back" route
      }
    ]
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => window.location.href = 'http://localhost:8080/tiei_dynamic/#/'
  },
  {
    path: '/energy-monitoring',
    name: 'EnergyMonitoring',
    component: () => window.location.href = 'http://172.18.7.24:3000/home'
  },
  {
    path: '/cbm',
    name: 'CBM',
    component: () => window.location.href = 'https://example.com/cbm'
  },
  {
    path: '/iot',
    name: 'IoT',
    component: () => window.location.href = 'https://example.com/iot'
  },
  {
    path: '/quality',
    name: 'Quality',
    component: () => window.location.href = 'https://example.com/quality'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
