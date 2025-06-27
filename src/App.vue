<template>
  <Navbar v-show="!isAuthPage" />
  <Toast />
  <ConfirmDialog />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
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
</script>