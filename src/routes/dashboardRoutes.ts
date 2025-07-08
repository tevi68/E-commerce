import type { RouteRecordRaw } from 'vue-router'
import LoadingComponent from '../system/LoadingComponent.vue'
import { defineAsyncComponent } from 'vue'

export const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        component: defineAsyncComponent({
            loader: () => import('../dashboard/DashboardLayout.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, logedIn: true },
        children: [
            {
                path: '',
                name: 'DashboardHome',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/DashboardHome.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'products',
                name: 'DashboardProducts',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Products/ProductsList.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true },
            },
            {
                path: 'orders',
                name: 'DashboardOrders',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Orders/OrdersList.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'customers',
                name: 'DashboardCustomers',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Customers/CustomersList.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
        ]
    }
]