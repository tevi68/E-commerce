<template>
    <div class="order-details min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <!-- Hero Section with Animated Background -->
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
            <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                        <i class="pi pi-receipt text-2xl text-white"></i>
                    </div>
                    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                        Order Details
                    </h1>
                    <p class="text-blue-100 text-lg max-w-2xl mx-auto">
                        Track your order status and review your purchase details
                    </p>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-12">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
                <div class="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20">
                <div class="text-center">
                    <ProgressSpinner style="width: 60px; height: 60px" strokeWidth="6" />
                    <p class="mt-4 text-gray-600 font-medium">Loading order details...</p>
                </div>
                </div>
            </div>

            <!-- Order Content -->
            <div v-else-if="order" class="space-y-6" ref="printSection">
                <!-- Company Logo for Print -->
                <!-- <div class="flex justify-center mb-6 print:mb-8">
                  <img src="/banner/banner-hero.png" alt="Company Logo" class="h-20 w-auto mx-auto print:mb-4 print:block" style="max-height:80px;" />
                </div> -->

                <!-- Order Header Card -->
                <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 class="text-xl sm:text-2xl font-bold text-white">Order #{{ order.id }}</h2>
                                <p class="text-blue-100 mt-1">{{ order.date }}</p>
                            </div>
                            <div class="mt-3 sm:mt-0">
                                <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border"
                                :class="statusClass"
                                >
                                <div class="w-2 h-2 rounded-full mr-2 animate-pulse" 
                                    :class="{
                                        'bg-green-400': order.status === 'Completed',
                                        'bg-yellow-400': order.status === 'Pending', 
                                        'bg-red-400': order.status === 'Cancelled'
                                    }">
                                </div>
                                    {{ order.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Items Card -->
                <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h3 class="text-lg font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
                            <i class="pi pi-shopping-cart text-blue-500 mr-2"></i>
                            Order Items
                        </h3>
                        <div>
                            <button
                                class="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 print:hidden"
                                @click="printOrder"
                            >
                                <i class="pi pi-download mr-2"></i>
                                Download & Print
                            </button>
                        </div>
                    </div>
                    <div class="divide-y divide-gray-100">
                        <div v-for="item in order.items" :key="item.product.id" class="p-6 hover:bg-blue-50/50 transition-all duration-300 group" >
                            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <!-- Product Image -->
                                <div class="relative">
                                    <img
                                        v-if="item.product.image"
                                        :src="item.product.image"
                                        :alt="item.product.title"
                                        class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-300 print:w-32 print:h-32 print:shadow-none print:border print:border-gray-300"
                                    />
                                    <div class="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                                        {{ item.quantity }}
                                    </div>
                                </div>

                                <!-- Product Details -->
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-bold text-gray-800 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                        {{ item.product.title }}
                                    </h4>
                                    <p class="text-sm text-gray-500 mb-3 bg-gray-100 inline-block px-3 py-1 rounded-full">
                                        {{ item.product.category }}
                                    </p>
                                
                                    <!-- Price Details -->
                                    <div class="flex flex-wrap items-center gap-3 sm:gap-6">
                                            <div class="flex items-center space-x-2">
                                            <span class="text-sm text-gray-500">Unit Price:</span>
                                            <span class="text-blue-600 font-bold text-lg">${{ item.product.price }}</span>
                                        </div>
                                            <div class="flex items-center space-x-2">
                                            <span class="text-sm text-gray-500">Quantity:</span>
                                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                                                {{ item.quantity }}
                                            </span>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <span class="text-sm text-gray-500">Subtotal:</span>
                                            <span class="text-green-600 font-bold text-lg">
                                                ${{ (item.product.price * item.quantity).toFixed(2) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Total -->
                    <div class="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6 border-t border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 class="text-xl font-bold text-gray-800 mb-2 sm:mb-0 flex items-center">
                                <i class="pi pi-calculator text-green-500 mr-2"></i>
                                Order Total
                            </h3>
                            <div class="text-right">
                                <span class="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                ${{ total.toFixed(2) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Information (for Pending orders) -->
                <div v-if="order.status === 'Pending'" class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div class="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
                        <div class="flex items-center">
                            <i class="pi pi-exclamation-triangle text-white text-xl mr-3"></i>
                            <h3 class="text-xl font-bold text-white">Payment Required</h3>
                        </div>
                    </div>
                
                    <div class="p-6">
                        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-200">
                            <div class="flex items-center mb-6">
                                <div class="bg-blue-500 rounded-full p-3 mr-4">
                                    <i class="pi pi-building text-white text-xl"></i>
                                </div>
                                <div>
                                    <h4 class="text-xl font-bold text-blue-800">Bank Transfer Payment</h4>
                                    <p class="text-blue-600">Complete your payment using the details below</p>
                                </div>
                            </div>
                        
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <div class="bg-white/70 rounded-lg p-4 border border-blue-200">
                                    <div class="text-sm text-gray-600 mb-1">Bank Name</div>
                                    <div class="font-bold text-gray-800">ABA Bank</div>
                                </div>
                                <div class="bg-white/70 rounded-lg p-4 border border-blue-200">
                                    <div class="text-sm text-gray-600 mb-1">Account Name</div>
                                    <div class="font-bold text-gray-800">Ecom Shop</div>
                                </div>
                                    <div class="bg-white/70 rounded-lg p-4 border border-blue-200">
                                    <div class="text-sm text-gray-600 mb-1">Account Number</div>
                                    <div class="font-bold text-gray-800 font-mono">000123456789</div>
                                </div>
                                <div class="bg-white/70 rounded-lg p-4 border border-blue-200">
                                    <div class="text-sm text-gray-600 mb-1">Transfer Note</div>
                                    <div class="font-bold text-gray-800">Order #{{ order.id }}</div>
                                </div>
                            </div>
                        
                            <div class="bg-blue-500 text-white rounded-lg p-4">
                                <div class="flex items-start">
                                    <i class="pi pi-info-circle text-xl mr-3 mt-0.5"></i>
                                    <div>
                                        <h5 class="font-semibold mb-1">Payment Instructions</h5>
                                        <p class="text-blue-100 text-sm leading-relaxed">
                                            Please transfer the total amount to the above account and send the receipt to our support team. 
                                            Your order will be processed once payment is confirmed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Message for Completed Orders -->
                    <div v-else-if="order.status === 'Completed'" class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                    <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6">
                        <div class="flex items-center justify-center text-center">
                            <div class="bg-white/20 rounded-full p-4 mr-4">
                                <i class="pi pi-check-circle text-white text-3xl"></i>
                            </div>
                            <div>
                                <h3 class="text-2xl font-bold text-white">Order Completed!</h3>
                                <p class="text-green-100 mt-1">Thank you for your purchase</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Order Found -->
            <div v-else class="flex items-center justify-center min-h-[400px]">
                <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-8 text-center max-w-md mx-auto">
                    <div class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <i class="pi pi-exclamation-triangle text-gray-500 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Order Not Found</h3>
                    <p class="text-gray-600 mb-4">We couldn't find the order details you're looking for.</p>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../../store/orderStore'
import ProgressSpinner from 'primevue/progressspinner'

const route = useRoute()
const orderStore = useOrderStore()
const loading = ref(false)
const orderId = Number(route.params.id)
const order = computed(() => orderStore.orders.find(o => o.id === orderId))

const total = computed(() => {
    if (!order.value || !order.value.items) return 0
    return order.value.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
})

const statusClass = computed(() => {
    if (!order.value) return ''
    return {
        'bg-green-100 text-green-800 border-green-200': order.value.status === 'Completed',
        'bg-yellow-100 text-yellow-800 border-yellow-200': order.value.status === 'Pending',
        'bg-red-100 text-red-800 border-red-200': order.value.status === 'Cancelled'
    }
})

// Print function
const printSection = ref<HTMLElement | null>(null)
function printOrder() {
    if (!printSection.value) return
    const printContents = printSection.value.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
    window.location.reload() // reload to restore event listeners
}
</script>

<style scoped>
.order-details {
  background-attachment: fixed;
}

@media (max-width: 640px) {
    .order-details {
        background-attachment: scroll;
    }
}

/* Hide print button and unnecessary UI during print */
@media print {
  .print\:hidden {
    display: none !important;
  }
  img {
    max-width: 100% !important;
    height: auto !important;
    page-break-inside: avoid !important;
    display: block !important;
    margin: 0 auto 16px auto !important;
  }
  body {
    background: white !important;
  }
  .order-details {
    background: white !important;
  }
}
</style>