<template>
    <!-- Weekly Deals Section -->
    <div class="mb-12 bg-white py-5 px-4 sm:px-6 w-full lg:px-10 xl:px-36">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Weekly Deals</h2>
        <div class="text-sm text-gray-400 space-x-4">
          <span class="cursor-pointer hover:underline" @click="prevDeal">&lt; Prev</span>
          <span class="cursor-pointer hover:underline" @click="nextDeal">Next &gt;</span>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="deal in visibleDeals" :key="deal.id" class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 relative">
          <div class="flex-shrink-0 flex items-center justify-center w-40 h-40 bg-gray-50 rounded relative">
            <img @click="viewDetail(deal.id)" :src="getImageUrl(deal.images && deal.images[0])" :alt="deal.title" class="object-contain h-36 w-36 cursor-pointer" />
              <span v-if="deal.discount" class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{{ deal.discount }}%
              </span>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="flex items-center gap-2 mb-1">
              <span v-for="star in 5" :key="star" class="text-yellow-400 text-xs">
                <i :class="star <= Math.round(deal.rating) ? 'pi pi-star-fill' : 'pi pi-star'"></i>
              </span>
              <span class="text-xs text-gray-500 ml-2">{{ deal.rating.toFixed(1) }}</span>
            </div>
            <div class="font-semibold text-gray-900 mb-1 text-base">{{ deal.title }}</div>
            <div class="text-xs text-gray-600 mb-1">{{ deal.description }}</div>
            <ul class="text-xs text-gray-500 mb-1 list-disc pl-4">
              <li v-for="feature in deal.features" :key="feature">{{ feature }}</li>
            </ul>
            <div class="flex items-baseline gap-2 mb-1">
              <span class="text-lg font-bold text-green-700">{{ currencyStore.getDisplayPrice(deal.price) }}</span>
              <span class="text-sm text-gray-400 line-through">${{ deal.originalPrice }}</span>
            </div>
            <div class="text-xs text-gray-500 mb-2">
              <span class="font-medium">ចំនួននៅសល់:</span> {{ deal.stock }}
            </div>
            <div class="flex gap-2 mb-2">
              <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-xs" :disabled="deal.stock === 0">ADD TO CART</button>
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                <i class="pi pi-heart"></i>
              </button>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-xs" @click="viewDetail(deal.id)">View</button>
            </div>
            <div class="flex gap-2 mt-auto">
              <div class="bg-gray-900 text-white text-xs px-2 py-1 rounded text-center">
                {{ (deal.timer?.days ?? deal.timer_days ?? 0) }}<br/><span class="font-normal">DAYS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-2 py-1 rounded text-center">
                {{ (deal.timer?.hours ?? deal.timer_hours ?? 0) }}<br/><span class="font-normal">HOURS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-2 py-1 rounded text-center">
                {{ (deal.timer?.minutes ?? deal.timer_minutes ?? 0) }}<br/><span class="font-normal">MINS</span>
              </div>
              <div class="bg-gray-900 text-white text-xs px-2 py-1 rounded text-center">
                {{ (deal.timer?.seconds ?? deal.timer_seconds ?? 0) }}<br/><span class="font-normal">SECS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WeeklyDetail :visible="showDetailModal" :deal="selectedDeal" @close="showDetailModal = false" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCurrencyStore } from '../../../store/currencyStore'
import { fetchWeeklyDeals } from '../../../store/weeklyDealsApi'
import WeeklyDetail from './WeeklyDetail.vue'
const currencyStore = useCurrencyStore();

const weeklyDeals = ref<any[]>([])
const showDetailModal = ref(false)
const selectedDeal = ref<any | null>(null)

// Fetch data from API
onMounted(async () => {
  weeklyDeals.value = await fetchWeeklyDeals()
  startDealTimers()
})

// Weekly Deals navigation state
const dealsPerPage = 2
const dealStartIndex = ref(0)
const visibleDeals = computed(() => weeklyDeals.value.slice(dealStartIndex.value, dealStartIndex.value + dealsPerPage))

function prevDeal() {
  if (dealStartIndex.value - dealsPerPage >= 0) {
    dealStartIndex.value -= dealsPerPage
  } else {
    // Loop to end
    dealStartIndex.value = Math.max(weeklyDeals.value.length - dealsPerPage, 0)
  }
}
function nextDeal() {
  if (dealStartIndex.value + dealsPerPage < weeklyDeals.value.length) {
    dealStartIndex.value += dealsPerPage
  } else {
    // Loop to start
    dealStartIndex.value = 0
  }
}

// Timer logic (optional: for live countdown)
function startDealTimers() {
  setInterval(() => {
    weeklyDeals.value.forEach(deal => {
      // Support both deal.timer and root-level timer fields
      let days = deal.timer?.days ?? deal.timer_days ?? 0
      let hours = deal.timer?.hours ?? deal.timer_hours ?? 0
      let minutes = deal.timer?.minutes ?? deal.timer_minutes ?? 0
      let seconds = deal.timer?.seconds ?? deal.timer_seconds ?? 0
      if (seconds > 0) {
        seconds--
      } else {
        seconds = 59
        if (minutes > 0) {
          minutes--
        } else {
          minutes = 59
          if (hours > 0) {
            hours--
          } else {
            hours = 23
            if (days > 0) {
              days--
            }
          }
        }
      }
      // Update deal
      if (deal.timer) {
        deal.timer.days = days
        deal.timer.hours = hours
        deal.timer.minutes = minutes
        deal.timer.seconds = seconds
      } else {
        deal.timer_days = days
        deal.timer_hours = hours
        deal.timer_minutes = minutes
        deal.timer_seconds = seconds
      }
    })
  }, 1000)
}

function getImageUrl(image: string) {
  if (!image) return 'https://via.placeholder.com/80?text=No+Image'
  if (image.startsWith('http') || image.startsWith('data:') || image.startsWith('blob:')) return image
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  return `${apiBaseUrl}${image}`
}

function viewDetail(id: string | number) {
  const deal = weeklyDeals.value.find((d: any) => String(d.id) === String(id))
  if (deal) {
    selectedDeal.value = deal
    showDetailModal.value = true
  }
}
</script>