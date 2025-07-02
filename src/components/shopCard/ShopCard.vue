<template>
    <div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto py-6 px-4">
        <!-- Mobile toggle button (outside sidebar) -->

        <!-- Filter Sidebar -->
        <aside class="w-full lg:w-80 bg-white rounded-2xl shadow-lg border border-gray-200 mb-6 lg:mb-0 overflow-hidden h-[calc(100vh-140px)] lg:h-[calc(100vh-32px)] sticky top-4"
            :class="{ 
                'hidden lg:block': !showMobileFilters, 
                'fixed inset-0 z-[100] h-screen w-screen bg-white lg:static lg:inset-auto lg:h-auto lg:w-80': showMobileFilters 
            }">
            
            <!-- Scrollable container with max height -->
            <div class="h-full flex flex-col">
                <!-- Header with close button (mobile only) -->
                <div class="flex-shrink-0 flex justify-between items-center p-4 pb-0 border-b border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-3 pb-5">
                        <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span class="pi pi-filter text-white text-lg"></span>
                        </div>
                        <span class="bg-gradient-to-r from-orange-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                            Smart Filters
                        </span>
                    </h2>
                    <button @click="showMobileFilters = false" 
                            class="lg:hidden group w-10 h-10 bg-gray-100 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <span class="pi pi-times text-gray-500 group-hover:text-red-500 transition-colors"></span>
                    </button>
                </div>

                <!-- Scrollable content area -->
                <div class="flex-1 overflow-y-auto p-6 pt-4 custom-scrollbar">
                    <!-- Category Filter -->
                    <div class="mb-8 group">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span class="pi pi-tag text-white text-xs"></span>
                            </div>
                            Category
                        </label>
                        <div class="relative">
                            <Dropdown v-model="selectedCategory"
                                    :options="categories"
                                    optionLabel="name"
                                    placeholder="Select Category"
                                    class="w-full transform transition-all duration-300 hover:scale-[1.02]"
                                    :pt="{
                                        root: { class: 'border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300' },
                                        input: { class: 'py-3.5 px-4 text-sm bg-white' },
                                        trigger: { class: 'text-orange-500' },
                                        panel: { class: 'bg-white border-2 border-gray-200 shadow-xl rounded-xl mt-2' },
                                        item: { class: 'text-sm hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200 px-4 py-3' }
                                    }">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex items-center gap-3">
                                        <div class="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
                                        <span class="font-medium">{{ slotProps.value.name }}</span>
                                    </div>
                                    <span v-else class="text-gray-500">{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex items-center gap-3 py-1">
                                        <div class="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full"></div>
                                        <span>{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>

                    <!-- Price Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <div class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                <span class="pi pi-dollar text-white text-xs"></span>
                            </div>
                            Price Range
                        </label>
                        <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <Slider v-model="priceRange"
                                :min="0"
                                :max="1000"
                                :step="10"
                                range
                                class="w-full mb-4"
                                :pt="{
                                    root: { class: 'h-2' },
                                    range: { class: 'bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full shadow-lg' },
                                    handle: { class: 'w-5 h-5 bg-white border-3 border-orange-400 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 rounded-full' }
                                }" />
                            <div class="flex items-center justify-between">
                                <div class="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                                    <span class="text-sm font-semibold text-green-600">${{ priceRange[0] }}</span>
                                </div>
                                <div class="flex-1 mx-3 h-px bg-gradient-to-r from-gray-300 via-orange-200 to-gray-300"></div>
                                <div class="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                                    <span class="text-sm font-semibold text-green-600">${{ priceRange[1] }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Rating Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <div class="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                                <span class="pi pi-star-fill text-white text-xs"></span>
                            </div>
                            Customer Rating
                        </label>
                        <div class="space-y-2">
                            <div v-for="rating in [5, 4, 3, 2, 1]" 
                                :key="rating"
                                @click="minRating = rating"
                                class="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                                :class="{
                                    'bg-gradient-to-r from-orange-50 to-pink-50 border-2 border-orange-200 shadow-md': minRating === rating,
                                    'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-gray-200': minRating !== rating
                                }">
                                <Rating :modelValue="rating" 
                                    :readonly="true" 
                                    :cancel="false" 
                                    class="text-lg"
                                    :pt="{
                                        onIcon: { class: 'text-yellow-400 drop-shadow-sm' },
                                        offIcon: { class: 'text-gray-300' }
                                    }" />
                                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                                    {{ rating }}+ Stars
                                </span>
                                <div v-if="minRating === rating" 
                                    class="ml-auto w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span class="pi pi-check text-white text-xs"></span>
                                </div>
                            </div>
                            <div @click="minRating = 0"
                                class="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                                :class="{
                                    'bg-gradient-to-r from-orange-50 to-pink-50 border-2 border-orange-200 shadow-md': minRating === 0,
                                    'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 border border-gray-200': minRating !== 0
                                }">
                                <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg">
                                    <span class="pi pi-star text-white text-sm"></span>
                                </div>
                                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                                    Any Rating
                                </span>
                                <div v-if="minRating === 0" 
                                    class="ml-auto w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span class="pi pi-check text-white text-xs"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Availability Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <div class="w-6 h-6 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center">
                                <span class="pi pi-box text-white text-xs"></span>
                            </div>
                            Availability
                        </label>
                        <div class="space-y-3">
                            <div class="group flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                                <Checkbox v-model="inStockOnly"
                                        inputId="inStock"
                                        :binary="true"
                                        class="transform transition-all duration-200 hover:scale-110"
                                        :pt="{
                                            root: { class: 'relative' },
                                            box: { class: 'w-5 h-5 border-2 border-gray-300 rounded-lg bg-white transition-all duration-200' },
                                            input: { class: 'peer' },
                                            icon: { class: 'text-white text-sm' }
                                        }" />
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    <label for="inStock" class="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-green-600 transition-colors">
                                        In Stock Only
                                    </label>
                                </div>
                            </div>
                            <div class="group flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300">
                                <Checkbox v-model="includeOutOfStock"
                                        inputId="outOfStock"
                                        :binary="true"
                                        class="transform transition-all duration-200 hover:scale-110"
                                        :pt="{
                                            root: { class: 'relative' },
                                            box: { class: 'w-5 h-5 border-2 border-gray-300 rounded-lg bg-white transition-all duration-200' },
                                            input: { class: 'peer' },
                                            icon: { class: 'text-white text-sm' }
                                        }" />
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <label for="outOfStock" class="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-red-600 transition-colors">
                                        Include Out of Stock
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sticky action buttons at bottom -->
                <div class="flex-shrink-0 bottom-0 left-0 right-0 bg-gradient-to-t from-white to-white/90 pt-6 pb-4 px-6 border-t border-gray-200">
                    <div class="flex flex-col gap-3">
                        <button @click="applyFilters"
                                class="group relative w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative flex items-center justify-center gap-3">
                                <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                    <span class="pi pi-check text-xs"></span>
                                </div>
                                <span>Apply Filters</span>
                            </div>
                        </button>
                        
                        <button @click="resetFilters"
                                class="group w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] border border-gray-300">
                            <div class="flex items-center justify-center gap-3">
                                <div class="w-5 h-5 bg-gray-400/20 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                                    <span class="pi pi-refresh text-xs"></span>
                                </div>
                                <span>Reset All Filters</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Product Grid & Sort -->
        <main class="flex-1">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
                <h1 class="text-xl font-bold text-gray-900">Shop Products</h1>
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <div class="flex justify-between items-center w-full sm:w-auto gap-3">
                        <!-- Filter Button -->
                        <button
                            @click="showMobileFilters = !showMobileFilters"
                            class="lg:hidden flex items-center justify-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-lg"
                        >
                            <span class="pi pi-filter"></span> Filters
                        </button>

                        <!-- Sort Option -->
                        <div class="relative">
                            <select
                                v-model="sortOption"
                                class="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                            <span
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 pi pi-chevron-down text-xs text-gray-500"
                            ></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Product Cards Grid -->
            <div
                v-if="filteredProducts.length > 0"
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
                <div
                    v-for="product in paginatedProducts"
                    :key="product.id"
                    @click="openView(product)"
                    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group border border-gray-100 hover:border-orange-200"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-square cursor-pointer">
                        <img
                            :src="product.image"
                            :alt="product.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            loading="lazy"
                        />
                        <!-- Discount -->
                        <div v-if="product.discount > 0" class="absolute top-2 left-2">
                            <span class="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                -{{ product.discount }}%
                            </span>
                        </div>
                        <!-- Favorite Button -->
                        <button
                            class="absolute top-3 right-2 w-9 h-9 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition opacity-0 group-hover:opacity-100"
                            @click.stop="toggleFavorite(product)"
                        >
                            <span
                                class="pi"
                                :class="isFavorite(product.id) ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-500 hover:text-red-400'"
                            ></span>
                        </button>
                    </div>

                    <!-- Info -->
                    <div class="p-3 flex flex-col flex-grow">
                        <h3 class="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{{ product.title }}</h3>
                        <!-- Rating -->
                        <div class="flex items-center mb-2">
                            <div class="flex mr-1">
                                <i
                                    v-for="n in 5"
                                    :key="'star-' + product.id + '-' + n"
                                    :class="n <= Math.round(product.rating) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                                    class="text-xs"
                                ></i>
                            </div>
                            <span class="text-xs text-gray-500">({{ product.reviewCount }})</span>
                        </div>
                        <!-- Price -->
                        <div class="mt-auto">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-orange-500 font-bold text-xl">${{ product.price.toFixed(2) }}</p>
                                    <p v-if="product.originalPrice" class="text-gray-400 text-xs line-through">
                                        ${{ product.originalPrice.toFixed(2) }}
                                    </p>
                                </div>
                                <button
                                    class="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition flex items-center justify-center shadow-sm cursor-pointer"
                                    @click="openView(product)"
                                >
                                    <span class="pi pi-cart-arrow-down text-sm" style="font-size: 1.5rem;"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
                <div class="pi pi-search text-4xl text-gray-300 mb-3"></div>
                <p class="text-gray-500 font-medium">No products found</p>
                <p class="text-gray-400 text-sm mt-1">Try adjusting your filters or search term</p>
                <button
                    @click="resetFilters"
                    class="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition"
                >
                    Reset Filters
                </button>
            </div>
        </main>
        
        <!-- Product Detail Modal -->
        <ViewDetail
            v-if="showViewDetail && viewProduct"
            :product="viewProduct"
            @close="closeView"
            @add-to-cart="addToCart"
        />
    </div>
    <!-- Show More Button -->
    <div class="text-center" v-if="canShowMore && filteredProducts.length > 0">
        <!-- Loading Spinner -->
        <div v-if="loadingMore" class="flex justify-center items-center py-6">
            <svg class="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span class="ml-3 text-orange-500 font-medium text-base">Loading...</span>
        </div>
        <!-- Show More Button -->
        <button
            v-else
            @click="showMoreProducts"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
        >
            View More
            <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </button>
    </div>
    <div class="py-20"></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../../store/storeProduct'
import ViewDetail from '../../pages/hom-page/product/ViewDetail.vue'
import { products } from '../../store/storeProduct'
import { useCartStore } from '../../store/cartStore'
import useFavoriteStore from '../../store/favoritesStore'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'

// ------------- STORES -------------
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

// ------------- UI STATE -------------
const showMobileFilters = ref(false)
const sortOption = ref<'featured' | 'price-low' | 'price-high' | 'rating'>('featured')
const viewProduct = ref<Product | null>(null)
const showViewDetail = ref(false)
const productsPerPage = ref(12)
const loadingMore = ref(false)

// ------------- FILTER STATE -------------
const selectedCategory = ref<string>('')
const priceRange = ref<[number, number]>([0, 500])
const minRating = ref<number>(0)
const inStockOnly = ref<boolean>(false)
const includeOutOfStock = ref<boolean>(true)

// ------------- COMPUTED PROPERTIES -------------
const categories = computed(() => {
    return [...new Set(products.map(p => p.category_shop || p.category))]
        .filter(Boolean)
        .map(category => ({ name: category, code: category.toUpperCase().replace(/\s+/g, '_') }))
})

const filteredProducts = computed(() => {
    return products.filter(product => {
        // Category filter
        const matchCategory = !selectedCategory.value || 
            (product.category_shop || product.category) === selectedCategory.value
        
        // Price filter using range slider
        const productPrice = product.price_shop || product.price
        const matchMinPrice = productPrice >= priceRange.value[0]
        const matchMaxPrice = productPrice <= priceRange.value[1]
        
        // Rating filter
        const productRating = product.rating_shop || product.rating
        const matchRating = minRating.value === 0 || productRating >= minRating.value
        
        // Stock availability
        const matchStock = !inStockOnly.value || (product.stock > 0)
        const matchIncludeOutOfStock = includeOutOfStock.value || (product.stock > 0)

        return matchCategory && matchMinPrice && matchMaxPrice && 
            matchRating && matchStock && matchIncludeOutOfStock
    })
})
const paginatedProducts = computed(() => {
    return sortedProducts.value.slice(0, productsPerPage.value)
})
const sortedProducts = computed(() => {
    const productsToSort = [...filteredProducts.value]

    switch (sortOption.value) {
        case 'price-low':
            return productsToSort.sort((a, b) => (a.price_shop || a.price) - (b.price_shop || b.price))
        case 'price-high':
            return productsToSort.sort((a, b) => (b.price_shop || b.price) - (a.price_shop || a.price))
        case 'rating':
            return productsToSort.sort((a, b) => (b.rating_shop || b.rating) - (a.rating_shop || a.rating))
        default: // 'featured'
            return productsToSort
    }
})

const canShowMore = computed(() => {
    return productsPerPage.value < filteredProducts.value.length
})

// ------------- FUNCTIONS -------------
const applyFilters = () => {
    showMobileFilters.value = false
    // Reset pagination when filters change
    productsPerPage.value = 8
}

const resetFilters = () => {
    selectedCategory.value = ''
    priceRange.value = [0, 500]
    minRating.value = 0
    inStockOnly.value = false
    includeOutOfStock.value = true
    showMobileFilters.value = false
    productsPerPage.value = 8
}

const addToCart = (product: Product, quantity: number = 1) => {
    cartStore.addToCart(product, quantity)
}

const toggleFavorite = (product: Product) => {
    favoriteStore.toggleFavorite(product.id)
}

const isFavorite = (productId: number) => {
    return favoriteStore.isFavorite(productId)
}

const openView = (product: Product) => {
    viewProduct.value = product
    showViewDetail.value = true
}

const closeView = () => {
    showViewDetail.value = false
}

const showMoreProducts = () => {
    loadingMore.value = true
    setTimeout(() => {
        productsPerPage.value += 8
        loadingMore.value = false
    }, 800)
}

// ------------- EXPOSE TO TEMPLATE IF NEEDED -------------
defineExpose({
    openView,
    closeView,
    addToCart,
    toggleFavorite
})
</script>

<style scoped>
/* Custom scrollbar for sidebar */
aside {
    scrollbar-width: thin;
    scrollbar-color: #f59e42 #f5f5f5;
}

aside::-webkit-scrollbar {
    width: 6px;
}

aside::-webkit-scrollbar-thumb {
    background-color: #f59e42;
    border-radius: 6px;
}

/* Responsive adjustments */
@media (max-width: 639px) {
    .grid {
        gap: 0.5rem;
    }
}

@media (min-width: 640px) and (max-width: 767px) {
    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }
}

@media (min-width: 1024px) {
    .grid {
        gap: 1.25rem;
    }
}
</style>