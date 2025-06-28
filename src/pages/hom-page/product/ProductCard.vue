<template>
    <div class="group">
        <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 relative">
            <div class="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group border border-gray-100 hover:border-orange-200">

                <!-- Product Image -->
                <img 
                    @click.stop="$emit('view-product', product)"
                    :src="product.image"
                    :alt="product.title"
                    class="w-full h-48 sm:h-64 object-cover transform group-hover:scale-105 transition duration-500 cursor-pointer"
                />

                <!-- Sale Badge -->
                <span 
                    v-if="product.isOnSale" 
                    class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md"
                >
                    {{ product.discount }}% OFF
                </span>

                <!-- Favorite Button -->
                <button
                    @click.stop="toggleFavorite(product.id)"
                    class="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                    <span 
                        class="pi"
                        :class="isFavorite(product.id) ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-500 hover:text-red-400'" 
                    ></span>
                </button>

                <!-- View Product Slide-up -->
                <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                    @click.stop="$emit('view-product', product)"
                    class="w-full bg-black/80 text-white py-2 font-medium text-sm hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                        VIEW PRODUCT
                    </button>
                </div>
                </div>


            <!-- Product Details -->
            <div class="p-4 flex flex-col">
                <span class="text-xs font-medium text-orange-500 mb-1">{{ product.category }}</span>
                <h3 class="font-semibold text-gray-900 line-clamp-2 mb-2 hover:text-orange-500 transition-colors">
                    {{ product.title }}
                </h3>
                <div class="flex items-center mb-3">
                    <div class="flex">
                        <svg v-for="star in 5" :key="star" 
                            :class="['h-4 w-4', star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300']" 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <span class="text-xs text-gray-500 ml-1">({{ product.reviewCount }})</span>
                </div>
                <div class="mt-auto flex justify-between items-center">
                    <div>
                        <p class="text-orange-500 font-bold text-lg">${{ product.price.toFixed(2) }}</p>
                        <p v-if="product.originalPrice" class="text-gray-400 text-sm line-through">${{ product.originalPrice.toFixed(2) }}</p>
                    </div>
                
                    <button  @click.stop="$emit('view-product', product)" class="bg-orange-500 hover:bg-orange-600 text-white p-1 inline-block size-8 rounded-full ring-2 ring-orange-500">
                        <i class="pi pi-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import useFavorites from '../../../store/favoritesStore'

defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['add-to-cart', 'toggle-favorite', 'view-product']);
const { isFavorite, toggleFavorite } = useFavorites()
</script>