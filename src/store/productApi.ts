import axios from 'axios'
import type { Product } from '../store/storeProduct'
import { type ProductImage } from '../dashboard/views/Products/ProductFormModal.vue'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Safe parse features field
function safeParseFeatures(value: any): string[] {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value)
            if (Array.isArray(parsed)) return parsed
        } catch {
            // fallback: try splitting comma-separated string
            return value.split(',').map(s => s.trim()).filter(Boolean)
        }
    }
    return []
}

// Safe parse images field
function safeParseImages(value: any): ProductImage[] {
    if (Array.isArray(value)) return value.map(url => ({ url, file: undefined }))
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value)
            if (Array.isArray(parsed)) return parsed.map(url => ({ url, file: undefined }))
        } catch {
            // fallback: return empty array if not valid JSON
            return []
        }
    }
    return []
}

// Map backend product object to frontend Product type
function mapProduct(p: Record<string, any>): Product {
    return {
        id: Number(p.id),
        title: p.title || '',
        category: p.category || '',
        image: p.image || '',
        price: Number(p.price) || 0,
        originalPrice: Number(p.originalPrice) || 0,
        discount: Number(p.discount) || 0,
        rating: Number(p.rating) || 0,
        reviewCount: Number(p.reviewCount) || 0,
        stock: Number(p.stock) || 0,
        status: p.status || 'draft',
        description: p.description || '',
        features: safeParseFeatures(p.features),
        images: safeParseImages(p.images),

        videos: Array.isArray(p.videos) ? p.videos : [],

        // Frontend-only fields
        isOnProduct: p.isOnProduct !== undefined ? Boolean(p.isOnProduct) : true,
        isOnShop: p.isOnShop !== undefined ? Boolean(p.isOnShop) : true,
        isOnCategory: p.isOnCategory !== undefined ? Boolean(p.isOnCategory) : true,
        isOnToday: p.isOnToday !== undefined ? Boolean(p.isOnToday) : true,
        inCart: 0
    }
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await axios.post(`${apiBaseUrl}/api/products`, product)
    return mapProduct(response.data)
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await axios.put(`${apiBaseUrl}/api/products/${id}`, product)
    return mapProduct(response.data)
}

export async function fetchProducts(): Promise<Product[]> {
    const res = await axios.get(`${apiBaseUrl}/api/products`)
    return res.data.map(mapProduct)
}

export async function fetchProductById(id: number): Promise<Product> {
    const res = await axios.get(`${apiBaseUrl}/api/products/${id}`)
    return mapProduct(res.data)
}

export async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
    if (ids.length === 0) {
        return []
    }
    const queryParams = ids.map(id => `id=${id}`).join('&')
    const res = await axios.get(`${apiBaseUrl}/api/products?${queryParams}`)
    return res.data.map(mapProduct)
}

export async function fetchTodayDeals(): Promise<Product[]> {
    const res = await axios.get(`${apiBaseUrl}/api/products?status=published`)
    return res.data.map(mapProduct).filter((p: Product) => p.isOnToday)
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const res = await axios.get(`${apiBaseUrl}/api/products?category=${encodeURIComponent(category)}`)
    return res.data.map(mapProduct).filter((p: Product) => p.isOnCategory)
}

export async function fetchShopProducts(): Promise<Product[]> {
    const res = await axios.get(`${apiBaseUrl}/api/products?status=published`)
    return res.data.map(mapProduct).filter((p: Product) => p.isOnShop)
}

export async function deleteProduct(id: number): Promise<void> {
    await axios.delete(`${apiBaseUrl}/api/products/${id}`)
}
