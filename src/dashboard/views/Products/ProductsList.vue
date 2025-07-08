<template>
  <div class="p-4 lg:p-6 bg-white rounded-xl shadow-sm border border-gray-200 h-full">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <p class="text-gray-500">Manage your product catalog</p>
      </div>
      <div class="flex space-x-3 mt-4 md:mt-0">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 w-full md:w-64"
          />
          <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
        <Button 
          label="Add Product" 
          icon="pi pi-plus" 
          @click="openCreateModal" 
          class="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white"
        />
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-md object-cover"
                      :src="product.image"
                      :alt="product.title"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ product.title }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ product.discount }}% OFF
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  ${{ product.price.toFixed(2) }}
                </div>
                <div class="text-xs text-gray-500 line-through" v-if="product.originalPrice">
                  ${{ product.originalPrice.toFixed(2) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ product.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex text-yellow-400 mr-1">
                    <i 
                      v-for="star in 5" 
                      :key="star"
                      class="pi" 
                      :class="star <= Math.round(product.rating) ? 'pi-star-fill' : 'pi-star'"
                    ></i>
                  </div>
                  <span class="text-xs text-gray-500">({{ product.reviewCount }})</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': product.status === 'published',
                    'bg-gray-100 text-gray-800': product.status === 'draft'
                  }"
                >
                  {{ product.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <Button 
                    icon="pi pi-eye" 
                    severity="info" 
                    text 
                    rounded 
                    @click="viewProduct(product)"
                    v-tooltip="'View details'"
                  />
                  <Button 
                    icon="pi pi-pencil" 
                    severity="secondary" 
                    text 
                    rounded 
                    @click="editProduct(product)"
                    v-tooltip="'Edit product'"
                  />
                  <Button 
                    icon="pi pi-trash" 
                    severity="danger" 
                    text 
                    rounded 
                    @click="confirmDelete(product)"
                    v-tooltip="'Delete product'"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Product Form Modal -->
    <ProductFormModal 
      v-model:visible="showForm" 
      :product="selectedProduct" 
      @submit="handleSubmit" 
    />

    <!-- Delete Confirmation Dialog -->
    <Dialog 
      v-model:visible="deleteDialogVisible" 
      modal 
      header="Confirm Delete" 
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete <b>{{ selectedProduct?.title }}</b>?</span>
      </div>
      <template #footer>
        <Button 
          label="No" 
          icon="pi pi-times" 
          @click="deleteDialogVisible = false" 
          text 
        />
        <Button 
          label="Yes" 
          icon="pi pi-check" 
          @click="deleteProduct" 
          severity="danger" 
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import ProductFormModal from './ProductFormModal.vue'

const showForm = ref(false)
const deleteDialogVisible = ref(false)
const selectedProduct = ref<any>(null)
const searchQuery = ref('')

const products = ref([
  {
    id: 1,
    title: 'Premium Wireless Headphones with Noise Cancellation',
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4,
    reviewCount: 124,
    stock: 5,
    status: 'published',
    description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    images: [
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  },
  {
    id: 2,
    title: 'Smart Fitness Watch with Heart Rate Monitor',
    category: 'Wearables',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 87,
    stock: 12,
    status: 'published',
    description: 'Track your fitness goals with this smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
    features: [
      'Heart rate monitoring',
      'Sleep tracking',
      'Water resistant',
      '7-day battery life',
      'Smart notifications'
    ],
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600'
    ]
  }
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(p =>
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function openCreateModal() {
  selectedProduct.value = null
  showForm.value = true
}

function viewProduct(product: any) {
  // Implement view functionality (could open a detail view modal)
  console.log('Viewing product:', product)
}

function editProduct(product: any) {
  selectedProduct.value = { ...product }
  showForm.value = true
}

function confirmDelete(product: any) {
  selectedProduct.value = product
  deleteDialogVisible.value = true
}

function deleteProduct() {
  if (selectedProduct.value) {
    products.value = products.value.filter(p => p.id !== selectedProduct.value.id)
    deleteDialogVisible.value = false
    selectedProduct.value = null
  }
}

function handleSubmit(productData: any) {
  if (productData.id) {
    // Update existing product
    const index = products.value.findIndex(p => p.id === productData.id)
    if (index !== -1) {
      products.value[index] = productData
    }
  } else {
    // Add new product
    products.value.push({ 
      ...productData, 
      id: Date.now(),
      rating: productData.rating || 0,
      reviewCount: productData.reviewCount || 0,
      discount: calculateDiscount(productData.price, productData.originalPrice)
    })
  }
  showForm.value = false
}

function calculateDiscount(price: number, originalPrice: number) {
  if (!originalPrice || originalPrice <= price) return 0
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
</script>

<style scoped>
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>