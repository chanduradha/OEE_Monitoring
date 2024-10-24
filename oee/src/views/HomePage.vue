<template>
  <div class="home min-h-screen flex">
    <div class="sidebar w-1/4 p-4">
      <Header />
      <VerticalNavbar />
    </div>
    <div class="content flex-1">
      <!-- Main content goes here -->
  
    </div>
  </div>
</template>

<script setup>
import VerticalNavbar from '../components/VerticalNavbar.vue'; // Adjust the path based on your project structure
import Header from '../components/Header.vue'; 
</script>

<style scoped>
.home {
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.sidebar {
  background-color: white; /* Add background color for visibility */
}

.content {
  background-color: white; /* Add background color for visibility */
}

/* Media query for smaller screens */
@media (max-width: 1024px) {
  .sidebar {
    width: 30%;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 40%;
  }
}

@media (max-width: 480px) {
  .home {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    order: 2;
  }
  .content {
    width: 100%;
    order: 1;
  }
}
</style>
