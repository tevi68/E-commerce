<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Main container -->
    <div class="relative w-full max-w-md">
      <!-- Glass morphism card -->
      <div class="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:bg-white/15">
        <!-- Logo section -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <i class="pi pi-shopping-cart text-white text-2xl"></i>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">ShopLux</h1>
          <p class="text-white/70 text-sm">Create your account</p>
        </div>

        <!-- Register Form -->
        <div class="space-y-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-white/90 text-sm font-medium mb-2">First Name</label>
                <InputText 
                  v-model="registerForm.firstName"
                  placeholder="John"
                  class="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-white/90 text-sm font-medium mb-2">Last Name</label>
                <InputText 
                  v-model="registerForm.lastName"
                  placeholder="Doe"
                  class="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Email Address</label>
              <div class="relative">
                <InputText 
                  v-model="registerForm.email"
                  type="email"
                  placeholder="john@example.com"
                  class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
                
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Phone Number</label>
              <div class="relative">
                <InputText 
                  v-model="registerForm.phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
               
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Password</label>
              <div class="relative">
                <InputText 
                  v-model="registerForm.password"
                  :type="showRegisterPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  class="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
               
                <button 
                  @click="showRegisterPassword = !showRegisterPassword"
                  type="button"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <i :class="showRegisterPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Confirm Password</label>
              <div class="relative">
                <InputText 
                  v-model="registerForm.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  class="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
               
                <button 
                  @click="showConfirmPassword = !showConfirmPassword"
                  type="button"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Terms and conditions -->
          <div class="flex items-start">
            <Checkbox 
              v-model="registerForm.terms" 
              binary 
              class="mr-3 mt-1"
            />
            <label class="text-white/70 text-sm leading-relaxed cursor-pointer">
              I agree to the 
              <a href="#" class="text-pink-300 hover:text-pink-200 font-medium">Terms of Service</a> 
              and 
              <a href="#" class="text-pink-300 hover:text-pink-200 font-medium">Privacy Policy</a>
            </label>
          </div>

          <!-- Marketing emails -->
          <div class="flex items-center">
            <Checkbox 
              v-model="registerForm.marketing" 
              binary 
              class="mr-3"
            />
            <label class="text-white/70 text-sm cursor-pointer">
              Send me promotional emails and updates
            </label>
          </div>

          <Button 
            @click="handleRegister"
            :loading="registerLoading"
            :disabled="!registerForm.terms"
            class="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 border-0 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!registerLoading">Create ShopLux Account</span>
          </Button>

          <!-- Social register -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/20"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-transparent text-white/60">Or sign up with</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <Button 
              class="bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl transition-all duration-300"
              outlined
            >
              <i class="pi pi-google text-white mr-2"></i>
              <span class="text-white text-sm">Google</span>
            </Button>
            <Button 
              class="bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-xl transition-all duration-300"
              outlined
            >
              <i class="pi pi-facebook text-white mr-2"></i>
              <span class="text-white text-sm">Facebook</span>
            </Button>
          </div>
        </div>

        <!-- Footer text -->
        <div class="text-center mt-8">
          <p class="text-white/60 text-sm">
            Already have an account?
            <router-link 
              to="/login"
              class="text-pink-300 hover:text-pink-200 font-medium ml-1 transition-colors"
            >
              Sign in
            </router-link>
          </p>
        </div>
      </div>

      <!-- Additional decorative elements -->
      <div class="absolute -z-10 top-0 left-0 w-full h-full">
        <div class="absolute top-10 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div class="absolute top-20 right-20 w-1 h-1 bg-violet-400 rounded-full animate-ping"></div>
        <div class="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
        <div class="absolute bottom-10 right-10 w-1 h-1 bg-pink-300 rounded-full animate-ping"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import router from '../../routes'

// Reactive state
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)
const registerLoading = ref(false)

// Form data
const registerForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  terms: false,
  marketing: false
})

// Methods
const handleRegister = async () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Passwords do not match!')
    return
  }
  
  registerLoading.value = true
  router.push('/')
  
  // Simulate API call
  setTimeout(() => {
    console.log('Register attempt:', registerForm)
    // Add your register API call here
    registerLoading.value = false
  }, 2000)
}
</script>

<style scoped>
/* Custom styles for PrimeVue components */
:deep(.p-inputtext) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
}

:deep(.p-inputtext:focus) {
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
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: linear-gradient(135deg, rgb(236 72 153), rgb(139 92 246)) !important;
  border-color: rgb(236 72 153) !important;
}

:deep(.p-button) {
  transition: all 0.3s ease !important;
}
</style>