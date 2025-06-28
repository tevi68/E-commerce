<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      <!-- Background Pattern -->
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            About <span class="text-yellow-300">ShopHub</span>
          </h1>
          <p class="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
            We're more than just an ecommerce platform. We're your trusted partner in discovering quality products, 
            exceptional service, and unbeatable value since 2015.
          </p>
          <div class="flex flex-wrap justify-center gap-8 text-blue-100">
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300">10M+</div>
              <div class="text-sm">Happy Customers</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300">500K+</div>
              <div class="text-sm">Products</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300">50+</div>
              <div class="text-sm">Countries</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-300">99.9%</div>
              <div class="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Story Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1">
          <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full translate-y-12 -translate-x-12"></div>
            <div class="relative">
              <i class="pi pi-heart text-4xl text-yellow-300 mb-6 block"></i>
              <h2 class="text-3xl font-bold mb-6">Our Story</h2>
              <p class="text-blue-100 leading-relaxed mb-6">
                Founded in 2015 by a team of passionate entrepreneurs, ShopHub began as a small startup with a big vision: 
                to revolutionize online shopping by putting customers first.
              </p>
              <p class="text-blue-100 leading-relaxed mb-6">
                What started in a garage has grown into a global platform serving millions of customers worldwide. 
                Our journey has been driven by innovation, quality, and an unwavering commitment to excellence.
              </p>
              <Button 
                label="Read Full Story" 
                icon="pi pi-arrow-right"
                class="bg-white text-blue-600 border-0 hover:bg-blue-50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
        
        <div class="order-1 lg:order-2">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <i class="pi pi-check text-white text-xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">Quality First</h3>
                <p class="text-gray-600 text-sm">Every product is carefully curated and tested</p>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <i class="pi pi-shipping-fast text-white text-xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">Fast Delivery</h3>
                <p class="text-gray-600 text-sm">Express shipping to your doorstep</p>
              </div>
            </div>
            <div class="space-y-4 mt-8">
              <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <i class="pi pi-users text-white text-xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p class="text-gray-600 text-sm">Always here when you need us</p>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300">
                <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <i class="pi pi-shield text-white text-xl"></i>
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">Secure</h3>
                <p class="text-gray-600 text-sm">Your data and payments are protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mission & Vision -->
    <div class="bg-white/60 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Mission & Vision
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving the future of ecommerce with innovation, sustainability, and customer-centric solutions.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card class="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 h-full">
            <template #header>
              <div class="p-8 pb-0">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <i class="pi pi-flag text-white text-2xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800">Our Mission</h3>
              </div>
            </template>
            <template #content>
              <div class="px-8 pb-8">
                <p class="text-gray-600 leading-relaxed mb-6">
                  To democratize commerce by providing businesses and consumers with innovative, 
                  accessible, and sustainable ecommerce solutions that create meaningful connections 
                  and drive mutual success.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-check-circle text-green-500 mr-3"></i>
                    Empower small businesses globally
                  </li>
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-check-circle text-green-500 mr-3"></i>
                    Provide exceptional customer experiences
                  </li>
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-check-circle text-green-500 mr-3"></i>
                    Foster sustainable commerce practices
                  </li>
                </ul>
              </div>
            </template>
          </Card>

          <Card class="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 h-full">
            <template #header>
              <div class="p-8 pb-0">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <i class="pi pi-eye text-white text-2xl"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-800">Our Vision</h3>
              </div>
            </template>
            <template #content>
              <div class="px-8 pb-8">
                <p class="text-gray-600 leading-relaxed mb-6">
                  To become the world's most trusted and innovative ecommerce ecosystem, 
                  where technology meets humanity to create seamless, sustainable, 
                  and socially responsible shopping experiences.
                </p>
                <ul class="space-y-3">
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-star text-yellow-500 mr-3"></i>
                    Global market leadership
                  </li>
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-star text-yellow-500 mr-3"></i>
                    Technology-driven innovation
                  </li>
                  <li class="flex items-center text-gray-700">
                    <i class="pi pi-star text-yellow-500 mr-3"></i>
                    Sustainable business practices
                  </li>
                </ul>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Meet Our Team
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          The passionate individuals behind ShopHub's success, dedicated to delivering excellence every day.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="member in teamMembers" :key="member.id" 
             class="text-center group">
          <Card class="shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
            <template #header>
              <div class="p-6 pb-0">
                <div class="relative mx-auto w-24 h-24 mb-4">
                  <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                    <i :class="member.avatar" class="text-white text-3xl"></i>
                  </div>
                  <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <i class="pi pi-check text-white text-xs"></i>
                  </div>
                </div>
              </div>
            </template>
            <template #content>
              <div class="px-6 pb-6 text-center">
                <h3 class="text-xl font-bold text-gray-800 mb-1">{{ member.name }}</h3>
                <p class="text-blue-600 font-medium mb-3">{{ member.position }}</p>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ member.description }}</p>
                <div class="flex justify-center space-x-2">
                  <Button 
                    icon="pi pi-linkedin" 
                    class="w-8 h-8 text-xs rounded-full bg-blue-600 border-0 hover:bg-blue-700"
                  />
                  <Button 
                    icon="pi pi-twitter" 
                    class="w-8 h-8 text-xs rounded-full bg-sky-500 border-0 hover:bg-sky-600"
                  />
                  <Button 
                    icon="pi pi-envelope" 
                    class="w-8 h-8 text-xs rounded-full bg-gray-600 border-0 hover:bg-gray-700"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Our Core Values
          </h2>
          <p class="text-xl text-purple-200 max-w-3xl mx-auto">
            The principles that guide everything we do and shape our company culture.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="value in values" :key="value.id" 
               class="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i :class="value.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold mb-4">{{ value.title }}</h3>
            <p class="text-purple-200 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Our Journey
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Key milestones that shaped ShopHub into the platform it is today.
        </p>
      </div>

      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        
        <div class="space-y-12">
          <div v-for="(milestone, index) in timeline" :key="milestone.id" 
               :class="['flex items-center', index % 2 === 0 ? 'flex-row' : 'flex-row-reverse']">
            <div :class="['w-1/2 pr-8', index % 2 === 0 ? 'text-right' : 'text-left pl-8 pr-0']">
              <Card class="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <template #content>
                  <div class="p-6">
                    <div class="text-blue-600 font-bold text-sm mb-2">{{ milestone.year }}</div>
                    <h3 class="text-xl font-bold text-gray-800 mb-3">{{ milestone.title }}</h3>
                    <p class="text-gray-600 leading-relaxed">{{ milestone.description }}</p>
                  </div>
                </template>
              </Card>
            </div>
            
            <!-- Timeline Dot -->
            <div class="relative z-10 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg"></div>
            
            <div class="w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Join Our Journey?
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Whether you're a customer, partner, or future team member, 
          we'd love to have you be part of the ShopHub story.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            label="Start Shopping" 
            icon="pi pi-shopping-cart"
            class="h-14 px-8 bg-white text-blue-600 border-0 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          />
          <Button 
            label="Join Our Team" 
            icon="pi pi-users"
            outlined
            class="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
          />
          <Button 
            label="Become a Partner" 
            icon="pi pi-handshake"
            outlined
            class="h-14 px-8 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'

const teamMembers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO & Founder',
    description: 'Visionary leader with 15+ years in ecommerce innovation.',
    avatar: 'pi pi-user'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CTO',
    description: 'Tech expert driving our platform\'s cutting-edge capabilities.',
    avatar: 'pi pi-cog'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Head of Design',
    description: 'Creative force behind our beautiful user experiences.',
    avatar: 'pi pi-palette'
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'VP of Operations',
    description: 'Operations maestro ensuring seamless customer service.',
    avatar: 'pi pi-briefcase'
  }
])

const values = ref([
  {
    id: 1,
    icon: 'pi pi-heart',
    title: 'Customer First',
    description: 'Every decision we make is guided by what\'s best for our customers. Their success is our success.'
  },
  {
    id: 2,
    icon: 'pi pi-lightbulb',
    title: 'Innovation',
    description: 'We constantly push boundaries, embrace new technologies, and challenge the status quo.'
  },
  {
    id: 3,
    icon: 'pi pi-shield',
    title: 'Integrity',
    description: 'We conduct business with honesty, transparency, and ethical practices in everything we do.'
  },
  {
    id: 4,
    icon: 'pi pi-users',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and building strong partnerships with our community.'
  },
  {
    id: 5,
    icon: 'pi pi-star',
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our business, from products to customer service.'
  },
  {
    id: 6,
    icon: 'pi pi-globe',
    title: 'Sustainability',
    description: 'We\'re committed to sustainable practices that benefit our planet and future generations.'
  }
])

const timeline = ref([
  {
    id: 1,
    year: '2015',
    title: 'The Beginning',
    description: 'ShopHub was founded in a small garage with a big dream to revolutionize online shopping.'
  },
  {
    id: 2,
    year: '2017',
    title: 'First Million',
    description: 'Reached our first million customers and expanded our product catalog to over 10,000 items.'
  },
  {
    id: 3,
    year: '2019',
    title: 'Global Expansion',
    description: 'Launched international shipping and opened offices in 5 countries across 3 continents.'
  },
  {
    id: 4,
    year: '2021',
    title: 'Tech Innovation',
    description: 'Introduced AI-powered recommendations and launched our mobile app with AR features.'
  },
  {
    id: 5,
    year: '2023',
    title: 'Sustainability Focus',
    description: 'Became carbon neutral and launched our sustainable packaging initiative.'
  },
  {
    id: 6,
    year: '2025',
    title: 'Future Forward',
    description: 'Continuing to innovate with new technologies and expanding our global reach.'
  }
])
</script>