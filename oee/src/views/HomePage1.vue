<template>
    <div class="home min-h-screen flex">
      <div class="sidebar w-1/4 p-4">
        <AppHeader />
      </div>
  
      <div class="content flex-1 p-4">
        <NavigationMenu />
        <router-view class="page"></router-view>
      </div>
    </div>
  </template>
  
  <script setup>
  import AppHeader from '../components/AppHeader.vue';
  import NavigationMenu from '../components/NavigationMenu.vue';
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
    width: 25%;
  }
  
  .content {
    flex: 1;
    padding: 20px;
  }
  
  .page {
    margin-top: 0px;
    width: 100%;
  }
  
  @media (max-width: 1024px) {
    .home {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    .home {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
    }
  }
  
  @media (max-width: 480px) {
    .home {
      flex-direction: column;
    }
    .sidebar {
      width: 100%;
    }
  }
  </style>
  