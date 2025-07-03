<template>
    <div>
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                <p class="text-gray-500 dark:text-gray-400">Manage your product catalog</p>
            </div>
            <div class="flex space-x-3 mt-4 md:mt-0">
                <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search products..."
                    class="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 w-full md:w-64"
                />
                <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
                </div>
                <router-link
                    to="/dashboard/products/new"
                    class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
                >
                <i class="pi pi-plus mr-2"></i> Add Product
                </router-link>
            </div>
        </div>

        <!-- Products Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    SKU
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stock
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                </th>
                </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-md object-cover" :src="product.image" :alt="product.name" />
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ product.name }}
                        </div>
                        <div class="text-sm text-gray-500 dark:text-gray-400">
                        {{ product.category }}
                        </div>
                    </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {{ product.sku }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {{ product.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-800': product.stock > 10,
                    'bg-yellow-100 text-yellow-800': product.stock <= 10 && product.stock > 0,
                    'bg-red-100 text-red-800': product.stock === 0
                    }">
                    {{ product.stock }} in stock
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-800': product.status === 'published',
                    'bg-gray-100 text-gray-800': product.status === 'draft'
                    }">
                    {{ product.status }}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link :to="`/dashboard/products/${product.id}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 mr-3">
                        Edit
                    </router-link>
                    <button @click="confirmDelete(product)" class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500">
                        Delete
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()

const searchQuery = ref('')

const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-1000', price: '$99.99', stock: 15, status: 'published', category: 'Electronics', image: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Smart Watch', sku: 'SW-2000', price: '$199.99', stock: 8, status: 'published', category: 'Electronics', image: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Running Shoes', sku: 'RS-3000', price: '$79.99', stock: 0, status: 'draft', category: 'Clothing', image: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Bluetooth Speaker', sku: 'BS-4000', price: '$59.99', stock: 25, status: 'published', category: 'Electronics', image: 'https://via.placeholder.com/40' }
]

const filteredProducts = computed(() => {
    if (!searchQuery.value) return products
    return products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const confirmDelete = (product: any) => {
    confirm.require({
        message: `Are you sure you want to delete ${product.name}?`,
        header: 'Confirm Deletion',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            toast.add({
                severity: 'success',
                summary: 'Deleted',
                detail: `${product.name} has been deleted`,
                life: 3000
            })
        }
    })
}
</script>