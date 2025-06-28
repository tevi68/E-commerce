<template>
    <div class="max-w-5xl mx-auto py-8 px-4">
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
              <!-- Image Column with subtle background -->
              <Column header="Image" headerClass="bg-blue-50">
                  <template #body="{ data }">
                      <div class="bg-blue-50 p-1 rounded">
                          <Image :src="data.image" alt="Image" 
                                class="w-16 h-10 sm:w-16 sm:h-14 object-cover rounded" 
                                preview />
                      </div>
                  </template>
              </Column>

              <!-- Product Column with header color -->
              <Column field="title" header="Product" headerClass="bg-indigo-50 text-indigo-700">
                  <template #body="{ data }">
                      <div class="font-medium text-gray-900">{{ data.title }}</div>
                      <div class="text-xs text-indigo-500">{{ data.category }}</div>
                  </template>
              </Column>

              <!-- Price Column with accent color -->
              <Column field="price" header="Price" headerClass="bg-amber-50 text-amber-700">
                  <template #body="{ data }">
                      <span class="text-orange-500 font-bold">{{ formatPrice(data.price) }}</span>
                      <span v-if="data.originalPrice" class="text-gray-400 text-xs line-through ml-2">
                          {{ formatPrice(data.originalPrice) }}
                      </span>
                  </template>
              </Column>

              <!-- Stock Column with conditional colors -->
              <Column header="Stock" headerClass="bg-green-50 text-green-700">
                  <template #body="{ data }">
                      <div v-if="data.stock > 0" class="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs inline-flex items-center">
                          <i class="pi pi-check-circle mr-1 text-xs"></i>
                          <span>In Stock</span>
                      </div>
                      <div v-else class="bg-red-50 text-red-600 px-2 py-1 rounded-full text-xs inline-flex items-center">
                          <i class="pi pi-times-circle mr-1 text-xs"></i>
                          <span>Out of stock</span>
                      </div>
                  </template>
              </Column>

              <!-- Action Column with red header -->
              <Column header="Action" headerClass="bg-red-50 text-red-700">
                  <template #body="{ data }">
                      <div class="flex gap-2">
                          <Button
                              label=""
                              class="p-button-sm bg-orange-500 border-orange-500 hover:bg-orange-600"
                              @click="handleAddToCart(data)"
                              :disabled="loading || data.stock === 0"
                              icon="pi pi-shopping-cart"
                          />
                          <Button
                              label=""
                              class="p-button-sm bg-red-500 border-red-500 hover:bg-red-600"
                              @click="removeFavorite(data.id)"
                              icon="pi pi-times"
                              severity="danger"
                              outlined
                          />
                      </div>
                  </template>
              </Column>
          </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import useFavorites from '../../../store/favoritesStore'
import { products } from '../../../store/storeProduct'
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image'
import { useCartStore } from '../../../store/cartStore'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()
const loading = ref(true)
const { favorites, toggleFavorite } = useFavorites()
const cartStore = useCartStore()

const favoriteProducts = computed(() =>
  products.filter(p => favorites.value.includes(p.id))
)

const formatPrice = (price: number) => `$${price.toFixed(2)}`

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 700)
})

const handleAddToCart = async (product: any) => {
  loading.value = true
  try {
    cartStore.addToCart(product, 1)
    await new Promise(resolve => setTimeout(resolve, 700))
    toast.add({
      severity: 'success',
      detail: 'Successfully',
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

function removeFavorite(productId: number) {
  confirm.require({
    message: 'Are you sure you want to remove this product from favorites?',
    header: 'Remove Favorite',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',
    acceptClass: 'p-button-danger',
    accept: () => {
      toggleFavorite(productId)
      toast.add({
        severity: 'info',
        summary: 'Removed',
        detail: 'Successfully',
        life: 2000
      })
    }
  })
}
</script>