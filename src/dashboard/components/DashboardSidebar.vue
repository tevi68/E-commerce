<<template>
	<aside
		class="fixed lg:static inset-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out h-screen flex flex-col"
		:class="dashboardStore.sidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
	>
		<div class="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-gray-400">
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
	</aside>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../../store/dashboardStore'

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
			{ name: 'Todays Deals', path: '/dashboard/products/Tody' },
			{ name: 'Cate By Shop', path: '/dashboard/products/catebyshop' },
			{ name: 'ProductsPage', path: '/dashboard/products' },
			{ name: 'Shop Lish', path: '/dashboard/products/shoplish' },
		]
	},
	{ name: 'Orders', icon: 'pi pi-shopping-cart', path: '/dashboard/orders', badge: '8' },
	{ name: 'Customers', icon: 'pi pi-users', path: '/dashboard/customers' },
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
	background-color: rgba(100, 116, 139, 0.5); /* slate-500 */
	border-radius: 9999px;
}
.scrollbar-thin::-webkit-scrollbar-track {
	background-color: transparent;
}
</style>

