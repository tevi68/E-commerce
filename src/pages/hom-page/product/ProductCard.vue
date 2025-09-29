<template>
  <div class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col">
    <!-- Product Image Container (Full Card Width) -->
    <div class="relative w-full pt-[100%] bg-gray-50"> <!-- 1:1 Aspect Ratio -->
      <!-- Image that fills container while maintaining aspect ratio -->
      <img
        :src="getImageUrl(product.image)"
        :alt="product.title || 'Product image'"
        class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300 cursor-pointer"
        @click.stop="$emit('view-product', product)"
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
        @click.stop="$emit('add-to-cart', product)"
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
          {{ currencyStore.getDisplayPrice(product.price) }}
        </span>
        <span
          v-if="product.originalPrice"
          class="text-xs text-gray-500 line-through"
        >
          {{ currencyStore.getDisplayPrice(product.originalPrice) }}
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
          @click.stop="$emit('open-similar', product)"
        >
          Similar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import useFavorites from '../../../store/favoritesStore'
import { useCurrencyStore } from '../../../store/currencyStore'
const currencyStore = useCurrencyStore();

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'view-product', 'open-similar'])
const { isFavorite, toggleFavorite } = useFavorites()

const router = useRouter()
const openView = (product: any) => {
  router.push(`/product/${product.id}`)
}
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return '/fallback-image.png'
  if (imagePath.startsWith('http')) return imagePath
  const fixedPath = imagePath.replace(/^\/images\//, '/uploads/')
  return apiBaseUrl + fixedPath
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}
</style>