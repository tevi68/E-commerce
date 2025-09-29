<template>
    <Dialog 
      v-model:visible="modalVisible" 
      modal 
      :closable="true" 
      :style="{ width: '95vw', maxWidth: '1200px' }" 
      class="rounded-xl p-0 overflow-hidden"
      :breakpoints="{ '640px': '95vw' }"
      @hide="emit('close')"
    >
      <div v-if="deal" class="bg-white rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Image Gallery Section -->
          <div class="bg-gray-50 p-4 md:p-6">
            <!-- Main Image or Video -->
            <div class="relative mb-4 flex items-center justify-center w-full min-w-[300px] group" style="min-height: 260px;">
                <div class="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md">
                    <img
                        v-if="selectedVideo === null && deal.images[selectedImageIndex]"
                        :src="getImageUrl(deal.images[selectedImageIndex])"
                        :alt="deal.title + ' main image'"
                        class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <video
                        v-else-if="selectedVideo !== null && deal.videos[selectedVideo]"
                        :src="deal.videos[selectedVideo].url.startsWith('http') ? deal.videos[selectedVideo].url : getImageUrl(deal.videos[selectedVideo].url)"
                        controls
                        class="h-full w-full object-contain rounded"
                        :poster="deal.videos[selectedVideo].thumbnail ? getImageUrl(deal.videos[selectedVideo].thumbnail) : undefined"
                    />

                    <!-- Navigation Buttons (shown on hover, only for images) -->
                    <div v-if="selectedVideo === null" class="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <!-- Prev Button -->
                        <Button 
                            @click.stop="prevImage" 
                            :disabled="selectedImageIndex === 0" 
                            icon="pi pi-chevron-left" 
                            class="w-10 h-10 bg-white/90 border border-gray-200 shadow-md text-green-700 hover:bg-green-100 focus:ring-2 focus:ring-green-400 transition-all duration-200"
                            severity="secondary"
                            rounded
                            :pt="{
                                root: { 
                                    class: selectedImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110' 
                                }
                            }"
                        />
                        <!-- Next Button -->
                        <Button 
                            @click.stop="nextImage" 
                            :disabled="selectedImageIndex === deal.images.length - 1" 
                            icon="pi pi-chevron-right" 
                            class="w-10 h-10 bg-white/90 border border-gray-200 shadow-md text-green-700 hover:bg-green-100 focus:ring-2 focus:ring-green-400 transition-all duration-200"
                            severity="secondary"
                            rounded
                            :pt="{
                                root: { 
                                    class: selectedImageIndex === deal.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110' 
                                }
                            }"
                        />
                    </div>
                    <!-- Image/Video Counter -->
                    <div class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        <template v-if="selectedVideo === null">
                            {{ selectedImageIndex + 1 }} / {{ deal.images.length }}
                        </template>
                        <template v-else>
                            Video {{ selectedVideo + 1 }} / {{ deal.videos.length }}
                        </template>
                    </div>
                </div>
            </div>

            <!-- Thumbnails -->
            <div class="flex justify-center">
                <div class="flex gap-2 overflow-x-auto py-2 px-1">
                    <!-- Images Thumbnails -->
                    <img
                        v-for="(img, idx) in deal.images"
                        :key="'img-' + idx"
                        :src="getImageUrl(img)"
                        :alt="deal.title + ' thumb ' + (idx+1)"
                        class="h-16 w-16 object-cover rounded border cursor-pointer transition-all duration-150 hover:border-green-400"
                        :class="selectedImageIndex === idx && selectedVideo === null ? 'border-2 border-green-500' : 'border-gray-300'"
                        @click="() => { selectedImageIndex = idx; selectedVideo = null; }"
                    />
                    <!-- Videos Thumbnails -->
                    <div
                        v-for="(video, vIdx) in deal.videos"
                        :key="'vid-' + (video.id || vIdx)"
                        class="relative h-16 w-16 rounded border cursor-pointer flex items-center justify-center bg-black overflow-hidden transition-all duration-150 hover:border-green-400"
                        :class="selectedVideo === vIdx ? 'border-2 border-green-500' : 'border-gray-300'"
                        @click="() => { selectedVideo = vIdx; selectedImageIndex = -1; }"
                    >
                        <img
                            v-if="video.thumbnail"
                            :src="getImageUrl(video.thumbnail)"
                            alt="Video thumbnail"
                            class="absolute inset-0 w-full h-full object-cover opacity-70"
                        />
                        <span class="absolute inset-0 flex items-center justify-center text-white text-2xl">
                            <i class="pi pi-play-circle"></i>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Videos Section -->
            <div v-if="deal.videos && deal.videos.length" class="flex flex-col gap-4 mt-4 items-center">

                <!-- Section Header -->
                <div class="mb-6">
                  <h2 class="text-2xl font-bold">
                    Product Videos
                  </h2>
                  <p class="mt-1">
                    Watch our product in action
                  </p>
                </div>
                <div
                    v-for="(video, vIdx) in deal.videos"
                    :key="video.id || vIdx"
                    class="w-full flex justify-center"
                >
                    <video
                        :src="video.url.startsWith('http') ? video.url : getImageUrl(video.url)"
                        controls
                        class="rounded-lg border border-gray-200 shadow-sm w-full max-w-md bg-black"
                        :poster="video.thumbnail ? getImageUrl(video.thumbnail) : undefined"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
          </div>
          
          <!-- Product Info Section -->
          <div class="p-4 md:p-6 flex flex-col">
            <!-- Title & Discount -->
            <div class="flex items-start justify-between gap-4 mb-3">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900">{{ deal.title }}</h2>
              <Tag 
                v-if="deal.discount" 
                :value="`-${deal.discount}%`" 
                severity="success" 
                class="text-sm font-bold"
              />
            </div>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4">
              <Rating 
                :modelValue="deal.rating" 
                readonly 
                :cancel="false" 
                :pt="{
                  onIcon: { class: 'text-yellow-400' },
                  offIcon: { class: 'text-gray-300' }
                }"
              />
              <span class="text-sm text-gray-500">{{ deal.rating.toFixed(1) }} ({{ deal.reviews || 0 }} reviews)</span>
            </div>
            
            <!-- Price -->
            <div class="flex items-baseline gap-3 mb-4">
              <span class="text-2xl font-bold text-green-700">${{ deal.price }}</span>
              <span v-if="deal.originalPrice && deal.originalPrice > 0" class="text-base text-gray-400 line-through">${{ deal.originalPrice }}</span>
            </div>
            
            <!-- Stock -->
            <div class="mb-4">
              <ProgressBar 
                :value="(deal.stock / deal.maxStock) * 100" 
                :showValue="false" 
                class="h-2 mb-1"
                :class="deal.stock < 10 ? 'bg-red-100' : 'bg-green-100'"
                :pt="{
                  value: { class: deal.stock < 10 ? 'bg-red-500' : 'bg-green-500' }
                }"
              />
              <span class="text-sm font-medium" :class="deal.stock < 10 ? 'text-red-600' : 'text-green-600'">
                {{ deal.stock }} items left
              </span>
            </div>
            
            <!-- Timer -->
            <div class="bg-gray-100 rounded-lg p-3 mb-5">
              <div class="text-xs text-gray-600 mb-2">Deal ends in:</div>
              <div class="flex gap-2">
                <div v-for="(label, key) in timerLabels" :key="key" class="flex-1 text-center">
                  <div class="bg-gray-800 text-white text-lg font-bold py-2 rounded">
                    {{ timerValues[key] }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">{{ label }}</div>
                </div>
              </div>
            </div>
            
            <!-- Description -->
            <div class="text-gray-700 mb-4 text-sm">{{ deal.description }}</div>
            
            <!-- Features -->
            <div v-if="deal.features && deal.features.length" class="mb-5">
              <div class="text-sm font-semibold text-gray-800 mb-2">Key Features:</div>
              <ul class="text-sm text-gray-600 space-y-1">
                <li v-for="(feature, index) in deal.features" :key="index" class="flex items-start">
                  <i class="pi pi-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Actions -->
            <div class="mt-auto flex gap-3">
              <Button 
                label="Add to Cart" 
                icon="pi pi-shopping-cart" 
                class="flex-1 py-3" 
                :disabled="deal.stock === 0"
                :pt="{
                  label: { class: 'font-semibold' }
                }"
              />
              <Button 
                icon="pi pi-heart" 
                severity="secondary" 
                outlined
                class="p-0 w-12"
                :pt="{
                  root: { class: 'border-gray-300 hover:bg-gray-100' }
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Tag from 'primevue/tag'
  import Rating from 'primevue/rating'
  import ProgressBar from 'primevue/progressbar'
  import { useCurrencyStore } from '../../../store/currencyStore'
  import { getImageUrl } from '../../../utils/imageUrl'
  
  const props = defineProps({
    visible: Boolean,
    deal: Object
  })
  const emit = defineEmits(['close'])
  const currencyStore = useCurrencyStore()
  
  const modalVisible = computed({
    get: () => props.visible,
    set: v => { if (!v) emit('close') }
  })
  
  const selectedImageIndex = ref(0)
  const selectedVideo = ref<number | null>(null)
  const timerLabels = {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Mins',
    seconds: 'Secs'
  }
  
  const timerValues = computed(() => {
    const d = props.deal || {}
    return {
      days: d.timer_days ?? (d.timer && d.timer.days) ?? 0,
      hours: d.timer_hours ?? (d.timer && d.timer.hours) ?? 0,
      minutes: d.timer_minutes ?? (d.timer && d.timer.minutes) ?? 0,
      seconds: d.timer_seconds ?? (d.timer && d.timer.seconds) ?? 0,
    }
  })
  
  watch(() => props.deal, (newDeal) => {
    selectedImageIndex.value = 0
    selectedVideo.value = null
  })
  
  function prevImage() {
    if (selectedImageIndex.value > 0) selectedImageIndex.value--
  }
  
  function nextImage() {
    if (props.deal && props.deal.images && selectedImageIndex.value < props.deal.images.length - 1) selectedImageIndex.value++
  }
  </script>
  
  <style scoped>
  /* Custom scrollbar for thumbnails */
  ::-webkit-scrollbar {
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  </style>