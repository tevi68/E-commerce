<template>
  <div class="bg-white py-4 px-4 sm:px-6 max-w-7xl mx-auto">
    <!-- Section Title -->
    <div class="text-center mb-10">
      <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 relative inline-block">
        Shop by Category
        <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform translate-y-1"></span>
      </h2>
      <p class="text-gray-500 mt-4 max-w-lg mx-auto">
        Discover products in our most popular categories
      </p>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        @click="openView(category)"
      >
        <div class="aspect-square bg-gray-100 overflow-hidden">
          <img
            :src="category.image"
            :alt="category.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          >
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
          <h3 class="text-lg sm:text-xl font-semibold text-white"></h3>
          <p class="text-sm text-white/80 mt-1">
          </p>
        </div>
      </div>
    </div>
    <ViewDetail
      v-if="showViewDetail && viewProduct"
      :product="viewProduct"
      @close="closeView"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../../../store/storeProduct'
import ViewDetail from '../product/ViewDetail.vue'
import { products } from '../../../store/storeProduct'
import { useCartStore } from '../../../store/cartStore'

const showViewDetail = ref(false)
const viewProduct = ref<Product | null>(null)
const cartStore = useCartStore()

// Filter products by shopbycategory property
const categories = computed<Product[]>(() =>
  products.filter(product => product.shopbycategory)
)

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
</script>