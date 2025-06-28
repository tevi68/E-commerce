<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
        </div>
        <!-- Hero Section with Animated Background -->
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
            <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                        <i class="pi pi-shopping-bag text-2xl text-white"></i>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                        My Orders
                    </h1>
                    <p class="text-blue-100 text-lg max-w-2xl mx-auto">
                        Track and manage all your orders in one place
                    </p>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-12">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <div class="text-center">
                        <ProgressSpinner style="width: 60px; height: 60px" strokeWidth="6" />
                        <p class="mt-4 text-gray-600 font-medium">Loading your orders...</p>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && orders.length === 0" class="flex items-center justify-center min-h-[400px]">
                <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8 sm:p-12 text-center max-w-md mx-auto">
                    <div class="relative mb-6">
                        <div class="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <i class="pi pi-shopping-cart text-4xl text-blue-500"></i>
                        </div>
                        <div class="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center animate-bounce">
                            <i class="pi pi-exclamation text-white text-sm"></i>
                        </div>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-3">No Orders Yet</h2>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        You haven't placed any orders yet. Start shopping to see your orders here!
                    </p>
                    <button class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Start Shopping
                    </button>
                </div>
            </div>

            <!-- Orders Grid -->
            <div v-else-if="!loading" class="space-y-6">
                <!-- Orders Header Stats -->
                <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 class="text-xl font-bold text-gray-800 mb-1">Order History</h2>
                            <p class="text-gray-600">{{ orders.length }} order{{ orders.length !== 1 ? 's' : '' }} found</p>
                        </div>
                        <div class="mt-4 sm:mt-0 flex items-center space-x-4">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600">{{ orders.length }}</div>
                                <div class="text-xs text-gray-500 uppercase tracking-wide">Total Orders</div>
                            </div>
                            <div class="w-px h-12 bg-gray-200"></div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600">
                                    ${{ orders.reduce((sum, order) => sum + order.total, 0).toFixed(2) }}
                                </div>
                                <div class="text-xs text-gray-500 uppercase tracking-wide">Total Spent</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Orders List -->
                <div class="grid grid-cols-1 gap-6">
                    <div v-for="order in orders" :key="order.id" class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                        <!-- Order Header -->
                        <div class="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-blue-500 rounded-full p-3">
                                        <i class="pi pi-receipt text-white text-lg"></i>
                                    </div>
                                    <div>
                                        <h3 class="text-lg font-bold text-gray-800">Order #{{ order.id }}</h3>
                                        <p class="text-gray-600 text-sm">{{ formatDate(order.date) }}</p>
                                    </div>
                                </div>
                                <div class="mt-4 sm:mt-0 flex items-center space-x-4">
                                    <div class="text-right">
                                        <div class="text-2xl font-bold text-green-600">${{ order.total.toFixed(2) }}</div>
                                        <div class="text-xs text-gray-500 uppercase tracking-wide">Total Amount</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Order Content -->
                        <div class="p-6">
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <!-- Order Status & Info -->
                                <div class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                        <span class="text-sm font-medium text-gray-700">Processing</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-sm text-gray-600">
                                        <i class="pi pi-calendar text-blue-500"></i>
                                        <span>Placed {{ formatDate(order.date) }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-sm text-gray-600">
                                        <i class="pi pi-dollar text-green-500"></i>
                                        <span class="font-semibold">${{ order.total.toFixed(2) }}</span>
                                    </div>
                                </div>

                                <!-- Action Button -->
                                <div class="mt-4 sm:mt-0 flex items-center space-x-4">
                                    <Button
                                        label="View Details"
                                        icon="pi pi-arrow-right"
                                        @click="viewOrderDetails(order.id)"
                                        class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg"
                                        iconPos="right"
                                    />
                                    <Button
                                        label="Remove"
                                        icon="pi pi-trash"
                                        severity="danger"
                                        @click="removeOrder(order.id, $event)"
                                        class="bg-red-500 hover:bg-red-600 border-0 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg"
                                        iconPos="right"
                                    />
                                </div>
                            </div>

                            <!-- Quick Order Preview -->
                            <div class="mt-6 pt-4 border-t border-gray-100">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-2 text-sm text-gray-600">
                                        <i class="pi pi-box text-orange-500"></i>
                                        <span>{{ order.items?.length || 0 }} item{{ (order.items?.length || 0) !== 1 ? 's' : '' }}</span>
                                    </div>
                                    <div class="flex items-center space-x-2 text-sm">
                                        <span class="text-gray-500">Order ID:</span>
                                        <span class="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">#{{ order.id }}</span>
                                    </div>
                                </div>

                                <!-- Progress Bar -->
                                <div class="mt-4">
                                    <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                                        <span>Order Progress</span>
                                        <span>75%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out" style="width: 75%"></div>
                                    </div>
                                    <div class="flex justify-between mt-2 text-xs">
                                        <span class="text-green-600 font-medium">✓ Confirmed</span>
                                        <span class="text-blue-600 font-medium">● Processing</span>
                                        <span class="text-gray-400">○ Shipped</span>
                                        <span class="text-gray-400">○ Delivered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Load More / Pagination Placeholder -->
                <div class="text-center mt-8">
                    <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-6">
                        <p class="text-gray-600 mb-4">Showing all {{ orders.length }} orders</p>
                        <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
                            <i class="pi pi-check-circle text-green-500"></i>
                            <span>All orders loaded</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useOrderStore } from '../../store/orderStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const orderStore = useOrderStore()
const { orders } = storeToRefs(orderStore)
const loading = ref(false)
const { proxy } = getCurrentInstance()!

onMounted(async () => {
    loading.value = true
    orderStore.loadOrders()
    await new Promise(resolve => setTimeout(resolve, 1000))
    loading.value = false
})

const viewOrderDetails = (orderId: number) => {
    router.push({ name: 'OrderDetails', params: { id: orderId } })
}

// Use PrimeVue $confirm service
const removeOrder = (orderId: number, event: Event) => {
    if (!proxy) return
    proxy.$confirm.require({
        message: 'Are you sure you want to remove this order?',
        header: 'Remove Order',
        icon: 'pi pi-exclamation-triangle text-red-500',
        target: event.currentTarget as HTMLElement,
        acceptLabel: 'Remove',
        rejectLabel: 'Cancel',
        acceptClass: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded',
        rejectClass: 'bg-gray-200 text-gray-700 px-4 py-2 rounded',
        accept: async () => {
            loading.value = true
            await orderStore.removeOrder(orderId)
            loading.value = false
            toast.add({
                severity: 'success',
                summary: 'Order Removed',
                detail: 'Your order has been removed successfully.',
                life: 3000
            })
        }
    })
}

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
/* Custom styles for My Orders component */
.bg-white {
    background-color: white;
}

@media (max-width: 640px) {
    .min-h-screen {
        background-attachment: scroll;
    }
}
</style>