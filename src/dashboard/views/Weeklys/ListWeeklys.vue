<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
        <!-- Page Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-gray-200">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Weekly Deals</h1>
            </div>
            <div class="flex space-x-3 mt-4 md:mt-0">
                <Button 
                label="Add New" 
                icon="pi pi-plus-circle" 
                @click="openCreate" 
                class="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white shadow-sm"
                />
            </div>
        </div>
        <!-- DataTable -->
        <div class="flex-grow overflow-auto">
            <DataTable
                :value="paginatedDeals"
                :loading="loading"
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
                                        :src="getImageUrl(data.images && data.images[0] ? data.images[0] : '')"
                                        :alt="data.title"
                                    />
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{{ data.title }}</div>
                                        <div class="text-xs text-green-600 font-medium" v-if="data.discount">
                                        {{ data.discount }}% OFF
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="col.field === 'price'">
                                <div class="text-sm font-semibold text-gray-900">
                                    ${{ data.price ? Number(data.price).toFixed(2) : '0.00' }}
                                </div>
                                <div class="text-xs text-gray-400 line-through" v-if="data.originalPrice">
                                    ${{ data.originalPrice ? Number(data.originalPrice).toFixed(2) : '0.00' }}
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
                                    <span class="text-xs text-gray-500">({{ data.rating || 0 }})</span>
                                </div>
                            </template>
                        </template>
                    </Column>
                </template>
                <Column header="Actions" :exportable="false" style="min-width: 140px; text-align: right;">
                    <template #body="{ data }">
                        <div class="flex justify-end space-x-1">
                            <Button icon="pi pi-eye" text rounded severity="info" @click="openView(data)" v-tooltip.top="'View'" />
                            <Button icon="pi pi-pencil" text rounded severity="secondary" @click="openEdit(data)" v-tooltip.top="'Edit'" />
                            <Button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(data)" v-tooltip.top="'Delete'" />
                        </div>
                    </template>
                </Column>
                <template #empty>
                    <div class="text-center py-8 text-gray-400">
                        <i class="pi pi-search text-4xl mb-3"></i>
                        <p class="text-lg font-medium">No weekly deals found</p>
                        <p class="text-sm">Try adding a new deal</p>
                    </div>
                </template>
            </DataTable>
        </div>
        <!-- Paginator -->
        <div class="p-4 border-t border-gray-200 mt-auto">
            <Paginator
                v-model:first="first"
                :rows="rows"
                :totalRecords="filteredDeals.length"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                @page="onPageChange"
                template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
                :currentPageReportTemplate="'Showing {first} to {last} of {totalRecords} deals'"
            />
        </div>
        <!-- Modal Form -->
        <FormWeeklys
            :modal="modal"
            @reloadList="handleReloadList"
            @reloadDropdown="handleReloadDropdown"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import FormWeeklys from './FormWeeklys.vue'
import { fetchWeeklyDeals, deleteWeeklyDeal } from '../../../store/weeklyDealsApi'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const fallbackImage = 'https://via.placeholder.com/80?text=No+Image'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const weeklyDeals = ref<any[]>([])
const loading = ref(true)
const first = ref(0)
const rows = ref(10)
const confirm = useConfirm()
const toast = useToast()
const router = useRouter()

// Modal state (single object)
const modal = ref({
  show: false,
  title: '',
  data: undefined,
  emitType: 1
})

// Table columns definition
const title = computed(() => 'Deal')
const price = computed(() => 'Price')
const stock = computed(() => 'Stock')
const rating = computed(() => 'Rating')
const cols = ref([
  { label: title, field: 'title', status: true },
  { label: price, field: 'price', status: true },
  { label: stock, field: 'stock', status: true },
  { label: rating, field: 'rating', status: true },
])

// Fetch data
async function fetchData() {
  loading.value = true
  try {
    const deals = await fetchWeeklyDeals()
    weeklyDeals.value = Array.isArray(deals) ? deals : []
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)

const filteredDeals = computed(() => weeklyDeals.value)

const paginatedDeals = computed(() => {
  const start = first.value
  const end = first.value + rows.value
  return filteredDeals.value.slice(start, end)
})

function getImageUrl(imagePath: string) {
  if (!imagePath) return fallbackImage
  if (imagePath.startsWith('http')) return imagePath
  const fixedPath = imagePath.replace(/^\/images\//, '/weeklydeals/')
  return `${apiBaseUrl}${fixedPath}`
}

function openCreate() {
  modal.value.title = 'Create Weekly Deal'
  modal.value.data = undefined
  modal.value.emitType = 1
  modal.value.show = true
}

function openEdit(row: any) {
  modal.value.title = 'Edit Weekly Deal'
  modal.value.data = { ...row }
  modal.value.emitType = 1
  modal.value.show = true
}

function openView(row: any) {
  router.push(`/dashboard/weeklys/view/${row.id}`)
}

function confirmDelete(row: any) {
  confirm.require({
    message: 'Are you sure you want to delete this deal?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await deleteWeeklyDeal(row.id)
      const idx = weeklyDeals.value.findIndex(d => d.id === row.id)
      if (idx !== -1) weeklyDeals.value.splice(idx, 1)
      toast.add({ severity: 'success', summary: 'Deleted', detail: 'Deal deleted', life: 3000 })
    }
  })
}

function handleReloadList() {
  modal.value.show = false
  fetchData()
}

function handleReloadDropdown() {
  modal.value.show = false
  fetchData()
}

function onPageChange(event: any) {
  first.value = event.first
  rows.value = event.rows
}
</script>