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
          <p class="text-white/70 text-sm">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <div class="space-y-6">
          <div class="space-y-4">
            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Email Address</label>
              <div class="relative">
                <InputText 
                  v-model="loginForm.email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
                
              </div>
            </div>

            <div class="relative">
              <label class="block text-white/90 text-sm font-medium mb-2">Password</label>
              <div class="relative">
                <InputText 
                  v-model="loginForm.password"
                  :type="showLoginPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                />
                
                <button 
                  @click="showLoginPassword = !showLoginPassword"
                  type="button"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  <i :class="showLoginPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox 
                v-model="loginForm.remember" 
                binary 
                class="mr-2"
              />
              <label class="text-white/70 text-sm cursor-pointer">Remember me</label>
            </div>
            <a href="#" class="text-pink-300 hover:text-pink-200 text-sm font-medium transition-colors">
              Forgot password?
            </a>
          </div>

          <Button 
            @click="handleLogin"
            :loading="loginLoading"
            class="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 border-0 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span v-if="!loginLoading">Sign In to ShopLux</span>
          </Button>

          <!-- Social login -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/20"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-transparent text-white/60">Or continue with</span>
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

<script setup lang="ts">
import { ref, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import router from '../../routes'
import { useToast } from 'primevue/usetoast'

// Reactive state
const toast = useToast()
const showLoginPassword = ref(false)
const loginLoading = ref(false)

// Form data
const loginForm = reactive({
  email: '',
  password: '',
  remember: false
})

// Methods
const handleLogin = async () => {
  loginLoading.value = true;

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response - replace with actual API call
    const response = { 
      success: true, 
      user: { 
        name: 'Te Vin',
        email: loginForm.email
      } 
    };

    if (response.success) {
      toast.add({
        severity: 'success',
        summary: 'Welcome back!',
        detail: `Hi ${response.user.name}, you've successfully logged in.`,
        life: 4000,
        group: 'br'
      });
      
      // Redirect after slight delay
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: error.message || 'Invalid email or password',
      life: 5000,
      group: 'br'
    });
  } finally {
    loginLoading.value = false;
  }
};
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