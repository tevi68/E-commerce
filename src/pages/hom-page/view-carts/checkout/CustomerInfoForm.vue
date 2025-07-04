<template>
  <Dialog
    :visible="visible"
    @update:visible="val => emit('update:visible', val)"
    modal
    header="Shipping Details"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    class="rounded-lg shadow-xl"
  >
    <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
          <i class="pi pi-id-card text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Customer Information</h1>
        <p class="text-lg text-gray-600">Complete your details for a personalized experience</p>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <!-- Personal Information Section -->
        <div class="mb-8">
          <div class="flex items-center mb-6">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mr-3">
              <i class="pi pi-user-edit text-white text-sm"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Personal Details</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.name" 
                  placeholder="Enter your full name"
                  :class="['w-full pl-16', { 'p-invalid': submitted && v$.name.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.name.$error" class="p-error text-red-500">
                <span v-if="v$.name.required.$invalid">Full name is required</span>
              </small>
            </div>

            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.email" 
                  type="email"
                  placeholder="your.email@example.com"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.email.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.email.$error" class="p-error text-red-500">
                <span v-if="v$.email.required.$invalid">Email is required</span>
                <span v-else-if="v$.email.email.$invalid">Please enter a valid email</span>
              </small>
            </div>

            <!-- Phone Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputMask 
                  v-model="form.phone" 
                  mask="(999) 999-9999"
                  placeholder="(555) 123-4567"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.phone.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.phone.$error" class="p-error text-red-500">
                <span v-if="v$.phone.required.$invalid">Phone number is required</span>
              </small>
            </div>

            <!-- Date of Birth Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <div class="relative">
                <Calendar 
                  v-model="form.dateOfBirth" 
                  dateFormat="mm/dd/yy"
                  placeholder="Select date"
                  inputClass="w-full pl-10 py-2.5 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  :showIcon="false"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Address Information Section -->
        <div class="mb-8">
          <div class="flex items-center mb-6">
            <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center mr-3">
              <i class="pi pi-map-marker text-white text-sm"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Address Information</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Country Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Country <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <i class="pi pi-globe absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"></i>
                <Dropdown 
                  v-model="form.country" 
                  :options="countries"
                  optionLabel="name"
                  optionValue="code"
                  placeholder="Select Country"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.country.$invalid }]"
                  filter
                  showClear
                />
              </div>
              <small v-if="submitted && v$.country.$error" class="p-error text-red-500">
                <span v-if="v$.country.required.$invalid">Country is required</span>
              </small>
            </div>

            <!-- Province Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Province / State <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.province"
                  placeholder="Enter province or state"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.province.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.province.$error" class="p-error text-red-500">
                <span v-if="v$.province.required.$invalid">Province/State is required</span>
              </small>
            </div>

            <!-- City Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                City <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.city" 
                  placeholder="Enter city"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.city.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.city.$error" class="p-error text-red-500">
                <span v-if="v$.city.required.$invalid">City is required</span>
              </small>
            </div>

            <!-- Zip Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Zip / Postal Code <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.zip" 
                  placeholder="Enter zip code"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.zip.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.zip.$error" class="p-error text-red-500">
                <span v-if="v$.zip.required.$invalid">Zip code is required</span>
              </small>
            </div>

            <!-- Address Field (Full width) -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Street Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <InputText 
                  v-model="form.address" 
                  placeholder="Enter your full address"
                  :class="['w-full pl-10', { 'p-invalid': submitted && v$.address.$invalid }]"
                />
              </div>
              <small v-if="submitted && v$.address.$error" class="p-error text-red-500">
                <span v-if="v$.address.required.$invalid">Address is required</span>
              </small>
            </div>
          </div>
        </div>

        <!-- Additional Information Section -->
        <div>
          <div class="flex items-center mb-6">
            <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mr-3">
              <i class="pi pi-pencil text-white text-sm"></i>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Additional Information</h2>
          </div>

          <!-- Company Field -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
            <div class="relative">
              <InputText 
                v-model="form.company" 
                placeholder="Enter company name"
                class="w-full pl-10"
              />
            </div>
          </div>

          <!-- Notes Field -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Special Notes or Requests</label>
            <div class="relative">
              <Textarea 
                v-model="form.notes" 
                placeholder="Any additional information you'd like to share..."
                autoResize 
                rows="4"
                class="w-full pl-10"
              />
            </div>
          </div>

          <!-- Preferences Section -->
          <div class="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Communication Preferences</h3>
            
            <div class="flex items-center mb-3">
              <Checkbox v-model="form.emailUpdates" inputId="emailUpdates" binary />
              <label for="emailUpdates" class="ml-2 text-gray-700 cursor-pointer">
                <i class="pi pi-envelope mr-2 text-blue-500"></i>
                I would like to receive email updates and newsletters
              </label>
            </div>
            
            <div class="flex items-center">
              <Checkbox v-model="form.smsUpdates" inputId="smsUpdates" binary />
              <label for="smsUpdates" class="ml-2 text-gray-700 cursor-pointer">
                <i class="pi pi-mobile mr-2 text-green-500"></i>
                I would like to receive SMS notifications
              </label>
            </div>
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="mb-6">
          <div class="flex justify-between text-sm font-medium text-gray-600 mb-1">
            <span><i class="pi pi-chart-bar mr-2"></i>Form Completion</span>
            <span>{{ completionPercentage }}%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
              :style="{ width: completionPercentage + '%' }"
            ></div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200">
          <Button 
            label="Clear Form" 
            icon="pi pi-trash" 
            severity="secondary"
            outlined
            class="flex-1"
            @click="clearForm"
          />
          
          <Button 
            label="Save Draft" 
            icon="pi pi-bookmark" 
            severity="info"
            outlined
            class="flex-1"
            @click="saveDraft"
          />
          
          <Button 
            label="Submit" 
            icon="pi pi-send" 
            class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 border-none shadow-md hover:shadow-lg transition-all"
            :disabled="false"
            @click="submit"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar'

const { visible } = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible', 'submit', 'saveDraft'])

const form = reactive({
  name: '',
  email: '',
  phone: '',
  dateOfBirth: null,
  country: '',
  province: '',
  city: '',
  zip: '',
  address: '',
  company: '',
  notes: '',
  emailUpdates: true,
  smsUpdates: false
})

const rules = computed(() => ({
  name: { required },
  email: { required, email: emailValidator },
  phone: { required },
  country: { required },
  province: { required },
  city: { required },
  zip: { required },
  address: { required }
}))

const v$ = useVuelidate(rules, form)
const submitted = ref(false)

const countries = [
  { name: 'United States', code: 'US' },
  { name: 'Canada', code: 'CA' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Cambodia', code: 'KH' }
]

const completionPercentage = computed(() => {
  const requiredFields = ['name', 'email', 'phone', 'country', 'province', 'city', 'zip', 'address'] as const
  const filledFields = requiredFields.filter(field => {
    if (field === 'country') return form[field] !== ''
    return form[field]?.toString().trim() !== ''
  })
  return Math.round((filledFields.length / requiredFields.length) * 100)
})

function clearForm() {
  Object.assign(form, {
    name: '',
    email: '',
    phone: '',
    dateOfBirth: null,
    country: '',
    province: '',
    city: '',
    zip: '',
    address: '',
    company: '',
    notes: '',
    emailUpdates: true,
    smsUpdates: false
  })
  submitted.value = false
  v$.value.$reset()
}

function saveDraft() {
  emit('saveDraft', { ...form })
}

async function submit() {
  submitted.value = true
  await v$.value.$validate()
  if (!v$.value.$invalid) {
    emit('submit', { ...form })
  }
}
</script>

<style>
/* Custom calendar icon positioning */
.p-calendar .p-inputtext {
  padding-left: 2.5rem !important;
}

/* Smooth transitions for interactive elements */
button, input, textarea, select {
  transition: all 0.2s ease;
}

/* Hover effects for buttons */
.p-button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Gradient button hover effect */
.p-button.bg-gradient-to-r:hover {
  opacity: 0.9;
}

/* Enhanced icon styling */
.pi {
  transition: color 0.2s ease;
}

/* Input focus state with icon color change */
.p-inputtext:focus + .pi {
  color: #3B82F6 !important;
}
</style>