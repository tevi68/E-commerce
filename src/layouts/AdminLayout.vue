<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <Navbar />
    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      <slot /> <!-- Content from router-view -->
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>
