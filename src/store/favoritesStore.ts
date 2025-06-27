import { ref, watch } from 'vue'

//=========== ប្រភេទ ProductID ជាលេខ
type ProductID = number

//=========== បង្កើត ref សម្រាប់ផ្ទុកបញ្ជី favorites
const favorites = ref<ProductID[]>([])

//=========== ចាប់ផ្ដើមទាញ favorites ពី localStorage
function initializeFavorites() {
    const stored = localStorage.getItem('favorites')
    if (!stored) return

    try {
        const parsed = JSON.parse(stored)
        //=========== ពិនិត្យថា data គឺជាអារេនៃលេខ
        if (Array.isArray(parsed) && parsed.every(item => typeof item === 'number')) {
            favorites.value = parsed
        } else {
            console.warn('ទិន្នន័យ favorites មិនត្រឹមត្រូវទេនៅក្នុង localStorage, កំពុងសំអាត')
            localStorage.removeItem('favorites')
        }
    } catch (error) {
        console.error('បរាជ័យក្នុងការបម្លែង favorites ពី localStorage:', error)
        localStorage.removeItem('favorites')
    }
}

//=========== ផ្ទុក favorites នៅពេល module ត្រូវបាន import
initializeFavorites()

//=========== រក្សាទុក favorites ទៅ localStorage ដោយប្រើ debouncing
let saveTimeout: number | null = null
watch(favorites, (newValue) => {
    if (saveTimeout) {
        clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(newValue))
        } catch (error) {
            console.error('បរាជ័យក្នុងការរក្សាទុក favorites ទៅ localStorage:', error)
        }
        saveTimeout = null
    }, 200) //=========== រយៈពេល delay 200ms មុននឹងរក្សាទុក
}, { deep: true })

//=========== store function សម្រាប់ favorite logic
function useFavoriteStore() {
    /**
     * ពិនិត្យថា product មួយមាននៅក្នុង favorites ឬអត់
     */
    const isFavorite = (productId: ProductID): boolean => {
        return favorites.value.includes(productId)
    }

    /**
     * បិទ/បើក favorite product តាម ID
     */
    const toggleFavorite = (productId: ProductID): void => {
        const index = favorites.value.indexOf(productId)
        if (index > -1) {
            //=========== លុបចេញបើមានរួច
            favorites.value.splice(index, 1)
        } else {
            //=========== បន្ថែមបើមិនទាន់មាន
            favorites.value.push(productId)
        }
    }

    /**
     * បន្ថែមច្រើនមុខទៅ favorites
     */
    const addMultiple = (productIds: ProductID[]): void => {
        const uniqueNewIds = productIds.filter(id =>
            !favorites.value.includes(id)
        )
        favorites.value.push(...uniqueNewIds)
    }

    /**
     * សម្អាត favorites ទាំងអស់
     */
    const clearAll = (): void => {
        favorites.value = []
    }

    //=========== បង្រួម function ទាំងអស់បញ្ចូនចេញ
    return {
        favorites,
        isFavorite,
        toggleFavorite,
        addMultiple,
        clearAll
    }
}

export default useFavoriteStore
