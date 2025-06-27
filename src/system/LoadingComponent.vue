<template>
    <div class="flex flex-col items-center justify-center min-h-[200px] gap-4 p-6 mt-10">
        <!-- PrimeVue ProgressSpinner with Tailwind styling -->
        <ProgressSpinner 
            style="width: 50px; height: 50px" 
            strokeWidth="4" 
            class="text-primary-500"
            animationDuration=".8s"
        />
        
        <!-- Loading text with animation -->
        <div class="text-center">
            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">
                Loading<span class="loading-dots">
                <span>.</span><span>.</span><span>.</span>
                </span>
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Please wait while we process your request
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
</script>

<style scoped>
/* Dot animation */
.loading-dots span {
    opacity: 0;
    animation: blink 1.4s infinite;
}

.loading-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
}
</style>