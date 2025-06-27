import { defineStore } from 'pinia'
import type { Product } from './storeProduct'

//========= កំណត់ key សម្រាប់ cart នៅក្នុង localStorage
const CART_KEY = 'cart_items'

//========= បង្កើត Pinia store ឈ្មោះ 'cart'
export const useCartStore = defineStore('cart', {
    //========= state តំណាងឲ្យទិន្នន័យ cart
    state: () => ({
        items: [] as Array<{ product: Product; quantity: number }> //========= បញ្ជីទំនិញក្នុង cart
    }),

    //========= getters គឺជាការគណនាមូលដ្ឋានលើ state
    getters: {
        //========= គណនាចំនួនទំនិញសរុបនៅក្នុង cart
        totalItems: state => state.items.reduce((total, item) => total + item.quantity, 0),

        //========= គណនាតម្លៃសរុបនៃ cart
        totalPrice: state =>
            state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    },

    //========= actions សម្រាប់ធ្វើប្រតិបត្តិការលើ state
    actions: {
        //========= បន្ថែមទំនិញទៅក្នុង cart
        addToCart(product: Product, quantity = 1) {
            const existing = this.items.find(item => item.product.id === product.id)
            if (existing) {
                existing.quantity += quantity //========= បន្ថែមបរិមាណ
            } else {
                this.items.push({ product, quantity }) //========= បញ្ចូលផលិតផលថ្មី
            }
            this.saveCart() //========= រក្សាទុកទៅ localStorage
        },

        //========= លុបទំនិញចេញពី cart តាម id
        removeFromCart(productId: number) {
            this.items = this.items.filter(item => item.product.id !== productId)
            this.saveCart()
        },

        //========= បន្ថយបរិមាណ 1 ប្រសិនបើច្រើនជាង 1
        decreaseQuantity(productId: number) {
            const item = this.items.find(item => item.product.id === productId)
            if (item && item.quantity > 1) {
                item.quantity--
                this.saveCart()
            }
        },

        //========= ផ្ទុកទិន្នន័យ cart ពី localStorage
        loadCart() {
            const data = localStorage.getItem(CART_KEY)
            if (data) {
                try {
                    this.items = JSON.parse(data) //========= បម្លែង JSON ទៅជា array
                } catch (err) {
                    console.error('មិនអាចបម្លែង cart បានទេ:', err)
                }
            }
        },

        //========= រក្សាទុក cart ទៅ localStorage
        saveCart() {
            localStorage.setItem(CART_KEY, JSON.stringify(this.items))
        },

        //========= សម្អាតទំនិញទាំងអស់ក្នុង cart
        clearCart() {
            this.items = []
            this.saveCart()
        }
    }
})
