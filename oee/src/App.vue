<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
  </template>
  
  <script setup>
  </script>
  
  <style>
  /* No need to import Tailwind CSS here, it's already imported via PostCSS */
  </style>
  