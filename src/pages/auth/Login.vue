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
            alt="Login background"
            class="w-full h-full object-cover opacity-90"
          />
        </div>
        
        <!-- Content overlay -->
        <div class="relative z-10 h-full flex flex-col justify-center p-12 text-white">
          <div class="mb-8">
            <div class="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center mb-6">
              <i class="pi pi-shopping-cart text-2xl"></i>
            </div>
            <h1 class="text-4xl font-bold mb-2">Welcome Back</h1>
            <p class="text-white/80">Streamline your shopping experience with our powerful dashboard</p>
          </div>
          
          <div class="mt-auto">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <i class="pi pi-shield text-xl"></i>
              </div>
              <div>
                <h3 class="font-semibold">Secure Authentication</h3>
                <p class="text-sm text-white/70">Your data is protected with industry-standard encryption</p>
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
          <h2 class="text-2xl font-bold text-gray-800">Sign In</h2>
          <p class="text-gray-600 mt-2">Enter your credentials to access your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div class="relative">
              <InputText 
                v-model.trim="loginForm.email"
                type="email"
                placeholder="your@email.com"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                :class="{ 'border-red-500': formErrors.email }"
              />
              <small v-if="formErrors.email" class="text-red-500 text-xs mt-1 block">
                {{ formErrors.email }}
              </small>
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <InputText 
                v-model.trim="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                :class="{ 'border-red-500': formErrors.password }"
              />
              <button 
                @click.prevent="showLoginPassword = !showLoginPassword"
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                :aria-label="showLoginPassword ? 'Hide password' : 'Show password'"
              >
                <i :class="showLoginPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
              </button>
              <small v-if="formErrors.password" class="text-red-500 text-xs mt-1 block">
                {{ formErrors.password }}
              </small>
            </div>
          </div>

          <!-- Remember & Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox 
                v-model="loginForm.remember" 
                binary 
                inputId="remember"
                class="mr-2"
              />
              <label for="remember" class="text-sm text-gray-600 cursor-pointer">Remember me</label>
            </div>
            <router-link 
              to="/forgot-password"
              class="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
            >
              Forgot password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <Button 
            type="submit"
            :loading="loginLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            <template #default>
              <span v-if="!loginLoading">Sign In</span>
              <span v-else class="flex items-center justify-center">
                <i class="pi pi-spin pi-spinner mr-2"></i>
                <span>Signing in...</span>
              </span>
            </template>
          </Button>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="grid grid-cols-2 gap-3">
            <Button 
              @click="socialLogin('google')"
              class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              outlined
            >
              <i class="pi pi-google text-red-500"></i>
              <span>Google</span>
            </Button>
            <Button 
              @click="socialLogin('facebook')"
              class="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              outlined
            >
              <i class="pi pi-facebook text-blue-600"></i>
              <span>Facebook</span>
            </Button>
          </div>
        </form>

        <!-- Registration Link -->
        <div class="mt-8 text-center text-sm text-gray-600">
          Don't have an account?
          <router-link 
            to="/register"
            class="text-indigo-600 hover:text-indigo-500 font-medium ml-1 transition-colors"
          >
            Sign up
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

// Router and Toast
const router = useRouter()
const toast = useToast()

// Form state
const showLoginPassword = ref(false)
const loginLoading = ref(false)

// Form data
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// Form errors
const formErrors = reactive({
  email: '',
  password: ''
})

// Form validation
const validateForm = () => {
  let valid = true
  
  // Reset errors
  formErrors.email = ''
  formErrors.password = ''
  
  // Email validation
  if (!loginForm.email) {
    formErrors.email = 'Email is required'
    valid = false
  } else if (!/^\S+@\S+\.\S+$/.test(loginForm.email)) {
    formErrors.email = 'Please enter a valid email'
    valid = false
  }
  
  // Password validation
  if (!loginForm.password) {
    formErrors.password = 'Password is required'
    valid = false
  } else if (loginForm.password.length < 6) {
    formErrors.password = 'Password must be at least 6 characters'
    valid = false
  }
  
  return valid
}

// Login handler
const handleLogin = async () => {
  if (!validateForm()) return
  
  loginLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock successful response
    const response = { 
      success: true, 
      user: { 
        name: 'Te Vin',
        email: loginForm.email
      } 
    }

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Welcome back!',
        detail: `Hi ${response.user.name}, you've successfully logged in.`,
        life: 4000,
        group: 'br'
      })
      
      // Redirect to home after login
      setTimeout(() => router.push('/dashboard'), 500)
      
      // Store login state if remember me is checked
      if (loginForm.remember) {
        localStorage.setItem('authToken', 'mock-token')
      } else {
        sessionStorage.setItem('authToken', 'mock-token')
      }
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: 'Invalid email or password',
      life: 5000,
      group: 'br'
    })
  } finally {
    loginLoading.value = false
  }
}

// Social login handler
const socialLogin = (provider: string) => {
  toast.add({
    severity: 'info',
    summary: 'Social Login',
    detail: `Attempting ${provider} login...`,
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
}

:deep(.p-inputtext:enabled:hover) {
  border-color: #818cf8 !important;
}

:deep(.p-inputtext:enabled:focus) {
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.2) !important;
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