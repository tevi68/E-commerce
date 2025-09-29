<template>
  <div class="bg-white py-8 px-4 sm:px-6 w-full lg:px-10 xl:px-36">
    <nav class="text-sm max-w-7xl mx-auto px-4 text-gray-500 flex items-center gap-2 py-4" aria-label="Breadcrumb">
      <router-link to="/" class="hover:underline text-blue-600">Home</router-link>
      <span>/ {{ displayCategory }}</span>
    </nav>
    <!-- Section Title -->
    <div class="text-center mb-5 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 relative inline-block">
            Products in "{{ displayCategory }}"
        </h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Products Grid -->
    <div v-else-if="categoryProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <div
        v-for="product in categoryProducts"
        :key="product.id"
        class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col"
      >
        <!-- Product Image -->
        <div class="relative w-full pt-[100%] bg-gray-50">
          <img
            :src="getImageUrl(product.images && product.images.length > 0 ? product.images[0] : null)"
            :alt="product.title"
            class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
            loading="lazy"
            @click.stop="openView(product)"
          />
          <div v-if="product.discount > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {{ product.discount }}% OFF
          </div>
          <div v-if="product.stock <= 0" class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span class="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">OUT OF STOCK</span>
          </div>
        </div>
        <!-- Product Content -->
        <div class="p-3 flex flex-col flex-grow">
          <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1.5">
            {{ product.title }}
          </h3>
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-base font-bold text-red-600">
              ${{ product.price.toLocaleString() }}
            </span>
            <span v-if="product.originalPrice && product.originalPrice > product.price" class="text-xs text-gray-500 line-through">
              ${{ product.originalPrice.toLocaleString() }}
            </span>
          </div>
          <div class="flex items-center gap-1 mb-2">
            <div class="flex text-yellow-400">
              <i v-for="star in 5" :key="star" class="pi text-xs" :class="star <= Math.round(product.rating) ? 'pi-star-fill' : 'pi-star'"></i>
            </div>
            <span class="text-xs text-gray-500">
              {{ product.rating.toFixed(1) }} ({{ product.reviewCount }} reviews)
            </span>
          </div>
          <div class="flex gap-2 mt-auto">
            <button class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors" @click.stop="openView(product)">
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12 text-gray-500">
      No products found in this category.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchShopProducts } from '../../../store/productApi'
import type { Product } from '../../../store/storeProduct'

const route = useRoute()
const router = useRouter()
const categoryProducts = ref<Product[]>([])
const loading = ref(false)

const displayCategory = computed(() => route.params.category as string || '')

function getImageUrl(productImage: any) {
  if (!productImage || !productImage.url) return 'https://via.placeholder.com/80'
  if (productImage.url.startsWith('http')) return productImage.url
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const fixedPath = productImage.url.replace(/^\/images\//, '/uploads/')
  return `${apiBaseUrl}${fixedPath}`
}

const fetchCategoryProducts = async () => {
  loading.value = true
  const category = route.params.category as string || ''
  let products = await fetchShopProducts()
  // Filter to only exact category match (case-insensitive, trimmed)
  categoryProducts.value = products.filter(p =>
    p.category && category && p.category.trim().toLowerCase() === category.trim().toLowerCase()
  )
  loading.value = false
}

function openView(product: Product) {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

onMounted(fetchCategoryProducts)
watch(() => route.params.category, fetchCategoryProducts)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.aspect-square {
  aspect-ratio: 1 / 1;
}
.transition {
  transition: all 0.2s ease;
}
</style> 