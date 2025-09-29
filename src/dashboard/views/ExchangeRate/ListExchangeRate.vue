<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Exchange Rates</h2>
      <div class="flex gap-2">
        <Button 
          label="Calculator" 
          icon="pi pi-calculator" 
          class="bg-green-600 border-green-600 hover:bg-green-700 text-white rounded-lg shadow" 
          @click="showCalculator = true" 
        />
        <Button 
          label="Add Exchange Rate" 
          icon="pi pi-plus" 
          class="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white rounded-lg shadow" 
          @click="openCreate" 
        />
      </div>
    </div>

    <div class="mb-2 text-xs text-gray-500">Note: Only USD rate is editable. KHR is always 1.</div>

    <DataTable
      :value="exchangeRates"
      class="mb-4 rounded-xl shadow border border-gray-200 bg-white"
      tableClass="min-w-full divide-y divide-gray-200"
      stripedRows
      responsiveLayout="scroll"
      :loading="loading"
    >
      <Column field="currency" header="Currency" />
      <Column field="baserate" header="Base Rate">
        <template #body="{ data }">
          <span v-if="data.currency === 'USD'">1 USD- Dollar = {{ data.rate }} KHR- Khmer Riel</span>
          <span v-else-if="data.currency === 'KHR'">1 USD- Dollar = {{ usdToKhr }} KHR- Khmer Riel</span>
          <span v-else>{{ data.rate }}</span>
        </template>
      </Column>
      <Column field="rate" header="Rate">
        <template #body="{ data }">
          <span v-if="data.currency === 'USD'">{{ data.rate }} KHR- Khmer Riel</span>
          <span v-else-if="data.currency === 'KHR'">{{ data.rate }} USD- Dollar</span>
          <span v-else>{{ data.rate }}</span>
        </template>
      </Column>
      <Column field="updated_at" header="Updated At">
        <template #body="{ data }">
          {{ new Date(data.updated_at).toLocaleString() }}
        </template>
      </Column>
      <Column header="Actions" style="width: 150px">
        <template #body="{ data }">
          <div class="flex gap-1">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-text text-blue-600 hover:bg-blue-100 rounded-full" 
              @click="openEdit(data)" 
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-text text-red-600 hover:bg-red-100 rounded-full" 
              @click="confirmDelete(data)" 
            />
          </div>
        </template>
      </Column>
      <template #empty>
        <div class="text-center text-gray-400 py-8">
          <i class="pi pi-info-circle text-3xl mb-2"></i>
          <div class="text-lg font-medium">No exchange rates found</div>
          <div class="text-sm">Click "Add Exchange Rate" to create one.</div>
        </div>
      </template>
    </DataTable>

    <Dialog
      v-model:visible="showModal"
      :header="isEdit ? 'Edit Exchange Rate' : 'Add Exchange Rate'"
      :modal="true"
      :closable="true"
      :style="{ width: '400px' }"
      class="rounded-xl"
    >
      <FromExchangeRate
        :isEdit="isEdit"
        :initial="editData"
        @save="handleSave"
        @cancel="closeModal"
      />
    </Dialog>

    <Dialog 
      v-model:visible="showCalculator" 
      header="Currency Calculator" 
      :modal="true" 
      :closable="true" 
      :style="{ width: '820px' }" 
      class="rounded-xl"
    >


      <div class="max-w-2xl mx-auto bg-white rounded-xl p-6">
        <div class="flex gap-2 mb-4">
          <InputNumber v-model="amount" class="w-full" :min="0" placeholder="Enter amount" />
          <Dropdown v-model="from" :options="currencies" optionLabel="label" optionValue="value" class="w-32" />
          <span class="flex items-center px-2">→</span>
          <Dropdown v-model="to" :options="currencies" optionLabel="label" optionValue="value" class="w-32" />
        </div>
        <div class="text-lg text-gray-700 font-semibold mb-2">
          Result:
          <span v-if="amount && from && to">{{ formatResult }}</span>
          <span v-else class="text-gray-400">Please enter amount and select currencies</span>
        </div>
        <div class="text-xs text-gray-400">Current Rate: 1 USD = {{ usdToKhr }} KHR        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import FromExchangeRate from './FromExchangeRate.vue'
import { useCurrencyStore } from '../../../store/currencyStore'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const toast = useToast()
const confirm = useConfirm()
const currencyStore = useCurrencyStore()

const currencies = [
  { label: 'US Dollar (USD)', value: 'USD' },
  { label: 'Khmer Riel (KHR)', value: 'KHR' }
]

const showModal = ref(false)
const isEdit = ref(false)
const editData = ref<{ id?: number, currency: string, rate: number } | undefined>(undefined)
const showCalculator = ref(false)
const loading = ref(false)

// DataTable data (sync with API)
const exchangeRates = ref<Array<{ id?: number, currency: string, rate: number }>>([])

// API Base URL
const API_BASE = 'http://localhost:3000/api'

// Load exchange rates from API
async function loadExchangeRates() {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE}/exchange-rates`)
    if (!response.ok) throw new Error('Failed to fetch exchange rates')
    
    const data = await response.json()
    exchangeRates.value = data
    
    // Ensure KHR is always present with rate 1
    if (!exchangeRates.value.find(e => e.currency === 'KHR')) {
      exchangeRates.value.push({ currency: 'KHR', rate: 1 })
    }
    
    // Update store with USD rate
    const usdRate = exchangeRates.value.find(e => e.currency === 'USD')
    if (usdRate) {
      currencyStore.USD_TO_KHR = usdRate.rate
    }
  } catch (error) {
    console.error('Error loading exchange rates:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to load exchange rates',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

async function openCreate() {
  isEdit.value = false
  editData.value = undefined
  showModal.value = true
}

async function openEdit(row: { id?: number, currency: string, rate: number }) {
  isEdit.value = true
  editData.value = { ...row }
  showModal.value = true
}

async function handleSave(data: { id?: number, currency: string, rate: number }) {
  try {
    if (isEdit.value && data.id) {
      // Update existing rate
      const response = await fetch(`${API_BASE}/exchange-rates/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency: data.currency,
          rate: data.rate
        })
      })
      
      if (!response.ok) throw new Error('Failed to update exchange rate')
      
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Exchange rate updated successfully',
        life: 3000
      })
    } else {
      // Create new rate
      const response = await fetch(`${API_BASE}/exchange-rates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency: data.currency,
          rate: data.rate
        })
      })
      
      if (!response.ok) throw new Error('Failed to create exchange rate')
      
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Exchange rate created successfully',
        life: 3000
      })
    }
    
    // Reload data
    await loadExchangeRates()
    showModal.value = false
  } catch (error) {
    console.error('Error saving exchange rate:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save exchange rate',
      life: 3000
    })
  }
}

function closeModal() {
  showModal.value = false
}

function confirmDelete(row: { id?: number, currency: string, rate: number }) {
  confirm.require({
    message: `Are you sure you want to delete the exchange rate for ${row.currency}?`,
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => handleDelete(row),
    reject: () => {
      // User cancelled the deletion
    }
  })
}

async function handleDelete(row: { id?: number, currency: string, rate: number }) {
  if (!row.id) return
  
  try {
    const response = await fetch(`${API_BASE}/exchange-rates/${row.id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) throw new Error('Failed to delete exchange rate')
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Exchange rate deleted successfully',
      life: 3000
    })
    
    // Reload data
    await loadExchangeRates()
  } catch (error) {
    console.error('Error deleting exchange rate:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to delete exchange rate',
      life: 3000
    })
  }
}

// Calculator logic
const amount = ref<number | null>(null)
const from = ref('USD')
const to = ref('KHR')

const usdToKhr = computed(() => {
  const usd = exchangeRates.value.find(e => e.currency === 'USD')
  return usd ? usd.rate : 4100
})

const result = computed(() => {
  if (!amount.value || !from.value || !to.value) return null
  if (from.value === to.value) return amount.value
  if (from.value === 'USD' && to.value === 'KHR') return amount.value * usdToKhr.value
  if (from.value === 'KHR' && to.value === 'USD') return amount.value / usdToKhr.value
  return amount.value
})

const formatResult = computed(() => {
  if (result.value == null) return ''
  if (to.value === 'USD') return 'USD ' + result.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
  if (to.value === 'KHR') return 'KHR ' + Math.round(result.value).toLocaleString()
  return result.value
})

// Load data on component mount
onMounted(() => {
  loadExchangeRates()
})
</script>