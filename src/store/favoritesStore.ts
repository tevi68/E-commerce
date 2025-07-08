import { ref, watch } from 'vue'

type ProductID = number

const favorites = ref<ProductID[]>([])

// Initialize favorites from localStorage
function initializeFavorites() {
    const stored = localStorage.getItem('favorites')
    if (stored) {
        try {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
                favorites.value = parsed
            } else {
                console.warn('Invalid favorites data in localStorage, clearing...')
                localStorage.removeItem('favorites')
            }
        } catch (error) {
            console.error('Failed to parse favorites from localStorage:', error)
            localStorage.removeItem('favorites')
        }
    }
}

// Load favorites when module is imported
initializeFavorites()

// Save to localStorage with debouncing
let saveTimeout: ReturnType<typeof setTimeout> | null = null
watch(favorites, (newValue) => {
    if (saveTimeout) {
        clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
        localStorage.setItem('favorites', JSON.stringify(newValue))
        saveTimeout = null
    }, 200)
}, { deep: true })

export default function useFavoriteStore() {
    const isFavorite = (productId: ProductID): boolean => {
        return favorites.value.includes(productId)
    }

    const toggleFavorite = (productId: ProductID): void => {
        const index = favorites.value.indexOf(productId)
        if (index > -1) {
            favorites.value.splice(index, 1)
        } else {
            favorites.value.push(productId)
        }
    }

    const addMultiple = (productIds: ProductID[]): void => {
        const uniqueNewIds = productIds.filter(id => !favorites.value.includes(id))
        favorites.value.push(...uniqueNewIds)
    }

    const clearAll = (): void => {
        favorites.value = []
    }

    return {
        favorites,
        isFavorite,
        toggleFavorite,
        addMultiple,
        clearAll
    }
}