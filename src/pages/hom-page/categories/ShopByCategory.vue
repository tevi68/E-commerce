<template>
  <div class="bg-white py-8 px-4 sm:px-6 w-full lg:px-10 xl:px-36">

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
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <div
        v-for="product in categoryProducts"
        :key="product.id"
        class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col"
      >
        <!-- Product Image Container (Full Card Width) -->
        <div class="relative w-full pt-[100%] bg-gray-50"> <!-- 1:1 Aspect Ratio -->
          <!-- Image that fills container while maintaining aspect ratio -->
          <img
            :src="product.image"
            :alt="product.title"
            class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
          
          <!-- Discount Badge -->
          <div v-if="product.discount" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
            class="absolute bottom-2 right-2 bg-white rounded-full size-10 p-2 shadow-sm hover:bg-orange-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
            title="Add to Cart"
          >
            <i class="pi pi-shopping-cart text-orange-500 text-sm"></i>
          </button>
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
              KHR{{ product.price.toLocaleString() }}
            </span>
            <span
              v-if="product.originalPrice"
              class="text-xs text-gray-500 line-through"
            >
              KHR{{ product.originalPrice.toLocaleString() }}
            </span>
          </div>

          <!-- Rating and Sold -->
          <div class="flex items-center gap-1 mb-2">
            <div class="flex text-yellow-400">
              <i v-for="star in 5" :key="star" class="pi text-xs" 
                :class="star <= Math.round(product.rating) ? 'pi-star-fill' : 'pi-star'"></i>
            </div>
            <span class="text-xs text-gray-500">
              {{ product.rating.toFixed(1) }} | {{ product.reviewCount || 0 }} sold
            </span>
          </div>

          <!-- Bottom Buttons -->
          <div class="flex gap-2 mt-auto">
            <button
              class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors"
              @click.stop="openView(product)"
            >
              See preview
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

    <!-- Modals -->
    <ViewDetail
      v-if="showViewDetail && viewProduct"
      :product="viewProduct"
      @close="closeView"
      @add-to-cart="addToCart"
    />

    <div v-if="showSimilarDialog" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="p-4 border-b flex justify-between items-center">
          <h3 class="text-lg font-semibold">Similar Items to {{ similarItemsProduct?.title }}</h3>
          <button @click="closeSimilarDialog" class="text-gray-500 hover:text-gray-700">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div class="p-4 overflow-y-auto flex-grow">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
              v-for="product in similarItems"
              :key="product.id"
              class="border rounded-lg overflow-hidden hover:shadow-md transition flex flex-col"
            >
              <div class="relative aspect-square bg-gray-50">
                <div class="w-full h-full flex items-center justify-center p-4">
                  <img 
                    :src="product.image" 
                    :alt="product.title"
                    class="max-h-full max-w-full object-contain"
                    :style="{ height: '120px', width: 'auto' }"
                  >
                </div>
              </div>
              <div class="p-3 flex flex-col flex-grow">
                <h4 class="text-sm font-medium line-clamp-2 mb-1">{{ product.title }}</h4>
                <div class="text-red-600 font-bold text-sm mb-2">KHR{{ product.price.toLocaleString() }}</div>
                <button 
                  @click="addToCart(product)"
                  class="mt-auto w-full bg-orange-500 text-white py-1 text-xs rounded hover:bg-orange-600 transition"
                >
                  Add to Cart
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
import { ref, computed } from 'vue'
import type { Product } from '../../../store/storeProduct'
import ViewDetail from '../product/ViewDetail.vue'
import { useProductStore } from '../../../store/storeProduct' 
import { useCartStore } from '../../../store/cartStore'
import useFavorites from "../../../store/favoritesStore"

const showViewDetail = ref(false)
const viewProduct = ref<Product | null>(null)
const showSimilarDialog = ref(false)
const similarItemsProduct = ref<Product | null>(null)
const cartStore = useCartStore()
const productStore = useProductStore()
const { isFavorite, toggleFavorite } = useFavorites()

const categoryProducts = computed(() => productStore.productsByCat)
const similarItems = computed(() => {
  if (!similarItemsProduct.value) return []
  return productStore.productsByCat.filter(
    p => p.category === similarItemsProduct.value?.category && p.id !== similarItemsProduct.value?.id
  ).slice(0, 8)
})

const addToCart = (product: Product, quantity: number = 1) => {
  cartStore.addToCart(product, quantity)
}

const openView = (product: Product) => {
  viewProduct.value = product
  showViewDetail.value = true
}

const closeView = () => {
  showViewDetail.value = false
}

const openSimilarItems = (product: Product) => {
  similarItemsProduct.value = product
  showSimilarDialog.value = true
}

const closeSimilarDialog = () => {
  showSimilarDialog.value = false
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>