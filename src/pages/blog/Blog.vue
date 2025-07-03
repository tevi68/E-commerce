<template>
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-6">
        <div class="text-center space-y-6 max-w-xl">
            <h1 class="text-5xl md:text-6xl font-extrabold text-blue-600 animate-pulse">
                Coming Soon 🚧
            </h1>
            <p class="text-lg text-gray-600">
                We're working hard to bring you something amazing. Stay tuned!
            </p>

            <div class="flex justify-center gap-4 text-center">
                <div class="bg-white shadow-lg rounded-xl p-4 w-20 h-20 flex flex-col items-center justify-center">
                    <span class="text-2xl font-semibold text-blue-500">10</span>
                    <span class="text-xs text-gray-500">Days</span>
                </div>
                <div class="bg-white shadow-lg rounded-xl p-4 w-20 h-20 flex flex-col items-center justify-center">
                    <span class="text-2xl font-semibold text-blue-500">6</span>
                    <span class="text-xs text-gray-500">Hours</span>
                </div>
                <div class="bg-white shadow-lg rounded-xl p-4 w-20 h-20 flex flex-col items-center justify-center">
                    <span class="text-2xl font-semibold text-blue-500">00</span>
                    <span class="text-xs text-gray-500">Minutes</span>
                </div>
                <div class="bg-white shadow-lg rounded-xl p-4 w-20 h-20 flex flex-col items-center justify-center">
                    <span class="text-2xl font-semibold text-blue-500">00</span>
                    <span class="text-xs text-gray-500">Seconds</span>
                </div>
            </div>

            <Button 
                label="Back to Home" 
                icon="pi pi-home" 
                @click="goHome"
                class="p-button-rounded p-button-lg bg-blue-500 hover:bg-blue-600 border-none text-white mt-4"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const goHome = () => {
    router.push('/')
}
</script>
