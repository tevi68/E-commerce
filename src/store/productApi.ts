import { useProductStore } from '../store/storeProduct'
import type { Product } from '../store/storeProduct'

// Fetch all products
export function fetchProducts(): Promise<Product[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const productStore = useProductStore()
            resolve(productStore.allProducts)
        }, 300)
    })
}

// Fetch product by ID
export function fetchProductById(id: number): Promise<Product | undefined> {
    return new Promise(resolve => {
        setTimeout(() => {
            const productStore = useProductStore()
            resolve(productStore.getProductById(id))
        }, 300)
    })
}

// Fetch today's deals
export function fetchTodayDeals(): Promise<Product[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const productStore = useProductStore()
            resolve(productStore.todaysDeals)
        }, 300)
    })
}

// Fetch products by category
export function fetchProductsByCategory(category: string): Promise<Product[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const productStore = useProductStore()
            resolve(productStore.allProducts.filter(p => 
                p.category.toLowerCase() === category.toLowerCase()
            ))
        }, 300)
    })
}