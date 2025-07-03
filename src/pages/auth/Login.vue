<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="(bubble, index) in bubbles"
        :key="index"
        class="absolute rounded-full blur-xl opacity-20 animate-float"
        :class="bubble.color"
        :style="{
          width: `${bubble.size}px`,
          height: `${bubble.size}px`,
          top: `${bubble.top}%`,
          left: `${bubble.left}%`,
          animationDuration: `${bubble.duration}s`,
          animationDelay: `${bubble.delay}s`
        }"
      ></div>
    </div>

    <!-- Main card container -->
    <div class="relative w-full max-w-md">
      <!-- Glass card with hover effect -->
      <div class="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl">
        <!-- Logo with animation -->
        <div class="text-center mb-8 transform transition-transform duration-500 hover:scale-105">
          <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg animate-pulse">
            <i class="pi pi-shopping-cart text-white text-2xl"></i>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2 animate-fade-in">ShopLux</h1>
          <p class="text-white/70 text-sm animate-fade-in">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6 animate-fade-in-up">
          <!-- Email Field -->
          <div class="space-y-2">
            <label class="block text-white/90 text-sm font-medium mb-1">Email Address</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
                <i class="pi pi-envelope"></i>
              </span>
              <InputText 
                v-model.trim="loginForm.email"
                type="email"
                placeholder="Enter your email"
                class="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                :class="{ 'p-invalid': formErrors.email }"
              />
              <small v-if="formErrors.email" class="p-error text-pink-300 text-xs mt-1 block">
                {{ formErrors.email }}
              </small>
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label class="block text-white/90 text-sm font-medium mb-1">Password</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
                <i class="pi pi-lock"></i>
              </span>
              <InputText 
                v-model.trim="loginForm.password"
                :type="showLoginPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                :class="{ 'p-invalid': formErrors.password }"
              />
              <button 
                @click.prevent="showLoginPassword = !showLoginPassword"
                type="button"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                :aria-label="showLoginPassword ? 'Hide password' : 'Show password'"
              >
                <i :class="showLoginPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
              </button>
              <small v-if="formErrors.password" class="p-error text-pink-300 text-xs mt-1 block">
                {{ formErrors.password }}
              </small>
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox 
                v-model="loginForm.remember" 
                binary 
                inputId="remember"
                class="mr-2"
              />
              <label for="remember" class="text-white/70 text-sm cursor-pointer select-none">Remember me</label>
            </div>
            <router-link 
              to="/forgot-password"
              class="text-pink-300 hover:text-pink-200 text-sm font-medium transition-colors"
            >
              Forgot password?
            </router-link>
          </div>

          <!-- Submit Button -->
          <Button 
            type="submit"
            :loading="loginLoading"
            :disabled="loginLoading"
            class="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 border-0 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <template #default>
              <span>Sign In to ShopLux</span>
            </template>
            <template #loading>
              <i class="pi pi-spin pi-spinner mr-2"></i>
              <span>Signing in...</span>
            </template>
          </Button>

          <!-- Social login divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/20"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-transparent text-white/60">Or continue with</span>
            </div>
          </div>

          <!-- Social login buttons -->
          <div class="grid grid-cols-2 gap-3">
            <Button 
              @click="socialLogin('google')"
              class="bg-white/10 hover:bg-white/20 border border-white/20 py-2 rounded-xl transition-all duration-300 flex items-center justify-center"
              outlined
            >
              <i class="pi pi-google text-white mr-2"></i>
              <span class="text-white text-sm">Google</span>
            </Button>
            <Button 
              @click="socialLogin('facebook')"
              class="bg-white/10 hover:bg-white/20 border border-white/20 py-2 rounded-xl transition-all duration-300 flex items-center justify-center"
              outlined
            >
              <i class="pi pi-facebook text-white mr-2"></i>
              <span class="text-white text-sm">Facebook</span>
            </Button>
          </div>
        </form>

        <!-- Registration prompt -->
        <div class="text-center mt-8 animate-fade-in">
          <p class="text-white/60 text-sm">
            Don't have an account?
            <router-link 
              to="/register"
              class="text-pink-300 hover:text-pink-200 font-medium ml-1 transition-colors"
            >
              Sign up
            </router-link>
          </p>
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

// Background bubbles
const bubbles = ref([
  { size: 120, top: 10, left: 10, color: 'bg-pink-400', duration: 15, delay: 0 },
  { size: 80, top: 80, left: 80, color: 'bg-violet-400', duration: 20, delay: 2 },
  { size: 60, top: 60, left: 20, color: 'bg-white/40', duration: 18, delay: 1 },
  { size: 100, top: 20, left: 70, color: 'bg-pink-300', duration: 25, delay: 3 }
])

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
      setTimeout(() => router.push('/'), 500)
      
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
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float linear infinite;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

/* PrimeVue component overrides */
:deep(.p-inputtext) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  transition: all 0.3s ease !important;
}

:deep(.p-inputtext:enabled:hover) {
  border-color: rgba(255, 255, 255, 0.3) !important;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: rgb(244 114 182) !important;
  box-shadow: 0 0 0 0.2rem rgba(244, 114, 182, 0.2) !important;
  background: rgba(255, 255, 255, 0.15) !important;
}

:deep(.p-inputtext::placeholder) {
  color: rgba(255, 255, 255, 0.5) !important;
}

:deep(.p-checkbox .p-checkbox-box) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  transition: all 0.3s ease !important;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: linear-gradient(135deg, rgb(236 72 153), rgb(139 92 246)) !important;
  border-color: rgb(236 72 153) !important;
}

:deep(.p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box.p-highlight:hover) {
  background: linear-gradient(135deg, rgb(219 39 119), rgb(124 58 237)) !important;
  border-color: rgb(219 39 119) !important;
}

:deep(.p-button) {
  transition: all 0.3s ease !important;
}

:deep(.p-button:disabled) {
  opacity: 0.7 !important;
  transform: none !important;
}
</style>