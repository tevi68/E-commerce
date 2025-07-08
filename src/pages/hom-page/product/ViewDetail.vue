<template>
  <div class="fixed inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-overlay-in">
    <div class="bg-white/95 backdrop-blur-md rounded-[2rem] max-w-[95vw] xl:max-w-[90vw] w-full max-h-[95vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] transform transition-all duration-700 hover:shadow-[0_60px_120px_rgba(0,0,0,0.4)] border border-white/20 animate-modal-in">
      
      <!-- Floating Close Button -->
      <button 
        @click="$emit('close')" 
        class="absolute -top-4 -right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-[0_8px_30px_rgba(244,63,94,0.3)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(244,63,94,0.5)] hover:scale-110 flex items-center justify-center group"
      >
        <i class="pi pi-times text-lg group-hover:rotate-90 transition-transform duration-300"></i>
      </button>

      <div class="overflow-y-auto max-h-[95vh] custom-scrollbar">
        <div class="grid grid-cols-1 xl:grid-cols-5 gap-0 min-h-[700px]">
          
          <!-- Product Images Section - 3 columns -->
          <div class="xl:col-span-3 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 xl:p-12 space-y-8 relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <!-- Main Image Container -->
            <div class="relative z-10">
              <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden h-[400px] xl:h-[550px] flex items-center justify-center relative group border border-white/50">
                <img 
                  :src="selectedImage || currentProduct.image" 
                  :alt="currentProduct.title" 
                  class="max-h-[90%] max-w-[90%] object-contain transition-all duration-700 group-hover:scale-110 filter drop-shadow-2xl"
                />
                
                <!-- Floating Badges -->
                <div v-if="currentProduct.discount > 0" class="absolute top-6 left-6 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-[0_8px_25px_rgba(244,63,94,0.4)] animate-pulse-slow">
                  <i class="pi pi-tag mr-2"></i>
                  {{ currentProduct.discount }}% OFF
                </div>

                <div class="absolute top-6 right-6 px-6 py-3 rounded-full text-sm font-bold shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-sm"
                  :class="currentProduct.stock > 0 ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'">
                  <i :class="currentProduct.stock > 0 ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'" class="mr-2"></i>
                  {{ currentProduct.stock > 0 ? `${currentProduct.stock} Available` : 'Out of Stock' }}
                </div>

                <!-- Image Navigation -->
                <div class="absolute inset-y-0 left-4 flex items-center">
                  <button 
                    @click="previousImage"
                    class="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <i class="pi pi-chevron-left text-gray-700"></i>
                  </button>
                </div>
                <div class="absolute inset-y-0 right-4 flex items-center">
                  <button 
                    @click="nextImage"
                    class="w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 opacity-0 group-hover:opacity-100"
                  >
                    <i class="pi pi-chevron-right text-gray-700"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Image Gallery -->
            <div class="space-y-6 relative z-10">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Gallery</h3>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <i class="pi pi-images"></i>
                  {{ productImages.length }} photos
                </div>
              </div>
              
              <div class="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4">
                <div 
                  v-for="(img, index) in productImages" 
                  :key="index"
                  @click="selectedImage = img"
                  class="aspect-square cursor-pointer border-2 rounded-2xl overflow-hidden transition-all duration-500 hover:border-rose-400 hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] hover:scale-105 transform"
                  :class="selectedImage === img ? 'border-rose-500 shadow-[0_8px_30px_rgba(244,63,94,0.4)] scale-105' : 'border-gray-200 hover:border-rose-300'"
                >
                  <img :src="img" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
              </div>
            </div>
            
            <!-- Related Products -->
            <div v-if="relatedProducts.length > 0" class="space-y-6 relative z-10">
              <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Similar Products</h3>
              <div class="grid grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-4">
                <div 
                  v-for="product in relatedProducts" 
                  :key="product.id"
                  @click="selectRelatedProduct(product)"
                  class="aspect-square cursor-pointer border-2 rounded-2xl overflow-hidden transition-all duration-500 hover:border-rose-400 hover:shadow-[0_8px_30px_rgba(244,63,94,0.3)] hover:scale-105 border-gray-200 relative group transform"
                >
                  <img :src="product.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-2">
                    <span class="text-white text-xs font-medium text-center">{{ product.title.substring(0, 20) }}...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Information Section - 2 columns -->
          <div class="xl:col-span-2 p-8 xl:p-12 space-y-8 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-100/30 to-purple-100/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            
            <div class="relative z-10 space-y-8">
              <!-- Header -->
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <span class="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full text-sm font-bold shadow-lg">
                    {{ currentProduct.category }}
                  </span>
                  <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">SKU: #{{ currentProduct.id }}</span>
                </div>
                <h1 class="text-4xl xl:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
                  {{ currentProduct.title }}
                </h1>
              </div>

              <!-- Rating & Reviews -->
              <div class="flex items-center gap-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                <div class="flex items-center gap-3">
                  <div class="flex items-center gap-1">
                    <i 
                      v-for="n in 5" 
                      :key="n"
                      :class="n <= Math.round(currentProduct.rating) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                      class="text-lg transition-all duration-300 hover:scale-125"
                    ></i>
                  </div>
                  <span class="text-lg font-bold text-gray-800">{{ currentProduct.rating.toFixed(1) }}</span>
                </div>
                <div class="h-6 w-px bg-gray-300"></div>
                <div class="flex items-center gap-2 text-gray-600">
                  <i class="pi pi-users"></i>
                  <span class="font-medium">{{ currentProduct.reviewCount }} reviews</span>
                </div>
              </div>

              <!-- Price Section -->
              <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-white/50 space-y-4">
                <div class="flex items-baseline gap-6">
                  <span class="text-5xl font-black bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                    ${{ currentProduct.price.toFixed(2) }}
                  </span>
                  <span v-if="currentProduct.originalPrice" class="text-3xl text-gray-400 line-through font-medium">
                    ${{ currentProduct.originalPrice.toFixed(2) }}
                  </span>
                </div>
                <div v-if="currentProduct.originalPrice" class="flex items-center gap-2 text-emerald-600 font-bold">
                  <i class="pi pi-tag"></i>
                  <span>You save ${{ (currentProduct.originalPrice - currentProduct.price).toFixed(2) }}</span>
                </div>
              </div>

              <!-- Description -->
              <div class="space-y-4">
                <h3 class="text-2xl font-bold text-gray-800">About this product</h3>
                <p class="text-gray-600 leading-relaxed text-lg">{{ currentProduct.description }}</p>
              </div>

              <!-- Features -->
              <div v-if="currentProduct.features?.length" class="space-y-4">
                <h3 class="text-2xl font-bold text-gray-800">Key Features</h3>
                <div class="grid grid-cols-1 gap-4">
                  <div v-for="(feature, index) in currentProduct.features" :key="index" 
                    class="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                    <div class="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center flex-shrink-0">
                      <i class="pi pi-check text-white text-sm"></i>
                    </div>
                    <span class="text-gray-700 font-medium">{{ feature }}</span>
                  </div>
                </div>
              </div>

              <!-- Purchase Section -->
              <div class="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4 space-y-8 -mx-8 xl:-mx-12 px-8 xl:px-12">
                <!-- Quantity Selector -->
                <div class="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg">
                  <div class="flex items-center gap-6">
                    <label class="text-lg font-bold text-gray-800">Quantity:</label>
                    <div class="flex items-center border-2 border-rose-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                      <button 
                        @click="quantity > 1 ? quantity-- : null"
                        class="w-14 h-14 flex items-center justify-center hover:bg-rose-50 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                        :disabled="quantity <= 1"
                      >
                        <i class="pi pi-minus text-rose-600 font-bold"></i>
                      </button>
                      <input 
                        type="number" 
                        v-model.number="quantity"
                        min="1" 
                        :max="currentProduct.stock"
                        class="w-20 text-center border-none bg-transparent py-4 focus:outline-none text-xl font-bold text-gray-800"
                      >
                      <button 
                        @click="quantity < currentProduct.stock ? quantity++ : null"
                        class="w-14 h-14 flex items-center justify-center hover:bg-rose-50 transition-all duration-300 disabled:opacity-50 hover:scale-110"
                        :disabled="quantity >= currentProduct.stock"
                      >
                        <i class="pi pi-plus text-rose-600 font-bold"></i>
                      </button>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-500 mb-1">Total Price</div>
                    <div class="text-3xl font-black bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                      ${{ (currentProduct.price * quantity).toFixed(2) }}
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-4">
                  <button 
                    @click="addToCart"
                    class="flex-1 bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:via-rose-700 hover:to-rose-800 text-white py-6 px-8 rounded-2xl font-black text-lg shadow-[0_10px_40px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_50px_rgba(244,63,94,0.6)] transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    :disabled="currentProduct.stock <= 0"
                  >
                    <i class="pi pi-shopping-cart text-xl"></i>
                    <span>{{ currentProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}</span>
                  </button>
                  
                  <button 
                    @click.stop="handleToggleFavorite"
                    class="w-20 h-20 flex items-center justify-center rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 border-2"
                    :class="{
                      'bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-500 border-red-200': isFavorite(currentProduct.id),
                      'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-500 border-gray-200': !isFavorite(currentProduct.id)
                    }"
                  >
                    <i 
                      class="pi text-3xl transition-all duration-300 hover:scale-125"
                      :class="{
                        'pi-heart-fill': isFavorite(currentProduct.id),
                        'pi-heart': !isFavorite(currentProduct.id)
                      }"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useProductStore } from '../../../store/storeProduct'
import type { Product } from '../../../store/storeProduct'
import useFavoriteStore from '../../../store/favoritesStore'

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart', 'change-product'])

const toast = useToast()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()

// Product data and images
const selectedImage = ref('')
const quantity = ref(1)
const currentImageIndex = ref(0)

// Use the product directly from props since it matches our store structure
const currentProduct = computed(() => props.product)

// Get all images for the product
const productImages = computed(() => {
  return currentProduct.value.images?.length > 0 
    ? currentProduct.value.images 
    : [currentProduct.value.image]
})

// Get related products from the same category (excluding current product)
const relatedProducts = computed(() => {
  return productStore.allProducts
    .filter(p => 
      p.category === currentProduct.value.category && 
      p.id !== currentProduct.value.id
    )
    .slice(0, 8) // Show max 8 related products
})

// Image navigation
const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
  selectedImage.value = productImages.value[currentImageIndex.value]
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 ? productImages.value.length - 1 : currentImageIndex.value - 1
  selectedImage.value = productImages.value[currentImageIndex.value]
}

// Set the first image as selected when component mounts
onMounted(() => {
  if (productImages.value.length > 0) {
    selectedImage.value = productImages.value[0]
    currentImageIndex.value = 0
  }
})

// Favorite functionality
const isFavorite = (productId: number) => {
  return favoriteStore.isFavorite(productId)
}

const handleToggleFavorite = () => {
  const wasFavorite = isFavorite(currentProduct.value.id)
  favoriteStore.toggleFavorite(currentProduct.value.id)
  
  toast.add({
    severity: wasFavorite ? 'info' : 'success',
    summary: wasFavorite ? 'Removed from Favorites' : 'Added to Favorites',
    detail: wasFavorite 
      ? `${currentProduct.value.title} removed from favorites`
      : `${currentProduct.value.title} added to favorites`,
    life: 2000
  })
}

// Add to cart functionality
const addToCart = () => {
  if (currentProduct.value.stock <= 0) {
    toast.add({
      severity: 'warn',
      summary: 'Out of Stock',
      detail: 'This product is currently out of stock',
      life: 3000
    })
    return
  }

  emit('add-to-cart', {
    ...currentProduct.value,
    quantity: quantity.value
  })

  toast.add({
    severity: 'success',
    summary: 'Added to Cart',
    detail: `${currentProduct.value.title} has been added to your cart`,
    life: 3000
  })

  // Update stock in store
  productStore.addToCart(currentProduct.value.id)
}

// Function to handle clicking on a related product
const selectRelatedProduct = (product: Product) => {
  emit('change-product', product)
  selectedImage.value = product.images?.[0] || product.image
  quantity.value = 1
  currentImageIndex.value = 0
}
</script>

<style scoped>
.animate-overlay-in {
  animation: overlayIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.animate-modal-in {
  animation: modalIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-pulse-slow {
  animation: pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes overlayIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(12px);
  }
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 63, 94, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, rgba(244, 63, 94, 0.3), rgba(244, 63, 94, 0.5));
  border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, rgba(244, 63, 94, 0.5), rgba(244, 63, 94, 0.7));
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>