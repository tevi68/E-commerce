import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const API_BASE = `${apiBaseUrl}/api/weeklydeals`

function safeParseArray(value: any): any[] {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value)
            if (Array.isArray(parsed)) return parsed
        } catch {
            return []
        }
    }
    return []
}

function mapWeeklyDeal(d: Record<string, any>) {
    return {
        id: Number(d.id),
        title: d.title || '',
        description: d.description || '',
        price: Number(d.price) || 0,
        originalPrice: Number(d.originalPrice) || 0,
        discount: Number(d.discount) || 0,
        stock: Number(d.stock) || 0,
        rating: Number(d.rating) || 0,
        features: safeParseArray(d.features),
        images: safeParseArray(d.images),
        videos: safeParseArray(d.videos),
        timer_days: Number(d.timer_days) || 0,
        timer_hours: Number(d.timer_hours) || 0,
        timer_minutes: Number(d.timer_minutes) || 0,
        timer_seconds: Number(d.timer_seconds) || 0,
    }
}

export async function fetchWeeklyDeals() {
    try {
        const res = await axios.get(API_BASE)
        console.log('Raw weekly deals response:', res.data)
        // Map all deals
        const mapped = Array.isArray(res.data) ? res.data.map(mapWeeklyDeal) : []
        console.log('Mapped weekly deals:', mapped)
        return mapped
    } catch (err) {
        const error = err as any;
        console.error('fetchWeeklyDeals error:', error)
        if (error.response) {
            console.error('Response data:', error.response.data)
        }
        throw error
    }
}

export async function createWeeklyDeal(deal: any) {
    const formData = new FormData()
    formData.append('title', deal.title)
    formData.append('description', deal.description)
    formData.append('price', deal.price?.toString() || '0')
    formData.append('originalPrice', deal.originalPrice?.toString() || '0')
    formData.append('discount', deal.discount?.toString() || '0')
    formData.append('stock', deal.stock?.toString() || '0')
    formData.append('rating', deal.rating?.toString() || '0')
    formData.append('status', deal.status || 'published')
    formData.append('timer_days', deal.timer_days?.toString() || '0')
    formData.append('timer_hours', deal.timer_hours?.toString() || '0')
    formData.append('timer_minutes', deal.timer_minutes?.toString() || '0')
    formData.append('timer_seconds', deal.timer_seconds?.toString() || '0')
    formData.append('features', JSON.stringify((deal.features || []).filter((f: string) => f && f.trim() !== '')))

    // Images
    const existingImageUrls: string[] = []
    const newImageFiles: File[] = []
    if (Array.isArray(deal.images)) {
        deal.images.forEach((img: any) => {
            if (img.file) {
                newImageFiles.push(img.file)
            } else if (img.url) {
                existingImageUrls.push(img.url)
            }
        })
    }
    formData.append('existingImages', JSON.stringify(existingImageUrls))
    newImageFiles.forEach(file => {
        formData.append('newImages[]', file)
    })

    // Videos
    const existingVideoUrls: string[] = []
    const newVideoFiles: File[] = []
    if (Array.isArray(deal.videos)) {
        deal.videos.forEach((vid: any) => {
            if (vid.file) {
                newVideoFiles.push(vid.file)
            } else if (vid.url) {
                existingVideoUrls.push(vid.url)
            }
        })
    }
    formData.append('existingVideos', JSON.stringify(existingVideoUrls))
    newVideoFiles.forEach(file => {
        formData.append('newVideos[]', file)
    })

    // Display toggles (optional, if your backend supports)
    if ('isOnProduct' in deal) formData.append('isOnProduct', deal.isOnProduct ? 'true' : 'false')
    if ('isOnShop' in deal) formData.append('isOnShop', deal.isOnShop ? 'true' : 'false')
    if ('isOnCategory' in deal) formData.append('isOnCategory', deal.isOnCategory ? 'true' : 'false')
    if ('isOnToday' in deal) formData.append('isOnToday', deal.isOnToday ? 'true' : 'false')

    const res = await axios.post(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

export async function updateWeeklyDeal(id: number, deal: any) {
    const formData = new FormData()
    formData.append('title', deal.title)
    formData.append('description', deal.description)
    formData.append('price', deal.price?.toString() || '0')
    formData.append('originalPrice', deal.originalPrice?.toString() || '0')
    formData.append('discount', deal.discount?.toString() || '0')
    formData.append('stock', deal.stock?.toString() || '0')
    formData.append('rating', deal.rating?.toString() || '0')
    formData.append('status', deal.status || 'published')
    formData.append('timer_days', deal.timer_days?.toString() || '0')
    formData.append('timer_hours', deal.timer_hours?.toString() || '0')
    formData.append('timer_minutes', deal.timer_minutes?.toString() || '0')
    formData.append('timer_seconds', deal.timer_seconds?.toString() || '0')
    formData.append('features', JSON.stringify((deal.features || []).filter((f: string) => f && f.trim() !== '')))

    // Images
    const existingImageUrls: string[] = []
    const newImageFiles: File[] = []
    if (Array.isArray(deal.images)) {
        deal.images.forEach((img: any) => {
            if (img.file) {
                newImageFiles.push(img.file)
            } else if (img.url) {
                existingImageUrls.push(img.url)
            }
        })
    }
    formData.append('existingImages', JSON.stringify(existingImageUrls))
    newImageFiles.forEach(file => {
        formData.append('newImages[]', file)
    })

    // Videos
    const existingVideoUrls: string[] = []
    const newVideoFiles: File[] = []
    if (Array.isArray(deal.videos)) {
        deal.videos.forEach((vid: any) => {
            if (vid.file) {
                newVideoFiles.push(vid.file)
            } else if (vid.url) {
                existingVideoUrls.push(vid.url)
            }
        })
    }
    formData.append('existingVideos', JSON.stringify(existingVideoUrls))
    newVideoFiles.forEach(file => {
        formData.append('newVideos[]', file)
    })

    // Display toggles (optional, if your backend supports)
    if ('isOnProduct' in deal) formData.append('isOnProduct', deal.isOnProduct ? 'true' : 'false')
    if ('isOnShop' in deal) formData.append('isOnShop', deal.isOnShop ? 'true' : 'false')
    if ('isOnCategory' in deal) formData.append('isOnCategory', deal.isOnCategory ? 'true' : 'false')
    if ('isOnToday' in deal) formData.append('isOnToday', deal.isOnToday ? 'true' : 'false')

    const res = await axios.put(`${API_BASE}/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return res.data
}

export async function fetchWeeklyDealById(id: number) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const res = await axios.get(`${apiBaseUrl}/api/weeklydeals/${id}`)
    return res.data
}

export async function deleteWeeklyDeal(id: number) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    await axios.delete(`${apiBaseUrl}/api/weeklydeals/${id}`)
}