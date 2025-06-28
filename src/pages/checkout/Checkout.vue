<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- Header with Progress -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Secure Checkout
                </h1>
                <div class="flex justify-center items-center space-x-4 mb-6">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            ✓
                        </div>
                        <span class="ml-2 text-sm text-gray-600">Cart</span>
                    </div>
                    <div class="h-px w-12 bg-green-500"></div>
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        ✓
                        </div>
                        <span class="ml-2 text-sm text-gray-600">Shipping</span>
                    </div>
                    <div class="h-px w-12 bg-green-500"></div>
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            3
                        </div>
                        <span class="ml-2 text-sm font-semibold text-blue-600">Payment</span>
                    </div>
                    <div class="h-px w-12 bg-gray-300"></div>
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                            4
                        </div>
                        <span class="ml-2 text-sm text-gray-500">Confirmation</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <!-- Payment Section -->
                <div class="xl:col-span-2">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                        <!-- Payment Methods -->
                        <div class="mb-8">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <i class="pi pi-credit-card mr-3 text-blue-500"></i>
                                Payment Method
                            </h2>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                <Button
                                    v-for="method in paymentMethods"
                                    :key="method.id"
                                    :class="[
                                        'h-20 transition-all duration-300 transform hover:scale-105',
                                        selectedMethod === method.id 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                                        : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200'
                                    ]"
                                        @click="selectedMethod = method.id"
                                    >
                                    <div class="flex flex-col items-center space-y-2">
                                        <i :class="method.icon" class="text-2xl"></i>
                                        <span class="text-sm font-semibold">{{ method.label }}</span>
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <!-- Credit Card Form -->
                        <div v-if="selectedMethod === 'card'" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="pi pi-credit-card mr-2"></i>Card Number
                                    </label>
                                    <InputMask 
                                        v-model="card.number"
                                        mask="9999 9999 9999 9999"
                                        placeholder="1234 5678 9012 3456"
                                        class="w-full h-12 text-lg"
                                        :class="cardInputClass"
                                    />
                                </div>
                                
                                <div class="md:col-span-2">
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="pi pi-user mr-2"></i>Cardholder Name
                                    </label>
                                    <InputText 
                                        v-model="card.name"
                                        placeholder="John Doe"
                                        class="w-full h-12 text-lg"
                                        :class="cardInputClass"
                                    />
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="pi pi-calendar mr-2"></i>Expiry Date
                                    </label>
                                    <InputMask 
                                        v-model="card.expiry"
                                        mask="99/99"
                                        placeholder="MM/YY"
                                        class="w-full h-12 text-lg"
                                        :class="cardInputClass"
                                    />
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="pi pi-lock mr-2"></i>CVV
                                    </label>
                                    <Password
                                        v-model="card.cvv"
                                        :feedback="false"
                                        toggleMask
                                        placeholder="123"
                                        class="w-full"
                                        :inputClass="'h-12 text-base sm:text-lg px-4 border-2 border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 ' + cardInputClass"
                                    />
                                </div>
                            </div>

                            <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                                <Checkbox 
                                v-model="saveCard"
                                inputId="saveCard"
                                :binary="true"
                                class="scale-125"
                                />
                                <label for="saveCard" class="text-sm font-medium text-gray-700 cursor-pointer">
                                <i class="pi pi-shield mr-2 text-blue-500"></i>
                                Save this card securely for future purchases
                                </label>
                            </div>
                        </div>

                        <!-- PayPal Section -->
                        <div v-else-if="selectedMethod === 'paypal'" class="text-center py-12">
                            <div class="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                                <i class="pi pi-paypal text-4xl text-blue-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">PayPal Checkout</h3>
                            <p class="text-gray-600 mb-8 max-w-md mx-auto">
                                You'll be securely redirected to PayPal to complete your payment. Your order details will be preserved.
                            </p>
                            <Button 
                                label="Continue with PayPal"
                                icon="pi pi-paypal"
                                class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            />
                        </div>

                        <!-- Bank Transfer Section -->
                        <div v-else-if="selectedMethod === 'bank'" class="text-center py-12">
                            <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                <i class="pi pi-building text-4xl text-gray-600"></i>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">Bank Transfer</h3>
                            <p class="text-gray-600 mb-8 max-w-md mx-auto">
                                You'll receive bank transfer instructions via email after placing your order.
                            </p>
                            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 max-w-md mx-auto">
                                <div class="flex items-center">
                                    <i class="pi pi-info-circle text-amber-500 mr-2"></i>
                                    <span class="text-sm text-amber-700">Processing time: 1-3 business days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="xl:col-span-1">
                    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 sticky top-8">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <i class="pi pi-shopping-cart mr-3 text-purple-500"></i>
                            Order Summary
                        </h2>
                        
                        <!-- Cart Items -->
                        <div v-for="item in cartItems" :key="item.product.id" class="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <img 
                                :src="item.product.image" 
                                :alt="item.product.title" 
                                class="w-16 h-16 rounded-lg object-cover shadow-md"
                            />
                            <div class="flex-1 min-w-0">
                                <h3 class="font-semibold text-gray-800 truncate">{{ item.product.title }}</h3>
                                <p class="text-sm text-gray-500 mb-2">{{ item.product.category }}</p>
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-lg text-blue-600">${{ item.product.price }}</span>
                                    <span class="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                        Qty: {{ item.quantity }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Price Breakdown -->
                        <div class="space-y-3 py-6 border-t border-gray-200">
                            <div class="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>${{ shipping.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span>${{ tax.toFixed(2) }}</span>
                            </div>
                            <div v-if="discount > 0" class="flex justify-between text-green-600 font-semibold">
                                <span>
                                <i class="pi pi-tag mr-1"></i>Discount
                                </span>
                                <span>-${{ discount.toFixed(2) }}</span>
                            </div>
                        </div>

                        <!-- Total -->
                        <div class="border-t border-gray-200 pt-4 mb-6">
                            <div class="flex justify-between items-center">
                                <span class="text-xl font-bold text-gray-800">Total</span>
                                <span class="text-2xl font-bold text-blue-600">${{ total.toFixed(2) }}</span>
                            </div>
                        </div>

                        <!-- Complete Order Button -->
                        <Button 
                            :label="getCompleteOrderLabel()"
                            icon="pi pi-credit-card"
                            class="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            @click="completeOrder"
                            :loading="isProcessing"
                        />

                        <!-- Security Badge -->
                        <div class="flex items-center justify-center mt-6 text-sm text-gray-500">
                            <i class="pi pi-shield mr-2 text-green-500"></i>
                            <span>Secured by 256-bit SSL encryption</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../../store/cartStore'
import { useOrderStore } from '../../store/orderStore'
import type { Order } from '../../store/orderStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'

//=============== Import PrimeVue Components ///
const toast = useToast()
const orderStore = useOrderStore()
const router = useRouter()
// Payment Methods
const paymentMethods = [
    { id: 'card', label: 'Credit Card', icon: 'pi pi-credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'pi pi-paypal' },
    { id: 'bank', label: 'Bank Transfer', icon: 'pi pi-building' }
]
const selectedMethod = ref('card')

// Card Details
const card = ref({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
})
const saveCard = ref(false)

// 👉 Use cartStore instead of local cart
const cartStore = useCartStore()
const { items: cartItems } = storeToRefs(cartStore)

// Load cart on mount (optional, if not auto-loaded)
onMounted(() => {
    cartStore.loadCart?.()
})

// Order Calculations
const subtotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
)
const shipping = ref(12.99)
const tax = computed(() => subtotal.value * 0.0875)
const discount = ref(25.00)
const total = computed(() =>
    subtotal.value + shipping.value + tax.value - discount.value
)

const isProcessing = ref(false)

// Styling
const cardInputClass = "border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-colors duration-200"


const getCompleteOrderLabel = () => {
    if (isProcessing.value) return 'Processing...'
    if (selectedMethod.value === 'paypal') return 'Continue to PayPal'
    if (selectedMethod.value === 'bank') return 'Place Order'
    return `Pay $${total.value.toFixed(2)}`
}

const completeOrder = () => {
    isProcessing.value = true

    setTimeout(() => {
        const newOrder: Order = {
            id: Date.now(),
            date: new Date().toISOString().slice(0, 10),
            status: 'Completed',
            items: cartItems.value.map(item => ({
                product: {
                    id: item.product.id,
                    title: item.product.title,
                    price: item.product.price,
                    image: item.product.image,
                    category: item.product.category
                },
                quantity: item.quantity
            })),
            total: total.value
        }
        orderStore.addOrder(newOrder)

        isProcessing.value = false
        cartStore.clearCart()
        toast.add({
            severity: 'success',
            summary: 'Order Placed!',
            detail: '🎉 Order placed successfully! You will receive a confirmation email shortly.',
            life: 4000
        })
        router.push({ name: 'MyOrders' })
    }, 2000)
}

</script>

<style scoped>
/* Custom PrimeVue component styling */
:deep(.p-button) {
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

:deep(.p-inputtext) {
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 0.2s ease;
}

:deep(.p-inputtext:focus) {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.p-password) {
  position: relative;
  width: 100%;
}

:deep(.p-password .p-inputtext) {
  padding-right: 3.5rem !important;
  width: 100%;
  font-size: 1rem;
}

:deep(.p-password .p-password-icon) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  cursor: pointer;
  z-index: 2;
  font-size: 1rem;
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  :deep(.p-password .p-inputtext) {
    padding-right: 2.5rem !important;
    font-size: 0.875rem;
  }
  
  :deep(.p-password .p-password-icon) {
    right: 0.5rem;
    font-size: 0.875rem;
  }
}

:deep(.p-checkbox .p-checkbox-box) {
  border-radius: 6px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white\/80 {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1.sm\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .xl\:col-span-2,
  .xl\:col-span-1 {
    grid-column: span 1;
  }
}
</style>