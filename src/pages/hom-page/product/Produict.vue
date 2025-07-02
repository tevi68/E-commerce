<template>
    <div class="bg-white py-4 px-4 sm:px-6 max-w-7xl mx-auto">
        <!-- Section Title -->
        <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 relative inline-block">
                Shop By Product List
                <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform translate-y-1"></span>
            </h2>
            <p class="text-gray-500 mt-4 max-w-lg mx-auto">
                Discover products in our most popular categories
            </p>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <ProductCard
              v-for="product in displayedProducts"
              :key="product.id"
              :product="product"
              :is-favorite="isFavorite(product.id)"
              @toggle-favorite="toggleFavorite"
              @add-to-cart="addToCart"
              @view-product="openView"
            />
        </div>

        <!-- View More Button -->
        <div class="text-center mt-10" v-if="hasMoreProducts">
            <div v-if="loadingMore" class="flex justify-center items-center py-6">
                <svg class="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span class="ml-3 text-orange-500 font-medium text-base">Loading...</span>
            </div>
            <button
                v-else
                @click="loadMoreProducts"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
            >
                View More
                <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
            </button>
        </div>
        
        <ViewDetail v-if="showViewDetail && viewProduct" :product="viewProduct" @close="closeView" @add-to-cart="addToCart" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import ViewDetail from './ViewDetail.vue'
import { useCartStore } from '../../../store/cartStore'
import type { Product } from '../../../store/storeProduct'
import { fetchProducts } from '../../../store/productApi'

// State
const products = ref<Product[]>([])
const displayedCount = ref(10)
const favorites = ref<number[]>([])
const viewProduct = ref<Product | null>(null)
const showViewDetail = ref(false)
const loadingMore = ref(false)
const cartStore = useCartStore()

// Computed properties
const displayedProducts = computed(() => products.value.slice(0, displayedCount.value))
const hasMoreProducts = computed(() => displayedCount.value < products.value.length)

// Load initial products
const loadData = async () => {
  products.value = (await fetchProducts()).filter(p => p.isOnProduct)
}

onMounted(loadData)

// Methods
const isFavorite = (productId: number) => favorites.value.includes(productId)

const toggleFavorite = (productId: number) => {
  const index = favorites.value.indexOf(productId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(productId)
  }
}

const addToCart = (product: Product, quantity = 1) => {
  cartStore.addToCart(product, quantity)
}

const openView = (product: Product) => {
  viewProduct.value = product
  showViewDetail.value = true
}

const closeView = () => {
  showViewDetail.value = false
}

const loadMoreProducts = async () => {
  loadingMore.value = true
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    // Increase the number of displayed products
    displayedCount.value += 8
  } finally {
    loadingMore.value = false
  }
}
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>