import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import LoadingComponent from '../system/LoadingComponent.vue'
import { defineAsyncComponent } from 'vue'
import { dashboardRoutes } from './dashboardRoutes'

const mainRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        component: defineAsyncComponent({
            loader: () => import('../pages/home/Home.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/viewcart',
        name: 'ViewCart',
        component: defineAsyncComponent({
        loader: () => import('../pages/hom-page/view-carts/ViewCart.vue'),
        }),
        meta: { auth: false }
    },
    {
        path: '/shopcard',
        name: 'ShopCard',
        component: defineAsyncComponent({
            loader: () => import('../components/shopCard/ShopCard.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/viewfavorite',
        name: 'ViewFavorite',
        component: defineAsyncComponent({
            loader: () => import('../pages/hom-page/favoritevs/ViewFavorite.vue'),
        }),
        meta: { auth: false }
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: defineAsyncComponent({
            loader: () => import('../pages/checkout/Checkout.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/myorders',
        name: 'MyOrders',
            component: defineAsyncComponent({
            loader: () => import('../pages/orders/MyOrders.vue'),
        }),
        meta: { auth: false }
    },
    {
        path: '/orderdetails/:id',
        name: 'OrderDetails',
        component: defineAsyncComponent({
            loader: () => import('../pages/orders/OrderDetails.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/myaccount',
        name: 'MyAccount',
            component: defineAsyncComponent({
            loader: () => import('../pages/myacount/MyAccount.vue'),
        }),
        meta: { auth: false }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: defineAsyncComponent({
            loader: () => import('../pages/blog/Blog.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/about',
        name: 'About',
        component: defineAsyncComponent({
            loader: () => import('../pages/about/About.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: defineAsyncComponent({
            loader: () => import('../pages/contact/Contact.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: defineAsyncComponent({
            loader: () => import('../pages/auth/Login.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: defineAsyncComponent({
            loader: () => import('../pages/auth/Register.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: defineAsyncComponent({
            loader: () => import('../pages/errors/NotFound.vue'),
            loadingComponent: LoadingComponent,
        })
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...mainRoutes, ...dashboardRoutes]
})

// Authentication guard
router.beforeEach((to, _from, next) => {
    const isAuthenticated = localStorage.getItem('authToken')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    
    if (requiresAuth && !isAuthenticated) {
        next({ name: 'Login', query: { redirect: to.fullPath } })
    } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
        next({ name: 'DashboardHome' })
    } else {
        next()
    }
})

// Set document title
router.afterEach((to) => {
    const title = to.meta.title 
        ? `${to.meta.title} | ShopLux Dashboard`
        : 'ShopLux - Your Premium Shopping Experience'
    document.title = title
})

export default router