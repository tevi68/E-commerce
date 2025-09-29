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
                path: 'products/viewdetails/:id',
                name: 'ProductViewDetails',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Products/ViewDetails.vue'),
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
            {
                path: 'weeklys',
                name: 'DashboardWeeklys',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Weeklys/ListWeeklys.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'weeklys/create',
                name: 'DashboardWeeklysCreate',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Weeklys/FormWeeklys.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'weeklys/edit/:id',
                name: 'DashboardWeeklysEdit',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Weeklys/FormWeeklys.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'weeklys/view/:id',
                name: 'DashboardWeeklysView',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/Weeklys/ViewWeekly.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            },
            {
                path: 'exchangeRate',
                name: 'DashboardExchangeRate',
                component: defineAsyncComponent({
                    loader: () => import('../dashboard/views/ExchangeRate/ListExchangeRate.vue'),
                    loadingComponent: LoadingComponent,
                }),
                meta: { auth: false, logedIn: true }
            }
        ]
    }
]