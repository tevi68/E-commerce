<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div class="max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get in <span class="text-yellow-300">Touch</span>
          </h1>
          <p class="text-xl text-blue-100 mb-8 leading-relaxed">
            We're here to help you with any questions, concerns, or feedback. 
            Our team is ready to provide exceptional customer service.
          </p>
          <div class="flex flex-wrap justify-center gap-6 text-blue-100">
            <div class="flex items-center space-x-2">
              <i class="pi pi-clock text-yellow-300"></i>
              <span>24/7 Support</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-users text-yellow-300"></i>
              <span>Expert Team</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="pi pi-heart text-yellow-300"></i>
              <span>Customer First</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <template #header>
              <div class="p-6 pb-0">
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p class="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
            </template>
            
            <template #content>
              <div class="p-6 pt-0">
                <form @submit.prevent="submitForm" class="space-y-6">
                  <!-- Name Fields -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label for="firstName" class="block text-sm font-semibold text-gray-700">
                        First Name *
                      </label>
                      <InputText 
                        id="firstName"
                        v-model="form.firstName" 
                        placeholder="John"
                        class="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        :class="{ 'border-red-500': errors.firstName }"
                      />
                      <small v-if="errors.firstName" class="text-red-500">{{ errors.firstName }}</small>
                    </div>
                    
                    <div class="space-y-2">
                      <label for="lastName" class="block text-sm font-semibold text-gray-700">
                        Last Name *
                      </label>
                      <InputText 
                        id="lastName"
                        v-model="form.lastName" 
                        placeholder="Doe"
                        class="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        :class="{ 'border-red-500': errors.lastName }"
                      />
                      <small v-if="errors.lastName" class="text-red-500">{{ errors.lastName }}</small>
                    </div>
                  </div>

                  <!-- Email & Phone -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label for="email" class="block text-sm font-semibold text-gray-700">
                        Email Address *
                      </label>
                      <InputText 
                        id="email"
                        v-model="form.email" 
                        type="email"
                        placeholder="john@example.com"
                        class="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        :class="{ 'border-red-500': errors.email }"
                      />
                      <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
                    </div>
                    
                    <div class="space-y-2">
                      <label for="phone" class="block text-sm font-semibold text-gray-700">
                        Phone Number
                      </label>
                      <InputText 
                        id="phone"
                        v-model="form.phone" 
                        placeholder="+1 (555) 123-4567"
                        class="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <!-- Subject & Priority -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                      <label for="subject" class="block text-sm font-semibold text-gray-700">
                        Subject *
                      </label>
                      <Dropdown 
                        v-model="form.subject" 
                        :options="subjectOptions" 
                        optionLabel="label" 
                        optionValue="value"
                        placeholder="Select a subject"
                        class="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                        :class="{ 'border-red-500': errors.subject }"
                      />
                      <small v-if="errors.subject" class="text-red-500">{{ errors.subject }}</small>
                    </div>
                    
                    <div class="space-y-2">
                      <label for="priority" class="block text-sm font-semibold text-gray-700">
                        Priority Level
                      </label>
                      <Dropdown 
                        v-model="form.priority" 
                        :options="priorityOptions" 
                        optionLabel="label" 
                        optionValue="value"
                        placeholder="Select priority"
                        class="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>

                  <!-- Order Number -->
                  <div class="space-y-2">
                    <label for="orderNumber" class="block text-sm font-semibold text-gray-700">
                      Order Number (if applicable)
                    </label>
                    <InputText 
                      id="orderNumber"
                      v-model="form.orderNumber" 
                      placeholder="#SH123456"
                      class="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <!-- Message -->
                  <div class="space-y-2">
                    <label for="message" class="block text-sm font-semibold text-gray-700">
                      Message *
                    </label>
                    <Textarea 
                      id="message"
                      v-model="form.message" 
                      rows="6"
                      placeholder="Please describe your inquiry in detail..."
                      class="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      :class="{ 'border-red-500': errors.message }"
                    />
                    <small v-if="errors.message" class="text-red-500">{{ errors.message }}</small>
                  </div>

                  <!-- File Upload -->
                  <div class="space-y-2">
                    <label class="block text-sm font-semibold text-gray-700">
                      Attachments (optional)
                    </label>
                    <FileUpload 
                      mode="basic" 
                      :multiple="true"
                      accept="image/*,.pdf,.doc,.docx"
                      :maxFileSize="5000000"
                      chooseLabel="Choose Files"
                      class="w-full"
                    />
                    <small class="text-gray-500">Max file size: 5MB. Supported formats: Images, PDF, DOC, DOCX</small>
                  </div>

                  <!-- Checkbox -->
                  <div class="flex items-start space-x-3">
                    <Checkbox 
                      v-model="form.agreeToTerms" 
                      binary
                      class="mt-1"
                    />
                    <label class="text-sm text-gray-700">
                      I agree to the <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</a> 
                      and <a href="#" class="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a> *
                    </label>
                  </div>
                  <small v-if="errors.agreeToTerms" class="text-red-500 block">{{ errors.agreeToTerms }}</small>

                  <!-- Submit Button -->
                  <div class="pt-4">
                    <Button 
                      type="submit"
                      label="Send Message" 
                      icon="pi pi-send"
                      :loading="isSubmitting"
                      class="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    />
                  </div>
                </form>
              </div>
            </template>
          </Card>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <!-- Contact Details -->
          <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <template #header>
              <div class="p-6 pb-0">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Contact Information</h3>
                <p class="text-gray-600">Reach out to us through any of these channels.</p>
              </div>
            </template>
            
            <template #content>
              <div class="p-6 pt-0 space-y-6">
                <!-- Address -->
                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-map-marker text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Our Location</h4>
                    <p class="text-gray-600 text-sm leading-relaxed">
                      123 Commerce Street<br>
                      Shopping District<br>
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-phone text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Phone Support</h4>
                    <p class="text-gray-600 text-sm">+1 (555) 123-4567</p>
                    <p class="text-gray-500 text-xs">Mon-Fri: 9AM-8PM EST</p>
                  </div>
                </div>

                <!-- Email -->
                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-envelope text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Email Support</h4>
                    <p class="text-gray-600 text-sm">support@shophub.com</p>
                    <p class="text-gray-500 text-xs">Response within 24 hours</p>
                  </div>
                </div>

                <!-- Live Chat -->
                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-comments text-white text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1">Live Chat</h4>
                    <p class="text-gray-600 text-sm">Chat with our team</p>
                    <Button 
                      label="Start Chat" 
                      size="small"
                      class="mt-2 bg-gradient-to-r from-orange-500 to-red-500 border-0 text-xs px-3 py-1"
                    />
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- FAQ Quick Links -->
          <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <template #header>
              <div class="p-6 pb-0">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Quick Help</h3>
                <p class="text-gray-600">Common questions and resources.</p>
              </div>
            </template>
            
            <template #content>
              <div class="p-6 pt-0 space-y-3">
                <a href="#" class="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600">Order Tracking</span>
                  <i class="pi pi-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                </a>
                <a href="#" class="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600">Returns & Exchanges</span>
                  <i class="pi pi-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                </a>
                <a href="#" class="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600">Shipping Information</span>
                  <i class="pi pi-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                </a>
                <a href="#" class="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600">Size Guide</span>
                  <i class="pi pi-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                </a>
                <a href="#" class="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                  <span class="text-gray-700 group-hover:text-blue-600">Payment Methods</span>
                  <i class="pi pi-arrow-right text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"></i>
                </a>
              </div>
            </template>
          </Card>

          <!-- Social Media -->
          <Card class="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <template #header>
              <div class="p-6 pb-0">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Follow Us</h3>
                <p class="text-gray-600">Stay connected for updates and offers.</p>
              </div>
            </template>
            
            <template #content>
              <div class="p-6 pt-0">
                <div class="grid grid-cols-2 gap-4">
                  <Button 
                    icon="pi pi-facebook" 
                    label="Facebook"
                    class="w-full justify-center bg-blue-600 border-0 hover:bg-blue-700"
                  />
                  <Button 
                    icon="pi pi-twitter" 
                    label="Twitter"
                    class="w-full justify-center bg-sky-500 border-0 hover:bg-sky-600"
                  />
                  <Button 
                    icon="pi pi-instagram" 
                    label="Instagram"
                    class="w-full justify-center bg-pink-600 border-0 hover:bg-pink-700"
                  />
                  <Button 
                    icon="pi pi-linkedin" 
                    label="LinkedIn"
                    class="w-full justify-center bg-blue-700 border-0 hover:bg-blue-800"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <Toast position="top-right" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import type { ToastMessageOptions } from 'primevue/toast'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  priority: string
  orderNumber: string
  message: string
  agreeToTerms: boolean
}

interface SubjectOption {
  label: string
  value: string
}

interface PriorityOption {
  label: string
  value: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
  agreeToTerms?: string
  [key: string]: string | undefined
}

const toast = useToast()

const form = reactive<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  priority: 'medium',
  orderNumber: '',
  message: '',
  agreeToTerms: false
})

const errors = ref<FormErrors>({})
const isSubmitting = ref<boolean>(false)

const subjectOptions = ref<SubjectOption[]>([
  { label: 'General Inquiry', value: 'general' },
  { label: 'Order Support', value: 'order' },
  { label: 'Technical Issue', value: 'technical' },
  { label: 'Billing Question', value: 'billing' },
  { label: 'Product Information', value: 'product' },
  { label: 'Return/Exchange', value: 'return' },
  { label: 'Complaint', value: 'complaint' },
  { label: 'Partnership', value: 'partnership' }
])

const priorityOptions = ref<PriorityOption[]>([
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' }
])

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.firstName.trim()) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!form.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
  }
  
  if (!form.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.value.email = 'Please enter a valid email'
  }
  
  if (!form.subject) {
    errors.value.subject = 'Please select a subject'
  }
  
  if (!form.message.trim()) {
    errors.value.message = 'Message is required'
  } else if (form.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters'
  }
  
  if (!form.agreeToTerms) {
    errors.value.agreeToTerms = 'You must agree to the terms and conditions'
  }
  
  return Object.keys(errors.value).length === 0
}

const submitForm = async (): Promise<void> => {
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please correct the errors in the form',
      life: 3000
    } as ToastMessageOptions)
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise<void>(resolve => setTimeout(resolve, 2000))
    
    toast.add({
      severity: 'success',
      summary: 'Message Sent!',
      detail: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
      life: 5000
    } as ToastMessageOptions)
    
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key as keyof FormData] === 'boolean') {
        (form[key as keyof FormData] as boolean) = false
      } else {
        (form[key as keyof FormData] as string) = ''
      }
    })
    form.priority = 'medium'
    
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to send message. Please try again.',
      life: 3000
    } as ToastMessageOptions)
  } finally {
    isSubmitting.value = false
  }
}
</script>