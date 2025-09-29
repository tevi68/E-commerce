<template>
    <section class="bg-white py-10 px-4 sm:px-6 w-full lg:px-10 xl:px-20">
        <!-- Section Title -->
        <div class="text-center mb-10 relative">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 relative inline-block">
                <span class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform translate-y-1"></span>
                <span class="text-orange-500 animate-pulse">🔥</span> Today's Deals
            </h2>
            <p class="text-gray-500 mt-4 max-w-lg mx-auto">
                Limited-time offers ending soon! Hurry, deals expire at midnight Cambodia time.
            </p>
            <div class="mt-4 sm:mt-0 flex justify-center sm:justify-end sm:absolute sm:top-0 sm:right-6 z-10">
                <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg flex items-center animate-pulse text-sm sm:text-base">
                    <span class="pi pi-clock mr-1 sm:mr-2"></span>
                    <span class="font-mono font-bold">{{ cambodiaTime }}</span>
                    <span class="ml-1 text-xs bg-white/20 px-1 sm:px-2 py-0.5 rounded-full">PHNOM PENH</span>
                </div>
            </div>
        </div>
        <!-- Banner Grid Section -->
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-5">
            <!-- Main Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                <!-- Main Banner -->
                <div class="md:col-span-2 relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden group transition-all">
                    <div class="p-8 md:p-10 flex flex-col justify-between h-full relative z-10">
                        <span class="text-sm uppercase text-gray-500 mb-1">Watch & Accessories</span>
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">iWatch Series 2</h2>
                        <p class="text-gray-600 mb-6 max-w-md">Premium smartwatch with advanced health monitoring and seamless connectivity.</p>
                        <button class="bg-gradient-to-r from-orange-400 to-yellow-300 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 group-hover:scale-105 w-fit">
                            Shop now
                        </button>
                    </div>
                    <!-- Image -->
                    <img src="https://media.mipc.com.mx/catalog/product/a/u/au-378500-3.png?width=480&height=480&store=default&image-type=image"
                        alt="iWatch"
                        class="absolute right-4 bottom-0 h-60 md:h-80 lg:h-96 object-contain transition-transform duration-500 group-hover:scale-105 z-0" />
                </div>
                <!-- Side Banners -->
                <div class="flex flex-col gap-6">
                    <!-- TV -->
                    <div class="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-hidden group transition">
                        <div class="z-10 relative">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">Ultra HD TV</h3>
                            <p class="text-gray-500 text-sm mb-4">Weekend Samsung discount</p>
                            <button class="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-4 py-1.5 rounded-full text-sm shadow-md hover:shadow-lg transition-transform group-hover:scale-105">
                                Shop now
                            </button>
                        </div>
                        <img src="https://media.mipc.com.mx/mipc/categorias-6.png"
                            alt="TV"
                            class="absolute right-2 bottom-0 h-24 md:h-25 lg:h-33 object-contain opacity-100 transition-transform duration-300 group-hover:scale-110 z-0" />
                    </div>
                    <!-- MacBook -->
                    <div class="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 overflow-hidden group transition">
                        <div class="z-10 relative">
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">Dron Dji Mini 3 </h3>
                            <p class="text-gray-500 text-sm mb-4">Dron Dji Mini 3 Sale</p>
                            <button class="bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold px-4 py-1.5 rounded-full text-sm shadow-md hover:shadow-lg transition-transform group-hover:scale-105">
                                Shop now
                            </button>
                        </div>
                        <img src="https://media.mipc.com.mx/catalog/product/d/j/dji-cpma0000061804.jpg?width=480&height=480&store=default&image-type=image"
                            alt="Macbook"
                            class="absolute right-2 bottom-0 h-24 md:h-25 lg:h-33 object-contain opacity-100 transition-transform duration-300 group-hover:scale-110 z-0" />
                    </div>
                </div>
            </div>
            <!-- Product Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 px-4">
                <!-- Tablet Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-center p-6 gap-5 border border-gray-100">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <img src="https://media.mipc.com.mx/catalog/product/g/e/gen-ax15azul.jpg?width=480&height=480&store=default&image-type=image" alt="Tablet" class="w-16 h-16 object-contain" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 font-medium mb-1">SAVE UP TO 50% OFF</div>
                        <h4 class="text-gray-800 text-sm font-semibold mb-1">Premium tablets for work and play</h4>
                        <div class="text-emerald-600 font-bold text-lg">From <span class="text-2xl">{{ currencyStore.getDisplayPrice(499.89) }}</span>.89</div>
                    </div>
                </div>
                <!-- Camera Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-center p-6 gap-5 border border-gray-100">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <img src="https://media.mipc.com.mx/catalog/product/s/w/sw-500-principal.jpg?width=480&height=480&store=default&image-type=image" alt="Camera" class="w-16 h-16 object-contain" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 font-medium mb-1">CHRISTMAS 50% OFF</div>
                        <h4 class="text-gray-800 text-sm font-semibold mb-1">Professional cameras for enthusiasts</h4>
                        <div class="text-emerald-600 font-bold text-lg">From <span class="text-2xl">{{ currencyStore.getDisplayPrice(399.00) }}</span>.00</div>
                    </div>
                </div>
                <!-- Headphone Card -->
                <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex items-center p-6 gap-5 border border-gray-100">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <img src="https://media.mipc.com.mx/mipc/categorias-11.png" alt="Headphone" class="w-16 h-16 object-contain" />
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 font-medium mb-1">HEADPHONE UP TO 30%</div>
                        <h4 class="text-gray-800 text-sm font-semibold mb-1">Immersive sound experience</h4>
                        <div class="text-emerald-600 font-bold text-lg">
                            <span class="text-2xl">{{ currencyStore.getDisplayPrice(69.99) }}</span>.99 
                            <span class="text-gray-400 line-through text-sm ml-1">{{ currencyStore.getDisplayPrice(199.99) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Banner Grid Section -->
        <!-- Carousel -->
        <div>
            <Carousel
                v-if="!loading && todayDeals.length"
                :value="todayDeals"
                :numVisible="5"
                :numScroll="1"
                :circular="true"
                :autoplayInterval="4000"
                :responsiveOptions="responsiveOptions"
                :showIndicators="false"
                containerClass="p-carousel-custom"
            >
                <template #item="{ data }">
                    <div class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col h-full">
                        <div class="relative w-full pt-[100%] bg-gray-50">
                            <img
                                :src="getImageUrl(data.image)"
                                :alt="data.title"
                                class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                                @click="openView(data)"
                            />
                            <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">HOT DEAL</div>
                            <div v-if="data.discount > 0" class="absolute top-2 right-2 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full border border-orange-300">
                                -{{ data.discount }}%
                            </div>
                            <button
                                @click.stop="addToCart(data)"
                                class="absolute bottom-2 right-2 bg-white rounded-full size-10 p-2 shadow-sm hover:bg-orange-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                title="Add to Cart"
                            >
                                <i class="pi pi-shopping-cart text-orange-500 text-sm"></i>
                            </button>
                        </div>
                        <!-- Product Content -->
                        <div class="p-3 flex flex-col flex-grow">
                            <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1.5">{{ data.title }}</h3>
                            <div v-if="data.rating" class="flex items-center gap-1 mb-1">
                                <div class="flex text-yellow-400">
                                    <i v-for="star in 5" :key="star" class="pi text-xs"
                                        :class="star <= Math.round(data.rating) ? 'pi-star-fill' : 'pi-star'"></i>
                                </div>
                                <span class="text-xs text-gray-500">
                                    {{ data.rating.toFixed(1) }} | {{ data.reviewCount || 0 }} sold
                                </span>
                            </div>
                            <div class="mt-auto">
                                <div class="flex items-baseline gap-1 mb-2">
                                    <span class="text-base font-bold text-red-600">{{ currencyStore.getDisplayPrice(data.price) }}</span>
                                    <span v-if="data.originalPrice" class="text-xs text-gray-500 line-through">{{ currencyStore.getDisplayPrice(data.originalPrice) }}</span>
                                </div>
                                <div class="flex gap-2 mt-auto">
                                    <button
                                        class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors"
                                        @click.stop="openView(data)"
                                    >
                                        See preview
                                    </button>
                                    <button
                                        class="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 text-xs rounded transition-colors"
                                        @click.stop="openView(data)"
                                    >
                                        Similar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
            <div v-else-if="loading" class="text-center py-12 text-gray-500">Loading today's deals...</div>
            <div v-else class="text-center py-12 text-gray-500">No deals available today. Check back later!</div>
        </div> <!-- This was the missing closing div -->
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Carousel from 'primevue/carousel'
import { useRouter } from 'vue-router'
import type { Product } from '../../../store/storeProduct'
import { useCartStore } from '../../../store/cartStore'
import { fetchProducts } from '../../../store/productApi'
import { useCurrencyStore } from '../../../store/currencyStore'
const currencyStore = useCurrencyStore();

const cartStore = useCartStore()
const todayDeals = ref<Product[]>([])
const loading = ref(true)
const cambodiaTime = ref('')
const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const fallbackImage = 'https://via.placeholder.com/150'

function getImageUrl(imagePath: string) {
  if (!imagePath) return fallbackImage
  if (imagePath.startsWith('http')) return imagePath

  // Fix '/images/' → '/uploads/'
  const fixedPath = imagePath.replace(/^\/images\//, '/uploads/')
  return `${apiBaseUrl}${fixedPath}`
}

// const formatPrice = (price: number): string => price.toFixed(2)

function updateCambodiaTime() {
  cambodiaTime.value = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Phnom_Penh',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  })
}

let interval: ReturnType<typeof setInterval>
onMounted(async () => {
  updateCambodiaTime()
  interval = setInterval(updateCambodiaTime, 1000)

  try {
    const products = await fetchProducts()
    todayDeals.value = products.filter(p => p.isOnToday)
  } catch (e) {
    console.error('Failed to fetch products', e)
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

const addToCart = (product: Product, quantity = 1) => {
  cartStore.addToCart(product, quantity)
}

const openView = (product: Product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

const responsiveOptions = [
  { breakpoint: '1280px', numVisible: 4, numScroll: 1 },
  { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
  { breakpoint: '768px', numVisible: 2, numScroll: 1 },
  { breakpoint: '480px', numVisible: 1, numScroll: 1 }
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  ::v-deep(.p-carousel-prev-button),
  ::v-deep(.p-carousel-next-button) {
    display: none !important;
  }
}
</style>