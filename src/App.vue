<template>
  
  <Navbar v-show="!isAuthPage && !isDashboardRoute" />
  <Toast position="top-center" class="w-full max-w-[95vw] md:max-w-md" />
  <ConfirmDialog
    class="confirm-dialog-container"
    position="center"
    :breakpoints="{
      '640px': '90vw',
      '1024px': '60vw'
    }"
    :style="{ width: '95vw', maxWidth: '500px' }"
  />

  <router-view />
  <Footer v-show="!isAuthPage && !isCheckout && !isDashboardRoute" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from 'primevue/toast'
import { useCartStore } from './store/cartStore'
import { useOrderStore } from './store/orderStore'

const cartStore = useCartStore()
const orderStore = useOrderStore()

onMounted(() => {
  cartStore.loadCart()
  orderStore.loadOrders()
})

const route = useRoute()

const isAuthPage = computed(() =>
  route.path === '/login' || route.path === '/register'
)

const isCheckout = computed(() => route.path === '/checkout')

const isDashboardRoute = computed(() => route.path.startsWith('/dashboard'))
</script>

<style>
/* Custom toast styling */
.p-toast {
  width: 60vw !important;
  max-width: 20rem !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}

.p-toast .p-toast-message {
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .p-toast {
    width: auto !important;
  }
}

.p-dialog {
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 1rem;
}

@media (min-width: 640px) {
  .confirm-dialog-container .p-dialog {
    width: 80vw !important;
  }
}

@media (min-width: 1024px) {
  .confirm-dialog-container .p-dialog {
    width: 50vw !important;
  }
}
</style>