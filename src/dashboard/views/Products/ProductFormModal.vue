<template>
    <Modal :modal="modal" @confirm="onSubmit" @close-modal="closeForm" :maximizable="true">
        <div class="p-8 space-y-8">
            <!-- Quick Info Bar -->
            <div class="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="pi pi-info-circle text-blue-600"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">Product Information</h4>
                        <p class="text-sm text-gray-500">Fill in the details below to create your product</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span class="text-sm font-medium text-gray-600">Ready to save</span>
                </div>
            </div>

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
                            <h5 class="font-bold text-gray-900">Basic Details</h5>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name <span class="text-red-500">*</span>
                                </label>
                                <InputText 
                                    v-model="form.title" 
                                    :class="{ 'p-invalid': v$.title.$error }" 
                                    class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter product name"
                                />
                                <small v-if="v$.title.$error" class="text-red-500 text-xs mt-1 block">
                                    Product name is required
                                </small>
                            </div>

                            <!-- Category Dropdown and Add New Category logic -->
                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Category <span class="text-red-500">*</span>
                                </label>
                                <Dropdown 
                                    v-model="form.category"
                                    :options="categoryOptions"
                                    optionLabel="name"
                                    optionValue="value"
                                    :class="{ 'p-invalid': v$.category.$error }"
                                    class="w-full [&>div]:border [&>div]:border-gray-300 [&>div]:rounded-xl"
                                    placeholder="Select category"
                                    @change="handleCategoryChange($event.value)"
                                >
                                    <template #option="slotProps">
                                        <span v-if="slotProps.option.value === '__add_new__'">
                                        <i class="pi pi-plus text-blue-500 mr-2"></i>
                                        {{ slotProps.option.name }}
                                        </span>
                                        <span v-else>
                                        {{ slotProps.option.name }}
                                        </span>
                                    </template>
                                </Dropdown>
                                <small v-if="v$.category.$error" class="text-red-500 text-xs mt-1 block">
                                    Category is required
                                </small>
                            </div>

                            <div class="md:col-span-2">
                                <label class="block text-sm font-semibold text-gray-700 mb-2">
                                    Description <span class="text-red-500">*</span>
                                </label>
                                <Textarea
                                    v-model="form.description"
                                    :class="{ 'p-invalid': v$.description.$error }"
                                    class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    rows="4"
                                    placeholder="Describe your product..."
                                />
                                <small v-if="v$.description.$error" class="text-red-500 text-xs mt-1 block">
                                    Description is required
                                </small>
                            </div>
                        </div>
                    </div>

                    <!-- Pricing Card -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="pi pi-dollar text-green-600 text-sm"></i>
                            </div>
                            <h5 class="font-bold text-gray-900">Pricing & Stock</h5>
                        </div>
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <!-- Price -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">
                                Price <span class="text-red-500">*</span>
                                </label>
                                <InputNumber 
                                v-model="form.price" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :class="{ 'p-invalid': v$.price.$error }" 
                                mode="decimal" 
                                :minFractionDigits="2"
                                placeholder="0.00"
                                />
                                <small v-if="v$.price.$error" class="text-red-500 text-xs mt-1">
                                Price is required
                                </small>
                            </div>

                            <!-- Original Price -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">Original Price</label>
                                <InputNumber 
                                v-model="form.originalPrice" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                mode="decimal" 
                                :minFractionDigits="2"
                                placeholder="0.00"
                                />
                            </div>

                            <!-- Stock -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">
                                Stock <span class="text-red-500">*</span>
                                </label>
                                <InputNumber 
                                v-model="form.stock" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :class="{ 'p-invalid': v$.stock.$error }" 
                                placeholder="0"
                                />
                                <small v-if="v$.stock.$error" class="text-red-500 text-xs mt-1">
                                Stock is required
                                </small>
                            </div>

                            <!-- Discount -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
                                <InputNumber 
                                v-model="form.discount" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl bg-gray-50"
                                :min="0"
                                :max="100"
                                suffix="%"
                                :disabled="true"
                                />
                            </div>

                            <!-- Rating -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">Rating</label>
                                <InputNumber 
                                v-model="form.rating" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :min="0"
                                :max="5"
                                :step="0.1"
                                />
                            </div>

                            <!-- Review Count -->
                            <div class="flex flex-col">
                                <label class="text-sm font-semibold text-gray-700 mb-2">Reviews</label>
                                <InputNumber 
                                v-model="form.reviewCount" 
                                inputClass="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-6 lg:col-span-1">
                    <!-- Features Card -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center">
                                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <i class="pi pi-list text-orange-600 text-sm"></i>
                                </div>
                                <h5 class="font-bold text-gray-900">Product Features</h5>
                            </div>
                            <Button 
                                icon="pi pi-plus" 
                                label="Add" 
                                text
                                class="text-blue-600 hover:bg-blue-50 font-medium"
                                @click="addFeature" 
                            />
                        </div>
                        
                        <div class="space-y-3 max-h-60 overflow-y-auto">
                            <div v-for="(_feature, index) in form.features" :key="index" class="flex items-center gap-3">
                                <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                                    {{ index + 1 }}
                                </div>
                                <InputText
                                    v-model="form.features[index]"
                                    class="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Feature description"
                                />
                                <Button 
                                    icon="pi pi-trash" 
                                    text
                                    class="text-red-500 hover:bg-red-50 w-10 h-10"
                                    @click="removeFeature(index)" 
                                    :disabled="form.features.length === 1"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Images Card -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="pi pi-images text-pink-600 text-sm"></i>
                            </div>
                            <h5 class="font-bold text-gray-900">Product Images</h5>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-4">
                            <div 
                                v-for="(image, index) in form.images" 
                                :key="index" 
                                class="relative aspect-square group"
                            >
                                <img 
                                    :src="getImageUrl(image)" 
                                    alt="Product image" 
                                    class="w-full h-full object-cover rounded-xl border border-gray-200 group-hover:opacity-75 transition-opacity" 
                                />
                                <Button 
                                    icon="pi pi-times" 
                                    text
                                    class="absolute top-2 right-2 w-6 h-6 bg-white shadow-md text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                    @click="removeImage(index)" 
                                />
                            </div>
                            
                            <label class="aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center">
                                <i class="pi pi-image text-2xl text-gray-400 mb-1"></i>
                                <span class="text-xs text-gray-500">Upload</span>
                                <input type="file" accept="image/*" @change="onImageChange" class="hidden" multiple />
                            </label>
                        </div>
                    </div>
                    <!-- Videos Card -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mt-6">
                        <!-- Header -->
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                            <i class="pi pi-video text-yellow-600 text-sm"></i>
                            </div>
                            <h5 class="font-bold text-gray-900">Product Videos</h5>
                        </div>

                        <!-- Videos Grid -->
                        <div class="grid grid-cols-3 gap-4">
                            <!-- Existing Videos -->
                            <div 
                            v-for="(video, index) in form.videos" 
                            :key="index" 
                            class="relative group rounded-xl flex flex-col items-center p-2"
                            >
                              <!-- Video Preview Box -->
                              <div class="w-full aspect-square overflow-hidden rounded-xl flex items-center justify-center bg-black relative">
                                <video
                                  :src="getVideoUrl(video)"
                                  controls
                                  class="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                                ></video>
                                <!-- Video metadata (if available) -->
                                <div
                                  v-if="video.duration || video.thumbnail"
                                  class="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xs p-1 flex justify-between items-center"
                                >
                                  <span v-if="video.duration" class="truncate">⏱ {{ video.duration }}</span>
                                  <img 
                                    v-if="video.thumbnail" 
                                    :src="video.thumbnail" 
                                    alt="Video Thumbnail"
                                    class="w-6 h-6 object-cover rounded ml-1"
                                  />
                                </div>
                            </div>
                                <!-- Remove Button (X) -->
                                <Button 
                                    icon="pi pi-times" 
                                    text
                                    class="absolute top-2 right-2 w-6 h-6 bg-white shadow-md text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                    @click="removeVideo(index)" 
                                />
                            </div>

                            <!-- Upload Video Input -->
                            <label
                            class="aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center"
                            >
                            <i class="pi pi-video text-2xl text-gray-400 mb-1"></i>
                            <span class="text-xs text-gray-500">Upload</span>
                            <input 
                                type="file"
                                accept="video/*"
                                @change="onVideoChange"
                                class="hidden"
                                multiple
                            />
                            </label>
                        </div>
                        </div>

                    <!-- Status & Display Card -->
                    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <div class="flex items-center mb-4">
                            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="pi pi-cog text-purple-600 text-sm"></i>
                            </div>
                            <h5 class="font-bold text-gray-900">Status & Display</h5>
                        </div>
                        
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-3">Publication Status</label>
                                <div class="flex space-x-4">
                                    <label class="flex items-center cursor-pointer">
                                        <RadioButton 
                                            inputId="published" 
                                            value="published" 
                                            v-model="form.status" 
                                            class="mr-2"
                                        />
                                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            Published
                                        </span>
                                    </label>
                                    <label class="flex items-center cursor-pointer">
                                        <RadioButton 
                                            inputId="draft" 
                                            value="draft" 
                                            v-model="form.status" 
                                            class="mr-2"
                                        />
                                        <span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                            Draft
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-3">Display Options</label>
                                <div class="grid grid-cols-2 gap-3" v-if="showDisplayOptions">
                                    <label class="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.isOnProduct" 
                                            class="mr-3 w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span class="text-sm font-medium text-gray-700">Product Page</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.isOnShop" 
                                            class="mr-3 w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span class="text-sm font-medium text-gray-700">Shop</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.isOnCategory" 
                                            class="mr-3 w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span class="text-sm font-medium text-gray-700">Category</span>
                                    </label>
                                    <label class="flex items-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.isOnToday" 
                                            class="mr-3 w-4 h-4 text-blue-600 rounded"
                                        />
                                        <span class="text-sm font-medium text-gray-700">Today Deals</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>

    <Toast position="top-right" />
    <Dialog 
        v-model:visible="showNewCategoryInput" 
        modal 
        :style="{ width: '420px', borderRadius: '2rem', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.2)' }" 
        :closable="false" 
        :dismissableMask="true"
        class="backdrop-blur-xl bg-white/80 shadow-2xl"
    >
        <!-- Header (Glass Morphism Design) -->
        <template #header>
            <div class="w-full from-emerald-400 via-teal-500 px-6 py-4 relative">
                <!-- Floating Geometric Shapes -->
                <div class="absolute top-2 right-4 w-8 h-8 bg-white/20 rotate-45 rounded-sm"></div>
                <div class="absolute bottom-2 left-8 w-6 h-6 bg-white/15 rounded-full"></div>
                <div class="absolute top-1/2 right-12 w-4 h-4 bg-white/10 rotate-12 rounded-sm"></div>
                
                <div class="relative flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                            <i class="pi pi-folder-plus text-white text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-white font-bold text-lg">New Category</h3>
                            <p class="text-emerald-100 text-sm opacity-90">Create a new category</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- Body (Minimalist Card Design) -->
        <div class="p-8 bg-gradient-to-br from-slate-50 to-gray-100">
            <div class="space-y-4">
                <div class="relative">
                    <label for="categoryName" class="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                        Category Name
                    </label>
                    <div class="relative group">
                        <InputText 
                            id="categoryName"
                            v-model="newCategory" 
                            placeholder="Enter category name..." 
                            class="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm group-hover:shadow-md"
                        />
                        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <i class="pi pi-pencil text-gray-400 group-hover:text-emerald-500 transition-colors duration-200"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Category Preview -->
                <div class="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl" v-if="newCategory.trim()">
                    <p class="text-sm text-emerald-700 font-medium">Preview:</p>
                    <div class="mt-1 inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                        <i class="pi pi-tag mr-2"></i>
                        {{ newCategory }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer (Clean Action Bar) -->
        <template #footer>
            <div class="flex justify-between items-center px-6">
                <div class="flex gap-3">
                    <Button 
                        label="Cancel" 
                        icon="pi pi-times-circle" 
                        text 
                        @click="() => { showNewCategoryInput = false; newCategory = '' }"
                        class="px-6 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-gray-200"
                    />
                    <Button 
                        label="Create" 
                        icon="pi pi-check-circle" 
                        @click="addNewCategory" 
                        :disabled="!newCategory.trim()"
                        :class="[
                            !newCategory.trim() 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25'
                        ]"
                        class="px-6 py-2 rounded-xl transition-all duration-200 font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    />
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import Modal from '../../../components/dialog/modal.vue'

// PrimeVue components
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'

export interface ProductImage {
    url: string
    file?: File
}

export interface ProductVideo {
  url: string
  file?: File
  thumbnail?: string | null
  duration?: string | null
}


export interface ProductForm {
    id: number | null
    title: string
    category: string
    price: number | null
    originalPrice: number | null
    discount: number | null
    stock: number | null
    rating: number | null
    reviewCount: number | null
    status: 'published' | 'draft'
    description: string
    features: string[]
    images: ProductImage[]
    videos: ProductVideo[]
    isOnProduct: boolean
    isOnShop: boolean
    isOnCategory: boolean
    isOnToday: boolean
}

const props = defineProps({
  modal: {
    type: Object,
    default: () => ({ show: false, title: '', data: null })
  }
})
const emit = defineEmits(['submit', 'refresh', 'reloadList'])
const toast = useToast()
const confirm = useConfirm()
const oldFormData = ref('')


const loading = ref(false)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const categories: Ref<Array<{ name: string; value: string }>> = ref([])

onMounted(async () => {
    init()
  try {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const res = await axios.get(`${apiBaseUrl}/api/products/categories`)
    if (Array.isArray(res.data)) {
      categories.value = res.data.map((cat: any) => ({
        name: cat.name || cat,
        value: cat.value || cat.name || cat
      }))
    }
  } catch (e) {
  }
})

const defaultForm: ProductForm = {
    id: null,
    title: '',
    category: '',
    price: null,
    originalPrice: null,
    discount: null,
    stock: null,
    rating: null,
    reviewCount: null,
    status: 'published',
    description: '',
    features: [],
    images: [],
    videos: [],
    isOnProduct: true,
    isOnShop: true,
    isOnCategory: true,
    isOnToday: true
}

const form = reactive<ProductForm>({ ...defaultForm })

const rules = {
    title: { required },
    category: { required },
    price: { required },
    stock: { required },
    description: { required }
}

const v$ = useVuelidate(rules, form)

watch(
  () => props.modal.data,
  () => {
    init()
  },
  { immediate: true, deep: true }
)

function init() {
    if (props.modal.data) {
        Object.assign(form, {
            ...props.modal.data,
            images: (props.modal.data.images ?? []).map((img: ProductImage) =>
                typeof img === 'string'
                    ? { url: img, file: undefined }
                    : { url: img.url, file: undefined }
            ),
            videos: (props.modal.data.videos ?? []).map((video: ProductVideo) => ({
                url: video.url,
                file: undefined,
                thumbnail: video.thumbnail ?? null,
                duration: video.duration ?? null
            }))

        })
    } else {
        // Reset to default form when opening for new product
        Object.assign(form, { ...defaultForm })
    }
    // Always ensure at least one feature input is present
    if (!form.features || form.features.length === 0) {
        form.features = ['']
    }
    v$.value.$reset()
    oldFormData.value = JSON.stringify(form)
}

function closeForm() {
    if (oldFormData.value === JSON.stringify(form)) {
        props.modal.show = false
    } else {
        confirm.require({
            message: 'Close without save?',
            header: 'Confirmation',
            icon: 'pi pi-question-circle',
            accept: () => {
                props.modal.show = false
            },
            reject: () => {}
        })
    }
}

function addFeature() {
    form.features.push('')
}

function removeFeature(index: number) {
    if (form.features.length > 1) {
        form.features.splice(index, 1)
    }
}

function removeImage(index: number) {
    form.images.splice(index, 1)
}

function onImageChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    for (const file of Array.from(target.files)) {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                form.images.push({ url: reader.result, file })
            }
        }
        reader.readAsDataURL(file)
    }
    target.value = ''
}

function onVideoChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    for (const file of Array.from(target.files)) {
        const url = URL.createObjectURL(file)
        form.videos.push({ url, file })
    }
    target.value = ''
}

function removeVideo(index: number) {
    form.videos.splice(index, 1)
}

function getVideoUrl(video: { url: string }) {
    if (!video || typeof video.url !== 'string') return ''
    if (video.url.startsWith('blob:') || video.url.startsWith('http')) return video.url
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    return `${apiBaseUrl}${video.url}`
}

watch(() => [form.price, form.originalPrice], () => {
    if (form.originalPrice && form.price) {
        form.discount = Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100)
    } else {
        form.discount = null
    }
})
function getImageUrl(image: { url: string }) {
    if (!image || typeof image.url !== 'string') return 'https://via.placeholder.com/400?text=No+Image'
    if (image.url.startsWith('data:') || image.url.startsWith('blob:')) return image.url
    if (image.url.startsWith('http')) return image.url
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const fixedPath = image.url.replace(/^\/images\//, '/uploads/')
    return `${apiBaseUrl}${fixedPath}`
}

// Category Dropdown and Add New Category logic
const newCategory = ref('')
const showNewCategoryInput = ref(false)

const categoryOptions = computed(() => [
  { name: 'Add New', value: '__add_new__' },
  ...categories.value
])

function handleCategoryChange(value: string) {
  if (value === '__add_new__') {
    showNewCategoryInput.value = true
    form.category = ''
  } else {
    showNewCategoryInput.value = false
    form.category = value
  }
}

function addNewCategory() {
  if (newCategory.value.trim() && !categories.value.some(c => c.value === newCategory.value.trim())) {
    categories.value.push({ name: newCategory.value.trim(), value: newCategory.value.trim() })
    form.category = newCategory.value.trim()
    showNewCategoryInput.value = false
    newCategory.value = ''
  }
}

const showDisplayOptions = computed(() => form.status === 'published')

async function saveProduct() {
    v$.value.$touch()
    if (v$.value.$invalid) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill all required fields', life: 3000 })
        return null
    }

    loading.value = true

    try {
        const formData = new FormData()

        // Append fields
        formData.append('title', form.title)
        formData.append('category', form.category)
        formData.append('price', form.price?.toString() || '0')
        formData.append('originalPrice', form.originalPrice?.toString() || '0')
        formData.append('discount', form.discount?.toString() || '0')
        formData.append('stock', form.stock?.toString() || '0')
        formData.append('rating', form.rating?.toString() || '0')
        formData.append('reviewCount', form.reviewCount?.toString() || '0')
        formData.append('status', form.status)
        formData.append('description', form.description)
        const filteredFeatures = form.features.filter(f => f && f.trim() !== '');
        formData.append('features', JSON.stringify(filteredFeatures));

        const existingImageUrls: string[] = []
        const newImageFiles: File[] = []

        form.images.forEach(img => {
            if (img.file) {
                newImageFiles.push(img.file)
            } else {
                existingImageUrls.push(img.url)
            }
        })

        console.log('Existing Image URLs sent:', existingImageUrls)
        console.log('New Image Files sent:', newImageFiles)

        formData.append('existingImages', JSON.stringify(existingImageUrls)) // Send existing image URLs
        newImageFiles.forEach(file => {
            formData.append('newImages[]', file) // Send new image files with array notation
        })

        const existingVideoUrls: string[] = []
        const newVideoFiles: File[] = []

        form.videos.forEach(video => {
            if (video.file) {
                newVideoFiles.push(video.file)
            } else {
                existingVideoUrls.push(video.url)
            }
        })

        console.log('Existing Video URLs sent:', existingVideoUrls)
        console.log('New Video Files sent:', newVideoFiles)

        formData.append('existingVideos', JSON.stringify(existingVideoUrls)) // Send existing video URLs
        newVideoFiles.forEach(file => {
            formData.append('newVideos[]', file) // Send new video files with array notation
        })

        // Append toggle display options from UI state
        formData.append('isOnProduct', form.isOnProduct.toString())
        formData.append('isOnShop', form.isOnShop.toString())
        formData.append('isOnCategory', form.isOnCategory.toString())
        formData.append('isOnToday', form.isOnToday.toString())

        const url = form.id ? `${apiBaseUrl}/api/products/${form.id}` : `${apiBaseUrl}/api/products`
        const method = form.id ? 'put' : 'post'

        const response = await axios({ method, url, data: formData, headers: { 'Content-Type': 'multipart/form-data' } })

        toast.add({
            severity: 'success',
            summary: form.id ? 'Product Updated' : 'Product Created',
            detail: form.title,
            life: 3000
        })
        return response.data;
    } catch (error) {
        console.error('API Error:', error)
        const msg = axios.isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Unknown error'
        toast.add({ severity: 'error', summary: 'Error', detail: msg, life: 5000 })
        return null;
    } finally {
        loading.value = false
    }
}

async function onSubmit() {
    const savedProduct = await saveProduct()
    if (savedProduct) {
        emit('submit', savedProduct)
        emit('reloadList')
        props.modal.show = false
    }
}

// async function onSaveAndNew() {
//     const savedProduct = await saveProduct();
//     if(savedProduct) {
//         emit('submit', savedProduct);
//         emit('reloadList');
//         // Reset form
//         Object.assign(form, defaultForm);
//         // Ensure features array exists
//         if (!form.features || form.features.length === 0) {
//             form.features = [''];
//         }
//         v$.value.$reset();
//         oldFormData.value = JSON.stringify(form);
//     }
// }

</script>

<style scoped>
.p-invalid {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 0.2rem rgb(239 68 68 / 0.25) !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>