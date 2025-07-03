import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import LoadingComponent from './../system/LoadingComponent.vue';
import { defineAsyncComponent } from 'vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: defineAsyncComponent({
            loader: () => import('../pages/home/Home.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/viewcart',
        name: 'ViewCart',
        component: defineAsyncComponent({
            loader: () => import('../pages/hom-page/view-carts/ViewCart.vue'),
            // loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/shopcard',
        name: 'ShopCard',
        component: defineAsyncComponent({
            loader: () => import('../components/shopCard/ShopCard.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/viewfavorite',
        name: 'ViewFavorite',
        component: defineAsyncComponent({
            loader: () => import('../pages/hom-page/favoritevs/ViewFavorite.vue'),
            // loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: defineAsyncComponent({
            loader: () => import('../pages/checkout/Checkout.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: true }
    },
    // {
    //     path: '/customerInFormation',
    //     name: 'CustomerInFormation',
    //     component: defineAsyncComponent({
    //         loader: () => import('../pages/hom-page/view-carts/checkout/CustomerInfoForm.vue'),
    //         loadingComponent: LoadingComponent,
    //     }),
    //     meta: { auth: false, loggedIn: true }
    // },
    {
        path: '/myorders',
        name: 'MyOrders',
        component: defineAsyncComponent({
            loader: () => import('../pages/orders/MyOrders.vue'),
            // loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: true }
    },
    {
        path: '/orderdetails/:id',
        name: 'OrderDetails',
        component: defineAsyncComponent({
            loader: () => import('../pages/orders/OrderDetails.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: true }
    },
    {
        path: '/myaccount',
        name: 'MyAccount',
        component: defineAsyncComponent({
            loader: () => import('../pages/myacount/MyAccount.vue'),
            // loadingComponent: LoadingComponent,
        }),
        meta: { auth: true, loggedIn: true }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: defineAsyncComponent({
            loader: () => import('../pages/blog/Blog.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/about',
        name: 'About',
        component: defineAsyncComponent({
            loader: () => import('../pages/about/About.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: defineAsyncComponent({
            loader: () => import('../pages/contact/Contact.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: defineAsyncComponent({
            loader: () => import('../dashboard/Dashboard.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: true, loggedIn: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: defineAsyncComponent({
            loader: () => import('../pages/auth/Login.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: defineAsyncComponent({
            loader: () => import('../pages/auth/Register.vue'),
            loadingComponent: LoadingComponent,
        }),
        meta: { auth: false, loggedIn: false }
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
