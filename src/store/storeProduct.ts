import { defineStore } from 'pinia'

export interface Product {
    id: number
    title: string
    category: string
    image: string
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
    description: string
    features: string[]
    images: string[]
    image_shop?: string
    title_shop?: string
    discount_shop?: number
    rating_shop?: number
    reviewCount_shop?: number
    price_shop?: number
    originalPrice_shop?: number
    category_shop?: string
    stock_shop?: number
}

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [
            {
                id: 1,
                title: 'Premium Wireless Headphones with Noise Cancellation',
                category: 'Electronics',
                image: 'https://images.pexels.com/photos/13323672/pexels-photo-13323672.jpeg',
                price: 129.99,
                originalPrice: 179.99,
                discount: 28,
                rating: 4,
                reviewCount: 124,
                stock: 5,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
                features: [
                    'Active Noise Cancellation',
                    '30-hour battery life',
                    'Bluetooth 5.0',
                    'Built-in microphone',
                    'Foldable design'
                ],
                images: [
                    'https://images.pexels.com/photos/13323672/pexels-photo-13323672.jpeg'
                ]
            },
            {
                id: 2,
                title: 'Premium Wireless Headphones with Noise Cancellation',
                category: 'Electronics',
                image: 'https://images.pexels.com/photos/15372904/pexels-photo-15372904.jpeg',
                price: 129.99,
                originalPrice: 179.99,
                discount: 28,
                rating: 4,
                reviewCount: 124,
                stock: 5,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
                features: [
                    'Active Noise Cancellation',
                    '30-hour battery life',
                    'Bluetooth 5.0',
                    'Built-in microphone',
                    'Foldable design'
                ],
                images: [
                    'https://images.pexels.com/photos/15372904/pexels-photo-15372904.jpeg'
                ]
            },
            {
                id: 3,
                title: 'Premium Wireless Headphones with Noise Cancellation',
                category: 'keyboard',
                image: 'https://images.pexels.com/photos/28955775/pexels-photo-28955775.jpeg',
                price: 129.99,
                originalPrice: 179.99,
                discount: 28,
                rating: 4,
                reviewCount: 124,
                stock: 5,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
                features: [
                    'Active Noise Cancellation',
                    '30-hour battery life',
                    'Bluetooth 5.0',
                    'Built-in microphone',
                    'Foldable design'
                ],
                images: [
                    'https://images.pexels.com/photos/28955775/pexels-photo-28955775.jpeg'
                ]
            },
            {
                id: 4,
                title: 'Premium Wireless Headphones with Noise Cancellation',
                category: 'keyboard',
                image: 'https://images.pexels.com/photos/15372896/pexels-photo-15372896.jpeg',
                price: 129.99,
                originalPrice: 179.99,
                discount: 28,
                rating: 4,
                reviewCount: 124,
                stock: 5,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: false,
                isOnToday: true,
                description: 'Experience crystal-clear sound with our premium wireless headphones featuring active noise cancellation technology for immersive audio experience.',
                features: [
                    'Active Noise Cancellation',
                    '30-hour battery life',
                    'Bluetooth 5.0',
                    'Built-in microphone',
                    'Foldable design'
                ],
                images: [
                    'https://images.pexels.com/photos/15372896/pexels-photo-15372896.jpeg'
                ]
            },
            {
                id: 5,
                title: 'ShadowForge Pro Headphones',
                category: 'Gaming',
                image: 'https://images.pexels.com/photos/18910365/pexels-photo-18910365.jpeg',
                price: 12.99,
                originalPrice: 17.99,
                discount: 28,
                rating: 4.2,
                reviewCount: 128,
                stock: 15,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Premium wireless gaming headphones with immersive 7.1 surround sound and active noise cancellation for competitive gameplay.',
                features: [
                    'Active Noise Cancellation',
                    '50mm high-density drivers',
                    '30-hour battery life',
                    'Retractable noise-cancelling mic',
                    'Multi-platform compatible'
                ],
                images: [
                    'https://images.pexels.com/photos/18910365/pexels-photo-18910365.jpeg'
                ]
            },
            {
                id: 6,
                title: 'NyxSpecter Gaming Mouse',
                category: 'Gaming',
                image: 'https://images.pexels.com/photos/4408312/pexels-photo-4408312.jpeg',
                price: 14.99,
                originalPrice: 19.99,
                discount: 25,
                rating: 4.5,
                reviewCount: 86,
                stock: 22,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'High-precision gaming mouse with customizable RGB lighting and 8 programmable buttons for competitive edge.',
                features: [
                    '16000 DPI optical sensor',
                    'Omron mechanical switches',
                    '6 programmable buttons',
                    'Braided fiber cable',
                    'Ergonomic design'
                ],
                images: [
                    'https://images.pexels.com/photos/4408312/pexels-photo-4408312.jpeg',
                    'https://images.pexels.com/photos/18910365/pexels-photo-18910365.jpeg'
                ]
            },
            {
                id: 7,
                title: 'VortexPulse Mechanical Keyboard',
                category: 'Gaming',
                image: 'https://images.pexels.com/photos/8947923/pexels-photo-8947923.jpeg',
                price: 19.99,
                originalPrice: 25.99,
                discount: 23,
                rating: 4.7,
                reviewCount: 214,
                stock: 8,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Full-size mechanical gaming keyboard with RGB backlighting and anti-ghosting technology.',
                features: [
                    'Cherry MX equivalent switches',
                    'RGB backlighting with 16.8M colors',
                    'N-key rollover',
                    'Aluminum alloy frame',
                    'Detachable wrist rest'
                ],
                images: [
                    'https://images.pexels.com/photos/8947923/pexels-photo-8947923.jpeg'
                ]
            },
            {
                id: 8,
                title: 'CrimsonReign Pro Controller',
                category: 'Gaming',
                image: 'https://images.pexels.com/photos/16070479/pexels-photo-16070479.jpeg',
                price: 29.99,
                originalPrice: 35.99,
                discount: 17,
                rating: 4.3,
                reviewCount: 175,
                stock: 12,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Ergonomic wireless controller with customizable buttons and hair-trigger locks for competitive gaming.',
                features: [
                    'Bluetooth and 2.4GHz wireless',
                    '30-hour battery life',
                    'Customizable paddle buttons',
                    'Interchangeable thumbsticks',
                    'PC and console compatible'
                ],
                images: [
                    'https://images.pexels.com/photos/16070479/pexels-photo-16070479.jpeg'
                ]
            },
            {
                id: 9,
                title: 'Smart Fitness Watch with Heart Rate Monitor',
                category: 'Wearables',
                image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
                price: 89.99,
                originalPrice: 119.99,
                discount: 25,
                rating: 4.5,
                reviewCount: 87,
                stock: 12,
                inCart: 0,
                isOnProduct: true,
                isOnShop: true,
                isOnCategory: true,
                isOnToday: true,
                description: 'Track your fitness goals with this smart watch featuring heart rate monitoring, sleep tracking, and 7-day battery life.',
                features: [
                    'Heart rate monitoring',
                    'Sleep tracking',
                    '7-day battery life',
                    'Built-in GPS',
                    'Waterproof'
                ],
                images: [
                    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600'
                ]
            }
        ] as Product[]
    }),

    getters: {
        allProducts(state): Product[] {
            return state.products
        },

        getProductById: (state) => (id: number): Product | undefined => {
            return state.products.find(p => p.id === id)
        },

        todaysDeals(state): Product[] {
            return state.products.filter(p => p.isOnToday)
        },

        shopProducts(state): Product[] {
            return state.products.filter(p => p.isOnShop)
        },

        homepageProducts(state): Product[] {
            return state.products.filter(p => p.isOnProduct)
        },

        productsByCat(state): Product[] {
            return state.products.filter(p => p.isOnCategory)
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
        }
    }
})