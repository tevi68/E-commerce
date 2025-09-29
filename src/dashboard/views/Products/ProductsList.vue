<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-gray-200">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Product List</h1>
      </div>
      <div class="flex space-x-3 mt-4 md:mt-0">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 w-full md:w-64"
          />
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>
        <Dropdown
          v-model="selectedCategory"
          :options="categories"
          optionLabel="label"
          optionValue="value"
          :filter="true"
          placeholder="All Categories"
          class="w-48"
          :showClear="true"
          :virtualScrollerOptions="{ itemSize: 38 }"
        />
        <Button 
          label="Add Product" 
          icon="pi pi-plus" 
          @click="openCreateModal" 
          class="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-sm"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="flex-grow overflow-auto">
      <DataTable
          :value="paginatedProducts"
          class="w-full"
          responsiveLayout="scroll"
          dataKey="id"
      >
          <template v-for="col in cols" :key="col.field">
              <Column
                  v-if="col.status"
                  :field="col.field"
                  :header="col.label"
                  :sortable="true"
              >
                  <template v-slot:body="{ data }">
                      <template v-if="col.field === 'title'">
                          <div class="flex items-center">
                              <img
                                  class="h-10 w-10 rounded-md object-cover"
                                  :src="getImageUrl(data.images && data.images[0] ? data.images[0].url : '')"
                                  :alt="data.title"
                              />
                              <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">{{ data.title }}</div>
                                  <div class="text-xs text-blue-600 font-medium" v-if="data.discount">
                                  {{ data.discount }}% OFF
                                  </div>
                              </div>
                          </div>
                      </template>
                      <template v-else-if="col.field === 'category'">
                        <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">{{ data.category }}</span>
                      </template>
                      <template v-else-if="col.field === 'price'">
                          <div class="text-sm font-semibold text-gray-900">
                              ${{ Number(data.price).toFixed(2) }}
                          </div>
                          <div class="text-xs text-gray-400 line-through" v-if="data.originalPrice">
                              ${{ Number(data.originalPrice).toFixed(2) }}
                          </div>
                      </template>
                      <template v-else-if="col.field === 'stock'">
                          <div class="text-sm text-gray-600">{{ data.stock }}</div>
                          <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                              <div 
                                  class="bg-green-600 h-1.5 rounded-full" 
                                  :style="{ width: `${Math.min(100, (data.stock / 50) * 100)}%` }"
                              ></div>
                          </div>
                      </template>
                      <template v-else-if="col.field === 'rating'">
                        <div class="flex items-center">
                          <div class="flex text-yellow-400 mr-1">
                            <i 
                              v-for="star in 5" 
                              :key="star"
                              class="pi text-xs" 
                              :class="star <= Math.round(data.rating) ? 'pi-star-fill' : 'pi-star'"
                            ></i>
                          </div>
                          <span class="text-xs text-gray-500">({{ data.reviewCount || 0 }})</span>
                        </div>
                      </template>
                      <template v-else-if="col.field === 'status'">
                        <span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize"
                          :class="{
                            'bg-green-100 text-green-800': data.status === 'published',
                            'bg-gray-100 text-gray-800': data.status === 'draft',
                          }"
                        >
                          {{ data.status }}
                        </span>
                      </template>
                  </template>
              </Column>
          </template>
          <Column header="Actions" :exportable="false" style="min-width: 140px; text-align: right;">
              <template #body="{ data }">
                  <div class="flex justify-end space-x-1">
                      <Button icon="pi pi-eye" text rounded severity="info" @click="viewProduct(data)" v-tooltip.top="'View'" placeholder="Top"/>
                      <Button icon="pi pi-pencil" text rounded severity="secondary" @click="editProduct(data)" v-tooltip.top="'Edit'" placeholder="Top"/>
                      <Button icon="pi pi-copy" text rounded severity="help" @click="copyProduct(data)" v-tooltip.top="'Copy'" placeholder="Top"/>
                      <Button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(data)" v-tooltip.top="'Delete'" placeholder="Top"/>
                  </div>
              </template>
          </Column>
          <template #empty>
              <div class="text-center py-8 text-gray-400">
                  <i class="pi pi-search text-4xl mb-3"></i>
                  <p class="text-lg font-medium">No products found</p>
                  <p class="text-sm">Try adjusting your search query</p>
              </div>
          </template>
      </DataTable>
    </div>

    <!-- Pagination -->
    <div class="border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
      <div class="text-sm text-gray-500">
        Showing {{ firstItemIndex }} to {{ lastItemIndex }} of {{ filteredProducts.length }} products
      </div>
      <Paginator 
        v-model:first="first"
        :rows="rows"
        :totalRecords="filteredProducts.length"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        @page="onPageChange"
        class="border-0"
      />
    </div>

    <!-- Modal -->
    <ProductFormModal 
      :modal="modal"
      @reloadList="reloadList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ProductFormModal from './ProductFormModal.vue'
import { fetchProducts, deleteProduct as deleteProductApi } from '../../../store/productApi'
import type { Product } from '../../../store/storeProduct'
import { type ProductForm } from './ProductFormModal.vue'
import { useRouter } from 'vue-router'
import { useConfirm } from "primevue/useconfirm"
import { useToast } from "primevue/usetoast"

const fallbackImage = 'https://via.placeholder.com/80?text=No+Image'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// State
const products = ref<Product[]>([])
const modal = ref<{
  show: boolean;
  title: string;
  data: ProductForm | null;
}>({
  show: false,
  title: '',
  data: null
})
const searchQuery = ref('')
const selectedCategory = ref('all')
const categories = computed(() => {
  const cats = Array.from(new Set(products.value.map(p => p.category)))
  return [
    { label: 'All Categories', value: 'all' },
    ...cats.map(cat => ({ label: cat, value: cat }))
  ]
})

const productLabel = computed(() => 'Product')
const categoryLabel = computed(() => 'Category')
const priceLabel = computed(() => 'Price')
const stockLabel = computed(() => 'Stock')
const ratingLabel = computed(() => 'Rating')
const statusLabel = computed(() => 'Status')

const cols = ref([
    { label: productLabel, field: 'title', status: true },
    { label: categoryLabel, field: 'category', status: true },
    { label: priceLabel, field: 'price', status: true },
    { label: stockLabel, field: 'stock', status: true },
    { label: ratingLabel, field: 'rating', status: true },
    { label: statusLabel, field: 'status', status: true }
])

// Pagination
const first = ref(0)
const rows = ref(10)
const confirm = useConfirm()
const toast = useToast()
const router = useRouter()

// Lifecycle
onMounted(async () => {
  products.value = await fetchProducts()
  const product78 = products.value.find(p => p.id === 78)
  if (product78) {
    } else {
  }
})

// Computed
const filteredProducts = computed(() => {
  let result = products.value
  if (searchQuery.value) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  if (selectedCategory.value !== 'all') {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  return result
})

const paginatedProducts = computed(() => filteredProducts.value.slice(first.value, first.value + rows.value))
const firstItemIndex = computed(() => first.value + 1)
const lastItemIndex = computed(() => Math.min(first.value + rows.value, filteredProducts.value.length))

// Helpers
function getImageUrl(imagePath: string) {
  if (!imagePath) return fallbackImage
  if (imagePath.startsWith('http')) return imagePath
  const fixedPath = imagePath.replace(/^\/images\//, '/uploads/')
  return `${apiBaseUrl}${fixedPath}`
}

// Actions
function openCreateModal() {
  modal.value.show = true
  modal.value.title = 'Create Product'
  modal.value.data = null
}

function viewProduct(product: Product) {
  router.push({ name: 'ProductViewDetails', params: { id: product.id } })
}

function editProduct(product: Product) {
  const productForm: ProductForm = {
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    stock: product.stock,
    rating: product.rating,
    reviewCount: product.reviewCount,
    status: product.status,
    description: product.description,
    features: product.features,
    images: product.images.map(img => ({
      url: typeof img === 'string' ? img : img.url,
      file: undefined
    })),
    videos: Array.isArray(product.videos)
      ? product.videos.map(video => ({
          url: video.url,
          thumbnail: video.thumbnail ?? null,
          duration: video.duration ?? null,
          file: undefined
        }))
      : [],
    isOnProduct: product.isOnProduct,
    isOnShop: product.isOnShop,
    isOnCategory: product.isOnCategory,
    isOnToday: product.isOnToday
  }
  modal.value.show = true
  modal.value.title = 'Edit Product'
  modal.value.data = productForm
}

function copyProduct(product: Product) {
  const productForm: ProductForm = {
    id: null,
    title: product.title,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    stock: product.stock,
    rating: product.rating,
    reviewCount: product.reviewCount,
    status: 'published',
    description: product.description,
    features: product.features,
    images: product.images.map(img => ({
      url: typeof img === 'string' ? img : img.url,
      file: undefined
    })),
    videos: Array.isArray(product.videos)
      ? product.videos.map(video => ({
          url: video.url,
          thumbnail: video.thumbnail ?? null,
          duration: video.duration ?? null,
          file: undefined
        }))
      : [],
    isOnProduct: product.isOnProduct,
    isOnShop: product.isOnShop,
    isOnCategory: product.isOnCategory,
    isOnToday: product.isOnToday
  }
  modal.value.show = true
  modal.value.title = 'Copy Product'
  modal.value.data = productForm
}

function confirmDelete(product: Product) {
  // Convert Product to ProductForm for type safety
  const productForm: ProductForm = {
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    stock: product.stock,
    rating: product.rating,
    reviewCount: product.reviewCount,
    status: product.status,
    description: product.description,
    features: product.features,
    images: product.images.map(img => ({
      url: typeof img === 'string' ? img : img.url,
      file: undefined
    })),
    videos: Array.isArray(product.videos)
      ? product.videos.map(video => ({
          url: video.url,
          thumbnail: video.thumbnail ?? null,
          duration: video.duration ?? null,
          file: undefined
        }))
      : [],
    isOnProduct: product.isOnProduct,
    isOnShop: product.isOnShop,
    isOnCategory: product.isOnCategory,
    isOnToday: product.isOnToday
  }
  const selectedProduct = productForm
  confirm.require({
    message: `Are you sure you want to delete your Product?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => deleteProduct(selectedProduct)
  })
}

async function deleteProduct(selectedProduct: any) {
  if (selectedProduct?.id) {
    try {
      const productName = selectedProduct.title
      await deleteProductApi(selectedProduct.id)
      products.value = await fetchProducts()
      toast.add({ severity: 'success', summary: 'Deleted', detail: `Product '${productName}' removed.`, life: 3000 })
    } catch (error) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product.', life: 3000 })
    }
  }
}

async function reloadList() {
  products.value = await fetchProducts()
  console.log('Products list refreshed from server after modal action.')
}

function onPageChange(event: any) {
  first.value = event.first
  rows.value = event.rows
}
</script>


<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
tr {
  transition: all 0.2s ease;
}

/* Sticky header */
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Button hover effects */
.p-button {
  transition: all 0.2s ease;
}
</style>