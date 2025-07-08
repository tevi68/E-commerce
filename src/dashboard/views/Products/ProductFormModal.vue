<template>
    <Dialog 
        v-model:visible="visible" 
        modal 
        :header="form.id ? 'Edit Product' : 'Add Product'" 
        class="w-full max-w-2xl"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ borderRadius: '1rem' }"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Product Name -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                <InputText 
                    v-model="form.title" 
                    :class="{ 'p-invalid': v$.title.$error }" 
                    class="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter product name"
                />
                <small v-if="v$.title.$error" class="p-error text-xs text-red-500">Product name is required</small>
            </div>

            <!-- Category -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Category <span class="text-red-500">*</span></label>
                <InputText 
                    v-model="form.category" 
                    :class="{ 'p-invalid': v$.category.$error }" 
                    class="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter product category"
                />
                <small v-if="v$.category.$error" class="p-error text-xs text-red-500">Category is required</small>
            </div>

            <!-- Price -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Price <span class="text-red-500">*</span></label>
                <InputNumber 
                    v-model="form.price" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    :class="{ 'p-invalid': v$.price.$error }" 
                    mode="decimal" 
                    class="w-full"
                    :minFractionDigits="2"
                    placeholder="0.00"
                />
                <small v-if="v$.price.$error" class="p-error text-xs text-red-500">Price is required</small>
            </div>

            <!-- Original Price -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Original Price</label>
                <InputNumber 
                    v-model="form.originalPrice" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    mode="decimal" 
                    class="w-full"
                    :minFractionDigits="2"
                    placeholder="0.00"
                />
            </div>

            <!-- Discount -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Discount (%)</label>
                <InputNumber 
                    v-model="form.discount" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    class="w-full"
                    :min="0"
                    :max="100"
                    suffix="%"
                />
            </div>

            <!-- Stock -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Stock <span class="text-red-500">*</span></label>
                <InputNumber 
                    v-model="form.stock" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    :class="{ 'p-invalid': v$.stock.$error }" 
                    placeholder="0"
                    class="w-full"
                />
                <small v-if="v$.stock.$error" class="p-error text-xs text-red-500">Stock is required</small>
            </div>

            <!-- Rating -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Rating</label>
                <InputNumber 
                    v-model="form.rating" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    class="w-full"
                    :min="0"
                    :max="5"
                    :step="0.1"
                />
            </div>

            <!-- Review Count -->
            <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Review Count</label>
                <InputNumber 
                    v-model="form.reviewCount" 
                    inputClass="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    class="w-full"
                />
            </div>

            <!-- Status -->
            <div class="col-span-2 space-y-2">
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <div class="flex flex-wrap gap-4">
                    <div class="flex items-center">
                        <RadioButton 
                            inputId="published" 
                            value="published" 
                            v-model="form.status"
                            class="mr-2"
                        />
                        <label for="published" class="text-sm text-gray-700 cursor-pointer">Published</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton 
                            inputId="draft" 
                            value="draft" 
                            v-model="form.status"
                            class="mr-2"
                        />
                        <label for="draft" class="text-sm text-gray-700 cursor-pointer">Draft</label>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
                <Textarea
                    v-model="form.description"
                    :class="{ 'p-invalid': v$.description.$error }"
                    class="w-full p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows="3"
                    placeholder="Enter product description"
                />
                <small v-if="v$.description.$error" class="p-error text-xs text-red-500">Description is required</small>
            </div>

            <!-- Features -->
            <div class="col-span-2 space-y-2">
                <label class="block text-sm font-medium text-gray-700">Features</label>
                <div v-for="(feature, index) in form.features" :key="index" class="flex items-center gap-2 mb-2">
                    <InputText
                        v-model="form.features[index]"
                        class="flex-1 p-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter feature"
                    />
                    <Button
                        icon="pi pi-times"
                        severity="danger"
                        text
                        rounded
                        @click="removeFeature(index)"
                    />
                </div>
                <Button
                    icon="pi pi-plus"
                    label="Add Feature"
                    severity="secondary"
                    @click="addFeature"
                />
            </div>

            <!-- Image Upload -->
            <div class="col-span-2 space-y-2">
                <label class="block text-sm font-medium text-gray-700">Product Images</label>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div v-for="(image, index) in form.images" :key="index" class="relative">
                        <img :src="image" alt="Preview" class="w-full h-24 object-cover rounded-lg shadow border border-gray-200" />
                        <Button 
                            icon="pi pi-times" 
                            severity="danger" 
                            text 
                            rounded 
                            class="absolute -top-2 -right-2 !p-1 !w-6 !h-6 bg-white border border-gray-200 shadow-sm"
                            @click="removeImage(index)"
                        />
                    </div>
                    <div class="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                        <label class="flex flex-col items-center justify-center w-full h-full">
                            <div class="flex flex-col items-center justify-center">
                                <i class="pi pi-cloud-upload text-2xl text-gray-400 mb-1"></i>
                                <p class="text-xs text-gray-500">Upload image</p>
                            </div>
                            <input type="file" accept="image/*" @change="onImageChange" class="hidden" multiple />
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <Button 
                label="Cancel" 
                severity="secondary" 
                @click="closeForm" 
                class="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            />
            <Button 
                label="Submit" 
                @click="submit" 
                class="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 border-primary-500 text-white"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'

const props = defineProps<{ 
    visible: boolean,
    product?: any
}>()

const emit = defineEmits(['submit', 'update:visible'])

const visible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
})

const defaultForm = {
    id: null,
    title: '',
    category: '',
    price: 0,
    originalPrice: 0,
    discount: 0,
    stock: 0,
    rating: 0,
    reviewCount: 0,
    status: 'published',
    description: '',
    features: [],
    images: []
}

const form = reactive({ ...defaultForm })

const rules = computed(() => ({
    title: { required },
    category: { required },
    price: { required },
    stock: { required },
    description: { required }
}))

const v$ = useVuelidate(rules, form)

watch(() => props.product, (product) => {
    if (product) {
        Object.assign(form, {
            ...defaultForm,
            ...product
        })
    } else {
        resetForm()
    }
}, { immediate: true })

function resetForm() {
    Object.assign(form, defaultForm)
    v$.value.$reset()
}

function closeForm() {
    visible.value = false
    resetForm()
}

function onImageChange(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                form.images.push(reader.result as string)
            }
            reader.readAsDataURL(file)
        })
    }
}

function removeImage(index: number) {
    form.images.splice(index, 1)
}

function addFeature() {
    form.features.push('')
}

function removeFeature(index: number) {
    form.features.splice(index, 1)
}

function submit() {
    v$.value.$touch()
    if (v$.value.$invalid) return
    
    // Calculate discount if original price is provided
    if (form.originalPrice > 0 && form.price > 0) {
        form.discount = Math.round(((form.originalPrice - form.price) / form.originalPrice) * 100)
    }
    
    emit('submit', { ...form })
    closeForm()
}
</script>