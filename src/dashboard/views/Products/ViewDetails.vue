<template>
    <div class="min-h-screen bg-gray-50 text-gray-900 py-8">
      <!-- Header -->
      <header class="">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <Button 
              icon="pi pi-arrow-left" 
              @click="router.back()" 
              class="p-button-text text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 p-3 rounded-lg"
            />
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                <i class="pi pi-shopping-bag text-white text-lg"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  Product Details
                </h1>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <div class="text-xs text-gray-500">Status</div>
              <div class="text-sm text-green-600 font-semibold flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                Online
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <LoadingComponent v-if="loading" />
        <template v-else>
          <div v-if="product" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Product Info -->
            <div class="lg:col-span-2 space-y-6">
              <!-- General Information Card -->
              <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900 font-mono">{{ product.id }}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900 capitalize flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        {{ product.status }}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900">{{ product.title }}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900">{{ product.category }}</span>
                    </div>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[100px]">
                      <p class="text-gray-900 leading-relaxed whitespace-pre-line">{{ product.description }}</p>
                    </div>
                  </div>
                  
                  <div class="md:col-span-2" v-if="product.features && product.features.length">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Features</label>
                    <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <ul class="space-y-2">
                        <li v-for="(feature, index) in product.features" :key="index" class="flex items-start gap-3">
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
                      <span class="text-gray-900 font-semibold text-lg">${{ Number(product.price).toFixed(2) }}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-600 line-through">${{ Number(product.originalPrice).toFixed(2) }}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900 font-semibold">{{ product.discount }}% OFF</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900">{{ product.stock }} units</span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div class="flex items-center gap-2">
                        <span class="text-gray-900">{{ product.rating }}/5</span>
                        <div class="flex">
                          <i v-for="n in 5" :key="n" :class="['pi pi-star-fill text-sm', n <= product.rating ? 'text-yellow-500' : 'text-gray-300']"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Reviews</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900">{{ product.reviewCount }} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Status Flags Card -->
              <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Status Information</h2>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Page</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="flex items-center gap-2">
                        <div :class="['w-2 h-2 rounded-full', product.isOnProduct ? 'bg-green-500' : 'bg-red-500']"></div>
                        <span class="text-gray-900">{{ product.isOnProduct ? 'Active' : 'Inactive' }}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Shop</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="flex items-center gap-2">
                        <div :class="['w-2 h-2 rounded-full', product.isOnShop ? 'bg-green-500' : 'bg-red-500']"></div>
                        <span class="text-gray-900">{{ product.isOnShop ? 'Active' : 'Inactive' }}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="flex items-center gap-2">
                        <div :class="['w-2 h-2 rounded-full', product.isOnCategory ? 'bg-green-500' : 'bg-red-500']"></div>
                        <span class="text-gray-900">{{ product.isOnCategory ? 'Active' : 'Inactive' }}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Today's Deal</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="flex items-center gap-2">
                        <div :class="['w-2 h-2 rounded-full', product.isOnToday ? 'bg-green-500' : 'bg-red-500']"></div>
                        <span class="text-gray-900">{{ product.isOnToday ? 'Active' : 'Inactive' }}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Cart Items</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <span class="text-gray-900">{{ product.inCart }} items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Right Column: Gallery & Category -->
            <div class="space-y-6">
                <!-- Gallery Section -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                	<h2 class="text-lg font-semibold text-gray-900 mb-4">Gallery</h2>
                
                    <!-- Main Image/Video Display -->
                    <div class="relative w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-200">
                          <template v-if="galleryItems[selectedGalleryIndex]?.type === 'image'">
                            <img 
                              :src="getImageUrl(galleryItems[selectedGalleryIndex])" 
                              :alt="product.title" 
                              class="object-contain w-full h-full"
                            />
                        </template>
                        <template v-else-if="galleryItems[selectedGalleryIndex]?.type === 'video'">
                        <video 
                            :src="getVideoUrl(galleryItems[selectedGalleryIndex])" 
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
                    <div v-if="galleryItems.length > 0" class="grid grid-cols-4 gap-2">
                        <div 
							v-for="(item, index) in galleryItems" 
							:key="index" 
							:class="[
                            'rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-200',
                            selectedGalleryIndex === index ? 'border-gray-800' : 'border-gray-200 hover:border-gray-400'
                        ]" 
                        @click="onThumbnailClick(item, index)"
                        >
                        <div class="relative aspect-square">
                            <template v-if="item.type === 'image'">
                            <img 
                                :src="getImageUrl(item)" 
                                :alt="`Product view ${index + 1}`" 
                                class="w-full h-full object-contain" 
                            />
                            </template>
                            <template v-else>
                            <video 
                                :src="getVideoUrl(item)" 
                                class="w-full h-full object-contain" 
                                muted 
                            />
                            <div class="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <i class="pi pi-play text-gray-800 text-xs"></i>
                                </div>
                            </div>
                            </template>
                        </div>
                        </div>
                    </div>
                </div>
    
                <!-- Category Section -->
                <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Category</h2>
                
                <div class="space-y-4">
                    <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
                    <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <span class="text-gray-900">{{ product.category }}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- Error State -->
        <div v-else class="flex flex-col items-center justify-center min-h-96">
            <div class="bg-white rounded-lg border border-gray-200 p-16 text-center shadow-sm">
                <div class="text-6xl text-gray-400 mb-4">404</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
                <p class="text-gray-600 mb-6">The requested product does not exist.</p>
                <Button 
                label="Go Back" 
                icon="pi pi-arrow-left" 
                @click="router.back()" 
                class="bg-gray-800 hover:bg-gray-700 border-0 text-white py-2 px-4 rounded-lg"
                />
            </div>
        </div>
      </template>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import Button from 'primevue/button'
  import { fetchProducts } from '../../../store/productApi'
  import type { Product } from '../../../store/storeProduct'
  import { type ProductImage } from '../Products/ProductFormModal.vue'
  import LoadingComponent from '../../../system/LoadingComponent.vue'
  
  // Define types for media items
  type ProductVideo = { url: string; title?: string; thumbnail?: string | null; duration?: string | null }
  type GalleryItem = (ProductImage & { type: 'image' }) | (ProductVideo & { type: 'video' })
  
  // Vue composition API setup
  const route = useRoute()
  const router = useRouter()
  const product = ref<Product | null>(null)
  const selectedGalleryIndex = ref(0)
  const fallbackImage = 'https://via.placeholder.com/400x400/f3f4f6/6b7280?text=No+Image'
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const loading = ref(true)
  
  // Computed properties
  const galleryItems = computed<GalleryItem[]>(() => {
    if (!product.value) return []
    
    const images = (product.value.images && product.value.images.length > 0
      ? product.value.images
      : [{ url: fallbackImage, file: undefined }])
      .map(img => ({ ...img, type: 'image' as const }))
      
    const videos = (product.value.videos || []).map(v => ({ ...v, type: 'video' as const }))
    
    return [...images, ...videos]
  })
  
  // Gallery navigation methods
  const prevGallery = () => {
    selectedGalleryIndex.value = (selectedGalleryIndex.value - 1 + galleryItems.value.length) % galleryItems.value.length
  }
  
  const nextGallery = () => {
    selectedGalleryIndex.value = (selectedGalleryIndex.value + 1) % galleryItems.value.length
  }
  
  // Thumbnail click handler
  const onThumbnailClick = (_item: GalleryItem, index: number) => {
    selectedGalleryIndex.value = index
  }
  
  // Image and video URL helpers
  function getImageUrl(image: ProductImage): string {
    if (!image || !image.url) return fallbackImage
    if (image.url.startsWith('http')) return image.url
    const fixedPath = image.url.replace(/^\/images\//, '/uploads/')
    return `${apiBaseUrl}${fixedPath}`
  }
  
  function getVideoUrl(video: ProductVideo): string {
    if (!video || !video.url) return ''
    if (video.url.startsWith('http')) return video.url
    return `${apiBaseUrl}${video.url.startsWith('/') ? video.url : '/' + video.url}`
  }
  
  // Component lifecycle
  onMounted(async () => {
    const productId = route.params.id as string
    if (productId) {
      try {
        loading.value = true
        const products = await fetchProducts()
        product.value = products.find(p => p.id.toString() === productId) || null
      } catch (error) {
        console.error('Error fetching product:', error)
        product.value = null
      } finally {
        loading.value = false
      }
    } else {
      loading.value = false
    }
  })
  </script>
  
  <style scoped>
  /* Simple transitions */
  * {
    transition: all 0.2s ease;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #64748b;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
  </style>