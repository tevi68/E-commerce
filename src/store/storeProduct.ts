import { defineStore } from 'pinia'
import { type ProductImage } from '../dashboard/views/Products/ProductFormModal.vue'

export interface Product {
    id: number
    title: string
    category: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    reviewCount: number
    stock: number
    inCart: number
    isOnProduct: boolean
    isOnShop: boolean
    isOnCategory: boolean
    isOnToday: boolean
    status: 'published' | 'draft'
    description: string
    features: string[]
    images: ProductImage[]
  // Backwards-compatibility single-image field used across templates
    image?: string
        videos?: {
            url: string
            thumbnail?: string | null
            duration?: string | null
        }[]
    selectedImageUrl?: string 
}

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as Product[]
    }),

    getters: {
        allProducts(state): Product[] {
            return state.products
        },

        getProductById: (state) => (id: number): Product | undefined => {
            return state.products.find(p => p.id === id)
        },

        todaysDeals(state): Product[] {
            return state.products.filter(p => p.isOnToday && p.status === 'published')
        },

        shopProducts(state): Product[] {
            return state.products.filter(p => p.isOnShop && p.status === 'published')
        },

        homepageProducts(state): Product[] {
            return state.products.filter(p => p.isOnProduct && p.status === 'published')
        },

        productsByCat(state): Product[] {
            return state.products.filter(p => p.isOnCategory && p.status === 'published')
        },

        uniqueCategories(state): string[] {
            // Return unique, non-empty categories from published products
            const categories = state.products
                .filter(p => p.status === 'published' && p.category)
                .map(p => p.category.trim())
                .filter((cat, idx, arr) => cat && arr.indexOf(cat) === idx)
            return categories
        }
    },

    actions: {
        addToCart(productId: number) {
            const product = this.getProductById(productId)
            if (product && product.stock > 0) {
                product.inCart += 1
                product.stock -= 1
            }
        },

        removeFromCart(productId: number) {
            const product = this.getProductById(productId)
            if (product && product.inCart > 0) {
                product.inCart -= 1
                product.stock += 1
            }
        },

        clearCart() {
            this.products.forEach(product => {
                if (product.inCart > 0) {
                    product.stock += product.inCart
                    product.inCart = 0
                }
            })
        },

        addProduct(newProduct: Omit<Product, 'id'>) {
            const newId = this.products.length
                ? Math.max(...this.products.map(p => p.id)) + 1
                : 1
            this.products.push({ id: newId, ...newProduct })
        },

        updateProduct(updatedProduct: Product) {
            const index = this.products.findIndex(p => p.id === updatedProduct.id)
            if (index !== -1) {
                this.products[index] = { ...updatedProduct }
            }
        },

        removeProduct(productId: number) {
            this.products = this.products.filter(p => p.id !== productId)
        },

        setProducts(products: Product[]) {
            this.products = products
        }
    }
})
