import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        sidebarVisible: window.innerWidth >= 1024
    }),
    actions: {
        toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible
        }
    }
})