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

    <!-- Carousel -->
    <div>
      <Carousel
        v-if="todayDeals.length > 0"
        :value="todayDeals"
        :numVisible="6"
        :numScroll="1"
        :circular="true"
        :autoplayInterval="4000"
        :responsiveOptions="responsiveOptions"
        :showIndicators="false"
        containerClass="p-carousel-custom"
      >
        <template #item="{ data }">
          <div class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col h-full">
            <!-- Image Container -->
            <div class="relative w-full pt-[100%] bg-gray-50">
              <img
                :src="data.image"
                :alt="data.title"
                class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                @click="openView(data)"
              />
              
              <!-- Top Left Badge -->
              <div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                HOT DEAL
              </div>
              
              <!-- Top Right Discount -->
              <div v-if="data.discount > 0" class="absolute top-2 right-2 bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full border border-orange-300">
                -{{ data.discount }}%
              </div>
              
              <!-- Quick Add to Cart -->
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
              <!-- Title -->
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1.5">
                {{ data.title }}
              </h3>

              <!-- Rating -->
              <div v-if="data.rating" class="flex items-center gap-1 mb-1">
                <div class="flex text-yellow-400">
                  <i v-for="star in 5" :key="star" class="pi text-xs" 
                    :class="star <= Math.round(data.rating) ? 'pi-star-fill' : 'pi-star'"></i>
                </div>
                <span class="text-xs text-gray-500">
                  {{ data.rating.toFixed(1) }} | {{ data.reviewCount || 0 }} sold
                </span>
              </div>

              <!-- Price and Button -->
              <div class="mt-auto">
                <div class="flex items-baseline gap-1 mb-2">
                  <span class="text-base font-bold text-red-600">
                    ${{ formatPrice(data.price) }}
                  </span>
                  <span
                    v-if="data.originalPrice"
                    class="text-xs text-gray-500 line-through"
                  >
                    ${{ formatPrice(data.originalPrice) }}
                  </span>
                </div>

                <button
                  class="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors"
                  @click.stop="openView(data)"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </template>
      </Carousel>

      <div v-else class="text-center py-12">
        <p class="text-gray-500">No deals available today. Check back later!</p>
      </div>

      <!-- Product Detail Modal -->
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
import { useProductStore } from '../../../store/storeProduct'
import type { Product } from '../../../store/storeProduct'
import { useCartStore } from '../../../store/cartStore'

const productStore = useProductStore()
const cartStore = useCartStore()

const showViewDetail = ref(false)
const viewProduct = ref<Product | null>(null)
const cambodiaTime = ref('')

const todayDeals = computed(() => {
  return productStore.todaysDeals
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

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