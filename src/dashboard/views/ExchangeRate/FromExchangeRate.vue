<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
      <Dropdown
        v-model="form.currency"
        :options="currencies"
        optionLabel="label"
        optionValue="value"
        placeholder="Select currency"
        class="w-full"
        :disabled="isEdit"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Exchange Rate (to KHR)</label>
      <InputNumber
        v-model="form.rate"
        mode="decimal"
        :min="1"
        class="w-full"
        :useGrouping="true"
        placeholder="Enter rate"
        :disabled="form.currency === 'KHR'"
      />
      <div v-if="form.currency === 'KHR'" class="text-xs text-gray-400 mt-1">KHR rate is always 1</div>
    </div>
    <div class="flex justify-end gap-2 pt-2">
      <Button
        label="Cancel"
        severity="secondary"
        outlined
        class="rounded-lg"
        @click="onCancel"
        type="button"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="rounded-lg"
        :disabled="!form.currency || !form.rate"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const props = defineProps<{
  isEdit?: boolean
  initial?: { id?: number, currency: string, rate: number }
}>()

const emit = defineEmits(['save', 'cancel'])

const currencies = [
  { label: 'US Dollar (USD)', value: 'USD' },
  { label: 'Khmer Riel (KHR)', value: 'KHR' },
]

const form = ref({
  id: props.initial?.id,
  currency: props.initial?.currency || '',
  rate: props.initial?.rate || null,
})

watch(() => props.initial, (val) => {
  if (val) {
    form.value.id = val.id
    form.value.currency = val.currency
    form.value.rate = val.rate
  } else {
    form.value.id = undefined
    form.value.currency = ''
    form.value.rate = null
  }
})

watch(() => form.value.currency, (val) => {
  if (val === 'KHR') {
    form.value.rate = 1
  }
})

function onSubmit() {
  if (form.value.currency !== 'USD' && form.value.currency !== 'KHR') return
  emit('save', { ...form.value })
}

function onCancel() {
  emit('cancel')
}
</script>