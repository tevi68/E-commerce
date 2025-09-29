<template>
	<aside
		class="w-64 bg-white border-r border-gray-200 h-full flex flex-col flex-shrink-0"
		:class="dashboardStore.sidebarVisible ? 'fixed lg:static inset-0 z-40' : 'hidden lg:block'"
	>
		<div class="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
			<!-- Logo (Mobile) -->
			<div class="lg:hidden mb-6 px-4">
				<router-link to="/dashboard" class="flex items-center gap-2">
					<div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
						<i class="pi pi-shopping-bag text-white text-sm"></i>
					</div>
					<span class="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
						Ecom Dashboard
					</span>
				</router-link>
			</div>

			<!-- Navigation Menu -->
			<nav class="space-y-1">
				<div v-for="item in menuItems" :key="item.name">
					<!-- Dropdown Item -->
					<div v-if="item.children">
						<button
							@click="toggleDropdown(item.name)"
							class="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition hover:bg-gray-100 text-gray-600"
						>
							<i :class="item.icon" class="mr-3 text-lg" />
							{{ item.name }}
							<i :class="['ml-auto transition-transform', openDropdown === item.name ? 'rotate-180' : '', 'pi pi-chevron-down']" />
						</button>

						<transition name="fade">
							<div v-if="openDropdown === item.name" class="ml-6 mt-1 space-y-1">
								<router-link
									v-for="child in item.children"
									:key="child.name"
									:to="child.path"
									class="block px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 transition"
									:class="{
										'bg-blue-50 text-blue-600': $route.path === child.path
									}"
									@click="dashboardStore.sidebarVisible = false"
								>
									{{ child.name }}
								</router-link>
							</div>
						</transition>
					</div>

					<!-- Normal Link -->
					<router-link
						v-else
						:to="item.path"
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition duration-200"
						:class="{
							'bg-blue-50 text-blue-600': $route.path === item.path,
							'text-gray-600 hover:bg-gray-100': $route.path !== item.path
						}"
						@click="dashboardStore.sidebarVisible = false"
					>
						<i :class="item.icon" class="mr-3 text-lg" />
						{{ item.name }}
						<span
							v-if="item.badge"
							class="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full"
						>
							{{ item.badge }}
						</span>
					</router-link>
				</div>
			</nav>

			<!-- Quick Actions -->
			<div class="mt-8 pt-6 border-t border-gray-200">
				<h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
					Quick Actions
				</h3>
				<div class="space-y-1">
					<button
						v-for="action in quickActions"
						:key="action.name"
						@click="action.handler"
						class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition"
					>
						<i :class="action.icon" class="mr-3 text-lg" />
						{{ action.name }}
					</button>
				</div>
			</div>
		</div>

		<!-- Sidebar Footer -->
		<div class="p-4 border-t border-gray-200">
			<div class="flex items-center">
				<Avatar 
					image="../../public/profile/images/IMG_8154.PNG" 
					shape="circle" 
					size="large"
					class="mr-3"
				/>
				<div>
					<p class="text-sm font-medium text-gray-900">Hello! Kevin</p>
					<p class="text-xs text-gray-500">Admin</p>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../../store/dashboardStore'
import Avatar from 'primevue/avatar'

const router = useRouter()
const dashboardStore = useDashboardStore()
const openDropdown = ref<string | null>(null)

const toggleDropdown = (name: string) => {
  openDropdown.value = openDropdown.value === name ? null : name
}

const menuItems = [
  	{ name: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
	{
		name: 'Products',
		icon: 'pi pi-box',
		children: [
			{ name: 'Produst List', path: '/dashboard/products' },
			{ name: 'Weekly Deals', path: '/dashboard/weeklys'}
		]
	},
	{ name: 'Orders', icon: 'pi pi-shopping-cart', path: '/dashboard/orders', badge: '8' },
	{ name: 'Customers', icon: 'pi pi-users', path: '/dashboard/customers' },
	{ name: 'Exchange Rate', icon: 'pi pi-dollar', path: '/dashboard/exchangeRate'},
	{ name: 'Analytics', icon: 'pi pi-chart-bar', path: '/dashboard/analytics' },
	{ name: 'Settings', icon: 'pi pi-cog', path: '/dashboard/settings' }
]

const quickActions = [
	{ name: 'Add Product', icon: 'pi pi-plus-circle', handler: () => navigateTo('/dashboard/products/new') },
	{ name: 'Create Discount', icon: 'pi pi-percentage', handler: () => alert('Create Discount') },
	{ name: 'View Reports', icon: 'pi pi-file', handler: () => navigateTo('/dashboard/analytics') }
]

const navigateTo = (path: string) => {
	dashboardStore.sidebarVisible = false
	router.push(path)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}
.scrollbar-thin::-webkit-scrollbar {
	width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
	background-color: rgba(156, 163, 175, 0.5);
	border-radius: 9999px;
}
.scrollbar-thin::-webkit-scrollbar-track {
	background-color: rgba(243, 244, 246, 0.5);
}
</style>