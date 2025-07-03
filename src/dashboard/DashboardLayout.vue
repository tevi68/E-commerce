<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <DashboardHeader />
        <div class="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
            <DashboardSidebar />
        
            <main class="w-full p-4">
                <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6">
                    <router-view v-slot="{ Component }">
                        <transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import DashboardHeader from './components/DashboardHeader.vue'
import DashboardSidebar from './components/DashboardSidebar.vue'
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>