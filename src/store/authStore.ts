import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { name: string, email: string }
    }),
    actions: {
        logout() {
        // Perform logout logic
        this.user = null
        }
    }
})