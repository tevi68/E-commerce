<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Header -->
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="container mx-auto px-4 lg:px-6 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo and Mobile Menu -->
          <div class="flex items-center space-x-4">
            <button @click="sidebarVisible = !sidebarVisible" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <i class="pi pi-bars text-gray-600 dark:text-gray-300"></i>
            </button>
            <router-link to="/" class="flex items-center space-x-3">
              <div class="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-chart-line text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                AnalyticsPro
              </span>
            </router-link>
          </div>

          <!-- Search Bar -->
          <div class="hidden md:flex mx-4 flex-1 max-w-xl">
            <div class="relative w-full">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search..." 
                class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
              >
              <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
            </div>
          </div>

          <!-- User Controls -->
          <div class="flex items-center space-x-3">
            <button class="p-2 rounded-full relative hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <i class="pi pi-bell text-gray-600 dark:text-gray-300"></i>
              <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <i class="pi pi-envelope text-gray-600 dark:text-gray-300"></i>
            </button>

            <div class="relative">
              <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <span class="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
                <i class="pi pi-chevron-down text-xs text-gray-500 dark:text-gray-400"></i>
              </button>
              
              <transition name="fade">
                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700">
                  <router-link 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <i class="pi pi-user mr-2"></i> Profile
                  </router-link>
                  <router-link 
                    to="/settings" 
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <i class="pi pi-cog mr-2"></i> Settings
                  </router-link>
                  <button 
                    @click="logout"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <i class="pi pi-sign-out mr-2"></i> Sign out
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- Mobile Search -->
        <div class="md:hidden mt-3">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search..." 
              class="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
            >
            <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 lg:px-6 py-6 flex">
      <!-- Sidebar -->
      <aside 
        class="fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out"
        :class="sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      >
        <div class="h-full overflow-y-auto py-6 px-4">
          <nav class="space-y-1">
            <router-link 
              v-for="item in menuItems" 
              :key="item.name"
              :to="item.path"
              class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-300"
              :class="item.active ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
            >
              <i :class="item.icon" class="mr-3 text-lg"></i>
              {{ item.name }}
              <span v-if="item.badge" class="ml-auto bg-blue-100 dark:bg-gray-700 text-blue-800 dark:text-blue-400 text-xs font-medium px-2 py-0.5 rounded-full">
                {{ item.badge }}
              </span>
            </router-link>
          </nav>

          <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 class="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div class="space-y-1">
              <button 
                v-for="action in quickActions"
                :key="action.name"
                @click="action.handler"
                class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <i :class="action.icon" class="mr-3 text-lg"></i>
                {{ action.name }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay for mobile sidebar -->
      <div 
        v-if="sidebarVisible"
        @click="sidebarVisible = false"
        class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
      ></div>

      <!-- Main Content -->
      <main class="flex-1 lg:ml-64">
        <!-- Page Header -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, John! Here's what's happening today.</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <i class="pi pi-plus mr-2"></i> New Report
            </button>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            v-for="stat in stats"
            :key="stat.title"
            :title="stat.title"
            :value="stat.value"
            :change="stat.change"
            :icon="stat.icon"
            :trend-up="stat.trendUp"
            :color="stat.color"
            class="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          />
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <!-- Main Chart -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 xl:col-span-2 overflow-hidden">
            <div class="p-6 pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Revenue Analytics</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly performance metrics</p>
              </div>
              <div class="mt-4 sm:mt-0">
                <select 
                  v-model="chartPeriod"
                  class="bg-gray-100 dark:bg-gray-700 border-0 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 pr-8"
                >
                  <option v-for="period in chartPeriods" :key="period" :value="period">
                    {{ period }}
                  </option>
                </select>
              </div>
            </div>
            <div class="p-6 pt-4 h-80">
              <LineChart :data="chartData" :options="chartOptions" />
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
                <router-link to="/activity" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  View All
                </router-link>
              </div>
              <div class="space-y-4">
                <ActivityItem 
                  v-for="activity in recentActivities"
                  :key="activity.id"
                  :activity="activity"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Data Tables -->
        <div class="grid grid-cols-1 gap-6 mb-8">
          <!-- Recent Orders -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-6 pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Recent Orders</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest customer transactions</p>
              </div>
              <router-link 
                to="/orders" 
                class="mt-4 sm:mt-0 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All Orders <i class="pi pi-chevron-right ml-1 text-xs"></i>
              </router-link>
            </div>
            <div class="p-6">
              <OrdersTable :orders="recentOrders" />
            </div>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Top Products -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2 overflow-hidden">
            <div class="p-6 pb-0">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Top Products</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Best selling items this month</p>
            </div>
            <div class="p-6">
              <ProductsTable :products="topProducts" />
            </div>
          </div>

          <!-- Progress Cards -->
          <div class="space-y-6">
            <ProgressCard 
              title="Project Completion" 
              progress="73" 
              description="12 of 16 milestones completed"
              color="blue"
            />
            <ProgressCard 
              title="Sales Target" 
              progress="89" 
              description="Above target this quarter"
              color="green"
            />
            <ProgressCard 
              title="Storage Usage" 
              progress="45" 
              description="4.5GB of 10GB used"
              color="indigo"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// UI State
const sidebarVisible = ref(false)
const showUserMenu = ref(false)
const searchQuery = ref('')
const chartPeriod = ref('Last 30 Days')

// Data
const chartPeriods = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year']

const menuItems = ref([
  { name: 'Dashboard', icon: 'pi pi-home', path: '/', active: true },
  { name: 'Analytics', icon: 'pi pi-chart-bar', path: '/analytics', badge: '3' },
  { name: 'Sales', icon: 'pi pi-shopping-cart', path: '/sales' },
  { name: 'Customers', icon: 'pi pi-users', path: '/customers' },
  { name: 'Products', icon: 'pi pi-box', path: '/products', badge: '12' },
  { name: 'Orders', icon: 'pi pi-list', path: '/orders' },
  { name: 'Messages', icon: 'pi pi-envelope', path: '/messages', badge: '5' },
  { name: 'Settings', icon: 'pi pi-cog', path: '/settings' }
])

const quickActions = ref([
  { name: 'Create Report', icon: 'pi pi-file', handler: () => alert('Create Report') },
  { name: 'Add Product', icon: 'pi pi-plus-circle', handler: () => alert('Add Product') },
  { name: 'Invite User', icon: 'pi pi-user-plus', handler: () => alert('Invite User') }
])

const stats = ref([
  {
    title: 'Total Revenue',
    value: '$24,780',
    change: '12.5%',
    icon: 'pi pi-dollar',
    trendUp: true,
    color: 'blue'
  },
  {
    title: 'New Orders',
    value: '1,254',
    change: '8.2%',
    icon: 'pi pi-shopping-cart',
    trendUp: true,
    color: 'green'
  },
  {
    title: 'Active Users',
    value: '892',
    change: '15.3%',
    icon: 'pi pi-users',
    trendUp: true,
    color: 'purple'
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '2.1%',
    icon: 'pi pi-percentage',
    trendUp: false,
    color: 'orange'
  }
])

const recentActivities = ref([
  {
    id: 1,
    title: 'New order received',
    description: 'Order #1234 from John Doe',
    time: '2 minutes ago',
    icon: 'pi pi-shopping-cart',
    iconColor: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50'
  },
  {
    id: 2,
    title: 'Payment processed',
    description: '$2,400 payment completed',
    time: '15 minutes ago',
    icon: 'pi pi-credit-card',
    iconColor: 'text-green-500 bg-green-100 dark:bg-green-900/50'
  },
  {
    id: 3,
    title: 'New customer registered',
    description: 'Sarah Wilson joined',
    time: '1 hour ago',
    icon: 'pi pi-user-plus',
    iconColor: 'text-purple-500 bg-purple-100 dark:bg-purple-900/50'
  },
  {
    id: 4,
    title: 'Inventory updated',
    description: '45 items restocked',
    time: '2 hours ago',
    icon: 'pi pi-box',
    iconColor: 'text-orange-500 bg-orange-100 dark:bg-orange-900/50'
  }
])

const recentOrders = ref([
  {
    id: '#3245',
    customer: 'Sarah Johnson',
    date: '12/05/2023',
    amount: 245.00,
    status: 'Completed',
    product: 'Wireless Headphones'
  },
  {
    id: '#3244',
    customer: 'Michael Smith',
    date: '11/05/2023',
    amount: 189.00,
    status: 'Pending',
    product: 'Smart Watch'
  },
  {
    id: '#3243',
    customer: 'Emily Davis',
    date: '10/05/2023',
    amount: 320.00,
    status: 'Completed',
    product: 'Laptop Bag'
  },
  {
    id: '#3242',
    customer: 'Robert Wilson',
    date: '09/05/2023',
    amount: 98.00,
    status: 'Failed',
    product: 'Gaming Mouse'
  },
  {
    id: '#3241',
    customer: 'Jessica Brown',
    date: '08/05/2023',
    amount: 456.00,
    status: 'Completed',
    product: 'Bluetooth Speaker'
  }
])

const topProducts = ref([
  {
    name: 'Wireless Headphones',
    category: 'Electronics',
    sales: 15420,
    stock: 45,
    rating: 4.5
  },
  {
    name: 'Smart Watch',
    category: 'Wearables',
    sales: 12350,
    stock: 12,
    rating: 4.2
  },
  {
    name: 'Laptop Bag',
    category: 'Accessories',
    sales: 8920,
    stock: 32,
    rating: 4.7
  },
  {
    name: 'Gaming Mouse',
    category: 'Electronics',
    sales: 7640,
    stock: 0,
    rating: 4.3
  },
  {
    name: 'Bluetooth Speaker',
    category: 'Audio',
    sales: 6890,
    stock: 18,
    rating: 4.1
  }
])

const chartData = computed(() => {
  // In a real app, you would fetch data based on chartPeriod.value
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 42000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Profit',
        data: [8000, 12000, 10000, 18000, 16000, 22000, 20000, 25000, 23000, 28000, 26000, 30000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#6B7280'
      }
    },
    tooltip: {
      backgroundColor: '#1F2937',
      titleColor: '#F9FAFB',
      bodyColor: '#F9FAFB',
      borderColor: '#374151',
      borderWidth: 1,
      padding: 12,
      usePointStyle: true
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(209, 213, 219, 0.3)'
      },
      ticks: {
        color: '#6B7280'
      }
    },
    x: {
      grid: {
        color: 'rgba(209, 213, 219, 0.3)'
      },
      ticks: {
        color: '#6B7280'
      }
    }
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
      hoverBorderWidth: 2
    }
  }
}

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const logout = () => {
  // Handle logout logic
  router.push('/login')
}

// Handle responsive behavior
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    sidebarVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar */
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

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Smooth transitions */
* {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>