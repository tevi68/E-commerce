<template>
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl animate-fade-in">
            <!-- Close Button -->
            <button 
                @click="$emit('close')" 
                class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 flex items-center justify-center"
            >
                <i class="pi pi-times"></i>
            </button>

            <div class="overflow-y-auto max-h-[95vh] custom-scrollbar">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <!-- Product Images Section -->
                    <div class="bg-gray-50 p-6 lg:p-8 space-y-6">
                        <!-- Main Image -->
                        <div class="bg-white rounded-xl shadow-sm overflow-hidden h-80 lg:h-96 flex items-center justify-center relative">
                            <img 
                                :src="selectedImage || currentProduct.image" 
                                :alt="currentProduct.title" 
                                class="max-h-full max-w-full object-contain"
                            />
                            <!-- Discount Badge -->
                            <div v-if="currentProduct.discount > 0" class="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                -{{ currentProduct.discount }}% OFF
                            </div>
                        </div>

                        <!-- Thumbnail Carousel -->
                        <div class="space-y-4">
                            <h3 class="font-semibold text-gray-800">Product Images</h3>
                            <div class="flex gap-3 overflow-x-auto py-2">
                                <div 
                                    v-for="(img, index) in productImages" 
                                    :key="index"
                                    @click="selectedImage = img"
                                    class="flex-shrink-0 w-16 h-16 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:border-orange-400"
                                    :class="selectedImage === img ? 'border-orange-500 scale-105' : 'border-gray-200'"
                                >
                                    <img :src="img" class="w-full h-full object-cover" />
                                </div>
                            </div>
                            
                            <!-- Related Products from Same Category -->
                            <div v-if="relatedProducts.length > 0">
                                <h3 class="font-semibold text-gray-800">More from {{ currentProduct.category }}</h3>
                                <div class="flex gap-3 overflow-x-auto py-2">
                                    <div 
                                        v-for="product in relatedProducts" 
                                        :key="product.id"
                                        @click="selectRelatedProduct(product)"
                                        class="flex-shrink-0 w-16 h-16 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200 hover:border-orange-400 border-gray-200 relative"
                                    >
                                        <img :src="product.image" class="w-full h-full object-cover" />
                                        <div class="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <i class="pi pi-eye text-white"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Product Info Section -->
                    <div class="p-6 lg:p-8 space-y-6">
                        <!-- Title & Category -->
                        <div>
                            <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">{{ currentProduct.title }}</h1>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{{ currentProduct.category }}</span>
                            </div>
                        </div>

                        <!-- Rating & Reviews -->
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                <div class="flex">
                                    <i 
                                    v-for="n in 5" 
                                    :key="n"
                                    :class="n <= Math.round(currentProduct.rating) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                                    class="text-sm"
                                    ></i>
                                </div>
                                <span class="text-sm font-medium text-gray-600">{{ currentProduct.rating.toFixed(1) }}</span>
                            </div>
                            <span class="text-sm text-gray-500">({{ currentProduct.reviewCount }} reviews)</span>
                        </div>

                        <!-- Price & Stock -->
                        <div class="space-y-2">
                            <div class="flex items-baseline gap-3">
                                <span class="text-3xl font-bold text-orange-600">${{ currentProduct.price.toFixed(2) }}</span>
                                <span v-if="currentProduct.originalPrice" class="text-xl text-gray-400 line-through">${{ currentProduct.originalPrice.toFixed(2) }}</span>
                            </div>
                            <div v-if="currentProduct.stock > 0" class="flex items-center gap-2">
                                <span class="text-sm text-green-600 flex items-center gap-1">
                                    <i class="pi pi-check-circle"></i> In Stock
                                </span>
                                <span class="text-xs text-gray-500">• {{ currentProduct.stock }} available</span>
                            </div>
                            <div v-else class="text-sm text-red-600 flex items-center gap-1">
                                <i class="pi pi-times-circle"></i> Out of Stock
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="pt-4 border-t border-gray-100">
                            <h3 class="font-semibold text-lg mb-3 text-gray-800">Description</h3>
                            <p class="text-gray-700 leading-relaxed">{{ currentProduct.description }}</p>
                        </div>

                        <!-- Features -->
                        <div v-if="currentProduct.features?.length" class="pt-4 border-t border-gray-100">
                            <h3 class="font-semibold text-lg mb-3 text-gray-800">Key Features</h3>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <li v-for="(feature, index) in currentProduct.features" :key="index" class="flex items-start gap-2">
                                    <i class="pi pi-check-circle text-green-500 mt-0.5"></i>
                                    <span class="text-gray-700">{{ feature }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- Add to Cart -->
                        <div class="sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-100 space-y-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-4">
                                    <label class="text-sm font-medium text-gray-700">Quantity:</label>
                                    <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button 
                                            @click="quantity > 1 ? quantity-- : null"
                                            class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                                            :disabled="quantity <= 1"
                                        >
                                            <i class="pi pi-minus text-xs"></i>
                                        </button>
                                        <input 
                                            type="number" 
                                            v-model.number="quantity"
                                            min="1" 
                                            :max="currentProduct.stock"
                                            class="w-12 text-center border-x border-gray-300 py-1 focus:outline-none"
                                        >
                                        <button 
                                            @click="quantity < currentProduct.stock ? quantity++ : null"
                                            class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                                            :disabled="quantity >= currentProduct.stock"
                                        >
                                            <i class="pi pi-plus text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="text-lg font-semibold text-gray-800">
                                    Total: <span class="text-orange-600">${{ (currentProduct.price * quantity).toFixed(2) }}</span>
                                </div>
                            </div>

                            <div class="flex gap-3">
                                <button 
                                    @click="addToCart"
                                    class="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                    :disabled="currentProduct.stock <= 0"
                                    :class="{'opacity-70 cursor-not-allowed': currentProduct.stock <= 0}"
                                >
                                    <i class="pi pi-shopping-cart"></i>
                                    Add to Cart
                                </button>
                                <button 
                                    @click.stop="handleToggleFavorite"
                                    class="w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:shadow-md"
                                    :class="{
                                        'bg-red-50 hover:bg-red-100 text-red-500': isFavorite(currentProduct.id),
                                        'bg-gray-50 hover:bg-gray-100 text-gray-500': !isFavorite(currentProduct.id)
                                    }"
                                >
                                    <i 
                                        class="pi text-xl transition-all duration-300"
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
    .slice(0, 5) // Show max 5 related products
})

// Set the first image as selected when component mounts
onMounted(() => {
  if (productImages.value.length > 0) {
    selectedImage.value = productImages.value[0]
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
  quantity.value = 1 // Reset quantity when changing products
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(251, 146, 60, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(251, 146, 60, 0.3);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 146, 60, 0.5);
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