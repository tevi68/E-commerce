<template>
  <Modal :modal="modal" @confirm="onSubmit" ref="layerDom" :enableBtn="enableBtnTrue" @close-modal="closeForm"
    :maximizable="true">
    <div class="w-full" style="min-height: 100px;">
      <div v-if="loadForm" class="p-8 space-y-8">
        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="space-y-6 lg:col-span-2">
            <!-- Basic Details Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="pi pi-tag text-indigo-600 text-sm"></i>
                </div>
                <h5 class="font-bold text-gray-900">Deal Details</h5>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Deal Title <span
                      class="text-red-500">*</span></label>
                  <InputText v-model.trim="form.title"
                    class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    :class="{ 'p-invalid': v$.title.$error }" placeholder="Enter deal title" />
                  <small v-if="v$.title.$error" class="text-red-500 text-xs mt-1 block">Title is required</small>
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <Textarea v-model.trim="form.description" class="w-full p-3 border border-gray-300 rounded-xl"
                    rows="4" placeholder="Describe your deal..." />
                </div>
              </div>
            </div>

            <!-- Features Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <i class="pi pi-list text-orange-600 text-sm"></i>
                  </div>
                  <h5 class="font-bold text-gray-900">Features</h5>
                </div>
                <Button icon="pi pi-plus" label="Add" text class="text-blue-600 hover:bg-blue-50 font-medium"
                  @click="addFeature" />
              </div>
              <div class="space-y-3 max-h-60 overflow-y-auto">
                <div v-for="(feature, idx) in form.features" :key="idx" class="flex items-center gap-3">
                  <div
                    class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                    {{ idx + 1 }}
                  </div>
                  <InputText v-model="form.features[idx]"
                    class="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Feature description" />
                  <Button icon="pi pi-trash" text class="text-red-500 hover:bg-red-50 w-10 h-10"
                    @click="removeFeature(idx)" :disabled="form.features.length === 1" />
                </div>
              </div>
            </div>


          </div>
          <!-- Right Column -->
          <div class="space-y-6 lg:col-span-1">
            <!-- Pricing & Stock Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="pi pi-dollar text-green-600 text-sm"></i>
                </div>
                <h5 class="font-bold text-gray-900">Pricing & Stock</h5>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Price <span
                      class="text-red-500">*</span></label>
                  <InputNumber v-model="form.price" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    :class="{ 'p-invalid': v$.price.$error }" mode="decimal" :minFractionDigits="2"
                    placeholder="0.00" />
                  <small v-if="v$.price.$error" class="text-red-500 text-xs mt-1 block">Price is required</small>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Original Price</label>
                  <InputNumber v-model="form.originalPrice" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    mode="decimal" :minFractionDigits="2" placeholder="0.00" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Stock <span
                      class="text-red-500">*</span></label>
                  <InputNumber v-model="form.stock" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    :class="{ 'p-invalid': v$.stock.$error }" placeholder="0" />
                  <small v-if="v$.stock.$error" class="text-red-500 text-xs mt-1 block">Stock is required</small>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
                  <InputNumber v-model="form.discount" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    :min="0" :max="100" suffix="%" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                  <InputNumber v-model="form.rating" inputClass="w-full p-3 border border-gray-300 rounded-xl" :min="0"
                    :max="5" :step="0.1" />
                </div>
              </div>
            </div>

            <!-- Timer Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="pi pi-clock text-cyan-600 text-sm"></i>
                </div>
                <h5 class="font-bold text-gray-900">Deal Timer</h5>
              </div>
              <div class="grid grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Days <span
                      class="text-red-500">*</span></label>
                  <InputNumber v-model="form.timer_days" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    :class="{ 'p-invalid': v$.timer_days.$error }" placeholder="0" />
                  <small v-if="v$.timer_days.$error" class="text-red-500 text-xs mt-1 block">Required</small>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Hours <span
                      class="text-red-500">*</span></label>
                  <InputNumber v-model="form.timer_hours" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    :class="{ 'p-invalid': v$.timer_hours.$error }" placeholder="0" />
                  <small v-if="v$.timer_hours.$error" class="text-red-500 text-xs mt-1 block">Required</small>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Minutes</label>
                  <InputNumber v-model="form.timer_minutes" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    placeholder="0" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Seconds</label>
                  <InputNumber v-model="form.timer_seconds" inputClass="w-full p-3 border border-gray-300 rounded-xl"
                    placeholder="0" />
                </div>
              </div>
            </div>

            <!-- Videos Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="pi pi-video text-yellow-600 text-sm"></i>
                </div>
                <h5 class="font-bold text-gray-900">Videos</h5>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(video, idx) in form.videos" :key="idx"
                  class="relative group rounded-xl flex flex-col items-center p-2">
                  <div
                    class="w-full aspect-square overflow-hidden rounded-xl flex items-center justify-center bg-black relative">
                    <video :src="video.url" controls
                      class="w-full h-full object-cover transition-opacity group-hover:opacity-75"></video>
                  </div>
                  <Button icon="pi pi-times" text
                    class="absolute top-2 right-2 w-6 h-6 bg-white shadow-md text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="removeVideo(idx)" />
                </div>
                <label
                  class="aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
                  <i class="pi pi-video text-2xl text-gray-400 mb-1"></i>
                  <span class="text-xs text-gray-500">Upload</span>
                  <input type="file" accept="video/*" @change="onVideoChange" class="hidden" multiple />
                </label>
              </div>
            </div>

            <!-- Images Card -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                  <i class="pi pi-images text-pink-600 text-sm"></i>
                </div>
                <h5 class="font-bold text-gray-900">Images</h5>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(image, idx) in form.images" :key="idx" class="relative aspect-square group">
                  <img :src="getImageUrl(image)" alt="Deal image"
                    class="w-full h-full object-cover rounded-xl border border-gray-200 group-hover:opacity-75 transition-opacity" />
                  <Button icon="pi pi-times" text
                    class="absolute top-2 right-2 w-6 h-6 bg-white shadow-md text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    @click="removeImage(idx)" />
                </div>
                <label
                  class="aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
                  <i class="pi pi-image text-2xl text-gray-400 mb-1"></i>
                  <span class="text-xs text-gray-500">Upload</span>
                  <input type="file" accept="image/*" @change="onImageChange" class="hidden" multiple />
                </label>
              </div>
              <small v-if="v$.images.$error" class="text-red-500 text-xs mt-1 block">At least one image is
                required</small>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center min-h-[200px]">
        <ProgressSpinner style="width: 50px; height: 50px;" />
      </div>
    </div>
  </Modal>
  <loading v-model:active="trasparentLoding" :can-cancel="false" loader="bars" color="green" :width="0" :opacity="0"
    :is-full-page="true" />
  <loading v-model:active="lodingSubmit" :can-cancel="false" loader="dots" color="green" :is-full-page="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import Modal from './../../../components/dialog/modal.vue';
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber'
import ProgressSpinner from 'primevue/progressspinner'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import axios from 'axios'

const props = defineProps({
  modal: {
    type: Object,
    default: () => ({ show: false, title: '' })
  }
})
const emit = defineEmits(['reloadList', 'reloadDropdown'])

const toast = useToast()
const confirm = useConfirm()
const layerDom: any = ref(null)

const trasparentLoding = ref(false)
const lodingSubmit = ref(false)
const showForm = ref(false)
const loadForm = computed(() => showForm.value)
const enableBtn = ref(false)
const enableBtnTrue = computed(() => enableBtn.value)
const oldFormData = ref('')

interface ImageOption {
  url: string
  file?: File
}
interface VideoOption {
  url: string
  file?: File
}
interface WeeklyDealForm {
  id: number | null
  title: string
  description: string
  price: number | null
  originalPrice: number | null
  discount: number | null
  stock: number | null
  rating: number | null
  features: string[]
  images: ImageOption[]
  videos: VideoOption[]
  timer_days: number
  timer_hours: number
  timer_minutes: number
  timer_seconds: number
}
const form = ref<WeeklyDealForm>({
  id: null,
  title: '',
  description: '',
  price: null,
  originalPrice: null,
  discount: null,
  stock: null,
  rating: null,
  features: [''],
  images: [],
  videos: [],
  timer_days: 0,
  timer_hours: 0,
  timer_minutes: 0,
  timer_seconds: 0
})

const defaultForm = JSON.parse(JSON.stringify(form.value));

const rules = computed(() => ({
  title: { required },
  price: { required },
  stock: { required },
  timer_days: { required },
  timer_hours: { required },
  images: {
    required: (value: any) => Array.isArray(value) && value.length > 0
  }
}))
const v$ = useVuelidate(rules, form)

onMounted(() => {
  init()
})

watch(
  () => props.modal.data,
  () => {
    init()
  },
  { immediate: true, deep: true }
)

async function init() {
  enableBtn.value = false
  showForm.value = false
  if (props.modal.data) {
    Object.assign(form.value, props.modal.data)
    if (Array.isArray(form.value.images)) {
      form.value.images = form.value.images.map(img =>
        typeof img === 'string' ? { url: img } : img
      )
    }
    if (Array.isArray(form.value.videos)) {
      form.value.videos = form.value.videos.map(vid =>
        typeof vid === 'string' ? { url: vid } : vid
      )
    }
    showForm.value = true
    enableBtn.value = true
  } else {
    Object.assign(form.value, {
      id: null,
      title: '',
      description: '',
      price: null,
      originalPrice: null,
      discount: null,
      stock: null,
      rating: null,
      features: [''],
      images: [],
      videos: [],
      timer_days: 0,
      timer_hours: 0,
      timer_minutes: 0,
      timer_seconds: 0
    })
    showForm.value = true
    enableBtn.value = true
  }
  oldFormData.value = JSON.stringify(form.value)
}

function addFeature() {
  form.value.features.push('')
}
function removeFeature(idx: number) {
  if (form.value.features.length > 1) form.value.features.splice(idx, 1)
}
function getImageUrl(image: ImageOption) {
  if (!image.url) return 'https://via.placeholder.com/80?text=No+Image'
  if (image.url.startsWith('data:') || image.url.startsWith('blob:')) return image.url
  if (image.url.startsWith('http')) return image.url
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  return `${apiBaseUrl}${image.url}`
}
function removeImage(idx: number) {
  form.value.images.splice(idx, 1)
}
function onImageChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.value.images.push({ url: ev.target?.result as string, file })
    }
    reader.readAsDataURL(file)
  }
}
function removeVideo(idx: number) {
  form.value.videos.splice(idx, 1)
}
function onVideoChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    reader.onload = (ev) => {
      form.value.videos.push({ url: ev.target?.result as string, file })
    }
    reader.readAsDataURL(file)
  }
}

// --- Submit logic ---
async function saveWeeklyDeal() {
  trasparentLoding.value = true
  v$.value.$touch()
  const isValid = await v$.value.$validate()
  if (isValid) {
    lodingSubmit.value = true
    trasparentLoding.value = false
    try {
      const formData = new FormData()
      formData.append('title', form.value.title)
      formData.append('description', form.value.description)
      formData.append('price', (form.value.price ?? 0).toString())
      formData.append('originalPrice', (form.value.originalPrice ?? 0).toString())
      formData.append('discount', (form.value.discount ?? 0).toString())
      formData.append('stock', (form.value.stock ?? 0).toString())
      formData.append('rating', (form.value.rating ?? 0).toString())
      // Features
      const filteredFeatures = form.value.features.filter(f => f && f.trim() !== '')
      formData.append('features', JSON.stringify(filteredFeatures))
      // Timer
      formData.append('timer_days', (form.value.timer_days ?? 0).toString())
      formData.append('timer_hours', (form.value.timer_hours ?? 0).toString())
      formData.append('timer_minutes', (form.value.timer_minutes ?? 0).toString())
      formData.append('timer_seconds', (form.value.timer_seconds ?? 0).toString())
      // Images
      const existingImageUrls: string[] = []
      const newImageFiles: File[] = []
      form.value.images.forEach((img: ImageOption) => {
        if (img.file) {
          newImageFiles.push(img.file)
        } else {
          existingImageUrls.push(img.url)
        }
      })
      formData.append('existingImages', JSON.stringify(existingImageUrls))
      newImageFiles.forEach((file: File) => {
        formData.append('newImages[]', file)
      })
      // Videos
      const existingVideoUrls: string[] = []
      const newVideoFiles: File[] = []
      form.value.videos.forEach((video: VideoOption) => {
        if (video.file) {
          newVideoFiles.push(video.file)
        } else {
          existingVideoUrls.push(video.url)
        }
      })
      formData.append('existingVideos', JSON.stringify(existingVideoUrls))
      newVideoFiles.forEach((file: File) => {
        formData.append('newVideos[]', file)
      })
      // API
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
      const url = form.value.id ? `${apiBaseUrl}/api/weeklydeals/${form.value.id}` : `${apiBaseUrl}/api/weeklydeals`
      const method = form.value.id ? 'put' : 'post'
      const response = await axios({ method, url, data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      toast.add({
        severity: 'success',
        summary: form.value.id ? 'Weekly Deal Updated' : 'Weekly Deal Created',
        detail: form.value.title,
        life: 3000
      })
      return response.data;

    } catch (error) {
      lodingSubmit.value = false
      toast.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong', group: 'err' })
      return null;
    }
  } else {
    trasparentLoding.value = false
    return null;
  }
}

async function onSubmit() {
  const savedDeal = await saveWeeklyDeal();
  if (savedDeal) {
    if (props.modal.emitType === 1) {
      emit('reloadList', { btnType: form.value.id ? 3 : 1 })
    } else if (props.modal.emitType === 2) {
      emit('reloadDropdown', { id: savedDeal.id, jobList: savedDeal.rows, btnType: form.value.id ? 3 : 1 })
    }
    props.modal.show = false
  }
}
// async function onSaveAndNew() {
//   const savedDeal = await saveWeeklyDeal();
//   if (savedDeal) {
//     if (props.modal.emitType === 1) {
//       emit('reloadList', { btnType: 1 }); // Always new
//     } else if (props.modal.emitType === 2) {
//       emit('reloadDropdown', { id: savedDeal.id, jobList: savedDeal.rows, btnType: 1 });
//     }
//     // Reset form
//     form.value = JSON.parse(JSON.stringify(defaultForm));
//     v$.value.$reset();
//     oldFormData.value = JSON.stringify(form.value);
//   }
// }

// --- Close logic ---
function closeForm() {
  if (oldFormData.value === JSON.stringify(form.value)) {
    // Just close the modal
    props.modal.show = false
  } else {
    confirm.require({
      message: 'Close without save?',
      header: 'Confirmation',
      icon: 'pi pi-question-circle',
      accept: () => {
        props.modal.show = false
      },
      reject: () => { }
    })
  }
}
</script>