<template>
    <header class="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div class="max-w-screen-xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
            <!-- Left Section: Logo and Mobile Menu -->
            <div class="flex items-center gap-4">
                <!-- Mobile Menu Button -->
                <button
                    @click="toggleSidebar"
                    class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <i class="pi pi-bars text-xl text-gray-700 dark:text-gray-200"></i>
                </button>

                <!-- Logo -->
                <router-link to="/dashboard" class="flex items-center gap-2 group transition-all">
                    <div class="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                        <i class="pi pi-shopping-bag text-white text-base"></i>
                    </div>
                    <span class="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block tracking-tight whitespace-nowrap">
                        Ecom Dashboard
                    </span>
                </router-link>
            </div>

            <!-- Desktop Search (hidden on mobile) -->
            <div class="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
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
            <div class="flex items-center gap-2">
                <!-- Mobile Search Button -->
                <button
                    @click="openSearchModal"
                    class="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
                    aria-label="Search"
                >
                    <i class="pi pi-search text-gray-600 dark:text-gray-300 text-lg"></i>
                </button>

                <button
                    class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
                    aria-label="Notifications"
                >
                    <i class="pi pi-bell text-gray-600 dark:text-gray-300 text-lg"></i>
                </button>

                <ThemeToggle />
                <UserMenu />
            </div>
        </div>

        <!-- Mobile Search Modal -->
        <Teleport to="body">
            <div v-if="showSearchModal" class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
                @click.self="closeSearchModal"
            >
                <div class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 relative animate-fade-in"
                        @keydown.esc="closeSearchModal"
                >
                    <button 
                        @click="closeSearchModal"
                        class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        aria-label="Close search"
                    >
                        <i class="pi pi-times text-gray-500 dark:text-gray-400"></i>
                    </button>
                
                    <div class="relative w-full">
                        <input
                            ref="searchInput"
                            type="text"
                            placeholder="Search..."
                            class="w-full pl-10 pr-4 py-3 text-base bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-transparent rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-600 transition"
                        />
                        <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
                    </div>
                </div>
            </div>
        </Teleport>
    </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../../store/dashboardStore'
import ThemeToggle from '../../components/common/ThemeToggle.vue'
import UserMenu from '../../components/common/UserMenu.vue'

const dashboardStore = useDashboardStore()
const router = useRouter()
const showSearchModal = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

const toggleSidebar = () => {
  dashboardStore.toggleSidebar()
}

const openSearchModal = () => {
  showSearchModal.value = true
  document.body.style.overflow = 'hidden'
  setTimeout(() => searchInput.value?.focus(), 50)
}

const closeSearchModal = () => {
  showSearchModal.value = false
  document.body.style.overflow = 'auto'
}

// Close modal on route change
router.afterEach(closeSearchModal)

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showSearchModal.value) {
    closeSearchModal()
  }
}

watch(showSearchModal, (isOpen) => {
  if (isOpen) {
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>