<template>
    <section class="bg-white py-4 px-4 sm:px-6 max-w-7xl mx-auto"> <!-- Changed container classes to match Product.vue -->
        <!-- Section Title -->
        <div class="text-center mb-10 relative"> <!-- Changed mb-12 to mb-10 to match -->
            <!-- Title -->
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 relative inline-block"> <!-- Changed font-extrabold to font-bold -->
                <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform translate-y-1"></span>
                <span class="text-orange-500 animate-pulse">🔥</span> Today's Deals
            </h2>

            <!-- Subtitle -->
            <p class="text-gray-500 mt-4 max-w-lg mx-auto"> <!-- Changed mt-2 to mt-4 and added max-w-lg -->
                Limited-time offers ending soon! Hurry, deals expire at midnight Cambodia time.
            </p>

            <!-- Floating / Inline Cambodia Time Badge -->
            <div class="mt-4 sm:mt-0 flex justify-center sm:justify-end sm:absolute sm:top-0 sm:right-6 z-10">
                <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg flex items-center animate-pulse text-sm sm:text-base">
                    <span class="pi pi-clock mr-1 sm:mr-2"></span>
                    <span class="font-mono font-bold">{{ cambodiaTime }}</span>
                    <span class="ml-1 text-xs bg-white/20 px-1 sm:px-2 py-0.5 rounded-full">PHNOM PENH</span>
                </div>
            </div>
        </div>

        <!-- Enhanced PrimeVue Carousel -->
        <div class="relative">
            <Carousel
                v-if="todayDeals.length > 0"
                :value="todayDeals"
                :numVisible="4"
                :numScroll="1"
                :circular="true"
                :autoplayInterval="3000"
                :responsiveOptions="responsiveOptions"
                :showIndicators="false"
                containerClass="p-1"
            >
                <template #item="slotProps">
                    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group mx-1 sm:mx-2 h-full border border-gray-200 hover:border-orange-300">
                        <!-- Product Image - Fixed height container -->
                        <div class="relative overflow-hidden h-48 w-full">
                            <img
                                :src="slotProps.data.image"
                                @click="openView(slotProps.data)"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                :alt="slotProps.data.title"
                            />
                            <!-- Hot Deal Badge -->
                            <div class="absolute top-3 left-3">
                                <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                    HOT DEAL
                                </span>
                            </div>
                            <!-- Discount Badge -->
                            <div v-if="slotProps.data.discount > 0" class="absolute top-3 right-3">
                                <span class="bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full border-2 border-orange-300 shadow-sm">
                                    -{{ slotProps.data.discount }}%
                                </span>
                            </div>
                        </div>

                        <!-- Product Info - Fixed height container -->
                        <div class="p-4 flex flex-col" style="height: 180px;">
                            <!-- Title - Fixed height with line clamp -->
                            <h3 class="font-bold text-lg text-gray-900 line-clamp-2 mb-2" style="height: 3.5rem;">
                                {{ slotProps.data.title }}
                            </h3>

                            <!-- Rating -->
                            <div class="flex items-center mb-3">
                                <div class="flex mr-2">
                                    <i v-for="n in 5"
                                        :key="'star-' + slotProps.data.id + '-' + n"
                                        :class="n <= Math.round(slotProps.data.rating) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                                        class="text-sm"
                                    ></i>
                                </div>
                                <span class="text-xs text-gray-500">({{ slotProps.data.reviewCount }})</span>
                            </div>

                            <!-- Price - Fixed at bottom -->
                            <div class="mt-auto">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-orange-500 font-bold text-xl">${{ slotProps.data.price.toFixed(2) }}</p>
                                        <p v-if="slotProps.data.originalPrice" class="text-gray-400 text-sm line-through">${{ slotProps.data.originalPrice.toFixed(2) }}</p>
                                    </div>
                                    <button 
                                        class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
                                        @click="openView(slotProps.data)"
                                    >
                                        <span class="pi pi-shopping-cart mr-2"></span> Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
            
            <!-- Empty State -->
            <div v-else class="text-center py-12">
                <p class="text-gray-500">No deals available today. Check back later!</p>
            </div>
            <ViewDetail
                v-if="showViewDetail && viewProduct"
                :product="viewProduct"
                @close="closeView"
                @add-to-cart="addToCart"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Carousel from 'primevue/carousel'
import ViewDetail from '../product/ViewDetail.vue'
import { products } from '../../../store/storeProduct'
import type { Product } from '../../../store/storeProduct'
import { useCartStore } from '../../../store/cartStore'


const showViewDetail = ref(false)
const viewProduct = ref<Product | null>(null)
const cartStore = useCartStore()

const cambodiaTime = ref('')

// Get today's deals from the products array
const todayDeals = computed(() => {
    return products.filter(product => product.today)
})

function updateCambodiaTime() {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Phnom_Penh',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    }
    cambodiaTime.value = new Date().toLocaleTimeString('en-US', options)
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
    updateCambodiaTime()
    interval = setInterval(updateCambodiaTime, 1000)
})

onBeforeUnmount(() => {
    clearInterval(interval)
})

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

const responsiveOptions = [
    {
        breakpoint: '1280px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
]
</script>

<style scoped>
@media (max-width: 768px) {
  /* Hide prev/next carousel buttons on small screens */
  ::v-deep(.p-carousel-prev-button),
  ::v-deep(.p-carousel-next-button) {
    display: none !important;
  }
}

</style>