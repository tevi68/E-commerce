import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { name: string, email: string },
        token: null as string | null
    }),
    actions: {
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('authToken')
        }
    }
})