<template>
  <div class="relative">
    <button
      @click="toggle"
      class="flex items-center gap-2 focus:outline-none group"
      aria-haspopup="true"
      :aria-expanded="open"
    >
      <div class="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
        {{ initials }}
      </div>
      <span class="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
        {{ name }}
      </span>
      <i class="pi pi-chevron-down text-xs text-gray-400 dark:text-gray-500 group-hover:rotate-180 transition" />
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="open"
        v-click-outside="close"
        class="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg z-50 overflow-hidden"
      >
        <div class="px-4 py-3 border-b dark:border-gray-700">
          <p class="text-sm font-medium text-gray-800 dark:text-white">{{ name }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ email }}</p>
        </div>
        <router-link
          to="/dashboard/profile"
          class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
          @click="close"
        >
          <i class="pi pi-user mr-2" /> Profile
        </router-link>
        <router-link
          to="/dashboard/settings"
          class="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
          @click="close"
        >
          <i class="pi pi-cog mr-2" /> Settings
        </router-link>
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
        >
          <i class="pi pi-sign-out mr-2" /> Sign Out
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/authStore'

const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const router = useRouter()
const authStore = useAuthStore()

// Replace these with real user info from store
const name = 'Admin User'
const email = 'admin@example.com'
const initials = 'AU'

const logout = () => {
  authStore.logout()
  router.push('/login')
  close()
}

// Click-outside directive
// const vClickOutside = {
//   beforeMount(el: HTMLElement, binding: any) {
//     el.clickOutsideEvent = (event: MouseEvent) => {
//       if (!(el === event.target || el.contains(event.target as Node))) {
//         binding.value()
//       }
//     }
//     document.addEventListener('click', el.clickOutsideEvent)
//   },
//   unmounted(el: HTMLElement) {
//     document.removeEventListener('click', el.clickOutsideEvent)
//   }
// }
</script>
