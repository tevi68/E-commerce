<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <Transition name="fade" mode="out-in">
      <i
        v-if="isDark"
        key="sun"
        class="pi pi-sun text-yellow-400 text-lg"
      />
      <i
        v-else
        key="moon"
        class="pi pi-moon text-gray-700 dark:text-gray-300 text-lg"
      />
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

function setTheme(dark: boolean) {
  isDark.value = dark;
  const html = document.documentElement;
  html.classList.toggle('dark', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleTheme() {
  setTheme(!isDark.value);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Priority: localStorage > OS preference
  if (savedTheme !== null) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>