<template>
    <div class="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div class="bg-white/95 backdrop-blur-md rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative shadow-2xl border border-white/20 animate-fade-in">
            <!-- Close Button -->
            <Button 
                @click="$emit('close')" 
                icon="pi pi-times"
                class="!absolute top-4 right-4 z-20 !w-10 !h-10 !rounded-full !bg-white/90 hover:!bg-white !text-gray-700 hover:!text-gray-900 !border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110"
                severity="secondary"
            />

            <div class="overflow-y-auto max-h-[95vh] custom-scrollbar">
                <div class="grid grid-cols-1 xl:grid-cols-2 gap-0">
                    <!-- Product Images Section -->
                    <div class="bg-gradient-to-br from-gray-50 to-gray-100/50 p-4 sm:p-6 lg:p-8 space-y-6">
                        <!-- Main Image Display -->
                        <div class="relative group">
                            <div class="bg-white rounded-2xl shadow-lg overflow-hidden h-64 sm:h-80 lg:h-96 flex items-center justify-center relative">
                                <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Image 
                                    :src="selectedImage || product.image" 
                                    :alt="product.title" 
                                    class="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                                    imageClass="rounded-xl"
                                />
                                <!-- Image Zoom Indicator -->
                                <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <i class="pi pi-search-plus text-gray-600 text-sm"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Image Carousel -->
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-800 flex items-center gap-2">
                                <i class="pi pi-images text-orange-500"></i>
                                More Views
                            </h4>
                            <Carousel 
                                :value="imagesByCategory" 
                                :numVisible="4" 
                                :numScroll="1" 
                                :responsive-options="[
                                    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
                                    { breakpoint: '640px', numVisible: 2, numScroll: 1 }
                                ]"
                                circular 
                                class="w-full"
                                :showIndicators="false"
                                :showNavigators="imagesByCategory.length > 4"
                            >
                                <template #item="{ data: img }">
                                    <div class="p-1">
                                        <div
                                            @click="selectedImage = img"
                                            class="cursor-pointer border-2 rounded-xl overflow-hidden flex items-center justify-center bg-white w-16 h-16 sm:w-20 sm:h-20 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                                            :class="{
                                                'border-orange-500 ring-2 ring-orange-200 shadow-orange-200': selectedImage === img, 
                                                'border-gray-200 hover:border-orange-300': selectedImage !== img
                                            }"
                                        >
                                            <Image :src="img" class="max-h-full max-w-full object-contain" />
                                        </div>
                                    </div>
                                </template>
                            </Carousel>
                        </div>
                         <!-- Tab Navigation -->
                        <TabView class="custom-tabs">

                            <!-- Reviews Tab -->
                            <TabPanel header="Reviews" value="reviews">
                                <div class="space-y-6">
                                    <!-- Review Summary -->
                                    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                                        <div class="flex items-center justify-between mb-4">
                                            <h4 class="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                                Customer Reviews
                                            </h4>
                                            <Button 
                                                label="Write a Review" 
                                                icon="pi pi-plus" 
                                                class="!bg-gradient-to-r !from-blue-500 !to-indigo-500 !border-0" 
                                                @click="showReviewDialog = true"
                                            />
                                        </div>
                                        
                                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div class="space-y-3">
                                                <div class="flex items-center gap-4">
                                                    <span class="text-4xl font-bold text-orange-600">{{ product.rating }}</span>
                                                    <div>
                                                        <Rating :modelValue="product.rating" readonly :cancel="false" class="mb-1" />
                                                        <p class="text-sm text-gray-600">Based on {{ product.reviewCount }} reviews</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="space-y-2">
                                                <div v-for="star in [5,4,3,2,1]" :key="star" class="flex items-center gap-2">
                                                    <span class="text-sm w-8">{{ star }}★</span>
                                                    <div class="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            class="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                                                            :style="{ width: `${(product.reviewBreakdown?.[star] || Math.floor(Math.random() * 80) + 10)}%` }"
                                                        ></div>
                                                    </div>
                                                    <span class="text-sm text-gray-600 w-8">{{ product.reviewBreakdown?.[star] || Math.floor(Math.random() * 80) + 10 }}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Individual Reviews -->
                                    <div class="space-y-4">
                                        <div 
                                            v-for="review in (product.reviews || mockReviews)" 
                                            :key="review.id"
                                            class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                                        >
                                            <div class="flex items-start justify-between mb-3">
                                                <div class="flex items-center gap-3">
                                                    <Avatar 
                                                        :label="review.name.charAt(0)" 
                                                        class="!bg-gradient-to-r !from-purple-500 !to-pink-500 !text-white !font-bold"
                                                        size="small"
                                                    />
                                                    <div>
                                                        <h5 class="font-semibold text-gray-900">{{ review.name }}</h5>
                                                        <p class="text-xs text-gray-500">{{ review.date }}</p>
                                                    </div>
                                                </div>
                                                <div class="flex items-center gap-2">
                                                    <Rating :modelValue="review.rating" readonly :cancel="false" class="!text-sm" />
                                                    <Badge v-if="review.verified" value="Verified" severity="success" class="!text-xs" />
                                                </div>
                                            </div>
                                            <p class="text-gray-700 mb-3">{{ review.comment }}</p>
                                            <div class="flex items-center gap-4 text-sm text-gray-500">
                                                <button class="flex items-center gap-1 hover:text-green-600 transition-colors">
                                                    <i class="pi pi-thumbs-up"></i>
                                                    Helpful ({{ review.helpful || 0 }})
                                                </button>
                                                <button class="flex items-center gap-1 hover:text-red-600 transition-colors">
                                                    <i class="pi pi-flag"></i>
                                                    Report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            <!-- Shipping & Returns Tab -->
                            <TabPanel header="Shipping & Returns" value="shipping">
                                <div class="space-y-6">
                                    <!-- Shipping Information -->
                                    <Card class="!bg-gradient-to-r !from-green-50 !to-emerald-50 !border-green-100">
                                        <template #content>
                                            <div class="space-y-4">
                                                <h4 class="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                    <i class="pi pi-truck text-green-500"></i>
                                                    Shipping Information
                                                </h4>
                                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div class="space-y-3">
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-check-circle text-green-500"></i>
                                                            <span class="text-gray-700">Free shipping on orders over $50</span>
                                                        </div>
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-clock text-blue-500"></i>
                                                            <span class="text-gray-700">Standard delivery: 3-5 business days</span>
                                                        </div>
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-send text-purple-500"></i>
                                                            <span class="text-gray-700">Express delivery: 1-2 business days</span>
                                                        </div>
                                                    </div>
                                                    <div class="space-y-3">
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-globe text-cyan-500"></i>
                                                            <span class="text-gray-700">International shipping available</span>
                                                        </div>
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-shield text-orange-500"></i>
                                                            <span class="text-gray-700">Package tracking included</span>
                                                        </div>
                                                        <div class="flex items-center gap-3">
                                                            <i class="pi pi-heart text-red-500"></i>
                                                            <span class="text-gray-700">Careful packaging guaranteed</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </Card>

                                    <!-- Return Policy -->
                                    <Card class="!bg-gradient-to-r !from-blue-50 !to-indigo-50 !border-blue-100">
                                        <template #content>
                                            <div class="space-y-4">
                                                <h4 class="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                    <i class="pi pi-refresh text-blue-500"></i>
                                                    Return Policy
                                                </h4>
                                                <div class="space-y-3">
                                                    <div class="flex items-start gap-3">
                                                        <i class="pi pi-calendar text-green-500 mt-1"></i>
                                                        <div>
                                                            <p class="font-semibold text-gray-800">30-Day Returns</p>
                                                            <p class="text-gray-600 text-sm">Return items within 30 days for a full refund</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <i class="pi pi-box text-purple-500 mt-1"></i>
                                                        <div>
                                                            <p class="font-semibold text-gray-800">Original Condition</p>
                                                            <p class="text-gray-600 text-sm">Items must be unused and in original packaging</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex items-start gap-3">
                                                        <i class="pi pi-money-bill text-orange-500 mt-1"></i>
                                                        <div>
                                                            <p class="font-semibold text-gray-800">Free Return Shipping</p>
                                                            <p class="text-gray-600 text-sm">We'll cover return shipping costs for defective items</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </Card>
                                </div>
                            </TabPanel>
                        </TabView>
                    </div>

                    <!-- Product Details Section -->
                    <div class="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50/50 space-y-6">
                        <!-- Product Title & Badge -->
                        <div class="space-y-3">
                            <div class="flex items-start justify-between gap-4">
                                <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{{ product.title }}</h2>
                                <Badge 
                                    v-if="product.isOnSale" 
                                    :value="`${product.discount}% OFF`"
                                    severity="danger"
                                    class="!bg-gradient-to-r !from-red-500 !to-pink-500 !text-white !font-bold !px-3 !py-1 !text-sm animate-pulse"
                                />
                            </div>
                            
                            <!-- Category Tag & Brand -->
                            <div class="flex flex-wrap items-center gap-2">
                                <Tag 
                                    :value="product.category" 
                                    severity="info"
                                    class="!bg-gradient-to-r !from-blue-500 !to-indigo-500 !text-white !font-medium"
                                />
                                <Tag 
                                    v-if="product.brand" 
                                    :value="product.brand" 
                                    severity="secondary"
                                    class="!bg-gradient-to-r !from-gray-600 !to-gray-700 !text-white !font-medium"
                                />
                                <Tag 
                                    v-if="product.sku" 
                                    :value="`SKU: ${product.sku}`" 
                                    severity="contrast"
                                    class="!text-xs"
                                />
                            </div>
                        </div>
                        
                        <!-- Rating & Reviews -->
                        <div class="flex flex-wrap items-center gap-4 p-4 bg-white/80 rounded-xl shadow-sm border border-gray-100">
                            <Rating 
                                :modelValue="product.rating" 
                                readonly 
                                :cancel="false"
                                class="gap-1"
                            />
                            <span class="text-sm text-gray-600 font-medium">({{ product.reviewCount }} reviews)</span>
                            <div class="flex items-center gap-2 text-sm text-green-600">
                                <i class="pi pi-verified text-green-500"></i>
                                Verified Purchase
                            </div>
                            <Button 
                                label="Write Review" 
                                icon="pi pi-star" 
                                class="!text-xs !py-1 !px-3" 
                                severity="secondary" 
                                @click="showReviewDialog = true"
                            />
                        </div>

                        <!-- Pricing -->
                        <div class="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100 space-y-3">
                            <div class="flex items-baseline gap-3 flex-wrap">
                                <span class="text-3xl sm:text-4xl font-bold text-orange-600">${{ product.price.toFixed(2) }}</span>
                                <span v-if="product.originalPrice" class="text-xl text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                                <span v-if="product.originalPrice" class="text-lg font-semibold text-green-600">
                                    Save ${{ (product.originalPrice - product.price).toFixed(2) }}
                                </span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i :class="product.stock < 10 ? 'pi pi-exclamation-triangle text-amber-500' : 'pi pi-check-circle text-green-500'"></i>
                                <p v-if="product.stock < 10" class="text-sm font-medium text-amber-700">
                                    Only {{ product.stock }} left in stock - order soon!
                                </p>
                                <p v-else class="text-sm font-medium text-green-700">✨ In Stock - Ready to ship</p>
                            </div>
                        </div>
                        <!-- Description Tab -->
                            <TabPanel header="Description" value="description">
                                <div class="space-y-4">
                                    <div class="flex items-center gap-2 mb-3">
                                        <i class="pi pi-info-circle text-blue-500"></i>
                                        <h4 class="font-bold text-gray-900 text-lg">Product Description</h4>
                                    </div>
                                    <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
                                    
                                    <!-- Additional Details -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <div class="space-y-2">
                                            <h5 class="font-semibold text-gray-800">Product Details</h5>
                                            <div class="text-sm text-gray-600 space-y-1">
                                                <div><strong>Weight:</strong> {{ product.weight || '1.2 kg' }}</div>
                                                <div><strong>Dimensions:</strong> {{ product.dimensions || '30 x 20 x 10 cm' }}</div>
                                                <div><strong>Material:</strong> {{ product.material || 'Premium Quality' }}</div>
                                                <div><strong>Warranty:</strong> {{ product.warranty || '2 Years' }}</div>
                                            </div>
                                        </div>
                                        <div class="space-y-2">
                                            <h5 class="font-semibold text-gray-800">Availability</h5>
                                            <div class="text-sm text-gray-600 space-y-1">
                                                <div><strong>In Stock:</strong> {{ product.stock }} units</div>
                                                <div><strong>Shipping:</strong> {{ product.shippingTime || '2-3 Business Days' }}</div>
                                                <div><strong>Origin:</strong> {{ product.origin || 'Manufactured in USA' }}</div>
                                                <div><strong>Returns:</strong> {{ product.returnPolicy || '30-day return policy' }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <!-- Features Tab -->
                            <TabPanel header="Features" value="features">
                                <div class="space-y-4">
                                    <div class="flex items-center gap-2 mb-3">
                                        <i class="pi pi-star text-yellow-500"></i>
                                        <h4 class="font-bold text-gray-900 text-lg">Key Features</h4>
                                    </div>
                                    <div class="grid gap-3">
                                        <div 
                                            v-for="(feature, index) in product.features" 
                                            :key="index"
                                            class="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 hover:from-green-100 hover:to-emerald-100 transition-all duration-200"
                                        >
                                            <i class="pi pi-check text-green-500 mt-0.5"></i>
                                            <span class="text-gray-700">{{ feature }}</span>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        <!-- Quantity & Add to Cart -->
                        <div class="sticky bottom-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 space-y-4">
                            <div class="flex items-center gap-4 flex-wrap">
                                <!-- Quantity Selector -->
                                <div class="flex items-center">
                                    <label class="text-sm font-medium text-gray-700 mr-3">Quantity:</label>
                                    <InputNumber
                                        v-model="quantity"
                                        :min="1"
                                        :max="product.stock"
                                        showButtons
                                        buttonLayout="horizontal"
                                        class="!w-32"
                                        :inputClass="'!text-center !font-semibold'"
                                        incrementButtonClass="!bg-orange-500 hover:!bg-orange-600 !border-orange-500"
                                        decrementButtonClass="!bg-orange-500 hover:!bg-orange-600 !border-orange-500"
                                    />
                                </div>
                                
                                <!-- Total Price -->
                                <div class="flex items-center gap-2 text-lg font-bold text-gray-800 ml-auto">
                                    <span class="text-sm text-gray-600">Total:</span>
                                    <span class="text-orange-600">${{ (product.price * quantity).toFixed(2) }}</span>
                                </div>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex gap-3 flex-wrap">
                                <Button 
                                    @click="addToCart"
                                    icon="pi pi-shopping-cart"
                                    label="Add to Cart"
                                    class="flex-1 !bg-gradient-to-r !from-orange-500 !to-amber-500 hover:!from-orange-600 hover:!to-amber-600 !border-0 !font-bold !py-3 !text-base !shadow-lg hover:!shadow-xl !transform hover:!scale-[1.02] !transition-all !duration-300"
                                />
                                <Button 
                                    icon="pi pi-heart"
                                    class="!w-12 !h-12 !bg-white !text-red-500 hover:!bg-red-50 !border-2 !border-red-200 hover:!border-red-300 !shadow-md hover:!shadow-lg !transform hover:!scale-110 !transition-all !duration-300"
                                    severity="secondary"
                                    @click.stop="handleToggleFavorite(product.id)"
                                />
                                <Button 
                                    icon="pi pi-share-alt"
                                    class="!w-12 !h-12 !bg-white !text-blue-500 hover:!bg-blue-50 !border-2 !border-blue-200 hover:!border-blue-300 !shadow-md hover:!shadow-lg !transform hover:!scale-110 !transition-all !duration-300"
                                    severity="secondary"
                                    @click="shareProduct"
                                />
                            </div>

                            <!-- Security Features -->
                            <div class="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-shield text-green-500"></i>
                                    <span>Secure Payment</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-truck text-blue-500"></i>
                                    <span>Free Shipping</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <i class="pi pi-refresh text-purple-500"></i>
                                    <span>30-Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { products } from '../../../store/storeProduct'
import useFavorites from '../../../store/favoritesStore'

const toast = useToast()

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close', 'add-to-cart'])

const { isFavorite, toggleFavorite } = useFavorites()
const selectedImage = ref(props.product.image)
const quantity = ref(1)
const showReviewDialog = ref(false)

// Mock reviews data if product doesn't have reviews
const mockReviews = [
    {
        id: 1,
        name: 'John D.',
        date: '2 days ago',
        rating: 5,
        comment: 'This product exceeded my expectations! The quality is amazing and it arrived earlier than expected.',
        verified: true,
        helpful: 12
    },
    {
        id: 2,
        name: 'Sarah M.',
        date: '1 week ago',
        rating: 4,
        comment: 'Very good product overall. Works perfectly, though the instructions could be clearer.',
        verified: true,
        helpful: 5
    }
]

// ========== Images from all products with the same category (including current product)
const imagesByCategory = computed(() => {
    return products
        .filter(p => p.category === props.product.category)
        .flatMap(p => p.images ?? [p.image])
        .filter(img => !!img)
})


const addToCart = () => {
    const productToAdd = {
        ...props.product,
        quantity: quantity.value
    }
    emit('add-to-cart', productToAdd)

    toast.add({
        severity: 'success',
        detail: 'Successfully',
        life: 3000
    })

    emit('close')
}

const handleToggleFavorite = (id: number) => {
    toggleFavorite(id)
    if (isFavorite(id)) {
        toast.add({
            severity: 'success',
            detail: 'Successfully',
            life: 2000
        })
    } else {
        toast.add({
            severity: 'info',
            summary: 'Removed from Favorites',
            detail: `${props.product.title} has been removed from your favorites.`,
            life: 2000
        })
    }
    emit('close')
}

const shareProduct = () => {
    if (navigator.share) {
        navigator.share({
            title: props.product.title,
            text: `Check out this ${props.product.title} on our store!`,
            url: window.location.href
        }).catch(() => {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to share product',
                life: 3000
            })
        })
    } else {
        toast.add({
            severity: 'info',
            summary: 'Share',
            detail: 'Link copied to clipboard',
            life: 2000
        })
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href)
    }
}
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(251, 146, 60, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(251, 146, 60, 0.3);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(251, 146, 60, 0.5);
}

/* TabView styles */
.custom-tabs .p-tabview-nav {
    border-bottom: 1px solid #e5e7eb; /* border-gray-200 */
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.custom-tabs .p-tabview-nav-link {
    padding: 0.75rem 1rem; /* py-3 px-4 */
    font-weight: 500; /* font-medium */
    color: #4b5563; /* text-gray-600 */
    text-decoration: none;
    transition: color 0.2s ease-in-out; /* transition-colors */
    display: flex;
    align-items: center;
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
}

.custom-tabs .p-tabview-nav-link:hover {
    color: #f97316; /* hover:text-orange-500 */
}

.custom-tabs .p-highlight .p-tabview-nav-link {
    color: #f97316; /* text-orange-500 */
    border-bottom: 2px solid #f97316; /* border-b-2 border-orange-500 */
}

.custom-tabs .p-tabview-panels {
    padding: 0; /* p-0 */
}
</style>