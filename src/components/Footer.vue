<template>
    <footer class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">

        <!-- Main Footer Content -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            <!-- Brand Section -->
            <div class="lg:col-span-2 space-y-6">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <i class="pi pi-shopping-bag text-white text-xl"></i>
                </div>
                <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ShopHub
                </span>
            </div>
            <p class="text-slate-300 text-lg leading-relaxed max-w-md">
                Your premier destination for quality products, exceptional service, and unbeatable prices. Experience shopping redefined.
            </p>
            
            <!-- Social Media -->
            <div class="space-y-4">
                <h4 class="text-lg font-semibold text-white">Follow Us</h4>
                <div class="flex space-x-4">
                <Button 
                    icon="pi pi-facebook" 
                    class="w-12 h-12 rounded-full bg-slate-800/50 border-slate-700 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300"
                    outlined
                />
                <Button 
                    icon="pi pi-twitter" 
                    class="w-12 h-12 rounded-full bg-slate-800/50 border-slate-700 hover:bg-sky-500 hover:border-sky-400 transition-all duration-300"
                    outlined
                />
                <Button 
                    icon="pi pi-instagram" 
                    class="w-12 h-12 rounded-full bg-slate-800/50 border-slate-700 hover:bg-pink-600 hover:border-pink-500 transition-all duration-300"
                    outlined
                />
                <Button 
                    icon="pi pi-linkedin" 
                    class="w-12 h-12 rounded-full bg-slate-800/50 border-slate-700 hover:bg-blue-700 hover:border-blue-600 transition-all duration-300"
                    outlined
                />
                </div>
            </div>
            </div>

            <!-- Quick Links -->
            <div class="space-y-6">
            <h4 class="text-lg font-semibold text-white border-b border-slate-700 pb-2">Quick Links</h4>
            <ul class="space-y-3">
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Home
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Shop
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Categories
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                About Us
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Contact
                </a></li>
            </ul>
            </div>

            <!-- Customer Service -->
            <div class="space-y-6">
            <h4 class="text-lg font-semibold text-white border-b border-slate-700 pb-2">Customer Service</h4>
            <ul class="space-y-3">
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Help Center
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Returns & Exchanges
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Shipping Info
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Size Guide
                </a></li>
                <li><a href="#" class="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <i class="pi pi-angle-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                Track Order
                </a></li>
            </ul>
            </div>

            <!-- Contact Info -->
            <div class="space-y-6">
            <h4 class="text-lg font-semibold text-white border-b border-slate-700 pb-2">Get in Touch</h4>
            <div class="space-y-4">
                <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mt-0.5">
                    <i class="pi pi-map-marker text-blue-400"></i>
                </div>
                <div>
                    <p class="text-slate-300 text-sm leading-relaxed">
                    123 Commerce Street<br>
                    Shopping District, NY 10001
                    </p>
                </div>
                </div>
                
                <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <i class="pi pi-phone text-green-400"></i>
                </div>
                <p class="text-slate-300">+1 (555) 123-4567</p>
                </div>
                
                <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <i class="pi pi-envelope text-purple-400"></i>
                </div>
                <p class="text-slate-300">support@shophub.com</p>
                </div>
            </div>

            <!-- Trust Badges -->
            <div class="pt-4">
                <h5 class="text-sm font-medium text-slate-400 mb-3">Secure Shopping</h5>
                <div class="flex space-x-2">
                <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-2 flex items-center justify-center">
                    <i class="pi pi-shield text-green-400"></i>
                </div>
                <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-2 flex items-center justify-center">
                    <i class="pi pi-lock text-blue-400"></i>
                </div>
                <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-2 flex items-center justify-center">
                    <i class="pi pi-verified text-purple-400"></i>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <!-- Bottom Bar -->
        <div class="relative border-t border-slate-700/50 bg-slate-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            <!-- Copyright -->
            <div class="text-center lg:text-left">
                <p class="text-slate-400 text-sm">
                © 2025 ShopHub. All rights reserved. | 
                <a href="#" class="hover:text-blue-400 transition-colors">Privacy Policy</a> | 
                <a href="#" class="hover:text-blue-400 transition-colors">Terms of Service</a>
                </p>
            </div>

            <!-- Payment Methods -->
            <div class="flex items-center space-x-4">
                <span class="text-slate-400 text-sm hidden sm:inline">We Accept:</span>
                <div class="flex space-x-2">
                <div class="w-10 h-6 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
                    <i class="pi pi-credit-card text-slate-400 text-xs"></i>
                </div>
                <div class="w-10 h-6 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
                    <span class="text-slate-400 text-xs font-bold">PP</span>
                </div>
                <div class="w-10 h-6 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
                    <span class="text-slate-400 text-xs font-bold">AP</span>
                </div>
                <div class="w-10 h-6 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
                    <span class="text-slate-400 text-xs font-bold">GP</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <!-- Back to Top Button -->
        <Button 
        icon="pi pi-chevron-up" 
        class="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50"
        @click="scrollToTop"
        />
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const email = ref('')

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>