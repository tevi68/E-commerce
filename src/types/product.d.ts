import type { Product } from './storeProduct'

// Define ProductForm directly to ensure nullable types for numeric fields
export interface ProductForm {
  id: number | null
  title: string
  category: string
  price: number | null
  originalPrice: number | null
  discount: number | null
  stock: number | null
  rating: number | null
  reviewCount: number | null
  status: 'published' | 'draft'
  description: string
  features: string[]
  images: string[]
  isOnProduct: boolean
  isOnShop: boolean
  isOnCategory: boolean
  isOnToday: boolean
} 