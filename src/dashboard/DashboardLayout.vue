<template>
    <div class="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <DashboardHeader />

        <div class="flex flex-1 overflow-hidden">
            <DashboardSidebar />

            <main class="flex-1 overflow-hidden">
                <div class="h-full overflow-y-auto p-4 lg:p-6">
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