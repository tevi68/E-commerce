<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <!-- Main container with image and form -->
    <div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
      <!-- Image Section (Left) -->
      <div class="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative hidden md:block">
        <!-- Background image with overlay -->
        <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
          <img 
            src="https://images.pexels.com/photos/6214388/pexels-photo-6214388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Registration background"
            class="w-full h-full object-cover opacity-90"
          />
        </div>
        
        <!-- Content overlay -->
        <div class="relative z-10 h-full flex flex-col justify-center p-12 text-white">
          <div class="mb-8">
            <div class="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center mb-6">
              <i class="pi pi-shopping-cart text-2xl"></i>
            </div>
            <h1 class="text-4xl font-bold mb-2">Join Us</h1>
            <p class="text-white/80">Start your journey with our e-commerce platform</p>
          </div>
          
          <div class="mt-auto">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <i class="pi pi-shield text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold">Secure Registration</h3>
                <p class="text-sm text-white/70">Your information is protected with encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section (Right) -->
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <!-- Logo for mobile -->
        <div class="md:hidden mb-8 text-center">
          <div class="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl mx-auto flex items-center justify-center shadow-md">
            <i class="pi pi-shopping-cart text-white text-2xl"></i>
          </div>
          <h1 class="text-2xl font-bold mt-4 text-gray-800">ShopLux</h1>
        </div>

        <!-- Form Header -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800">Create Account</h2>
          <p class="text-gray-600 mt-2">Fill in your details to get started</p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <InputText 
                v-model.trim="registerForm.firstName"
                placeholder="John"
                class="w-full"
                :class="{ 'border-red-500': formErrors.firstName }"
              />
              <small v-if="formErrors.firstName" class="text-red-500 text-xs mt-1 block">
                {{ formErrors.firstName }}
              </small>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <InputText 
                v-model.trim="registerForm.lastName"
                placeholder="Doe"
                class="w-full"
                :class="{ 'border-red-500': formErrors.lastName }"
              />
              <small v-if="formErrors.lastName" class="text-red-500 text-xs mt-1 block">
                {{ formErrors.lastName }}
              </small>
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <InputText 
              v-model.trim="registerForm.email"
              type="email"
              placeholder="your@email.com"
              class="w-full"
              :class="{ 'border-red-500': formErrors.email }"
            />
            <small v-if="formErrors.email" class="text-red-500 text-xs mt-1 block">
              {{ formErrors.email }}
            </small>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Password 
              v-model.trim="registerForm.password"
              placeholder="••••••••"
              :toggleMask="true"
              class="w-full"
              inputClass="w-full"
              :class="{ 'border-red-500': formErrors.password }"
            />
            <small v-if="formErrors.password" class="text-red-500 text-xs mt-1 block">
              {{ formErrors.password }}
            </small>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <Password 
              v-model.trim="registerForm.confirmPassword"
              placeholder="••••••••"
              :toggleMask="true"
              class="w-full"
              inputClass="w-full"
              :class="{ 'border-red-500': formErrors.confirmPassword }"
            />
            <small v-if="formErrors.confirmPassword" class="text-red-500 text-xs mt-1 block">
              {{ formErrors.confirmPassword }}
            </small>
          </div>

          <!-- Terms Agreement -->
          <div class="flex items-start pt-2">
            <Checkbox 
              v-model="registerForm.terms" 
              binary 
              inputId="terms"
              class="mr-2 mt-1"
              :class="{ 'border-red-500': formErrors.terms }"
            />
            <label for="terms" class="text-sm text-gray-600">
              I agree to the <a href="#" class="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a>
            </label>
            <small v-if="formErrors.terms" class="text-red-500 text-xs mt-1 block">
              {{ formErrors.terms }}
            </small>
          </div>

          <!-- Submit Button -->
          <Button 
            type="submit"
            :loading="registerLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            <template #default>
              <span v-if="!registerLoading">Create Account</span>
              <span v-else class="flex items-center justify-center">
                <i class="pi pi-spin pi-spinner mr-2"></i>
                <span>Registering...</span>
              </span>
            </template>
          </Button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <Button 
              @click="socialRegister('google')"
              class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              outlined
            >
              <i class="pi pi-google text-red-500"></i>
              <span>Google</span>
            </Button>
            <Button 
              @click="socialRegister('facebook')"
              class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              outlined
            >
              <i class="pi pi-facebook text-blue-600"></i>
              <span>Facebook</span>
            </Button>
          </div>
        </form>

        <!-- Login Link -->
        <div class="mt-8 text-center text-sm text-gray-600">
          Already have an account?
          <router-link 
            to="/login"
            class="text-indigo-600 hover:text-indigo-500 font-medium ml-1 transition-colors"
          >
            Sign in
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Password from 'primevue/password'

// Router and Toast
const router = useRouter()
const toast = useToast()

// Form state
const registerLoading = ref(false)

// Form data
const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

// Form errors
const formErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

// Form validation
const validateForm = () => {
  let valid = true
  
  // Reset errors
  Object.keys(formErrors).forEach(key => {
    (formErrors as Record<string, string>)[key] = ''
  })
  
  // First name validation
  if (!registerForm.firstName) {
    formErrors.firstName = 'First name is required'
    valid = false
  }
  
  // Last name validation
  if (!registerForm.lastName) {
    formErrors.lastName = 'Last name is required'
    valid = false
  }
  
  // Email validation
  if (!registerForm.email) {
    formErrors.email = 'Email is required'
    valid = false
  } else if (!/^\S+@\S+\.\S+$/.test(registerForm.email)) {
    formErrors.email = 'Please enter a valid email'
    valid = false
  }
  
  // Password validation
  if (!registerForm.password) {
    formErrors.password = 'Password is required'
    valid = false
  } else if (registerForm.password.length < 8) {
    formErrors.password = 'Password must be at least 8 characters'
    valid = false
  }
  
  // Confirm password validation
  if (registerForm.password !== registerForm.confirmPassword) {
    formErrors.confirmPassword = 'Passwords do not match'
    valid = false
  }
  
  // Terms validation
  if (!registerForm.terms) {
    formErrors.terms = 'You must accept the terms'
    valid = false
  }
  
  return valid
}

// Registration handler
const handleRegister = async () => {
  if (!validateForm()) return
  
  registerLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful response
    const response = { 
      success: true, 
      user: { 
        name: `${registerForm.firstName} ${registerForm.lastName}`,
        email: registerForm.email
      } 
    }

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Registration Successful!',
        detail: `Welcome ${response.user.name}, your account has been created.`,
        life: 4000,
        group: 'br'
      })
      
      // Redirect to dashboard after registration
      setTimeout(() => router.push('/dashboard'), 500)
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: 'An error occurred during registration',
      life: 5000,
      group: 'br'
    })
  } finally {
    registerLoading.value = false
  }
}

// Social registration handler
const socialRegister = (provider: string) => {
  toast.add({
    severity: 'info',
    summary: 'Social Registration',
    detail: `Attempting ${provider} registration...`,
    life: 3000,
    group: 'br'
  })
}
</script>

<style scoped>
/* Custom transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* PrimeVue overrides */
:deep(.p-inputtext) {
  transition: all 0.3s ease !important;
  padding: 0.75rem 1rem !important;
}

:deep(.p-inputtext:enabled:hover) {
  border-color: #818cf8 !important;
}

:deep(.p-inputtext:enabled:focus) {
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.2) !important;
}

:deep(.p-password-input) {
  width: 100% !important;
  padding: 0.75rem 1rem !important;
}

:deep(.p-checkbox .p-checkbox-box) {
  transition: all 0.3s ease !important;
  border-color: #d1d5db !important;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: #4f46e5 !important;
  border-color: #4f46e5 !important;
}

:deep(.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover) {
  border-color: #818cf8 !important;
}

:deep(.p-button) {
  transition: all 0.3s ease !important;
}
</style>