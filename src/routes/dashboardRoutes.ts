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
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'DashboardHome',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/DashboardHome.vue'),
                loadingComponent: LoadingComponent,
                }),
                meta: { title: 'Dashboard Overview' }
            },
            {
                path: 'products',
                name: 'DashboardProducts',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/Products/ProductsList.vue'),
                loadingComponent: LoadingComponent,
                }),
                meta: { title: 'Product Management' }
            },
            {
                path: 'products/new',
                name: 'ProductCreate',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/Products/ProductForm.vue'),
                loadingComponent: LoadingComponent,
                }),
                meta: { title: 'Create Product' }
            },
            {
                path: 'products/:id',
                name: 'ProductEdit',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/Products/ProductForm.vue'),
                loadingComponent: LoadingComponent,
                }),
                props: true,
                meta: { title: 'Edit Product' }
            },
            {
                path: 'orders',
                name: 'DashboardOrders',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/Orders/OrdersList.vue'),
                loadingComponent: LoadingComponent,
                }),
                meta: { title: 'Order Management' }
            },
            {
                path: 'customers',
                name: 'DashboardCustomers',
                component: defineAsyncComponent({
                loader: () => import('../dashboard/views/Customers/CustomersList.vue'),
                loadingComponent: LoadingComponent,
                }),
                meta: { title: 'Customer Management' }
            },
        ]
    }
]