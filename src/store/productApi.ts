import { products } from '../store/storeProduct'
import type { Product } from '../store/storeProduct'

//========= បំព្រិតដំណើរការដូចជាដកទិន្នន័យពី API សម្រាប់ទាញផលិតផលទាំងអស់
export function fetchProducts(): Promise<Product[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products) //========= ផ្ញើត្រឡប់ផលិតផលទាំងអស់
        }, 300) //========= ពន្យារពេល 300ms ដូចជាការទាញពី server
    })
}

//========= បំព្រិតដំណើរការដូចជាទាញទិន្នន័យតាម ID
export function fetchProductById(id: number): Promise<Product | undefined> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products.find(p => p.id === id)) //========= ស្វែងរកផលិតផលតាម ID
        }, 300)
    })
}
