<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100 p-6">
        <div class="text-center max-w-lg w-full space-y-6">
            <p class="text-8xl font-bold text-blue-500 animate-bounce">404</p>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Page Not Found</h1>
            <p class="text-gray-600 text-lg">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>

        <Button 
            label="Back to Home" 
            icon="pi pi-home" 
            @click="goHome" 
            class="p-button-rounded p-button-lg bg-blue-500 hover:bg-blue-600 border-none text-white"
        />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
</style>
