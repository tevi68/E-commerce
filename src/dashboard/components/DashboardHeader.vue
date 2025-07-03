<template>
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
            <!-- Mobile Menu Button -->
            <button
                @click="toggleSidebar"
                class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <i class="pi pi-bars text-xl text-gray-700 dark:text-gray-200"></i>
            </button>

            <!-- Logo -->
            <router-link to="/dashboard" class="flex items-center space-x-3 group">
                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <i class="pi pi-shopping-bag text-white text-lg"></i>
                </div>
                <span
                class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block tracking-tight"
                >
                Ecom Dashboard
                </span>
            </router-link>

            <!-- Search -->
            <div class="hidden md:flex flex-1 max-w-md mx-6">
                <div class="relative w-full">
                <input
                    type="text"
                    placeholder="Search..."
                    class="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-transparent rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-700 transition"
                />
                <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm"></i>
                </div>
            </div>

            <!-- Right Controls -->
            <div class="flex items-center space-x-3">
                <button
                class="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
                aria-label="Notifications"
                >
                <i class="pi pi-bell text-gray-600 dark:text-gray-300 text-lg"></i>
                </button>

                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useDashboardStore } from '../../store/dashboardStore'
import ThemeToggle from '../../components/common/ThemeToggle.vue'
import UserMenu from '../../components/common/UserMenu.vue'

const dashboardStore = useDashboardStore()

const toggleSidebar = () => {
    dashboardStore.toggleSidebar()
}
</script>
