<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 py-8">
    <header>
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <Button 
            icon="pi pi-arrow-left" 
            @click="goBack" 
            class="p-button-text text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 p-3 rounded-lg"
          />
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <i class="pi pi-star text-white text-lg"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">
                Weekly Deal Details
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div v-if="deal" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Deal Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- General Information Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Deal ID</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-900 font-mono">{{ deal.id }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-900">{{ deal.title }}</span>
                </div>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[100px]">
                  <p class="text-gray-900 leading-relaxed whitespace-pre-line">{{ deal.description }}</p>
                </div>
              </div>
              <div class="md:col-span-2" v-if="deal.features && deal.features.length">
                <label class="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <ul class="space-y-2">
                    <li v-for="(feature, index) in deal.features" :key="index" class="flex items-start gap-3">
                      <div class="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span class="text-gray-900">{{ feature }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing & Stock Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Price</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-900 font-semibold text-lg">${{ Number(deal.price).toFixed(2) }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-600 line-through">${{ Number(deal.originalPrice).toFixed(2) }}</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-900 font-semibold">{{ deal.discount }}% OFF</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <span class="text-gray-900">{{ deal.stock }} units</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-900">{{ deal.rating }}/5</span>
                    <div class="flex">
                      <i v-for="n in 5" :key="n" :class="['pi pi-star-fill text-sm', n <= deal.rating ? 'text-yellow-500' : 'text-gray-300']"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timer Card -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Deal Timer</h2>
            <div class="flex gap-2">
              <div class="bg-gray-900 text-white text-xs px-4 py-2 rounded text-center">
                {{ timer.days }}<br/><span class="font-normal">DAYS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-4 py-2 rounded text-center">
                {{ timer.hours }}<br/><span class="font-normal">HOURS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-4 py-2 rounded text-center">
                {{ timer.minutes }}<br/><span class="font-normal">MINS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-4 py-2 rounded text-center">
                {{ timer.seconds }}<br/><span class="font-normal">SECS</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Gallery -->
        <div class="space-y-6">
          <!-- Gallery Section -->
          <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Gallery</h2>
            <div class="relative w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-200">
              <template v-if="galleryItems[selectedGalleryIndex]?.type === 'image'">
                <img 
                  :src="getImageUrl(galleryItems[selectedGalleryIndex])" 
                  :alt="deal.title" 
                  class="object-contain w-full h-full"
                />
              </template>
              <template v-else-if="galleryItems[selectedGalleryIndex]?.type === 'video'">
                <video 
                  :src="galleryItems[selectedGalleryIndex].url" 
                  controls 
                  class="object-contain w-full h-full" 
                />
              </template>
              <!-- Navigation Buttons -->
              <button 
                v-if="galleryItems.length > 1" 
                @click="prevGallery" 
                class="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white shadow-md border border-gray-200"
              >
                <i class="pi pi-chevron-left"></i>
              </button>
              <button 
                v-if="galleryItems.length > 1" 
                @click="nextGallery" 
                class="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 text-gray-800 rounded-full hover:bg-white shadow-md border border-gray-200"
              >
                <i class="pi pi-chevron-right"></i>
              </button>
              <!-- Gallery Counter -->
              <div class="absolute cursor-pointer bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-gray-800 px-2 py-1 rounded text-sm">
                {{ selectedGalleryIndex + 1 }} / {{ galleryItems.length }}
              </div>
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-2 justify-center">
              <div v-for="(item, idx) in galleryItems" :key="idx" class="w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer"
                :class="selectedGalleryIndex === idx ? 'border-blue-500' : 'border-gray-200'"
                @click="selectedGalleryIndex = idx"
              >
                <template v-if="item.type === 'image'">
                  <img :src="getImageUrl(item)" :alt="deal.title" class="object-cover w-full h-full" />
                </template>
                <template v-else-if="item.type === 'video'">
                  <video :src="item.url" class="object-cover w-full h-full" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-400 py-12">
        <i class="pi pi-info-circle text-3xl mb-2"></i>
        <div class="text-lg font-medium">Weekly deal not found</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchWeeklyDealById } from '../../../store/weeklyDealsApi'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const deal = ref<any>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id || isNaN(id)) {
    deal.value = null
    return
  }
  try {
    deal.value = await fetchWeeklyDealById(id)
  } catch (e) {
    deal.value = null
  }
})

const timer = computed(() => deal.value?.timer || {
  days: deal.value?.timer_days ?? 0,
  hours: deal.value?.timer_hours ?? 0,
  minutes: deal.value?.timer_minutes ?? 0,
  seconds: deal.value?.timer_seconds ?? 0,
})

const galleryItems = computed(() => {
  if (!deal.value) return []
  const images = (deal.value.images || []).map((img: any) =>
    typeof img === 'string' ? { url: img, type: 'image' } : { ...img, type: 'image' }
  )
  const videos = (deal.value.videos || []).map((vid: any) =>
    typeof vid === 'string' ? { url: vid, type: 'video' } : { ...vid, type: 'video' }
  )
  return [...images, ...videos]
})
const selectedGalleryIndex = ref(0)
function prevGallery() {
  if (selectedGalleryIndex.value > 0) selectedGalleryIndex.value--
  else selectedGalleryIndex.value = galleryItems.value.length - 1
}
function nextGallery() {
  if (selectedGalleryIndex.value < galleryItems.value.length - 1) selectedGalleryIndex.value++
  else selectedGalleryIndex.value = 0
}
function goBack() {
  router.back()
}

function getImageUrl(image: any) {
  const url = typeof image === 'string' ? image : image.url
  if (!url) return 'https://via.placeholder.com/80?text=No+Image'
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  return `${apiBaseUrl}${url}`
}
</script>
