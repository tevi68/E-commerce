<template>
  <Dialog
    :visible="modal.show"
    :header="modal.title"
    class="w-full h-full max-w-6xl"
    :style="{ 'margin-top': '0', 'margin-bottom': '0' }"
    @update:visible="onUpdateVisible"
    position="top"
    :breakpoints="{ '960px': '90vw', '640px': '100vw' }"
    :modal="true"
    :maximizable="maximizable"
    :closeable="closeable"
  >
    <div class="modal-content p-4 bg-white flex-1 overflow-y-auto">
      <slot />
    </div>
    <template #footer>
      <slot name="footer">
        <div class="flex items-center justify-end gap-3">
          <button
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              @click="closeModal"
          >
              Cancel
          </button>
          <button
              @click="confirmModal"
              :disabled="!enableBtn"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
              Save & Close
          </button>
        </div>
      </slot>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import Dialog from 'primevue/dialog'

const props = defineProps({
  modal: {
    type: Object,
    required: true
  },
  enableBtn: {
    type: Boolean,
    default: true
  },
  maximizable: {
      type: Boolean,
      default: false
  },
  closeable: {
      type: Boolean,
      default: true
  }
})
const emit = defineEmits(['confirm', 'close-modal'])

function onUpdateVisible(value: boolean) {
    if (value === false) {
        emit('close-modal')
    }
}

function closeModal() {
  emit('close-modal')
}
function confirmModal() {
  emit('confirm')
}
</script>

<style>
.p-dialog .p-dialog-header {
  background-color: #ffffff;
  padding: 1rem;
  color: #000000;
  border-bottom: 1px solid #e5e7eb;
}
.p-dialog .p-dialog-footer {
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>