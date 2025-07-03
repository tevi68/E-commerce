<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="container mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
        <!-- Hamburger for mobile -->
        <button @click="sidebarVisible = !sidebarVisible" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2">
          <i class="pi pi-bars text-gray-600 dark:text-gray-300"></i>
        </button>
        <!-- Logo & Title -->
        <router-link to="/" class="flex items-center space-x-3">
          <div class="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <i class="pi pi-shopping-bag text-white text-lg"></i>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            Ecom Admin
          </span>
        </router-link>
        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-md mx-6">
          <div class="relative w-full">
            <input v-model="searchQuery" type="text" placeholder="Search orders, products..." class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300">
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
          </div>
        </div>
        <!-- User Controls -->
        <div class="flex items-center space-x-3">
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <i class="pi pi-bell text-gray-600 dark:text-gray-300"></i>
          </button>
          <!-- Theme Toggle Button -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <i v-if="isDark" class="pi pi-sun text-yellow-400"></i>
            <i v-else class="pi pi-moon text-gray-600 dark:text-gray-300"></i>
          </button>
          <div class="relative">
            <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                AD
              </div>
              <span class="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
              <i class="pi pi-chevron-down text-xs text-gray-500 dark:text-gray-400"></i>
            </button>
            <transition name="fade">
              <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700">
                <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <i class="pi pi-user mr-2"></i> Profile
                </router-link>
                <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <i class="pi pi-cog mr-2"></i> Settings
                </router-link>
                <button @click="logout" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors">
                  <i class="pi pi-sign-out mr-2"></i> Sign out
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- Mobile Search -->
      <div class="md:hidden px-4 mt-3">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300">
          <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
        </div>
      </div>
    </header>

    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      <!-- Sidebar -->
      <transition name="fade">
        <aside v-show="sidebarVisible || isDesktop" class="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out h-full flex flex-col" :class="sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">
          <div class="flex-1 overflow-y-auto py-6 px-4">
            <nav class="space-y-1">
              <router-link v-for="item in menuItems" :key="item.name" :to="item.path" class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300" :class="item.active ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'">
                <i :class="item.icon" class="mr-3 text-lg"></i>
                {{ item.name }}
                <span v-if="item.badge" class="ml-auto bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-400 text-xs font-medium px-2 py-0.5 rounded-full">{{ item.badge }}</span>
              </router-link>
            </nav>
            <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
              <div class="space-y-1">
                <button v-for="action in quickActions" :key="action.name" @click="action.handler" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300">
                  <i :class="action.icon" class="mr-3 text-lg"></i>
                  {{ action.name }}
                </button>
              </div>
            </div>
          </div>
        </aside>
      </transition>
      <!-- Overlay for mobile sidebar -->
      <div v-if="sidebarVisible && !isDesktop" @click="sidebarVisible = false" class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"></div>
      <!-- Main Content -->
      <main class="flex-1 w-full lg:ml-64 p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// UI State
const sidebarVisible = ref(false)
const showUserMenu = ref(false)
const searchQuery = ref('')
const isDesktop = ref(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true)

// Theme State
const isDark = ref(false)

// Data
const menuItems = ref([
  { name: 'Dashboard', icon: 'pi pi-home', path: '/', active: true },
  { name: 'Orders', icon: 'pi pi-list', path: '/orders', badge: '8' },
  { name: 'Products', icon: 'pi pi-box', path: '/products', badge: '12' },
  { name: 'Customers', icon: 'pi pi-users', path: '/customers' },
  { name: 'Analytics', icon: 'pi pi-chart-bar', path: '/analytics' },
  { name: 'Messages', icon: 'pi pi-envelope', path: '/messages', badge: '2' },
  { name: 'Settings', icon: 'pi pi-cog', path: '/settings' }
])

const quickActions = ref([
  { name: 'Add Product', icon: 'pi pi-plus-circle', handler: () => alert('Add Product') },
  { name: 'Create Discount', icon: 'pi pi-percentage', handler: () => alert('Create Discount') },
  { name: 'View Reports', icon: 'pi pi-file', handler: () => alert('View Reports') }
])

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}
const logout = () => {
  router.push('/login')
}

function setHtmlDarkClass(dark: boolean) {
  if (typeof window === 'undefined') return
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  setHtmlDarkClass(isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  // Responsive sidebar
  function handleResize() {
    isDesktop.value = window.innerWidth >= 1024
    if (isDesktop.value) {
      sidebarVisible.value = false
    }
  }
  window.addEventListener('resize', handleResize)
  handleResize()

  // Theme: load from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  setHtmlDarkClass(isDark.value)
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {}) // No-op, but required for cleanup
})
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
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>