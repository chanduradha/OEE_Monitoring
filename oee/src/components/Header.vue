<template>
  <div class="header flex items-center justify-between px-4 py-2">
    <div>
      <img src="../assets/cmti.png" alt="Logo" class="logo">
    </div>
    <h1 class="text-xl font-bold text-white">Smart Manufacturing Workshop(NIAMT) </h1>
    <div></div> <!-- Placeholder for any additional content -->
  </div>
</template>

<script setup>
// No script needed for this component
</script>

<style scoped>
.header {
  background: linear-gradient(to right,white, #33ccff 0%, #003399 100%);
  color: black;
  width: 100%;
  height: 65px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); 
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 1000;
}

.logo {
  width: 80px;
  height: 60px;
}

h1 {
  color: white;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .logo {
    width: 150px;
    height: 44px; /* Maintain aspect ratio */
  }

  h1 {
    font-size: 1.25rem; /* Adjust font size for smaller screens */
  }
}

/* Media query for very small screens */
@media (max-width: 480px) {
  .logo {
    width: 120px;
    height: 35px; /* Maintain aspect ratio */
  }

  h1 {
    font-size: 1rem; /* Adjust font size for very small screens */
  }
}
</style>
