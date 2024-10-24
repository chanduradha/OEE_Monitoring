<template>
  <div class="navbar" :class="{ 'navbar-mobile': isMobile }">
    <router-link to="/oee" class="nav-item">OEE</router-link>
    <router-link to="/maintenance" class="nav-item">Maintenance</router-link>
    <router-link to="/energy-monitoring" class="nav-item">Energy Monitoring</router-link>
    <router-link to="/cbm" class="nav-item">CBM</router-link>
    <router-link to="/iot" class="nav-item">IoT</router-link>
    <router-link to="/quality" class="nav-item">Quality</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.navbar {
  background: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);/* Black color with 70% opacity */
  color: black;
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  max-width: 250px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
  transition: transform 0.3s ease-in-out;
  overflow-y: auto; /* Add vertical scroll if content overflows */
}

.nav-item {
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar {
    max-width: 200px;
  }

  .nav-item {
    padding: 10px 14px;
  }
}

@media (max-width: 480px) {
  .navbar {
    max-width: 150px;
  }

  .nav-item {
    padding: 8px 12px;
  }
}
</style>
