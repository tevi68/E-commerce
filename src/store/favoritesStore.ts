import { ref, watch } from 'vue'

// Define a type for a favorite item
interface FavoriteItem {
  productId: number;
  selectedImageUrl?: string;
}

const favorites = ref<FavoriteItem[]>([])

// Initialize favorites from localStorage
function initializeFavorites() {
    const stored = localStorage.getItem('favorites')
    if (stored) {
        try {
            // Parse with a check for the new structure
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed) && parsed.every(item => 
                typeof item === 'object' && item !== null &&
                typeof item.productId === 'number' && 
                (item.selectedImageUrl === undefined || typeof item.selectedImageUrl === 'string')
            )) {
                favorites.value = parsed
            } else if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
                // Handle old format (array of numbers) and convert to new format
                favorites.value = parsed.map(id => ({ productId: id }))
                console.warn('Converting old favorites data to new format.')
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
    const isFavorite = (productId: number): boolean => {
        return favorites.value.some(item => item.productId === productId)
    }

    const toggleFavorite = (productId: number, selectedImageUrl?: string): void => {
        const index = favorites.value.findIndex(item => item.productId === productId)
        if (index > -1) {
            favorites.value.splice(index, 1)
        } else {
            favorites.value.push({ productId, selectedImageUrl })
        }
    }

    const addMultiple = (productIds: number[]): void => {
        // Convert old productIds to new FavoriteItem structure, avoiding duplicates
        const uniqueNewItems = productIds
            .filter(id => !favorites.value.some(item => item.productId === id))
            .map(id => ({ productId: id }))
        favorites.value.push(...uniqueNewItems)
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