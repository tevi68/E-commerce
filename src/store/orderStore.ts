import { defineStore } from 'pinia'

//======== កំណត់ key សម្រាប់រក្សាទុក order ក្នុង localStorage
const ORDER_KEY = 'orders'

//======== កំណត់ប្រភេទ (interface) សម្រាប់ OrderItem
export interface OrderItem {
    product: {
        id: number                   //======== លេខសម្គាល់ផលិតផល
        title: string                //======== ចំណងជើង/ឈ្មោះផលិតផល
        price: number                //======== តម្លៃផលិតផល
        image?: string               //======== រូបភាព (មិនចាំបាច់)
        category?: string            //======== ប្រភេទផលិតផល (មិនចាំបាច់)
    }
    quantity: number               //======== បរិមាណផលិតផល
}

//======== កំណត់ប្រភេទ (interface) សម្រាប់ Order
export interface Order {
    id: number                     //======== លេខសម្គាល់បញ្ជាទិញ
    date: string                   //======== ថ្ងៃខែឆ្នាំនៃការបញ្ជាទិញ
    status: 'Completed' | 'Pending' | 'Cancelled'  //======== ស្ថានភាពនៃការបញ្ជាទិញ
    items: OrderItem[]            //======== បញ្ជីផលិតផល
    total: number                 //======== តម្លៃសរុបនៃការបញ្ជាទិញ
}

//======== បង្កើត Pinia store ឈ្មោះ orderStore
export const useOrderStore = defineStore('orderStore', {
    //======== state តំណាងឲ្យទិន្នន័យនៅក្នុង store
    state: () => ({
        orders: [] as Order[],       //======== បញ្ជី order ទាំងអស់
    }),

    //======== actions គឺជា function សម្រាប់ធ្វើសកម្មភាព
    actions: {
        //======== ផ្ទុក order ពី localStorage
        loadOrders() {
        const data = localStorage.getItem(ORDER_KEY)
            if (data) {
                try {
                this.orders = JSON.parse(data)  //======== បម្លែង JSON ទៅជា array
                } catch (err) {
                console.error('មិនអាចបម្លែង orders បានទេ:', err)
                }
            }
        },

        //======== រក្សាទុក orders ទៅ localStorage
        saveOrders() {
            localStorage.setItem(ORDER_KEY, JSON.stringify(this.orders))
        },

       //======== បន្ថែម order ថ្មីទៅក្នុងបញ្ជី
        addOrder(order: Order) {
            this.orders.unshift(order) //======== បន្ថែមទៅខាងលើនៃបញ្ជី
            this.saveOrders()          //======== រក្សាទុកបន្ទាប់ពីបន្ថែម
        },
        
        //======== លុប order តាម id
        removeOrder(orderId: number) {
            this.orders = this.orders.filter(order => order.id !== orderId)
            this.saveOrders()
        },
    },
})

