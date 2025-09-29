<template>
    <div class="max-w-5xl mx-auto py-15 px-4">
        <h1 class="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
            <i class="pi pi-heart-fill text-red-500"></i>
            Wishlist
        </h1>

        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
        </div>

        <div v-if="!loading && favoriteProducts.length === 0" class="text-center py-16 px-4">
            <div class="max-w-md mx-auto">
                <div class="heart-icon animate-pulse mb-6">
                    <i class="pi pi-heart text-6xl text-rose-200" style="font-size: 100px;"></i>
                </div>
                <h3 class="text-xl font-light text-gray-600 mb-2">Your favorites collection is empty</h3>
                <p class="text-gray-400 mb-6">Products you love will appear here when you click the heart icon</p>
                <button 
                    @click="$router.push('/shopcard')"
                    class="bg-rose-500 hover:bg-rose-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-rose-200"
                >
                    Discover Products
                </button>
            </div>
        </div>

        <div v-else-if="!loading">
            <DataTable :value="favoriteProducts" class="w-full" stripedRows responsiveLayout="scroll">
                <!-- Image Column -->
                <Column header="Image" headerClass="bg-blue-50">
                    <template #body="{ data }">
                        <div class="bg-blue-50 p-1 rounded">
                            <img 
                                :src="getImageUrl(data)" 
                                :alt="data.title"
                                class="w-16 h-14 object-cover rounded"
                                @error="onImageError"
                            />
                        </div>
                    </template>
                </Column>

                <!-- Product Column -->
                <Column field="title" header="Product" headerClass="bg-indigo-50 text-indigo-700">
                    <template #body="{ data }">
                        <div class="font-medium text-gray-900">{{ data.title }}</div>
                        <div class="text-xs text-indigo-500">{{ data.category }}</div>
                    </template>
                </Column>

                <!-- Price Column -->
                <Column field="price" header="Price" headerClass="bg-amber-50 text-amber-700">
                    <template #body="{ data }">
                        <span class="text-orange-500 font-bold">{{ currencyStore.getDisplayPrice(data.price) }}</span>
                        <span v-if="data.originalPrice" class="text-gray-400 text-xs line-through ml-2">
                            {{ currencyStore.getDisplayPrice(data.originalPrice) }}
                        </span>
                        <span v-if="data.discount" class="text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full ml-2">
                            -{{ data.discount }}%
                        </span>
                    </template>
                </Column>

                <!-- Stock Column -->
                <Column header="Stock" headerClass="bg-green-50 text-green-700">
                    <template #body="{ data }">
                        <div v-if="data.stock > 0" class="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs inline-flex items-center">
                            <i class="pi pi-check-circle mr-1 text-xs"></i>
                            <span>In Stock ({{ data.stock }})</span>
                        </div>
                        <div v-else class="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs inline-flex items-center">
                            <i class="pi pi-times-circle mr-1 text-xs"></i>
                            <span>Out of stock</span>
                        </div>
                    </template>
                </Column>

                <!-- Rating Column -->
                <Column header="Rating" headerClass="bg-purple-50 text-purple-700">
                    <template #body="{ data }">
                        <div class="flex items-center">
                            <div class="flex mr-1">
                                <i 
                                    v-for="n in 5"
                                    :key="n"
                                    :class="n <= Math.round(data.rating) ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-300'"
                                    class="text-xs"
                                ></i>
                            </div>
                            <span class="text-xs text-gray-500">({{ data.reviewCount }})</span>
                        </div>
                    </template>
                </Column>

                <!-- Action Column -->
                <Column header="Action" headerClass="bg-red-50 text-red-700">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <button
                                @click="handleAddToCart(data)"
                                :disabled="loading || data.stock === 0"
                                class="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50"
                                :class="{'opacity-50 cursor-not-allowed': data.stock === 0}"
                            >
                                <i class="pi pi-shopping-cart"></i>
                            </button>
                            <button
                                @click="removeFavorite(data.id)"
                                class="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                            >
                                <i class="pi pi-trash"></i>
                            </button>
                            <button
                                @click="viewProduct(data)"
                                class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            >
                                <i class="pi pi-eye"></i>
                            </button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div class="py-20"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useFavoriteStore from '../../../store/favoritesStore'
import { useToast } from 'primevue/usetoast'
import { useCartStore } from '../../../store/cartStore'
import { useConfirm } from 'primevue/useconfirm'
import type { Product } from '../../../store/storeProduct'
import { fetchProductsByIds } from '../../../store/productApi' // Import the new function
import { useCurrencyStore } from '../../../store/currencyStore'
const currencyStore = useCurrencyStore();

// PrimeVue UI
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProgressSpinner from 'primevue/progressspinner'

// Stores
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const router = useRouter()
const toast = useToast()
const confirm = useConfirm()

const loading = ref(true)

// Get favorite products directly from the store
const favoriteProducts = ref<Product[]>([])

onMounted(async () => {
  try {
    loading.value = true
    const favoriteItems = favoriteStore.favorites.value
    const favoriteIds = favoriteItems.map(item => item.productId)
    const fetchedProducts = await fetchProductsByIds(favoriteIds)
    
    favoriteProducts.value = fetchedProducts
      .filter(p => favoriteIds.includes(p.id))
      .map(product => {
        const favoriteItem = favoriteItems.find(item => item.productId === product.id);
        return {
          ...product,
          selectedImageUrl: favoriteItem?.selectedImageUrl || product.images[0]?.url || '/placeholder-product.jpg'
        };
      });

  } catch (error) {
    console.error('Failed to fetch favorite products:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load favorite products',
      life: 3000
    })
  } finally {
    loading.value = false
  }
})

const handleAddToCart = async (product: Product) => {
  loading.value = true
  try {
    // When adding to cart from favorites, use the selectedImageUrl stored in the favoriteProduct itself
    cartStore.addToCart(product, 1, product.selectedImageUrl)
    await new Promise(resolve => setTimeout(resolve, 700))
    toast.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `${product.title} has been added to your cart`,
      life: 2500
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to add item to cart',
      life: 2500
    })
  } finally {
    loading.value = false
  }
}

const removeFavorite = (productId: number) => {
  confirm.require({
    message: 'Are you sure you want to remove this product from favorites?',
    header: 'Remove Favorite',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Remove',
    rejectLabel: 'Cancel',
    acceptClass: 'p-button-danger',
    accept: () => {
      favoriteStore.toggleFavorite(productId) // No need to pass selectedImageUrl when removing
      // Re-fetch favorite products to update the displayed list
      const updatedFavoriteItems = favoriteStore.favorites.value
      const updatedFavoriteIds = updatedFavoriteItems.map(item => item.productId)

      fetchProductsByIds(updatedFavoriteIds).then(fetchedProducts => {
        favoriteProducts.value = fetchedProducts
          .filter(p => updatedFavoriteIds.includes(p.id))
          .map(product => {
            const favoriteItem = updatedFavoriteItems.find(item => item.productId === product.id);
            return {
              ...product,
              selectedImageUrl: favoriteItem?.selectedImageUrl || product.images[0]?.url || '/placeholder-product.jpg'
            };
          });
      }).catch(error => {
        console.error('Failed to re-fetch favorite products after removal:', error)
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update favorite list',
          life: 3000
        })
      })
      toast.add({
        severity: 'info',
        summary: 'Removed',
        detail: 'Product removed from favorites',
        life: 2000
      })
    }
  })
}

const viewProduct = (product: Product) => {
  router.push(`/product/${product.id}`)
}

function onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  if (target) target.src = '/placeholder-product.jpg';
}

const getImageUrl = (product: Product) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  // Prioritize selectedImageUrl if it exists
  if (product.selectedImageUrl && typeof product.selectedImageUrl === 'string') {
    console.log('selectedImageUrl:', product.selectedImageUrl)
    return product.selectedImageUrl.startsWith('http')
      ? product.selectedImageUrl
      : apiBaseUrl + product.selectedImageUrl
  }
  // Fallback to the first image in the images array
  if (product.images && product.images.length > 0) {
    if (typeof product.images[0] === 'object' && product.images[0].url && typeof product.images[0].url === 'string') {
      console.log('images[0].url:', product.images[0].url)
      return product.images[0].url.startsWith('http')
        ? product.images[0].url
        : apiBaseUrl + product.images[0].url
    }
    if (typeof product.images[0] === 'string') {
      console.log('images[0] string:', product.images[0])
      return (product.images[0] as string).startsWith('http')
        ? product.images[0]
        : apiBaseUrl + product.images[0]
    }
  }
  console.warn('No image found for product:', product)
  return '/placeholder-product.jpg'
}
</script>

<style scoped>
.heart-icon {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
    padding: 1rem 0.5rem;
    vertical-align: middle;
}

:deep(.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)) {
    background-color: #f9fafb;
}

:deep(.p-datatable .p-column-header-content) {
    justify-content: center;
}
</style>