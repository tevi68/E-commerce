<template>
    <div class="w-full px-4 py-6 lg:px-8 xl:px-16 flex flex-col lg:flex-row gap-6">
        <!-- Social Share Bar (fixed center right) -->
        <div class="fixed top-1/2 right-4 z-50 flex flex-col gap-2 items-end" style="transform: translateY(-50%);">
            
            <!-- Animated Share Bar -->
            <transition name="fade-slide" mode="out-in">
                <div v-if="showShareBar" key="sharebar" class="flex flex-col gap-2 animate-fade-in-right">
                    <button class="w-8 h-8 cursor-pointer flex items-center justify-center rounded bg-[#3b5998] hover:opacity-80 shadow" title="Share on Facebook">
                        <i class="pi pi-facebook text-white"></i>
                    </button>
                    <button class="w-8 h-8 cursor-pointer flex items-center justify-center rounded bg-[#1da1f2] hover:opacity-80 shadow" title="Share on Twitter">
                        <i class="pi pi-twitter text-white"></i>
                    </button>
                    <button class="w-8 h-8 cursor-pointer flex items-center justify-center rounded bg-[#e60023] hover:opacity-80 shadow" title="Share on Pinterest">
                        <i class="pi pi-pinterest text-white"></i>
                    </button>
                    <button class="w-8 h-8 cursor-pointer flex items-center justify-center rounded bg-gray-400 hover:opacity-80 shadow" title="Edit">
                        <i class="pi pi-pencil text-white"></i>
                    </button>
                </div>
            </transition>
            <!-- Toggle Button (always visible, same place) -->
            <button
                class="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 shadow mb-2 transition-transform duration-300"
                :class="{ 'rotate-45': showShareBar }"
                title="Toggle Share Bar"
                @click="toggleShareBar"
            >
                <span class="text-3xl text-gray-500 font-bold pb-1 transition-transform duration-300">+</span>
            </button>
        </div>
        <!-- Mobile toggle button (outside sidebar) -->

        <!-- Filter Sidebar -->
        <aside class="w-full lg:w-80 bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out h-full"
            :class="{
                'hidden lg:block': !showMobileFilters,
                'fixed inset-0 z-[100] h-screen w-screen bg-white lg:static lg:inset-auto lg:h-auto lg:w-80': showMobileFilters
            }"
        >
            <div class="flex flex-col h-full">
                <!-- Header with close button (mobile only) -->
                <div class="flex-shrink-0 flex justify-between items-center p-4 pb-0 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-lg uppercase tracking-wider">
                        <div class="w-10 h-10 bg-gray-800 flex items-center justify-center">
                            <span class="pi pi-filter text-white text-lg"></span>
                        </div>
                        <span class="text-gray-800">
                            Smart Filters
                        </span>
                    </h2>
                    <button
                        @click="showMobileFilters = false"
                        class="lg:hidden group w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                        <span class="pi pi-times text-gray-500 group-hover:text-gray-700 transition-colors"></span>
                    </button>
                </div>

                <!-- Content area (no scroll, stretches with main) -->
                <div class="flex-1 p-6 pt-4">
                    <!-- Category Filter -->
                    <div class="mb-8 group">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                        <div class="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span class="pi pi-tag text-white text-xs"></span>
                        </div>
                            Category
                        </label>
                        <div class="relative">
                            <Dropdown
                                v-model="selectedCategory"
                                :options="categories"
                                optionLabel="name"
                                placeholder="Select Category"
                                class="w-full"
                                :pt="{
                                    root: { class: 'border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300' },
                                    input: { class: 'py-3.5 px-4 text-sm bg-white' },
                                    trigger: { class: 'text-gray-500' },
                                    panel: { class: 'bg-white border border-gray-300 shadow-lg rounded-xl mt-2' },
                                    item: { class: 'text-sm hover:bg-gray-100 transition-all duration-200 px-4 py-3' }
                                }"
                                @change="handleFilterChange"
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex items-center gap-3">
                                        <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
                                        <span class="font-medium">{{ slotProps.value.name }}</span>
                                    </div>
                                    <span v-else class="text-gray-500">{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex items-center gap-3 py-1">
                                        <div class="w-2 h-2 bg-gray-700 rounded-full"></div>
                                        <span>{{ slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>

                    <!-- Price Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                        <div class="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span class="pi pi-dollar text-white text-xs"></span>
                        </div>
                            Price Range
                        </label>
                        <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <Slider
                                v-model="priceRange"
                                :min="0"
                                :max="5000"
                                :step="10"
                                range
                                class="w-full mb-4"
                                :pt="{
                                root: { class: 'h-2' },
                                range: { class: 'bg-gray-700 h-2 rounded-full shadow' },
                                handle: { class: 'w-5 h-5 bg-white border-2 border-gray-700 shadow hover:shadow-md transition-all duration-200 rounded-full' }
                                }"
                                @update:modelValue="handleFilterChange"
                            />
                            <div class="flex items-center justify-between">
                                <div class="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                                    <span class="text-sm font-semibold text-gray-700">${{ priceRange[0] }}</span>
                                </div>
                                <div class="flex-1 mx-3 h-px bg-gray-300"></div>
                                <div class="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                                    <span class="text-sm font-semibold text-gray-700">${{ priceRange[1] }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Rating Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                            <div class="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                                <span class="pi pi-star-fill text-white text-xs"></span>
                            </div>
                            Customer Rating
                        </label>
                        <div class="space-y-2">
                            <div
                                v-for="rating in [5, 4, 3, 2, 1]"
                                :key="rating"
                                @click="minRating = rating; handleFilterChange()"
                                class="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300"
                                :class="{
                                'bg-gray-100 border-2 border-gray-300 shadow': minRating === rating,
                                'bg-white hover:bg-gray-50 border border-gray-200': minRating !== rating
                                }"
                            >
                                <Rating
                                    :modelValue="rating"
                                    :readonly="true"
                                    :cancel="false"
                                    class="text-lg"
                                    :pt="{
                                        onIcon: { class: 'text-gray-600' },
                                        offIcon: { class: 'text-gray-300' }
                                    }"
                                />
                                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                                    {{ rating }}+ Stars
                                </span>
                                <div
                                    v-if="minRating === rating"
                                    class="ml-auto w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center shadow"
                                    >
                                    <span class="pi pi-check text-white text-xs"></span>
                                </div>
                            </div>
                            <div
                                @click="minRating = 0; handleFilterChange()"
                                class="group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300"
                                :class="{
                                'bg-gray-100 border-2 border-gray-300 shadow': minRating === 0,
                                'bg-white hover:bg-gray-50 border border-gray-200': minRating !== 0
                                }"
                            >
                                <div class="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-lg">
                                    <span class="pi pi-star text-white text-sm"></span>
                                </div>
                                <span class="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                                    Any Rating
                                </span>
                                <div v-if="minRating === 0"
                                    class="ml-auto w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center shadow"
                                >
                                    <span class="pi pi-check text-white text-xs"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Availability Filter -->
                    <div class="mb-8">
                        <label class="flex items-center gap-2 text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wider">
                        <div class="w-6 h-6 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span class="pi pi-box text-white text-xs"></span>
                        </div>
                        Availability
                        </label>
                        <div class="space-y-3">
                        <div class="group flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
                            <Checkbox
                            v-model="inStockOnly"
                            inputId="inStock"
                            :binary="true"
                            class="transform transition-all duration-200 hover:scale-110"
                            :pt="{
                                root: { class: 'relative' },
                                box: { class: 'w-5 h-5 border-2 border-gray-300 rounded-lg bg-white transition-all duration-200' },
                                input: { class: 'peer' },
                                icon: { class: 'text-white text-sm' }
                            }"
                            @change="handleFilterChange"
                            />
                            <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-gray-600 rounded-full"></div>
                            <label for="inStock" class="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-gray-800 transition-colors">
                                In Stock Only
                            </label>
                            </div>
                        </div>
                        <div class="group flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
                            <Checkbox
                            v-model="includeOutOfStock"
                            inputId="outOfStock"
                            :binary="true"
                            class="transform transition-all duration-200 hover:scale-110"
                            :pt="{
                                root: { class: 'relative' },
                                box: { class: 'w-5 h-5 border-2 border-gray-300 rounded-lg bg-white transition-all duration-200' },
                                input: { class: 'peer' },
                                icon: { class: 'text-white text-sm' }
                            }"
                            @change="handleFilterChange"
                            />
                            <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <label for="outOfStock" class="text-sm font-medium text-gray-700 cursor-pointer group-hover:text-gray-800 transition-colors">
                                Include Out of Stock
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <!-- Sticky action buttons at bottom -->
                <div class="sticky bottom-0 bg-gradient-to-t from-white via-white to-white/80 pt-6 pb-4 px-6 border-t border-gray-200">
                <div class="flex flex-col gap-3">
                    <button
                    @click="applyFilters"
                    :disabled="loadingFilters"
                    class="group relative w-full bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-semibold text-sm transition-all duration-300 shadow hover:shadow-md"
                    >
                    <div class="flex items-center justify-center gap-3">
                        <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                        <span class="pi pi-check text-xs"></span>
                        </div>
                        <span>Apply Filters</span>
                    </div>
                    </button>

                    <button
                    @click="resetFilters"
                    class="group w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md border border-gray-300"
                    >
                    <div class="flex items-center justify-center gap-3">
                        <div class="w-5 h-5 bg-gray-400/20 rounded-full flex items-center justify-center">
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
        <main class="flex-1 h-full">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 bg-white border border-gray-200 p-4">
                <h1 class="text-xl font-semibold uppercase text-gray-900">Shop Products</h1>
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
            <div class="relative">
                <div v-if="loadingFilters" class="loading-overlay z-20">
                    <svg class="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span class="ml-3 text-orange-500 font-medium text-base">Loading...</span>
                </div>
                <div v-if="filteredProducts.length > 0"
                    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
                >
                    <div
                        v-for="product in paginatedProducts"
                        :key="product.id"
                        class="group relative bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden flex flex-col"
                    >
                        <!-- Product Image Container (Full Card Width) -->
                        <div class="relative w-full pt-[100%] bg-gray-50"> <!-- 1:1 Aspect Ratio -->
                            <!-- Image that fills container while maintaining aspect ratio -->
                            <img
                                :src="getImageUrl(product.images && product.images.length ? product.images[0].url : '')"
                                :alt="product.title"
                                @click.stop="openView(product)"
                                class="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition duration-300 cursor-pointer"
                                loading="lazy"
                            />
                            <!-- Discount Badge -->
                            <div v-if="product.discount > 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {{ product.discount }}% OFF
                            </div>
                            <!-- Favorite Button -->
                            <button
                                @click.stop="toggleFavorite(product.id)"
                                class="absolute cursor-pointer top-2 left-2 bg-white rounded-full size-8 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-all"
                                title="Add to favorites"
                            >
                                <i class="pi text-sm" :class="isFavorite(product.id) ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-900'"></i>
                            </button>
                            <!-- Quick Add to Cart -->
                            <button
                                @click.stop="addToCart(product)"
                                class="absolute cursor-pointer bottom-2 right-2 bg-white rounded-full size-10 p-2 shadow-sm hover:bg-orange-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                title="Add to Cart"
                            >
                                <i class="pi pi-shopping-cart text-black text-sm"></i>
                            </button>
                        </div>
                        <!-- Product Content -->
                        <div class="p-3 flex flex-col flex-grow">
                            <!-- Title -->
                            <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1.5">
                                {{ product.title }}
                            </h3>
                            <!-- Price -->
                            <div class="flex items-baseline gap-1 mb-1">
                                <span class="text-base font-bold text-red-600">
                                    {{ currencyStore.getDisplayPrice(product.price) }}
                                </span>
                                <span
                                    v-if="product.originalPrice"
                                    class="text-xs text-gray-500 line-through"
                                >
                                    {{ currencyStore.getDisplayPrice(product.originalPrice) }}
                                </span>
                            </div>
                            <!-- Rating and Sold -->
                            <div class="flex items-center gap-1 mb-2">
                                <div class="flex text-gray-700">
                                    <i v-for="star in 5" :key="star" class="pi text-xs" 
                                        :class="star <= Math.round(product.rating) ? 'pi-star-fill' : 'pi-star'"></i>
                                </div>
                                <span class="text-xs text-gray-500">
                                    {{ product.rating.toFixed(1) }} | {{ product.reviewCount || 0 }} sold
                                </span>
                            </div>
                            <!-- Bottom Buttons -->
                            <!-- <div class="flex gap-2 mt-auto">
                                <button
                                    class="flex-1 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 text-xs rounded transition-colors"
                                    @click.stop="openView(product)"
                                >
                                    See preview
                                </button>
                                <button
                                    class="flex-1 cursor-pointer border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 text-xs rounded transition-colors"
                                    @click.stop="openView(product)"
                                >
                                    Similar
                                </button>
                            </div> -->
                        </div>
                    </div>
                </div>
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
            </div>

            <!-- Empty State -->
            
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
import { ref, computed, onMounted } from 'vue'
import { fetchShopProducts } from '../../store/productApi'
import type { Product } from '../../store/storeProduct'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../store/cartStore'
import useFavoriteStore from '../../store/favoritesStore'
import Slider from 'primevue/slider'
import Rating from 'primevue/rating'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import { useCurrencyStore } from '../../store/currencyStore'
const currencyStore = useCurrencyStore();

// ============== STORES ==============
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const router = useRouter()
// ============== STATE & VARIABLES ==============
const products = ref<Product[]>([]) // ទុកទិន្នន័យផលិតផលទាំងអស់
const showMobileFilters = ref(false) // បង្ហាញ/លាក់ filter នៅលើ mobile
const sortOption = ref<'featured' | 'price-low' | 'price-high' | 'rating'>('featured') // ជម្រើសតម្រៀប
const viewProduct = ref<Product | null>(null) // ផលិតផលដែលកំពុងមើលលម្អិត
const showViewDetail = ref(false) // បង្ហាញ/លាក់ modal មើលលម្អិត
const productsPerPage = ref(20) // ចំនួនផលិតផលដែលបង្ហាញក្នុងមួយទំព័រ
const loadingMore = ref(false) // ស្ថានភាពកំពុងផ្ទុកផលិតផលបន្ថែម
const loadingProducts = ref(false) // ស្ថានភាពកំពុងផ្ទុកផលិតផលដំបូង
// Add loading state for filters
const loadingFilters = ref(false)

// ============== FILTER STATE ==============
const selectedCategory = ref<{name: string, code: string} | null>(null) // ប្រភេទផលិតផលដែលបានជ្រើសរើស
const priceRange = ref<[number, number]>([0, 5000]) // ជួរតម្លៃដែលបានជ្រើសរើស
const minRating = ref<number>(0) // ពិន្ទុអប្បបរមាដែលបានជ្រើសរើស
const inStockOnly = ref<boolean>(false) // បង្ហាញតែផលិតផលដែលមានស្តុក
const includeOutOfStock = ref<boolean>(true) // រួមបញ្ចូលផលិតផលដែលអស់ស្តុក

// Social Share Bar toggle state
const showShareBar = ref(true)
function toggleShareBar() { showShareBar.value = !showShareBar.value }

// ============== CONSTANTS ==============
const fallbackImage = 'https://via.placeholder.com/80' // រូបភាពសំរាប់ករណីមិនមានរូប
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000' // URL មូលដ្ឋានសំរាប់ API

// ============== LIFECYCLE HOOKS ==============
onMounted(async () => {
    // ទាញយកទិន្នន័យផលិតផលនៅពេល component ត្រូវបាន mount
    loadingProducts.value = true
    try {
        products.value = await fetchShopProducts()
    } catch (error) {
        console.error('Failed to fetch products:', error)
    } finally {
        loadingProducts.value = false
    }
})

// ============== UTILITY FUNCTIONS ==============
/**
 * បំប្លែង path រូបភាពទៅជា URL ពេញលេញ
 * @param imagePath - path រូបភាពពី server
 * @returns URL ពេញលេញនៃរូបភាព
 */
function getImageUrl(imagePath: string) {
    if (!imagePath) return fallbackImage
    if (imagePath.startsWith('http')) return imagePath
    
    // កែសម្រួល path ពី /images/ ទៅ /uploads/
    const fixedPath = imagePath.replace(/^\/images\//, '/uploads/')
    return `${apiBaseUrl}${fixedPath}`
}

// ============== COMPUTED PROPERTIES ==============
// ប្រភេទផលិតផលទាំងអស់សំរាប់ filter
const categories = computed(() => {
    const uniqueCategories = new Set<string>()
    products.value.forEach(product => {
        if (product.category) {
            uniqueCategories.add(product.category)
        }
    })
    
    return Array.from(uniqueCategories).map(category => ({
        name: category,
        code: category.toUpperCase().replace(/\s+/g, '_')
    }))
})

// ផលិតផលដែលបានច្រោះតាម filter ទាំងអស់
const filteredProducts = computed(() => {
    return products.value.filter(product => {
        // ត្រួតពិនិត្យតាមប្រភេទ
        const matchCategory = !selectedCategory.value || 
        product.category === selectedCategory.value.name
        
        // ត្រួតពិនិត្យតាមជួរតម្លៃ
        const matchPrice = product.price >= priceRange.value[0] && 
        product.price <= priceRange.value[1]
        
        // ត្រួតពិនិត្យតាមពិន្ទុ
        const matchRating = minRating.value === 0 || 
        product.rating >= minRating.value
        
        // ត្រួតពិនិត្យស្តុក
        const matchStock = !inStockOnly.value || product.stock > 0
        const matchIncludeOutOfStock = includeOutOfStock.value || product.stock > 0

        return matchCategory && matchPrice && matchRating && 
        matchStock && matchIncludeOutOfStock
    })
})

// ផលិតផលដែលបានតម្រៀបតាមជម្រើស
const sortedProducts = computed(() => {
    const productsToSort = [...filteredProducts.value]

    switch (sortOption.value) {
        case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price)
        case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price)
        case 'rating':
        return productsToSort.sort((a, b) => b.rating - a.rating)
        default: // 'featured'
        return productsToSort.sort((a, b) => b.rating - a.rating)
    }
})

// ផលិតផលសំរាប់បង្ហាញក្នុងទំព័របច្ចុប្បន្ន (20 ក្នុងមួយទំព័រ)
const paginatedProducts = computed(() => {
    return sortedProducts.value.slice(0, productsPerPage.value)
})

// ពិនិត្យមើលថាតើមានផលិតផលច្រោះជាង 20 ដែលអាចបង្ហាញបន្ថែម
const canShowMore = computed(() => {
    return productsPerPage.value < filteredProducts.value.length
})

// ============== EVENT HANDLERS ==============
/**
 * អនុវត្ត filter ទាំងអស់ និងលាក់ mobile filter
 */
const applyFilters = () => {
    loadingFilters.value = true
    showMobileFilters.value = false
    productsPerPage.value = 20 // កំណត់ចំនួនផលិតផលឡើងវិញទៅ 20
    setTimeout(() => {
        loadingFilters.value = false
    }, 800) // Simulate loading
}

/**
 * កំណត់ filter ទាំងអស់ទៅជាលំនាំដើម
 */
const resetFilters = () => {
    selectedCategory.value = null
    priceRange.value = [0, 500]
    minRating.value = 0
    inStockOnly.value = false
    includeOutOfStock.value = true
    showMobileFilters.value = false
    productsPerPage.value = 20 // កំណត់ចំនួនផលិតផលឡើងវិញទៅ 20
}

/**
 * បន្ថែមផលិតផលទៅកន្ត្រក
 * @param product - ផលិតផលដែលត្រូវបន្ថែម
 * @param quantity - ចំនួន (លំនាំដើម 1)
 */
const addToCart = (product: Product, quantity: number = 1) => {
    if (product.stock <= 0) return
    cartStore.addToCart(product, quantity)
    product.stock -= quantity // កែប្រែស្តុកក្នុង local
}

/**
 * បិទ/បើកផលិតផលដែលចូលចិត្ត
 * @param productId - ID ផលិតផល
 */
const toggleFavorite = (productId: number) => {
    favoriteStore.toggleFavorite(productId)
}

/**
 * ពិនិត្យមើលថាតើផលិតផលនេះជាផលិតផលដែលចូលចិត្តរួចហើយឬទេ
 * @param productId - ID ផលិតផល
 * @returns boolean
 */
const isFavorite = (productId: number) => {
    return favoriteStore.isFavorite(productId)
}

/**
 * បើក modal មើលលម្អិតផលិតផល
 * @param product - ផលិតផលដែលត្រូវមើល
 */
const openView = (product: Product) => {
  router.push({ name: 'ProductDetail', params: { id: product.id } })
}

/**
 * បិទ modal មើលលម្អិត
 */
const closeView = () => {
  showViewDetail.value = false
}

/**
 * បង្ហាញផលិតផលបន្ថែម 20 ក្នុងមួយដង
 */
const showMoreProducts = () => {
  loadingMore.value = true
  setTimeout(() => {
    productsPerPage.value += 20
    loadingMore.value = false
  }, 800)
}

// ============== FILTER LOADING ON CHANGE ==============
function handleFilterChange() {
  loadingFilters.value = true
  setTimeout(() => {
    loadingFilters.value = false
  }, 800)
}
</script>

<style scoped>
/* Add disabled state for buttons */
    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* Loading state */
    .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    margin-block: 0.5rem;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
    transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.pulse-indicator {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions for all interactive elements */
button, .p-dropdown, .p-slider, .p-rating, .p-checkbox {
    transition: all 0.2s ease-in-out;
}

/* Enhanced focus states for accessibility */
button:focus, [type='checkbox']:focus, .p-dropdown:focus {
    outline: 2px solid #f97316;
    outline-offset: 2px;
}

.fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateX(40px);
}
.fade-slide-enter-to, .fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>