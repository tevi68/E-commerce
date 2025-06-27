<template>
    <div class="max-w-5xl mx-auto py-8 px-4">
        <h1 class="text-2xl font-bold mb-6 text-orange-500 flex items-center gap-2">
            <i class="pi pi-heart-fill text-red-500"></i>
            Wishlist
        </h1>

        <Toast />
        <ConfirmDialog />
        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
        </div>

        <div v-if="!loading && favoriteProducts.length === 0" class="text-gray-500 text-center py-16">
            <i class="pi pi-heart text-4xl mb-4"></i>
            <div>No favorite products yet.</div>
        </div>

        <div v-else-if="!loading">
            <DataTable :value="favoriteProducts" class="w-full" stripedRows responsiveLayout="scroll">
                <Column header="Image">
                    <template #body="{ data }">
                        <Image :src="data.image" alt="Image" class="w-16 h-10 sm:w-16 sm:h-14 object-cover rounded" preview />
                    </template>
                </Column>
                <Column field="title" header="Product">
                    <template #body="{ data }">
                        <div class="font-medium text-gray-900">{{ data.title }}</div>
                        <div class="text-xs text-gray-500">{{ data.category }}</div>
                    </template>
                </Column>
                <Column field="price" header="Price">
                    <template #body="{ data }">
                        <span class="text-orange-500 font-bold">{{ formatPrice(data.price) }}</span>
                        <span v-if="data.originalPrice" class="text-gray-400 text-xs line-through ml-2">
                            {{ formatPrice(data.originalPrice) }}
                        </span>
                    </template>
                </Column>
                <Column header="Stock">
                    <template #body="{ data }">
                        <span v-if="data.stock > 0" class="text-green-500">In Stock</span>
                        <span v-else class="text-red-500">Out of stock</span>
                    </template>
                </Column>
                <Column header="Action">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button
                                label="Add To Cart"
                                class="p-button-sm bg-orange-500 border-orange-500 hover:bg-orange-600"
                                @click="handleAddToCart(data)"
                                :disabled="loading || data.stock === 0"
                                icon="pi pi-shopping-cart"
                            />
                            <Button
                                label="Remove"
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
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Image from 'primevue/image'
import { useCartStore } from '../../../store/cartStore'
import ConfirmDialog from 'primevue/confirmdialog'
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
      summary: 'Added to cart',
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
        detail: 'Product removed from favorites',
        life: 2000
      })
    }
  })
}
</script>