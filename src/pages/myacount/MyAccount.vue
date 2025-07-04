<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

        <!-- Loading Spinner -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" />
        </div>
        <!-- Hero Section with User Profile -->
        <div class="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
            <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div class="flex flex-col md:flex-row items-center justify-between">
                    <div class="flex items-center space-x-6 mb-6 md:mb-0">
                        <div class="relative">
                            <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center">
                                <!-- Glass morphism container -->
                                <div class="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 border-opacity-50 shadow-lg"></div>
                            
                                <!-- Profile image with enhanced styling -->
                                <img 
                                    src="../../../public/profile/images/IMG_8154.PNG" 
                                    class="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border-2 border-white/40 shadow-inner transition-all duration-300 hover:scale-105 hover:border-white/60"
                                    alt="Profile picture"
                                    loading="lazy"
                                >
                                
                                <!-- Optional hover effect indicator -->
                                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"></div>
                            </div>
                            <div class="absolute bottom-1 right-0 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                                <i class="pi pi-check text-white text-xs"></i>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                                Hi!. {{ user.name || 'Welcome Back!' }}
                            </h1>
                            <p class="text-blue-100 text-lg">{{ user.email || 'user@example.com' }}</p>
                            <div class="flex items-center mt-2 text-blue-200">
                                <i class="pi pi-calendar mr-2"></i>
                                <span class="text-sm">Member since {{ formatDate(user.joinDate || '2024-01-01') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="bg-white/20 rounded-xl p-4 backdrop-blur-sm border border-white/30">
                            <div class="text-2xl font-bold text-white">{{ orders?.length || 0 }}</div>
                            <div class="text-blue-100 text-sm">Total Orders</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-12">
            <!-- Quick Actions -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div v-for="action in quickActions" :key="action.id" @click="handleQuickAction(action.id)" class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-4 text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                    <div class="bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 transition-colors">
                        <i :class="action.icon" class="text-xl text-blue-600"></i>
                    </div>
                    <div class="font-semibold text-gray-800 text-sm">{{ action.label }}</div>
                </div>
            </div>

            <!-- Main Content Tabs -->
            <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 overflow-hidden">
                <!-- Tab Navigation -->
                <div class="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <div class="flex flex-wrap">
                        <button
                            v-for="tab in tabs"
                            :key="tab.id"
                            @click="activeTab = tab.id"
                            :class="[
                                'flex-1 min-w-0 px-4 py-4 text-sm font-semibold text-center transition-all duration-300',
                                activeTab === tab.id 
                                ? 'bg-white text-blue-600 border-b-2 border-blue-600 shadow-sm' 
                                : 'text-gray-600 hover:text-blue-600 hover:bg-white/50'
                            ]"
                        >
                            <div class="flex items-center justify-center space-x-2">
                                <i :class="tab.icon" class="text-lg"></i>
                                <span class="hidden sm:inline">{{ tab.label }}</span>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Tab Content -->
                <div class="p-6">
                    <!-- Profile Information Tab -->
                    <div v-if="activeTab === 'profile'" class="space-y-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">Profile Information</h2>
                            <Button
                                :label="isEditing ? 'Cancel' : 'Edit Profile'"
                                :icon="isEditing ? 'pi pi-times' : 'pi pi-pencil'"
                                @click="toggleEdit"
                                :class="isEditing ? 'p-button-secondary' : 'p-button-primary'"
                                class="px-6 py-2 rounded-xl"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Personal Information -->
                            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
                                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="pi pi-user text-blue-500 mr-2"></i>
                                    Personal Information
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <InputText
                                            v-if="isEditing"
                                            v-model="editableUser.name"
                                            class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                        />
                                        <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                            {{ user.name || 'Not provided' }}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <InputText
                                            v-if="isEditing"
                                            v-model="editableUser.email"
                                            type="email"
                                            class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                        />
                                        <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                            {{ user.email || 'Not provided' }}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <InputText
                                            v-if="isEditing"
                                            v-model="editableUser.phone"
                                            class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                        />
                                        <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                            {{ user.phone || 'Not provided' }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Address Information -->
                            <div class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
                                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="pi pi-map-marker text-green-500 mr-2"></i>
                                    Address Information
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                        <InputText
                                            v-if="isEditing"
                                            v-model="editableUser.address"
                                            class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                        />
                                        <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                            {{ user.address || 'Not provided' }}
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                                            <InputText
                                                v-if="isEditing"
                                                v-model="editableUser.city"
                                                class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                            />
                                            <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                                {{ user.city || 'Not provided' }}
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                            <InputText
                                                v-if="isEditing"
                                                v-model="editableUser.postalCode"
                                                class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500"
                                            />
                                            <div v-else class="p-3 bg-white rounded-lg border border-gray-200">
                                                {{ user.postalCode || 'Not provided' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="isEditing" class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button
                                label="Save Changes"
                                icon="pi pi-check"
                                @click="saveProfile"
                                class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white px-8 py-3 rounded-xl font-semibold"
                            />
                        </div>
                    </div>

                    <!-- Order History Tab -->
                    <div v-if="activeTab === 'orders'" class="space-y-6">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-2xl font-bold text-gray-800">Order History</h2>
                            <div class="flex items-center space-x-4">
                                <Dropdown
                                    v-model="orderFilter"
                                    :options="orderFilters"
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Filter Orders"
                                    class="w-48"
                                />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 gap-4" v-if="recentOrders.length > 0">
                            <div v-for="order in filteredOrders" :key="order.id" class="bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <div class="flex items-center space-x-4 mb-4 sm:mb-0">
                                        <div class="bg-blue-500 rounded-full p-3">
                                            <i class="pi pi-shopping-bag text-white"></i>
                                        </div>
                                        <div>
                                            <h3 class="font-bold text-gray-800">Order #{{ order.id }}</h3>
                                            <p class="text-gray-600 text-sm">{{ formatDate(order.date) }}</p>
                                            <div class="flex items-center mt-1">
                                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                    :class="getStatusClass(order.status)">
                                                {{ order.status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-xl font-bold text-green-600">${{ order.total.toFixed(2) }}</div>
                                        <Button
                                            label="View Details"
                                            icon="pi pi-arrow-right"
                                            @click="viewOrder(order.id)"
                                            class="mt-2 p-button-sm p-button-outlined"
                                            iconPos="right"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center py-12">
                            <div class="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <i class="pi pi-shopping-cart text-gray-400 text-2xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-2">No Orders Found</h3>
                            <p class="text-gray-600">You haven't placed any orders yet.</p>
                        </div>
                    </div>

                    <!-- Security Tab -->
                    <div v-if="activeTab === 'security'" class="space-y-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Change Password -->
                            <div class="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-6">
                                    <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                <i class="pi pi-lock text-red-500 mr-2"></i>
                                    Change Password
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <Password
                                        v-model="passwordForm.current"
                                        :feedback="false"
                                        toggleMask
                                        class="w-full"
                                        inputClass="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <Password
                                        v-model="passwordForm.new"
                                        toggleMask
                                        class="w-full"
                                        inputClass="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <Password
                                        v-model="passwordForm.confirm"
                                        :feedback="false"
                                        toggleMask
                                        class="w-full"
                                        inputClass="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-red-500"
                                        />
                                    </div>
                                    <Button
                                        label="Update Password"
                                        icon="pi pi-check"
                                        @click="updatePassword"
                                        class="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 border-0 text-white py-3 rounded-xl font-semibold"
                                    />
                                </div>
                            </div>

                            <!-- Two-Factor Authentication -->
                            <div class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
                                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="pi pi-shield text-green-500 mr-2"></i>
                                    Two-Factor Authentication
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">SMS Authentication</div>
                                            <div class="text-sm text-gray-600">Receive codes via SMS</div>
                                        </div>
                                        <InputSwitch v-model="twoFactorSettings.sms" />
                                    </div>
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">Email Authentication</div>
                                            <div class="text-sm text-gray-600">Receive codes via email</div>
                                        </div>
                                        <InputSwitch v-model="twoFactorSettings.email" />
                                    </div>
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">App Authentication</div>
                                            <div class="text-sm text-gray-600">Use authenticator app</div>
                                        </div>
                                        <InputSwitch v-model="twoFactorSettings.app" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Preferences Tab -->
                    <div v-if="activeTab === 'preferences'" class="space-y-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-6">Preferences</h2>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Notifications -->
                            <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
                                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="pi pi-bell text-blue-500 mr-2"></i>
                                    Notifications
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">Order Updates</div>
                                            <div class="text-sm text-gray-600">Get notified about order status</div>
                                        </div>
                                        <InputSwitch v-model="notificationSettings.orders" />
                                    </div>
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">Promotions</div>
                                            <div class="text-sm text-gray-600">Receive promotional emails</div>
                                        </div>
                                        <InputSwitch v-model="notificationSettings.promotions" />
                                    </div>
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">Newsletter</div>
                                            <div class="text-sm text-gray-600">Weekly newsletter updates</div>
                                        </div>
                                        <InputSwitch v-model="notificationSettings.newsletter" />
                                    </div>
                                </div>
                            </div>

                            <!-- Display Settings -->
                            <div class="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6">
                                <h3 class="font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="pi pi-cog text-purple-500 mr-2"></i>
                                    Display Settings
                                </h3>
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                        <Dropdown
                                            v-model="displaySettings.language"
                                            :options="languages"
                                            optionLabel="label"
                                            optionValue="value"
                                            class="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                        <Dropdown
                                            v-model="displaySettings.currency"
                                            :options="currencies"
                                            optionLabel="label"
                                            optionValue="value"
                                            class="w-full"
                                        />
                                    </div>
                                    <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <div class="font-semibold text-gray-800">Dark Mode</div>
                                            <div class="text-sm text-gray-600">Switch to dark theme</div>
                                        </div>
                                        <InputSwitch v-model="displaySettings.darkMode" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end pt-6 border-t border-gray-200">
                            <Button
                                label="Save Preferences"
                                icon="pi pi-check"
                                @click="savePreferences"
                                class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 border-0 text-white px-8 py-3 rounded-xl font-semibold"
                            />
                            <router-link to="/dashboard" class="flex items-center">
                                <Button
                                    label="Back to Dashboard"
                                    icon="pi pi-spin pi-cog"
                                    severity="secondary"
                                    class="ml-4"
                                />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import InputSwitch from 'primevue/inputswitch'
    import ProgressSpinner from 'primevue/progressspinner'
    import { useOrderStore } from '../../store/orderStore'
    import { storeToRefs } from 'pinia'

    const router = useRouter()

    const orderStore = useOrderStore()
    const { orders } = storeToRefs(orderStore)
    // Reactive data
    const activeTab = ref('profile')
    const isEditing = ref(false)
    const orderFilter = ref('all')
    const loading = ref(false)

    onMounted(async () => {
        loading.value = true
        orderStore.loadOrders()
        setTimeout(() => {
            loading.value = false
        }, 1000)
    })

    // User data
    const user = ref({
        name: 'Te Vin',
        email: 'itkhmersupport@gmail.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'Siem Reap',
        postalCode: '12345',
        joinDate: '2024-01-15',
    })

    const editableUser = ref({ ...user.value })

    // Forms
    const passwordForm = ref({
        current: '',
        new: '',
        confirm: ''
    })

    // Settings
    const twoFactorSettings = ref({
        sms: false,
        email: true,
        app: false
    })

    const notificationSettings = ref({
        orders: true,
        promotions: false,
        newsletter: true
    })

    const displaySettings = ref({
        language: 'en',
        currency: 'USD',
        darkMode: false
    })

    // Sample orders data
    const recentOrders = ref([
        { id: 1001, date: '2024-06-20', status: 'Delivered', total: 129.99 },
        { id: 1002, date: '2024-06-15', status: 'Processing', total: 89.50 },
        { id: 1003, date: '2024-06-10', status: 'Shipped', total: 199.99 },
        { id: 1004, date: '2024-06-05', status: 'Cancelled', total: 45.00 }
    ])

    // Configuration data
    const quickActions = [
        { id: 'orders', label: 'My Orders', icon: 'pi pi-shopping-bag' },
        { id: 'wishlist', label: 'Wishlist', icon: 'pi pi-heart' },
        { id: 'addresses', label: 'Addresses', icon: 'pi pi-map-marker' },
        { id: 'support', label: 'Support', icon: 'pi pi-question-circle' }
    ]

    const tabs = [
        { id: 'profile', label: 'Profile', icon: 'pi pi-user' },
        { id: 'orders', label: 'Orders', icon: 'pi pi-shopping-bag' },
        { id: 'security', label: 'Security', icon: 'pi pi-lock' },
        { id: 'preferences', label: 'Preferences', icon: 'pi pi-cog' }
    ]

    const orderFilters = [
        { label: 'All Orders', value: 'all' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Cancelled', value: 'cancelled' }
    ]

    const languages = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' }
    ]

    const currencies = [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'GBP (£)', value: 'GBP' },
        { label: 'JPY (¥)', value: 'JPY' }
    ]

    // Computed properties
    const filteredOrders = computed(() => {
        if (orderFilter.value === 'all') return orders.value
        return orders.value.filter(order =>
            order.status.toLowerCase() === orderFilter.value.toLowerCase()
        )
    })

    // Methods
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleQuickAction = (actionId: string) => {
    switch (actionId) {
        case 'orders':
            activeTab.value = 'orders'
        break
        case 'wishlist':
            router.push('/viewfavorite')
        break
        case 'addresses':
            
        break
        case 'support':
            
        break
    }
    }

    const toggleEdit = () => {
    if (isEditing.value) {
        editableUser.value = { ...user.value }
    }
        isEditing.value = !isEditing.value
    }

    const saveProfile = () => {
        user.value = { ...editableUser.value }
        isEditing.value = false
    }

    const updatePassword = () => {
    if (passwordForm.value.new !== passwordForm.value.confirm) {
        return
    }
        passwordForm.value = { current: '', new: '', confirm: '' }
    }

    const savePreferences = () => {
    }

    const viewOrder = (orderId: number) => {
        router.push({ name: 'OrderDetails', params: { id: orderId } })
    }

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
            return 'bg-green-100 text-green-800'
            case 'processing':
            return 'bg-yellow-100 text-yellow-800'
            case 'shipped':
            return 'bg-blue-100 text-blue-800'
            case 'cancelled':
            return 'bg-red-100 text-red-800'
            default:
            return 'bg-gray-100 text-gray-800'
        }
    }
</script>

<style scoped>
@media (max-width: 640px) {
    .min-h-screen {
        background-attachment: scroll;
    }
}
</style>