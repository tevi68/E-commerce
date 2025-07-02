<template>
  <div class="bg-gray-100 min-h-screen py-6 sm:py-10">
    
    <!-- Loading Spinner -->
    <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
      <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <h1 class="text-2xl sm:text-3xl font-bold mb-6">Shopping Cart</h1>
      <!-- Empty Cart State -->
      <!-- <div v-if="!loading && cartItems.length === 0" class="bg-white shadow rounded-lg p-8 text-center">
          <i class="pi pi-shopping-cart text-5xl text-gray-400 mb-4"></i>
          <h2 class="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p class="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Button 
            label="Continue Shopping" 
            icon="pi pi-arrow-left" 
            severity="secondary" 
            @click="$router.push('/')" 
        />
      </div> -->
      <!-- Empty Cart State -->
      <div v-if="!loading && cartItems.length === 0" class="flex flex-col items-center justify-center text-center py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[400px]">
        <img src="../../../assets/image/cart-empty.png" alt="Empty Cart" class="w-32 sm:w-40 mb-6 opacity-60" />
        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Start shopping to add items to your cart</p>
        <button
          @click="$router.push('/shopcard')"
          class="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg px-6 py-3 rounded-full transition-all duration-300"
        >
          Explore items
        </button>
      </div>

      <!-- Cart with Items -->
      <div v-else-if="!loading" class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Cart Items Table -->
        <div class="lg:col-span-2 bg-white shadow rounded-lg sm:rounded p-4 sm:p-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="hidden sm:table-header-group">
                <tr class="border-b text-gray-800 text-sm">
                  <th class="py-2">Products</th>
                  <th class="py-2">Price</th>
                  <th class="py-2">Quantity</th>
                  <th class="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cartItems" :key="item.product.id" class="border-b sm:border-none">
                  <!-- Product Info -->
                  <td class="py-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div class="flex items-center gap-3 sm:gap-4">
                      <!-- <Button @click="confirmDelete(item.product.id)" 
                        :loading="deletingItemId === item.product.id" icon="pi pi-times" severity="danger" rounded aria-label="Cancel" size="small"/> -->
                      
                      <Image :src="item.product.image" alt="Image" class="w-16 h-10 sm:w-16 sm:h-14 object-cover rounded" preview />
                      <div class="sm:max-w-[150px]">
                        <div class="font-semibold text-sm sm:text-base line-clamp-2">{{ item.product.title }}</div>
                        <div class="text-xs sm:text-sm text-gray-500">{{ item.product.category }}</div>
                      </div>
                    </div>
                    
                    <!-- Mobile price and subtotal -->
                    <div class="sm:hidden flex justify-between items-center pl-11">
                      <div class="text-sm">${{ item.product.price?.toFixed(2) }}</div>
                      <div class="font-semibold text-orange-600 text-sm">
                        ${{ (item.product.price * item.quantity)?.toFixed(2) }}
                      </div>
                    </div>
                  </td>
                  
                  <!-- Desktop Price -->
                  <td class="py-4 hidden sm:table-cell">
                    ${{ item.product.price?.toFixed(2) }}
                  </td>
                  
                  <!-- Quantity -->
                  <td class="py-4 hidden sm:table-cell">
                    <div class="flex items-center gap-2">
                      <Button 
                        icon="pi pi-minus" 
                        outlined 
                        size="small"
                        @click="decreaseQty(item)" 
                        :disabled="item.quantity <= 1" 
                      />
                      <span class="px-2">{{ item.quantity }}</span>
                      <Button 
                        icon="pi pi-plus" 
                        outlined 
                        size="small"
                        @click="increaseQty(item)" 
                        :disabled="item.quantity >= item.product.stock" 
                      />
                    </div>
                  </td>
                  
                  <!-- Desktop Subtotal -->
                  <td class="py-4 font-semibold text-orange-600 hidden sm:table-cell">
                    ${{ (item.product.price * item.quantity)?.toFixed(2) }}
                    <Button 
                        icon="pi pi-times" 
                        text 
                        rounded 
                        severity="danger"
                        class="!p-1 sm:!p-2 !w-6 !h-6 sm:!w-8 sm:!h-8 ml-4" 
                        @click="confirmDelete(item.product.id)" 
                        :loading="deletingItemId === item.product.id"
                      />
                  </td>
                  
                  <!-- Mobile Quantity Controls -->
                  <td class="pb-4 sm:hidden">
                    <div class="flex items-center justify-between gap-2 pl-11">
                      <div class="flex items-center gap-2">
                        <Button 
                          icon="pi pi-minus" 
                          outlined 
                          size="small"
                          @click="decreaseQty(item)" 
                          :disabled="item.quantity <= 1" 
                        />
                        <span class="px-2">{{ item.quantity }}</span>
                        <Button 
                          icon="pi pi-plus" 
                          outlined 
                          size="small"
                          @click="increaseQty(item)" 
                          :disabled="item.quantity >= item.product.stock" 
                        />
                        <Button 
                          icon="pi pi-times" 
                          text 
                          rounded 
                          severity="danger"
                          class="!p-1 sm:!p-2 !w-6 !h-6 sm:!w-8 sm:!h-8 ml-4" 
                          @click="confirmDelete(item.product.id)" 
                          :loading="deletingItemId === item.product.id"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Summary Panel -->
        <div class="bg-white shadow rounded-lg p-4 sm:p-6 w-full mx-auto h-fit sticky top-4">
          <h2 class="text-lg font-bold mb-4">Order Summary</h2>
          <div class="space-y-3 text-sm text-gray-700">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>${{ totalPrice?.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Discount:</span>
              <span class="text-green-600 font-semibold">20%</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping:</span>
              <span class="text-gray-500">Free</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between text-base sm:text-lg font-bold">
              <span>Total:</span>
              <span class="text-orange-600">${{ (totalPrice * 0.8)?.toFixed(2) }}</span>
            </div>
          </div>

          <Button
            label="Proceed To Checkout"
            icon="pi pi-arrow-right"
            class="mt-6 w-full"
            severity="success"
            @click="proceedToCheckout"
          />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../../../store/cartStore'
import { storeToRefs } from 'pinia'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'

import Button from 'primevue/button';


const router = useRouter()
const confirm = useConfirm()
const toast = useToast()
const cartStore = useCartStore()
const { items: cartItems } = storeToRefs(cartStore)
const loading = ref(true)
const deletingItemId = ref<number | null>(null)

onMounted(async () => {
  try {
    await cartStore.loadCart()
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load cart items',
      life: 3000
    })
  } finally {
    loading.value = false
  }
})

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity) || 0
  }, 0)
})

function increaseQty(item: { product: any; quantity: number }) {
  if (item.quantity < item.product.stock) {
    cartStore.addToCart(item.product, 1)
  }
}

function decreaseQty(item: { product: any; quantity: number }) {
  if (item.quantity > 1) {
    item.quantity--
    cartStore.saveCart()
  }
}

async function confirmDelete(productId: number) {
  confirm.require({
    message: 'Are you sure you want to remove this item from your cart?',
    header: 'Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary p-button-text',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    accept: async () => {
      try {
        deletingItemId.value = productId
        await cartStore.removeFromCart(productId)
        showToast('success', 'Success', 'successfully')
      } catch (error) {
        showToast('error', 'Error', 'Failed to remove item from cart')
      } finally {
        deletingItemId.value = null
      }
    },
  })
}

function proceedToCheckout() {
  if (cartItems.value.length > 0) {
    router.push('/checkout')
  } else {
    showToast('warn', 'Empty Cart', 'Your cart is empty')
  }
}

function showToast(severity: string, summary: string, detail: string) {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000
  })
}
</script>