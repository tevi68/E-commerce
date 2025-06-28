<template>
    <div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto py-6 px-4">
        <!-- Mobile toggle button (outside sidebar) -->

        <!-- Filter Sidebar -->
        <aside
            class="w-full lg:w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 mb-6 lg:mb-0 transition-all duration-300 border border-gray-100 dark:border-gray-700"
            :class="{ 'hidden lg:block': !showMobileFilters, 'block fixed inset-0 z-50 overflow-y-auto lg:static lg:inset-auto': showMobileFilters }"
        >
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <h2 class="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <span class="pi pi-filter text-orange-500"></span> 
                    <span class="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        Filter Products
                    </span>
                </h2>
                <button 
                    @click="showMobileFilters = false" 
                    class="lg:hidden text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full"
                >
                    <span class="pi pi-times text-lg"></span>
                </button>
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">
                    Category
                </label>
                <Dropdown
                    v-model="selectedCategory"
                    :options="categories"
                    optionLabel="name"
                    placeholder="All Categories"
                    class="w-full"
                    :pt="{
                        root: { class: 'border-gray-200 dark:border-gray-600 rounded-lg' },
                        input: { class: 'py-2.5 text-sm' },
                        panel: { class: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg' },
                        item: { class: 'text-sm hover:bg-gray-50 dark:hover:bg-gray-700' }
                    }"
                >
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <span class="pi pi-tag mr-2 text-orange-500"></span>
                            <span>{{ slotProps.value.name }}</span>
                        </div>
                        <span v-else>{{ slotProps.placeholder }}</span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">
                            <span class="pi pi-tag mr-2 text-orange-500"></span>
                            <span>{{ slotProps.option.name }}</span>
                        </div>
                    </template>
                </Dropdown>
            </div>

            <!-- Price Filter -->
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">
                    Price Range
                </label>
                <div class="space-y-3">
                    <Slider
                        v-model="priceRange"
                        :min="0"
                        :max="1000"
                        :step="10"
                        range
                        class="w-full"
                        :pt="{
                            range: { class: 'bg-orange-500' },
                            handle: { class: 'border-orange-500 hover:bg-orange-500' }
                        }"
                    />
                    <div class="flex items-center justify-between gap-3">
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            ${{ priceRange[0] }}
                        </span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            ${{ priceRange[1] }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Rating Filter -->
            <div class="mb-6">
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">
                    Customer Rating
                </label>
                <div class="space-y-2">
                    <div 
                        v-for="rating in [4, 3, 2, 1]" 
                        :key="rating"
                        @click="minRating = rating"
                        class="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all"
                        :class="{
                            'bg-orange-50 dark:bg-gray-700': minRating === rating,
                            'hover:bg-gray-50 dark:hover:bg-gray-700': minRating !== rating
                        }"
                    >
                        <Rating 
                            :modelValue="rating" 
                            :readonly="true" 
                            :cancel="false" 
                            class="text-sm"
                            :pt="{
                                onIcon: { class: 'text-yellow-400' }
                            }"
                        />
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            {{ rating }}+ Stars
                        </span>
                        <span 
                            v-if="minRating === rating"
                            class="ml-auto pi pi-check text-orange-500"
                        ></span>
                    </div>
                    <div 
                        @click="minRating = 0"
                        class="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all"
                        :class="{
                            'bg-orange-50 dark:bg-gray-700': minRating === 0,
                            'hover:bg-gray-50 dark:hover:bg-gray-700': minRating !== 0
                        }"
                    >
                        <span class="text-xs text-gray-500 dark:text-gray-400">
                            Any Rating
                        </span>
                        <span 
                            v-if="minRating === 0"
                            class="ml-auto pi pi-check text-orange-500"
                        ></span>
                    </div>
                </div>
            </div>

            <!-- Availability Filter -->
            <div class="mb-8">
                <label class="block text-gray-700 dark:text-gray-300 font-medium mb-3 text-sm uppercase tracking-wider">
                    Availability
                </label>
                <div class="space-y-2">
                    <div class="flex items-center">
                        <Checkbox
                            v-model="inStockOnly"
                            inputId="inStock"
                            :binary="true"
                            :pt="{
                                root: { class: 'mr-3' },
                                box: { class: 'border-gray-300 dark:border-gray-600' },
                                input: { class: 'focus:ring-orange-500' },
                                icon: { class: 'text-orange-500' }
                            }"
                        />
                        <label for="inStock" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            In Stock Only
                        </label>
                    </div>
                    <div class="flex items-center">
                        <Checkbox
                            v-model="includeOutOfStock"
                            inputId="outOfStock"
                            :binary="true"
                            :pt="{
                                root: { class: 'mr-3' },
                                box: { class: 'border-gray-300 dark:border-gray-600' },
                                input: { class: 'focus:ring-orange-500' },
                                icon: { class: 'text-orange-500' }
                            }"
                        />
                        <label for="outOfStock" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            Include Out of Stock
                        </label>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-3">
                <button
                    @click="applyFilters"
                    class="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                    <span class="pi pi-check"></span>
                    Apply Filters
                </button>
                <button
                    @click="resetFilters"
                    class="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2.5 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2"
                >
                    <span class="pi pi-refresh"></span>
                    Reset All
                </button>
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
                    v-for="product in sortedProducts"
                    :key="product.id"
                    @click="openView(product)"
                    class="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group border border-gray-100 hover:border-orange-200"
                >
                    <!-- Image -->
                    <div class="relative overflow-hidden aspect-square">
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
                                    <p class="text-orange-500 font-bold text-base">${{ product.price.toFixed(2) }}</p>
                                    <p v-if="product.originalPrice" class="text-gray-400 text-xs line-through">
                                        ${{ product.originalPrice.toFixed(2) }}
                                    </p>
                                </div>
                                <button
                                    class="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition flex items-center justify-center shadow-sm"
                                    @click="openView(product)"
                                >
                                    <span class="pi pi-shopping-cart text-sm"></span>
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
        <!-- Loading Spinner (ក្រៅ Button) -->
        <div v-if="loadingMore" class="flex justify-center items-center py-6">
            <svg class="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span class="ml-3 text-orange-500 font-medium text-base">Loading...</span>
        </div>
        <!-- Show More Button (លាក់ពេល Loading) -->
        <button
            v-else
            @click="showMoreProducts"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
        >
            Show More
            <svg class="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
        </button>
    </div><br>
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
const productsPerPage = ref(8)
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

const canShowMore = computed(() => productsPerPage.value < sortedProducts.value.length)

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
    // Optional: Show toast notification
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
    }, 800) // Shorter loading time for better UX
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