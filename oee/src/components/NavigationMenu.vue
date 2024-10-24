<template>
  <div class="navigation-container">
    <div class="buttons">
      <router-link to="/oee" exact-active-class="active" class="nav-button">
        <i class="fas fa-home"></i> Home
       
      </router-link>
      <router-link to="/oee/analytics" exact-active-class="active" class="nav-button">
        Analytics
      </router-link>
      <router-link to="/oee/daily" exact-active-class="active" class="nav-button" >
        Daily
      </router-link>
      <router-link to="/oee/weekly" exact-active-class="active" class="nav-button">
        Weekly
      </router-link>
      <router-link to="/oee/monthly" exact-active-class="active" class="nav-button">
        Monthly
      </router-link>
      <router-link to="/oee/download" exact-active-class="active" class="nav-button">
        Download
      </router-link>

         <!-- Add the Back button here -->
         <router-link to="/" exact-active-class="active" class="nav-button">
          <i class="fas fa-arrow-left"></i> Back
        </router-link>
    </div>
    <!-- <transition name="slide-fade" mode="out-in">
      <router-view class="page"></router-view>
    </transition> -->
  </div>
</template>

<script setup>
// No changes needed in script setup for this part
</script>

<style scoped>
.navigation-container {
  display: flex;
  flex-direction: column;
  padding: 50px;
 position: relative;
right: 600px;


}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  
}

.nav-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.page {
  margin-top: 20px;
  width: 100%;
}
/* Adjust position for smaller screens */
@media (max-width: 768px) {
  .navigation-container {
    right: 0; /* Reset the position to prevent hiding on small screens */
    padding: 20px; /* Adjust padding for smaller screens */
    align-items: center; /* Center align content */
  }
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.nav-button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  text-decoration: none;
  color: black;
}

.page {
  margin-top: 20px;
  width: 100%;
}

@media (min-width: 600px) {
  .buttons {
    flex-wrap: nowrap;
  }
}

/* Transition styles */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
