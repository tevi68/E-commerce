<template>
  <div v-if="product" class="min-h-screen bg-gray-50"><br>
    <nav class="text-sm max-w-7xl mx-auto px-4 text-gray-500 flex items-center gap-2 py-4" aria-label="Breadcrumb">
      <router-link to="/" class="hover:underline text-blue-600">Home</router-link>
      <span>/</span>
      <router-link
        v-if="product"
        :to="{ name: 'ShopByCategory', params: { category: product.category } }"
        class="hover:underline text-blue-600"
      >
        {{ product.category }}
      </router-link>
      <span v-if="product">/</span>
      <span v-if="product" class="text-gray-900 font-medium">{{ product.title }}</span>
    </nav>
    <!-- Main Product Section -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <!-- Left: Image Gallery -->
          <div class="space-y-4">
            <!-- Main Image -->
            <div class="relative w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden border border-gray-200 flex items-center justify-center">
                <template v-if="productMedia[selectedImage] && productMedia[selectedImage].type === 'image'">
                    <Image 
                    :src="getImageUrl(productMedia[selectedImage].data)" 
                    :alt="product.title"
                    class="object-contain max-h-full max-w-full"
                    preview
                    />
                </template>
                <template v-else-if="productMedia[selectedImage] && productMedia[selectedImage].type === 'video'">
                    <video
                    :src="getVideoUrl(productMedia[selectedImage].data)"
                    controls
                    class="object-contain max-h-full max-w-full"
                    ></video>
                </template>
              
              <!-- Navigation Buttons -->
              <button
                v-if="productMedia.length > 1"
                @click.stop="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg border border-gray-200 transition-all duration-200 z-10 hover:bg-white hover:scale-105"
                style="box-shadow: 0 2px 8px rgba(0,0,0,0.10);"
                aria-label="Previous image"
              >
                <i class="pi pi-chevron-left text-2xl text-gray-700"></i>
              </button>
              <button
                v-if="productMedia.length > 1"
                @click.stop="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg border border-gray-200 transition-all duration-200 z-10 hover:bg-white hover:scale-105"
                style="box-shadow: 0 2px 8px rgba(0,0,0,0.10);"
                aria-label="Next image"
              >
                <i class="pi pi-chevron-right text-2xl text-gray-700"></i>
              </button>
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span v-if="product.discount > 0" class="bg-red-100 text-red-600 px-2 py-1 rounded text-base font-semibold w-20">
                  {{ product.discount }}% off
                </span>
                <span v-if="product.isOnToday" class="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-md">
                  Getaway Deals Big Save
                </span>
              </div>
            </div>
            
            <!-- Thumbnail Gallery -->
            <div class="flex gap-2 overflow-x-auto">
              <div
                v-for="(media, _index) in displayedThumbnails"
                :key="media.originalIndex"
                :class="[
                  'w-16 h-16 flex-shrink-0 rounded-lg cursor-pointer overflow-hidden border-2 relative',
                  selectedImage === media.originalIndex 
                    ? 'border-blue-500' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
                @click="selectedImage = media.originalIndex"
              >
                <template v-if="media.type === 'image'">
                  <img :src="getImageUrl(media.data)" :alt="`View ${media.originalIndex + 1}`" class="w-full h-full object-cover" />
                </template>
                <template v-else>
                  <video :src="getVideoUrl(media.data)" class="w-full h-full object-cover" muted></video>
                  <span class="absolute inset-0 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="16" fill="rgba(0,0,0,0.5)"/>
                      <polygon points="13,10 24,16 13,22" fill="#fff"/>
                    </svg>
                  </span>
                </template>
              </div>
            </div>
          </div>
          
          <!-- Right: Product Information -->
          <div class="space-y-6">
            <!-- Seller Info -->
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-600">
                <span class="font-medium">Sold by</span>
                <span class="ml-2 text-blue-600"></span>
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-medium">Ship to</span>
                <span class="ml-2 flex items-center">
                  <i class="pi pi-map-marker text-xs mr-1"></i>
                  Cambodia
                </span>
              </div>
            </div>

            <!-- Price Section -->
            <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div class="flex items-center gap-4 mb-2">
                <span class="text-3xl font-extrabold text-red-600">{{ currencyStore.getDisplayPrice(product.price) }}</span>
                <span v-if="product.discount > 0" class="text-lg text-gray-400 line-through">
                  {{ currencyStore.getDisplayPrice(product.originalPrice) }}
                </span>
                <span v-if="product.discount > 0" class="bg-red-100 text-red-600 px-2 py-1 rounded text-base font-semibold">
                  {{ product.discount }}% off
                </span>
              </div>
              <div class="flex items-center gap-4 text-sm">
                <span class="text-red-600 font-medium">
                  <i class="pi pi-tag mr-1"></i>
                  Wholesale 2+ pieces, extra 5% off
                </span>
                <span class="text-gray-600">Tax excluded, add at checkout if applicable</span>
              </div>
              <div class="mt-2 text-sm text-red-600">
                <i class="pi pi-clock mr-1"></i>
                Ends: Jul 21, 13:59 GMT+7
              </div>
              <div class="mt-2 text-sm text-red-600">
                <i class="pi pi-percentage mr-1"></i>
              </div>
            </div>

            <!-- Product Title -->
            <div>
              <h1 class="text-2xl font-medium text-gray-900 leading-tight mb-3">
                {{ product.title }}
              </h1>
              <div class="flex items-center gap-2 mb-4">
                <div class="flex text-yellow-400">
                  <span v-for="i in 5" :key="i" class="text-sm">{{ i <= Math.floor(product.rating) ? '★' : '☆' }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ product.rating.toFixed(1) }}</span>
                <span class="text-sm text-gray-500">{{ product.reviewCount }} Reviews</span>
                <span class="text-sm text-gray-500">|</span>
                <span class="text-sm text-gray-500">5,000+ sold</span>
              </div>
            </div>

            <!-- Service Commitments -->
            <div class="space-y-3">
              <div class="bg-red-50 rounded-lg p-3">
                <div class="flex items-center gap-2 text-sm font-medium text-red-700">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  Big Save Service commitment
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <i class="pi pi-truck text-green-600"></i>
                  <span class="font-medium">Free shipping</span>
                  <span class="text-gray-500">Delivery: Aug. 08</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <i class="pi pi-refresh text-blue-600"></i>
                  <span class="font-medium">Return&refund policy</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <i class="pi pi-shield text-green-600"></i>
                  <span class="font-medium">Security & Privacy</span>
                </div>
              </div>
            </div>

            <!-- Quantity and Actions -->
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="text-sm font-medium text-gray-900">Quantity</div>
                <div class="flex items-center border border-gray-300 rounded">
                  <button 
                    @click="cartQuantity > 1 && cartStore.decreaseQuantity(product.id)"
                    class="px-3 py-1 cursor-pointer hover:bg-gray-100"
                  >-</button>
                  <span class="px-3 py-1 min-w-[50px] text-center">{{ cartQuantity }}</span>
                  <button 
                    @click="cartQuantity < product.stock && cartStore.addToCart(product, 1, getImageUrl(productMedia[selectedImage].data))"
                    class="px-3 cursor-pointer py-1 hover:bg-gray-100"
                  >+</button>
                </div>
                <div class="text-sm text-gray-600">{{ product.stock }} available</div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button
                  @click="addToCart(product.id)"
                  :disabled="product.stock <= 1 || cartQuantity >= product.stock"
                  class="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg"
                >
                  Buy now
                </button>
                <button
                  @click="addToCart(product.id)"
                  :disabled="product.stock <= 0 || cartQuantity >= product.stock"
                  class="flex-1 cursor-pointer border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg"
                >
                  Add to cart
                </button>
              </div>

              <!-- Additional Actions -->
              <div class="flex items-center gap-4 pt-2">
                <button
                  @click="toggleFavorite(product.id)"
                  class="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-red-600"
                >
                  <i class="pi pi-heart"></i>
                  <span>{{ isFavorite(product.id) ? '1' : '0' }}</span>
                </button>
                <button class=" cursor-pointer flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                  <i class="pi pi-share-alt"></i>
                  <span>Share</span>
                </button>
              </div>
            </div>

            <!-- Product Highlights -->
            <div class="border-t pt-6">
              <h3 class="text-sm font-medium text-gray-900 mb-3">Product sellpoints</h3>
              <div class="space-y-2">
                <div v-for="feature in product.features" :key="feature" class="flex items-start gap-2 text-sm text-gray-700">
                  <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs Section -->
    <div class="max-w-7xl mx-auto px-4 pb-8">
      <div class="bg-white rounded-lg shadow-sm">
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200">
          <nav class="flex">
            <button 
              v-for="tab in tabs" 
              :key="tab.key"
              @click="activeTab = tab.key"
              class="px-6 py-4 text-sm font-medium border-b-2 transition-colors"
              :class="activeTab === tab.key 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Product Description Tab -->
          <div v-if="activeTab === 'description'" class="space-y-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">About This Product</h2>
              <p class="text-gray-700 leading-relaxed mb-6">{{ product.description }}</p>
              
              <div v-if="product.features && product.features.length > 0" class="space-y-4">
                <h3 class="text-lg font-medium text-gray-900">Key Features</h3>
                <div class="space-y-3">
                  <div v-for="(feature, index) in product.features" :key="index" 
                       class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span class="text-gray-700">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div v-else-if="activeTab === 'reviews'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">Customer Reviews</h2>
              <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div class="text-center">
                  <div class="text-lg font-bold text-gray-900">{{ averageRating.toFixed(1) }}</div>
                  <div class="flex text-yellow-400">
                    <span v-for="i in 5" :key="i" class="text-sm">
                      {{ i <= Math.floor(averageRating) ? '★' : '☆' }}
                    </span>
                  </div>
                </div>
                <div class="h-8 w-px bg-gray-300"></div>
                <div class="text-sm text-gray-600">
                  <div class="font-medium">{{ reviews.length }} reviews</div>
                  <div class="text-green-600">✓ Verified purchases</div>
                </div>
              </div>
            </div>

            <!-- Filter Controls -->
            <div class="flex flex-wrap gap-2 items-center p-4 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium text-gray-700 mr-2">Filter:</span>
              <button 
                v-for="filter in filters" 
                :key="filter.key"
                @click="selectedFilter = filter.key"
                class="px-3 py-1 rounded-full text-sm transition-colors"
                :class="selectedFilter === filter.key 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'"
              >
                {{ filter.label }} ({{ filter.count }})
              </button>
              
              <div class="flex items-center gap-2 ml-auto">
                <span class="text-sm font-medium text-gray-700">Sort:</span>
                <select 
                  v-model="sortBy" 
                  class="px-3 py-1 border border-gray-200 rounded bg-white text-sm"
                >
                  <option value="default">Most helpful</option>
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                </select>
              </div>
            </div>

            <!-- Review Cards -->
            <div class="space-y-4">
              <div 
                v-for="review in filteredReviews" 
                :key="review.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex gap-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span class="text-white font-bold text-sm">{{ review.author.charAt(0) }}</span>
                  </div>

                  <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-4">
                      <div class="flex text-yellow-400">
                        <span v-for="i in 5" :key="i" class="text-sm">
                          {{ i <= review.rating ? '★' : '☆' }}
                        </span>
                      </div>
                      <span class="font-medium text-gray-900">{{ review.author }}</span>
                      <span v-if="review.verified" class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        ✓ Verified
                      </span>
                    </div>

                    <p class="text-gray-700">{{ review.text }}</p>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-500">{{ review.date }}</span>
                        <div class="flex gap-1">
                          <span v-for="tag in review.tags" :key="tag" 
                                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                      <button 
                        @click="review.helpful++"
                        class="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
                      >
                        👍 Helpful ({{ review.helpful }})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button 
                @click="loadMoreReviews"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Load More Reviews
              </button>
            </div>
          </div>

          <!-- Related Products -->
          <div v-else-if="activeTab === 'related'" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900">Related Products</h2>
            
            <div v-if="relatedProductsLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            
            <div v-else-if="relatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden">
                  <img 
                    :src="getProductImageUrl(relatedProduct)" 
                    :alt="relatedProduct.title"
                    class="w-full h-full object-cover cursor-pointer"
                    @click="router.push({ name: 'ProductDetail', params: { id: relatedProduct.id } })"
                    @error="handleProductImageError"
                  >
                </div>
                
                <div class="space-y-2">
                  <h3 class="font-medium text-gray-900 text-sm line-clamp-2 cursor-pointer hover:text-blue-600"
                      @click="router.push({ name: 'ProductDetail', params: { id: relatedProduct.id } })">
                    {{ relatedProduct.title }}
                  </h3>
                  
                  <div class="flex items-center gap-1">
                    <div class="flex text-yellow-400">
                      <span v-for="i in 5" :key="i" class="text-xs">
                        {{ i <= Math.floor(relatedProduct.rating) ? '★' : '☆' }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-500">
                      {{ relatedProduct.rating.toFixed(1) }} ({{ relatedProduct.reviewCount }})
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-gray-900">
                      {{ currencyStore.getDisplayPrice(relatedProduct.price) }}
                    </span>
                    <span v-if="relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price"
                          class="text-sm text-gray-400 line-through">
                      {{ currencyStore.getDisplayPrice(relatedProduct.originalPrice) }}
                    </span>
                  </div>
                  
                  <div class="flex gap-2">
                    <button
                      class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded"
                      @click="router.push({ name: 'ProductDetail', params: { id: relatedProduct.id } })">
                      View details
                    </button>
                    <button 
                      class="p-2 border border-gray-200 hover:bg-gray-50 rounded"
                      @click="toggleFavorite(relatedProduct.id)"
                      :class="isFavorite(relatedProduct.id) ? 'text-red-500' : 'text-gray-400'"
                    >
                      <i class="pi pi-heart text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="text-gray-500">No related products found</div>
            </div>

            <div v-if="relatedProducts.length > 0" class="text-center">
              <button 
                @click="router.push({ name: 'ShopByCategory', params: { category: product.category } })"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                View All in {{ product.category }}
              </button>
            </div>
          </div>

          <!-- More Products -->
          <div v-else-if="activeTab === 'more'" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900">More Products You'll Love</h2>
            
            <div v-if="moreProductsLoading" class="flex justify-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
            </div>
            
            <div v-else-if="moreProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div v-for="moreProduct in moreProducts" :key="moreProduct.id"
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden">
                  <img 
                    :src="getProductImageUrl(moreProduct)" 
                    :alt="moreProduct.title"
                    class="w-full h-full object-cover cursor-pointer"
                    @click="router.push({ name: 'ProductDetail', params: { id: moreProduct.id } })"
                    @error="handleProductImageError"
                  >
                </div>
                
                <div class="space-y-2">
                  <h3 class="font-medium text-gray-900 text-sm line-clamp-2 cursor-pointer hover:text-blue-600"
                      @click="router.push({ name: 'ProductDetail', params: { id: moreProduct.id } })">
                    {{ moreProduct.title }}
                  </h3>
                  
                  <div class="flex items-center gap-1">
                    <div class="flex text-yellow-400">
                      <span v-for="i in 5" :key="i" class="text-xs">
                        {{ i <= Math.floor(moreProduct.rating) ? '★' : '☆' }}
                      </span>
                    </div>
                    <span class="text-xs text-gray-500">
                      {{ moreProduct.rating.toFixed(1) }} ({{ moreProduct.reviewCount }})
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-gray-900">
                      {{ currencyStore.getDisplayPrice(moreProduct.price) }}
                    </span>
                    <span v-if="moreProduct.originalPrice && moreProduct.originalPrice > moreProduct.price"
                          class="text-sm text-gray-400 line-through">
                      {{ currencyStore.getDisplayPrice(moreProduct.originalPrice) }}
                    </span>
                  </div>
                  
                  <div class="flex gap-2">
                    <button
                      class="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded"
                      @click="router.push({ name: 'ProductDetail', params: { id: moreProduct.id } })">
                      View details
                    </button>
                    <button 
                      class="p-2 border border-gray-200 hover:bg-gray-50 rounded"
                      @click="toggleFavorite(moreProduct.id)"
                      :class="isFavorite(moreProduct.id) ? 'text-red-500' : 'text-gray-400'"
                    >
                      <i class="pi pi-heart text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="text-gray-500">No additional products found</div>
            </div>

            <div v-if="moreProducts.length > 0" class="text-center">
              <button 
                @click="router.push({ name: 'ShopCard' })"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                View All Products
              </button>
            </div>
          </div>

          <!-- Other Tab Content -->
          <div v-else class="text-center py-8">
            <div class="text-gray-500">
              {{ activeTab.charAt(0).toUpperCase() + activeTab.slice(1) }} content will be displayed here.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="loading" class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center space-y-4">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p class="text-gray-600">Loading product details...</p>
    </div>
  </div>

  <!-- Error State -->
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center space-y-4 p-8">
      <div class="text-4xl">😞</div>
      <h2 class="text-xl font-bold text-gray-900">Product Not Found</h2>
      <p class="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
      <router-link 
        to="/" 
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore, type Product } from '../../../store/storeProduct'
import { type ProductImage } from '../../../dashboard/views/Products/ProductFormModal.vue'
import { fetchProductById, fetchProductsByCategory, fetchProducts } from '../../../store/productApi'
import useFavoriteStore from '../../../store/favoritesStore'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '../../../store/cartStore'
import Image from 'primevue/image'
import { nextTick } from 'vue'
import { useCurrencyStore } from '../../../store/currencyStore'
const currencyStore = useCurrencyStore();

const cartStore = useCartStore()

interface Review {
  id: number
  author: string
  rating: number
  text: string
  date: string
  verified: boolean
  helpful: number
  tags: string[]
}

interface Tab {
  key: string
  label: string
}

interface Filter {
  key: string
  label: string
  count: number
}

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const favoriteStore = useFavoriteStore()
const toast = useToast() // Initialize useToast

// Reactive data
const product = ref<Product | null>(null)
const selectedImage = ref(0)
const activeTab = ref('more')
const selectedFilter = ref('all')
const sortBy = ref('default')
const loading = ref(true)
const moreProducts = ref<Product[]>([])
const moreProductsLoading = ref(false)
const relatedProducts = ref<Product[]>([]) 
const relatedProductsLoading = ref(false)

const maxVisibleThumbnails = 8;

// Static review data
const reviews: Review[] = [
  {
    id: 1,
    author: 'Satisfied Customer',
    rating: 5,
    text: 'This product exceeded my expectations! The quality is outstanding and it works perfectly.',
    date: 'January 14, 2025',
    verified: true,
    helpful: 12,
    tags: ['excellent', 'great_item']
  },
  {
    id: 2,
    author: 'Happy Shopper',
    rating: 4,
    text: 'Very good product overall. Works as described and looks great. Minor improvements could be made to the design.',
    date: 'January 12, 2025',
    verified: true,
    helpful: 8,
    tags: ['positive']
  },
  {
    id: 3,
    author: 'First Time Buyer',
    rating: 3,
    text: 'Decent product for the price. Does what it needs to but not exceptional quality.',
    date: 'January 10, 2025',
    verified: true,
    helpful: 5,
    tags: ['neutral']
  }
]

// Tabs and filters
const tabs: Tab[] = [
  { key: 'description', label: 'Description' },
  { key: 'reviews', label: `Customer Reviews (${reviews.length})` },
  { key: 'specifications', label: 'Specifications' },
  { key: 'more', label: 'More to love' },
  { key: 'related', label: 'Related Items' }
]

const filters: Filter[] = [
  { key: 'all', label: 'All ratings', count: reviews.length },
  { key: 'excellent', label: 'Excellent', count: reviews.filter(r => r.rating >= 4.5).length },
  { key: 'positive', label: 'Positive', count: reviews.filter(r => r.rating >= 3.5 && r.rating < 4.5).length },
  { key: 'neutral', label: 'Neutral', count: reviews.filter(r => r.rating >= 2.5 && r.rating < 3.5).length },
  { key: 'negative', label: 'Negative', count: reviews.filter(r => r.rating < 2.5).length }
]

// Replace productImages and displayedThumbnails with a unified media gallery (images + videos)
const productMedia = computed(() => {
  if (!product.value) return []
  const images = (product.value.images || []).map((img, idx) => ({ type: 'image', data: img, originalIndex: idx }))
  const videos = (product.value.videos || []).map((vid, idx) => ({ type: 'video', data: vid, originalIndex: images.length + idx }))
  return [...images, ...videos]
})

const displayedThumbnails = computed(() => {
  if (!productMedia.value.length) return []
  const total = productMedia.value.length
  if (total <= maxVisibleThumbnails) return productMedia.value
  let startIndex = selectedImage.value - Math.floor(maxVisibleThumbnails / 2)
  startIndex = Math.max(0, startIndex)
  startIndex = Math.min(startIndex, total - maxVisibleThumbnails)
  return productMedia.value.slice(startIndex, startIndex + maxVisibleThumbnails)
})

const prevImage = () => {
  selectedImage.value = (selectedImage.value - 1 + productMedia.value.length) % productMedia.value.length
}
const nextImage = () => {
  selectedImage.value = (selectedImage.value + 1) % productMedia.value.length
}
// Computed properties
const averageRating = computed(() => {
  if (!reviews.length) return 0
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.length
})

const filteredReviews = computed(() => {
  let filtered = reviews
  
  if (selectedFilter.value !== 'all') {
    filtered = reviews.filter(review => 
      review.tags.includes(selectedFilter.value)
    )
  }
  
  // Sort logic
  switch (sortBy.value) {
    case 'newest':
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case 'oldest':
      filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case 'highest':
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
      break
    case 'lowest':
      filtered = [...filtered].sort((a, b) => a.rating - b.rating)
      break
    case 'default':
      filtered = [...filtered].sort((a, b) => b.helpful - a.helpful)
      break
  }
  
  return filtered
})

const cartQuantity = computed(() => {
  if (!product.value) return 0
  const item = cartStore.items.find((i: any) => i.product.id === product.value!.id)
  return item ? item.quantity : 0
})

// Methods
const getImageUrl = (productImage: ProductImage) => {
  if (!productImage || !productImage.url) return '/placeholder-product.jpg'
  if (productImage.url.startsWith('http')) return productImage.url
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  
  const fixedPath = productImage.url.replace(/^\/images\//, '/uploads/')
  return `${apiBaseUrl}${fixedPath}`
}

const loadMoreReviews = () => {
  console.log('Loading more reviews...')
}

const addToCart = (_productId: number) => {
  if (product.value) {
    cartStore.addToCart(product.value, 1, getImageUrl(productMedia.value[selectedImage.value].data))
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${product.value.title} added to cart!`,
      life: 3000
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Could not add product to cart.',
      life: 3000
    })
  }
}

const toggleFavorite = (productId: number) => {
  const currentSelectedMedia = productMedia.value[selectedImage.value]
  const currentSelectedImageUrl = currentSelectedMedia.type === 'image' ? getImageUrl(currentSelectedMedia.data) : getVideoUrl(currentSelectedMedia.data)
  favoriteStore.toggleFavorite(productId, currentSelectedImageUrl)

  const isNowFavorite = favoriteStore.isFavorite(productId)
  toast.add({
    severity: isNowFavorite ? 'success' : 'warn',
    summary: isNowFavorite ? 'Added' : 'Removed',
    detail: isNowFavorite
      ? 'Added Sucess'
      : 'Removed Sucess',
    life: 2000
  })
}

const isFavorite = (productId: number) => {
  return favoriteStore.isFavorite(productId)
}

const fetchMoreProducts = async () => {
  moreProductsLoading.value = true
  try {
    const productStore = useProductStore()
    let productsToShow: Product[] = []

    // 1. Try to get products from the same category (excluding current product)
    if (product.value && product.value.category) {
      const categoryProducts = productStore.shopProducts.filter(
        p => p.id !== product.value!.id && p.images && p.images.length > 0 && p.category === product.value!.category
      )
      if (categoryProducts.length > 0) {
        productsToShow = categoryProducts.sort(() => 0.5 - Math.random()).slice()
      }
    }

    // 2. If no products in the same category or no category, get random shop products
    if (productsToShow.length === 0) {
      productsToShow = productStore.shopProducts
        .filter(p => p.id !== product.value?.id && p.images && p.images.length > 0) // Only products with images
        .sort(() => 0.5 - Math.random())
        .slice()
    }
    
    moreProducts.value = productsToShow

  } catch (error) {
    console.error('Failed to fetch more products:', error)
  } finally {
    moreProductsLoading.value = false
  }
}

const fetchRelatedProducts = async () => {
  relatedProductsLoading.value = true
  try {
    if (product.value && product.value.category) {
      const productsInCategory = await fetchProductsByCategory(product.value.category)
      relatedProducts.value = productsInCategory
        .filter((p: Product) => p.id !== product.value!.id && p.images && p.images.length > 0)
        .sort(() => 0.5 - Math.random())
        .slice()
    }
  } catch (error) {
    console.error('Failed to fetch related products:', error)
  } finally {
    relatedProductsLoading.value = false
  }
}

// const openNewProductPage = () => {
//   window.open('http://localhost:5173/', '_blank')
// }
const getProductImageUrl = (product: Product) => {
  // First try to use the first image from images array if available
  if (product.images && product.images.length > 0 && product.images[0].url) {
    return getImageUrl(product.images[0])
  }
  // Final fallback to placeholder
  return '/placeholder-product.jpg'
}

const handleProductImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/placeholder-product.jpg'
  img.onerror = null
}

const getVideoUrl = (video: { url: string }) => {
  if (!video || !video.url) return ''
  if (video.url.startsWith('http')) return video.url
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  return `${apiBaseUrl}${video.url.startsWith('/') ? video.url : '/' + video.url}`
}

const fetchProductDetails = async () => {
  console.log(`Fetching product details for ID: ${route.params.id}`)
  loading.value = true
  const productId = Number(route.params.id)
  
  try {
    // Fetch all products and populate the store
    const allProducts = await fetchProducts()
    productStore.setProducts(allProducts)

    // Try to get from store first
    const storeProduct = productStore.getProductById(productId)
    if (storeProduct) {
      // Parse features if it's a string
      if (typeof storeProduct.features === 'string') {
        try {
          storeProduct.features = JSON.parse(storeProduct.features)
        } catch (e) {
          storeProduct.features = []
        }
      }
      product.value = storeProduct
      console.log('Product fetched from store:', product.value.title)
    } else {
      // Fallback to API call
      const apiProduct = await fetchProductById(productId)
      if (typeof apiProduct.features === 'string') {
        try {
          apiProduct.features = JSON.parse(apiProduct.features)
        } catch (e) {
          apiProduct.features = []
        }
      }
      product.value = apiProduct
      console.log('Product fetched from API:', product.value?.title)
    }

    selectedImage.value = 0 // Reset selected image when product changes
  } catch (error) {
    console.error('Failed to fetch product:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load product details',
      life: 3000
    })
  } finally {
    loading.value = false
    console.log('Loading complete for product details.')
  }
}

// Lifecycle hooks
onMounted(async () => {
  console.log('ViewDetail component mounted or re-mounted.')
  await fetchProductDetails()
  await Promise.all([fetchRelatedProducts(), fetchMoreProducts()])
})

watch(
  () => route.params.id,
  async (newId, oldId) => {
    console.log(`Route ID changed from ${oldId} to ${newId}`)
    if (newId !== oldId && newId) {
      try {
        loading.value = true
        selectedImage.value = 0
        // activeTab.value = 'description' // Commenting this out to keep 'More to love' as default
        
        await fetchProductDetails()
        
        nextTick(() => {
          const productSection = document.querySelector('.product-section')
          if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' })
          }
        })
        
        await Promise.all([
          fetchRelatedProducts(),
          fetchMoreProducts()
        ])
      } catch (error) {
        console.error('Failed to load product details:', error)
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load product details',
          life: 3000
        })
      } finally {
        loading.value = false
      }
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* Enhanced styling */
.transition-all {
  transition: all 0.2s ease;
}

.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease;
}

.transition-shadow {
  transition: box-shadow 0.2s ease;
}

/* Focus states */
button:focus,
input:focus,
select:focus {
  outline: none;
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom scrollbar for select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Star ratings */
.text-yellow-400 {
  color: #fbbf24;
}

/* Green accent colors */
.text-green-600 {
  color: #059669;
}

/* Blue accent colors */
.text-blue-600 {
  color: #2563eb;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.border-blue-500 {
  border-color: #3b82f6;
}

/* Responsive design */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Add image styling */
img {
  object-fit: cover;
  background-color: #f3f4f6; /* gray-100 */
}

/* Product card styling */
.group:hover .product-image {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 640px) and (max-width: 768px) {
  .sm\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>