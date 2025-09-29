<template>
  <div class="bg-white py-2 px-4 sm:px-6 w-full lg:px-10 xl:px-36">
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

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <div
        v-for="product in categoryProducts"
        :key="product.id"
        class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col"
      >
        <!-- Product Image Container -->
        <div class="relative w-full pt-[100%] bg-gray-50">
          <img
            :src="getImageUrl(product.image)"
            :alt="product.title"
            class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
            loading="lazy"
            @click.stop="openView(product)"
          />
          
          <!-- Discount Badge -->
          <div v-if="product.discount > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {{ product.discount }}% OFF
          </div>
          
          <!-- Favorite Button -->
          <button
            @click.stop="toggleFavorite(product.id)"
            class="absolute top-2 left-2 bg-white rounded-full size-8 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all"
            title="Add to favorites"
          >
            <i class="pi text-sm" :class="isFavorite(product.id) ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400'"></i>
          </button>
          
          <!-- Quick Add to Cart -->
          <button
            @click.stop="addToCart(product)"
            :disabled="product.stock <= 0"
            class="absolute bottom-2 right-2 bg-white rounded-full size-10 p-2 shadow-sm hover:bg-orange-50 transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Add to Cart"
          >
            <i class="pi pi-shopping-cart text-orange-500 text-sm"></i>
          </button>

          <!-- Out of Stock Badge -->
          <div v-if="product.stock <= 0" class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span class="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">OUT OF STOCK</span>
          </div>
        </div>

        <!-- Product Content -->
        <div class="p-3 flex flex-col flex-grow">
          <!-- Title -->
          <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1.5">
            {{ product.title }}
          </h3>

          <!-- Price -->
          <div class="flex items-baseline gap-1 mb-1">
            <span class="text-base font-bold text-red-600">
              {{ currencyStore.getDisplayPrice(product.price) }}
            </span>
            <span
              v-if="product.originalPrice && product.originalPrice > product.price"
              class="text-xs text-gray-500 line-through"
            >
              {{ currencyStore.getDisplayPrice(product.originalPrice) }}
            </span>
          </div>

          <!-- Rating and Reviews -->
          <div class="flex items-center gap-1 mb-2">
            <div class="flex text-yellow-400">
              <i v-for="star in 5" :key="star" class="pi text-xs" 
                :class="star <= Math.round(product.rating) ? 'pi-star-fill' : 'pi-star'"></i>
            </div>
            <span class="text-xs text-gray-500">
              {{ product.rating.toFixed(1) }} ({{ product.reviewCount }} reviews)
            </span>
          </div>

          <!-- Bottom Buttons -->
          <div class="flex gap-2 mt-auto">
            <button
              class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors"
              @click.stop="openView(product)"
            >
              View details
            </button>
            <button
              class="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 text-xs rounded transition-colors"
              @click.stop="openSimilarItems(product)"
            >
              Similar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-12">
      <div class="text-red-500 mb-4">
        <i class="pi pi-exclamation-triangle text-4xl"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
      <p class="text-gray-500 mb-4">{{ error }}</p>
      <button
        @click="fetchCategoryProducts"
        class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        Retry
      </button>
    </div>

    <!-- Similar Items Modal -->
    <div v-if="showSimilarDialog" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-semibold">Similar Items to {{ similarItemsProduct?.title }}</h3>
          <button @click="closeSimilarDialog" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="p-4 overflow-y-auto flex-grow">
          <div v-if="similarItemsLoading" class="flex justify-center items-center h-40">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              v-for="product in similarItems"
              :key="product.id"
              class="border rounded-lg overflow-hidden hover:shadow-md transition flex flex-col"
            >
              <div class="relative aspect-square bg-gray-50">
                <div class="w-full h-full flex items-center justify-center p-4">
                  <img 
                    :src="getImageUrl(product.image)" 
                    :alt="product.title"
                    class="max-h-full max-w-full object-contain"
                    :style="{ height: '120px', width: 'auto' }"
                    loading="lazy"
                  >
                </div>
              </div>
              <div class="p-3 flex flex-col flex-grow">
                <h4 class="text-sm font-medium line-clamp-2 mb-1">{{ product.title }}</h4>
                <div class="text-red-600 font-bold text-sm mb-2">{{ currencyStore.getDisplayPrice(product.price) }}</div>
                <button 
                  @click="addToCart(product)"
                  :disabled="product.stock <= 0"
                  class="mt-auto w-full bg-orange-500 text-white py-1 text-xs rounded hover:bg-orange-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {{ product.stock <= 0 ? 'Out of Stock' : 'Add to Cart' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="p-4 border-t text-right">
          <button 
            @click="closeSimilarDialog"
            class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product } from '../../../store/storeProduct'
import { useRouter } from 'vue-router'
import { fetchProductsByCategory } from '../../../store/productApi'
import { useCartStore } from '../../../store/cartStore'
import useFavorites from "../../../store/favoritesStore"
import { useCurrencyStore } from '../../../store/currencyStore'
const currencyStore = useCurrencyStore();

// State
const router = useRouter()
const showSimilarDialog = ref(false)
const similarItemsProduct = ref<Product | null>(null)
const categoryProducts = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const similarItemsLoading = ref(false)

// Stores
const cartStore = useCartStore()
const { isFavorite, toggleFavorite } = useFavorites()

// Computed
const similarItems = computed(() => {
  if (!similarItemsProduct.value) return []
  return categoryProducts.value.filter(
    p => p.category === similarItemsProduct.value?.category && 
         p.id !== similarItemsProduct.value?.id
  ).slice(0, 8)
})

const fallbackImage = 'https://via.placeholder.com/80'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Methods
const openView = (product: Product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

function getImageUrl(imagePath?: string | null) {
  if (!imagePath) return fallbackImage
  if (imagePath.startsWith('http')) return imagePath
  const fixedPath = imagePath.replace(/^\/images\//, '/uploads/')
  return `${apiBaseUrl}${fixedPath}`
}

const fetchCategoryProducts = async () => {
  try {
    loading.value = true
    error.value = null
    categoryProducts.value = await fetchProductsByCategory('')
  } catch (err) {
    console.error('Failed to fetch category products:', err)
    error.value = 'Failed to load products. Please try again later.'
  } finally {
    loading.value = false
  }
}

const addToCart = (product: Product, quantity: number = 1) => {
  if (product.stock <= 0) return
  cartStore.addToCart(product, quantity)
  product.stock -= quantity
}

const openSimilarItems = (product: Product) => {
  similarItemsProduct.value = product
  showSimilarDialog.value = true
}

const closeSimilarDialog = () => {
  showSimilarDialog.value = false
  similarItemsProduct.value = null
}

onMounted(() => {
  fetchCategoryProducts()
});
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

/* Smooth transitions for hover effects */
.transition {
  transition: all 0.2s ease;
}
</style>