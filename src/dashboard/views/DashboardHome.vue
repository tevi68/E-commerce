<template>
    <div>
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p class="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening with your store today.</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <DashboardCard
                v-for="stat in stats"
                :key="stat.title"
                :title="stat.title"
                :value="stat.value"
                :change="stat.change"
                :icon="stat.icon"
                :trend="stat.trend"
            />
        </div>

        <!-- Recent Orders -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
                <router-link to="/dashboard/orders" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View all
                </router-link>
            </div>
            <RecentOrdersTable :orders="recentOrders" />
        </div>
    </div>
</template>

<script setup lang="ts">
import DashboardCard from '../../dashboard/components/DashboardCard.vue'
import RecentOrdersTable from '../../dashboard/components/RecentOrdersTable.vue'

// Define types
type TrendType = 'up' | 'down'
type OrderStatus = 'completed' | 'processing' | 'shipped' | 'pending'

interface StatItem {
    title: string
    value: string
    change: string
    icon: string
    trend: TrendType
}

interface OrderItem {
    id: string
    customer: string
    date: string
    amount: string
    status: OrderStatus
}

// Stats data with proper typing
const stats: StatItem[] = [
    { 
        title: 'Total Revenue', 
        value: '$12,345', 
        change: '+12%', 
        icon: 'pi pi-wallet', 
        trend: 'up' 
    },
    { 
        title: 'Orders', 
        value: '245', 
        change: '+8%', 
        icon: 'pi pi-shopping-cart', 
        trend: 'up' 
    },
    { 
        title: 'Customers', 
        value: '1,234', 
        change: '-2%', 
        icon: 'pi pi-users', 
        trend: 'down' 
    },
    { 
        title: 'Conversion', 
        value: '3.2%', 
        change: '+0.5%', 
        icon: 'pi pi-chart-line', 
        trend: 'up' 
    }
]

// Orders data with proper typing
const recentOrders: OrderItem[] = [
    { 
        id: '#1234', 
        customer: 'John Doe', 
        date: '2023-05-15', 
        amount: '$125.00', 
        status: 'completed' 
    },
    { 
        id: '#1235', 
        customer: 'Jane Smith', 
        date: '2023-05-14', 
        amount: '$89.99', 
        status: 'processing' 
    },
    { 
        id: '#1236', 
        customer: 'Robert Johnson', 
        date: '2023-05-14', 
        amount: '$234.50', 
        status: 'shipped' 
    },
    { 
        id: '#1237', 
        customer: 'Emily Davis', 
        date: '2023-05-13', 
        amount: '$56.75', 
        status: 'pending' 
    }
]
</script>