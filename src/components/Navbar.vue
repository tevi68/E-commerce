<template>
	<nav class="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
		<!-- Top promotional banner -->
		<!-- <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-medium">
			<div class="container mx-auto px-4 flex items-center justify-center space-x-4">
				<i class="pi pi-gift animate-pulse"></i>
				<span>🎉 Free shipping on orders over $50! Limited time offer</span>
				<i class="pi pi-gift animate-pulse"></i>
			</div>
		</div> -->

		<!-- Mobile Top Bar -->
		<div class="md:hidden flex items-center justify-between p-4 bg-white">
			<div class="flex items-center space-x-3">
				<button @click="toggleMobileMenu" class="text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50">
					<i class="pi pi-bars text-xl"></i>
				</button>
				<router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
					AllExpress
				</router-link>
			</div>
			<div class="flex items-center space-x-2">
				<button @click="toggleSearch" class="text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50">
					<i class="pi pi-search text-xl"></i>
				</button>
				<router-link to="/viewfavorite" class="text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50 relative">
					<i class="pi pi-heart text-xl"></i>
					<span v-if="favorites.length > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-bounce">
						{{ favorites.length }}
					</span>
				</router-link>
				<router-link to="/viewcart" class="text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-orange-50 relative">
					<i class="pi pi-shopping-cart text-xl"></i>
					<span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-bounce">
						{{ totalItems }}
					</span>
				</router-link>
			</div>
		</div>

		<!-- Full Screen Search Overlay -->
		<Transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 transform scale-95"
			enter-to-class="opacity-100 transform scale-100"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="opacity-100 transform scale-100"
			leave-to-class="opacity-0 transform scale-95"
		>
			<div v-if="searchActive" class="md:hidden fixed inset-0 z-50 bg-white">
				<!-- Search Header -->
				<div class="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-red-50">
					<button @click="toggleSearch" class="text-gray-700 hover:text-orange-500 transition-colors duration-200 p-2 rounded-lg hover:bg-white">
						<i class="pi pi-arrow-left text-xl"></i>
					</button>
					<div class="relative w-full mx-4">
						<input
							type="text"
							placeholder="Search for amazing products..."
							class="w-full py-3 pl-4 pr-12 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-white shadow-sm"
							v-model="searchQuery"
							ref="searchInput"
						/>
						<button
							@click="searchQuery = ''"
							class="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
							v-show="searchQuery"
						>
							<i class="pi pi-times"></i>
						</button>
					</div>
					<button 
						@click="executeSearch" 
						class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed" 
						:disabled="!searchQuery.trim()"
					>
						Search
					</button>
				</div>

				<!-- Search Content -->
				<div class="p-6 overflow-y-auto h-[calc(100vh-80px)] bg-gray-50">
					<!-- Recent Searches -->
					<div v-if="recentSearches.length > 0" class="mb-8">
						<div class="flex justify-between items-center mb-4">
							<h3 class="text-lg font-semibold text-gray-800 flex items-center">
								<i class="pi pi-history mr-2 text-orange-500"></i>
								Recent Searches
							</h3>
							<button @click="clearRecentSearches" class="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200 font-medium">
								Clear all
							</button>
						</div>
						<div class="space-y-3">
							<div v-for="(search, index) in recentSearches" :key="index" class="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group" @click="selectRecentSearch(search)">
								<div class="flex items-center">
									<i class="pi pi-clock mr-3 text-gray-400 group-hover:text-orange-500 transition-colors duration-200"></i>
									<span class="text-gray-800 group-hover:text-orange-600 transition-colors duration-200">{{ search }}</span>
								</div>
								<button @click.stop="removeRecentSearch(index)" class="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1">
									<i class="pi pi-times"></i>
								</button>
							</div>
						</div>
					</div>

					<!-- Popular Suggestions -->
					<div>
						<h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
							<i class="pi pi-star mr-2 text-orange-500"></i>
							Trending Searches
						</h3>
						<div class="grid grid-cols-2 gap-3">
							<span v-for="(suggestion, index) in popularSuggestions" :key="index" @click="selectSuggestion(suggestion)" class="text-sm bg-white px-4 py-3 rounded-xl cursor-pointer hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-200 border border-gray-200 hover:border-transparent shadow-sm hover:shadow-md text-center font-medium">
								{{ suggestion }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Desktop Top Bar -->
		<div class="hidden lg:block bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 text-sm">
			<div class="container mx-auto flex justify-between items-center px-6 py-3">
				<!-- Left side -->
				<div class="flex items-center space-x-8">
					<div class="flex items-center space-x-2 hover:text-green-300 transition-colors duration-200">
						<i class="pi pi-check-circle text-green-400"></i>
						<span class="font-medium">100% Authentic Products</span>
					</div>
					<div class="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-200">
						<i class="pi pi-truck text-blue-400"></i>
						<span class="font-medium">Free Worldwide Delivery</span>
					</div>
					<div class="flex items-center space-x-2 hover:text-purple-300 transition-colors duration-200">
						<i class="pi pi-shield text-purple-400"></i>
						<span class="font-medium">Secure Payment</span>
					</div>
				</div>

				<!-- Right side -->
				<div class="flex items-center space-x-6">
					<a href="#" class="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2 group">
						<i class="pi pi-whatsapp group-hover:animate-pulse"></i>
						<span>Live Chat</span>
					</a>
					<a href="#" class="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2">
						<i class="pi pi-question-circle"></i>
						<span>Help Center</span>
					</a>
					<a href="#" class="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-2">
						<i class="pi pi-map-marker"></i>
						<span>Track Order</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Main Desktop Navbar -->
		<div class="hidden md:block container mx-auto px-6">
			<div class="flex items-center justify-between py-4">
				<!-- Logo -->
				<router-link to="/" class="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
					AllExpress
				</router-link>

				<!-- Search Bar -->
				<div class="flex flex-1 mx-12">
					<div class="relative w-full group">
						<input
							type="text"
							placeholder="Search for products, brands and more..."
							class="w-full py-3 px-6 border-2 border-gray-200 rounded-l-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-700 placeholder-gray-500"
							v-model="searchQuery"
						/>
						<button @click="executeSearch" class="absolute right-0 top-0 h-full px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl">
							<i class="pi pi-search text-lg"></i>
						</button>
					</div>
				</div>

				<!-- Right Side Actions -->
				<div class="flex items-center space-x-4">
					<!-- Language Selector -->
					<div class="relative" @keydown.esc="languageDropdownOpen = false" @focusout="languageDropdownOpen = false">
						<button class="flex items-center text-gray-700 hover:text-orange-500 p-3 focus:outline-none rounded-lg hover:bg-orange-50 transition-all duration-200" @click="languageDropdownOpen = !languageDropdownOpen" :aria-expanded="languageDropdownOpen.toString()" aria-haspopup="true" tabindex="0">
							<img :src="languages.find((l) => l.code === selectedLanguage)?.path" alt="Flag" class="w-6 h-4 object-cover rounded-sm shadow-sm"/>
							<span class="ml-2 uppercase font-semibold">{{ selectedLanguage.toUpperCase() }}</span>
							<i class="pi pi-chevron-down ml-1 text-xs transition-transform duration-200" :class="{ 'rotate-180': languageDropdownOpen }"></i>
						</button>

						<Transition
							enter-active-class="transition-all duration-200 ease-out"
							enter-from-class="opacity-0 transform scale-95 translate-y-2"
							enter-to-class="opacity-100 transform scale-100 translate-y-0"
							leave-active-class="transition-all duration-150 ease-in"
							leave-from-class="opacity-100 transform scale-100 translate-y-0"
							leave-to-class="opacity-0 transform scale-95 translate-y-2"
						>
							<div v-if="languageDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100" role="menu" aria-label="Language selector">
								<button
									v-for="lang in languages"
									:key="lang.code"
									@click="selectLanguage(lang.code)"
									class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 flex items-center transition-all duration-200"
									:class="{ 'bg-gradient-to-r from-orange-50 to-red-50 font-semibold text-orange-600': selectedLanguage === lang.code }"
									role="menuitem"
									tabindex="0"
								>
									<img :src="lang.path" alt="Flag" class="w-6 h-4 mr-3 object-cover rounded-sm shadow-sm"/>
									{{ lang.label }}
								</button>
							</div>
						</Transition>
					</div>

					<!-- Account Dropdown -->
					<div class="relative" @keydown.esc="isOpen = false" @focusout="handleFocusOut">
						<button
							@click="toggleDropdown"
							:aria-expanded="isOpen.toString()"
							class="flex items-center text-gray-700 hover:text-orange-500 p-3 focus:outline-none rounded-lg hover:bg-orange-50 transition-all duration-200 group"
							tabindex="0"
						>
							<i class="pi pi-user text-xl group-hover:scale-110 transition-transform duration-200" style="font-size: 1.3rem;"></i>
							<span class="ml-2 font-medium">Account</span>
							<i class="pi pi-chevron-down ml-1 text-xs transition-transform duration-200" :class="{ 'rotate-180': isOpen }"></i>
						</button>

						<Transition
							enter-active-class="transition-all duration-200 ease-out"
							enter-from-class="opacity-0 transform scale-95 translate-y-2"
							enter-to-class="opacity-100 transform scale-100 translate-y-0"
							leave-active-class="transition-all duration-150 ease-in"
							leave-from-class="opacity-100 transform scale-100 translate-y-0"
							leave-to-class="opacity-0 transform scale-95 translate-y-2"
						>
							<div v-if="isOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100" role="menu" aria-label="Account menu">
								<router-link to="/login" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-sign-in mr-3"></i> Sign In
								</router-link>
								<router-link to="/register" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-user-plus mr-3"></i> Register
								</router-link>
								<router-link to="/myaccount" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-user mr-3"></i> My Account
								</router-link>
								<router-link to="/myorders" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-shopping-cart mr-3"></i> My Orders
								</router-link>
								<router-link to="/viewfavorite" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-heart mr-3"></i> Wishlist
								</router-link>
								<div class="border-t border-gray-200 my-2"></div>
								<button @click="signOut" class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200" role="menuitem" tabindex="0">
									<i class="pi pi-sign-out mr-3"></i> Sign Out
								</button>
							</div>
						</Transition>
					</div>

					<!-- Favorites -->
					<router-link to="/viewfavorite" class="flex items-center text-gray-700 hover:text-red-500 p-3 relative rounded-lg hover:bg-red-50 transition-all duration-200 group" aria-label="View favorites">
						<i class="pi pi-heart text-xl group-hover:scale-110 transition-transform duration-200" style="font-size: 1.3rem;"></i>
						<span v-if="favorites.length > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-bounce" aria-live="polite">
							{{ favorites.length }}
						</span>
					</router-link>

					<!-- Cart -->
					<router-link to="/viewcart" class="flex items-center text-gray-700 hover:text-orange-500 p-3 relative rounded-lg hover:bg-orange-50 transition-all duration-200 group">
						<i class="pi pi-shopping-cart text-xl group-hover:scale-110 transition-transform duration-200" style="font-size: 1.3rem;"></i>
						<span v-if="totalItems > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-bounce">
							{{ totalItems }}
						</span>
					</router-link>
				</div>
			</div>

			<!-- Navigation Links -->
			<div class="flex items-center py-4 space-x-8 border-t border-gray-100">
				<!-- Categories Dropdown -->
				<div class="relative" @keydown.esc="isCategoryOpen = false" @focusout="isCategoryOpen = false">
					<button @click="toggleCategory" :aria-expanded="isCategoryOpen.toString()" class="flex items-center text-gray-700 hover:text-orange-500 p-3 focus:outline-none rounded-lg hover:bg-orange-50 transition-all duration-200 group" tabindex="0">
						<i class="pi pi-list text-lg group-hover:scale-110 transition-transform duration-200"></i>
						<span class="ml-2 font-medium">Categories</span>
						<i class="pi pi-chevron-down ml-2 text-xs transition-transform duration-200" :class="{ 'rotate-180': isCategoryOpen }"></i>
					</button>

					<Transition
						enter-active-class="transition-all duration-200 ease-out"
						enter-from-class="opacity-0 transform scale-95 translate-y-2"
						enter-to-class="opacity-100 transform scale-100 translate-y-0"
						leave-active-class="transition-all duration-150 ease-in"
						leave-from-class="opacity-100 transform scale-100 translate-y-0"
						leave-to-class="opacity-0 transform scale-95 translate-y-2"
					>
						<div v-if="isCategoryOpen" class="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-3 z-50 border border-gray-100" role="menu" aria-label="Category menu">
							<router-link to="/electronics" class="px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 flex items-center transition-all duration-200 group" @click="isCategoryOpen = false" role="menuitem">
								<i class="pi pi-mobile mr-3 text-lg text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> Electronics
							</router-link>
							<router-link to="/clothing" class="px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 flex items-center transition-all duration-200 group" @click="isCategoryOpen = false" role="menuitem">
								<i class="pi pi-shopping-bag mr-3 text-lg text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> Fashion & Clothing
							</router-link>
							<router-link to="/home-garden" class="px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 flex items-center transition-all duration-200 group" @click="isCategoryOpen = false" role="menuitem">
								<i class="pi pi-home mr-3 text-lg text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> Home & Garden
							</router-link>
							<router-link to="/beauty" class="px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 flex items-center transition-all duration-200 group" @click="isCategoryOpen = false" role="menuitem">
								<i class="pi pi-star mr-3 text-lg text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> Beauty & Health
							</router-link>
							<router-link to="/toys" class="px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 flex items-center transition-all duration-200 group" @click="isCategoryOpen = false" role="menuitem">
								<i class="pi pi-gift mr-3 text-lg text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> Toys & Games
							</router-link>
						</div>
					</Transition>
				</div>

				<!-- Navigation Links -->
				<router-link to="/" class="nav-link font-medium text-gray-700 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-orange-50 relative group">
					Home
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
				</router-link>
				<router-link to="/shopcard" class="nav-link font-medium text-gray-700 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-orange-50 relative group">
					Shop
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
				</router-link>
				<router-link to="/blog" class="nav-link font-medium text-gray-700 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-orange-50 relative group">
					Blog
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
				</router-link>
				<router-link to="/about" class="nav-link font-medium text-gray-700 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-orange-50 relative group">
					About
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
				</router-link>
				<router-link to="/contact" class="nav-link font-medium text-gray-700 hover:text-orange-500 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-orange-50 relative group">
					Contact
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300"></span>
				</router-link>
			</div>
		</div>

		<!-- Mobile Menu -->
		<Transition
			enter-active-class="transition-all duration-300 ease-out"
			enter-from-class="opacity-0 transform -translate-y-4"
			enter-to-class="opacity-100 transform translate-y-0"
			leave-active-class="transition-all duration-200 ease-in"
			leave-from-class="opacity-100 transform translate-y-0"
			leave-to-class="opacity-0 transform -translate-y-4"
		>
			<div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg max-h-[80vh] overflow-y-auto">
				<div class="p-6 space-y-4">
					<!-- User Section -->
					<div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
						<div class="flex items-center space-x-3">
							<div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
								<i class="pi pi-user text-white"></i>
							</div>
							<div>
								<p class="font-semibold text-gray-800">Welcome!</p>
								<p class="text-sm text-gray-600">Sign in for better experience</p>
							</div>
						</div>
					</div>

					<!-- Navigation Links -->
					<div class="space-y-2">
						<router-link to="/" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-home mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Home</span>
						</router-link>
						<router-link to="/shopcard" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-shopping-cart mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Shop</span>
						</router-link>
						<router-link to="/blog" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-book mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Blog</span>
						</router-link>
						<router-link to="/about" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-info-circle mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">About</span>
						</router-link>
						<router-link to="/contact" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-envelope mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Contact</span>
						</router-link>
					</div>

					<!-- Categories Section -->
					<div class="border-t border-gray-200 pt-4">
						<div class="font-semibold mb-3 pl-2 flex items-center text-gray-800">
							<i class="pi pi-list mr-3 text-orange-500"></i> 
							<span>Categories</span>
						</div>
						<div class="space-y-2 pl-6">
							<router-link to="/electronics" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-mobile mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Electronics</span>
							</router-link>
							<router-link to="/clothing" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-shopping-bag mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Fashion & Clothing</span>
							</router-link>
							<router-link to="/home-garden" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-home mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Home & Garden</span>
							</router-link>
							<router-link to="/beauty" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-star mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Beauty & Health</span>
							</router-link>
							<router-link to="/toys" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-gift mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Toys & Games</span>
							</router-link>
						</div>
					</div>

					<!-- Account Section -->
					<div class="border-t border-gray-200 pt-4">
						<div class="space-y-2">
							<router-link to="/myaccount" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-user mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
								<span class="font-medium">My Account</span>
							</router-link>
							<router-link to="/myorders" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-shopping-cart mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
								<span class="font-medium">My Orders</span>
							</router-link>
							<router-link to="/viewfavorite" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 group">
								<i class="pi pi-heart mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
								<span class="font-medium">Wishlist</span>
								<span v-if="favorites.length > 0" class="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 font-semibold">
									{{ favorites.length }}
								</span>
							</router-link>
						</div>
					</div>

					<!-- Settings Section -->
					<div class="border-t border-gray-200 pt-4">
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
							<div class="flex items-center text-gray-700">
								<i class="pi pi-globe mr-3 text-lg"></i>
								<span class="font-medium">Language</span>
							</div>
							<select v-model="selectedLanguage" class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
								<option v-for="lang in languages" :key="lang.code" :value="lang.code">
									{{ lang.label }}
								</option>
							</select>
						</div>
					</div>

					<!-- Quick Actions -->
					<div class="border-t border-gray-200 pt-4">
						<div class="grid grid-cols-2 gap-3">
							<a href="#" class="flex items-center justify-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group">
								<i class="pi pi-whatsapp mr-2 text-green-500 group-hover:scale-110 transition-transform duration-200"></i>
								<span class="text-green-700 font-medium">Live Chat</span>
							</a>
							<a href="#" class="flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 group">
								<i class="pi pi-question-circle mr-2 text-blue-500 group-hover:scale-110 transition-transform duration-200"></i>
								<span class="text-blue-700 font-medium">Help</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	</nav>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { useCartStore } from '../store/cartStore';
import { storeToRefs } from 'pinia';
import useFavorites from '../store/favoritesStore';

// Stores
const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);
const { favorites } = useFavorites();

// UI State
const mobileMenuOpen = ref(false);
const searchActive = ref(false);
const isCategoryOpen = ref(false);
const isOpen = ref(false);
const languageDropdownOpen = ref(false);

// Search functionality
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const recentSearches = ref<string[]>([]);
const popularSuggestions = ref<string[]>([
	'iPhone 14 Pro Max',
	'Samsung Galaxy S24',
	'MacBook Air M2',
	'Nike Air Jordan',
	'PlayStation 5',
	'AirPods Pro',
	'Smart Watch',
	'Wireless Earbuds',
	'Gaming Laptop',
	'Bluetooth Speaker',
	'Skincare Set',
	'Winter Jacket'
]);

// Language selection
const selectedLanguage = ref('en');
const languages = [
	{ code: 'en', label: 'English (EN)', path: '/lan/en.png' },
	{ code: 'kh', label: 'Khmer (KH)', path: '/lan/kh.png' },
];

// Lifecycle hooks
onMounted(() => {
	const savedSearches = localStorage.getItem('recentSearches');
	if (savedSearches) {
		try {
			recentSearches.value = JSON.parse(savedSearches);
		} catch (e) {
			console.error('Failed to parse recent searches:', e);
			recentSearches.value = [];
		}
	}
});

onUnmounted(() => {
	localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value));
});

// UI Toggles
const toggleMobileMenu = () => {
	mobileMenuOpen.value = !mobileMenuOpen.value;
	searchActive.value = false;
};

const toggleSearch = () => {
	searchActive.value = !searchActive.value;
	if (searchActive.value) {
		nextTick(() => {
			searchInput.value?.focus();
			document.addEventListener('keydown', handleKeyDown);
		});
		mobileMenuOpen.value = false;
	} else {
		document.removeEventListener('keydown', handleKeyDown);
	}
};

const toggleCategory = () => {
	isCategoryOpen.value = !isCategoryOpen.value;
};

const toggleDropdown = () => {
	isOpen.value = !isOpen.value;
};

// Language handling
const selectLanguage = (code: string) => {
	selectedLanguage.value = code;
	languageDropdownOpen.value = false;
};

// Search functionality
const executeSearch = () => {
	const query = searchQuery.value.trim();
	if (!query) return;

	// Update recent searches
	const existingIndex = recentSearches.value.indexOf(query);
	if (existingIndex > -1) {
		recentSearches.value.splice(existingIndex, 1);
	}
	recentSearches.value.unshift(query);
	
	// Keep only last 5 searches
	if (recentSearches.value.length > 5) {
		recentSearches.value = recentSearches.value.slice(0, 5);
	}

	// Reset search state
	searchActive.value = false;
	document.removeEventListener('keydown', handleKeyDown);
	
	// TODO: Implement actual search navigation
	console.log('Searching for:', query);
};

const selectRecentSearch = (search: string) => {
	searchQuery.value = search;
	executeSearch();
};

const selectSuggestion = (suggestion: string) => {
	searchQuery.value = suggestion;
	executeSearch();
};

const removeRecentSearch = (index: number) => {
	recentSearches.value.splice(index, 1);
};

const clearRecentSearches = () => {
	recentSearches.value = [];
};

// Event handlers
const handleKeyDown = (e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		executeSearch();
	}
	if (e.key === 'Escape') {
		searchActive.value = false;
	}
};

const handleFocusOut = (event: FocusEvent) => {
	const currentTarget = event.currentTarget as HTMLElement;
	if (!currentTarget.contains(event.relatedTarget as Node)) {
		isOpen.value = false;
	}
};

const signOut = () => {
	console.log('Signing out...');
	isOpen.value = false;
};
</script>


<style scoped>
.nav-link {
	display: flex;
	align-items: center;
	padding: 0.5rem 0;
	color: #4b5563;
	font-weight: 500;
	transition: all 0.2s ease;
	white-space: nowrap;
}

.nav-link:hover {
	color: #f97316;
	transform: translateY(-1px);
}

.nav-link.router-link-active {
	color: #f97316;
	border-bottom: 2px solid #f97316;
}

.nav-link-mobile {
	padding: 0.75rem 0.5rem;
	color: #4b5563;
	display: flex;
	align-items: center;
	border-radius: 0.375rem;
	transition: all 0.2s ease;
}

.nav-link-mobile:hover {
	color: #f97316;
	background-color: #fff7ed;
}

.nav-link-mobile.router-link-active {
	color: #f97316;
	font-weight: 500;
	background-color: #fff7ed;
}

/* Smooth transitions for dropdowns */
.group:hover .group-hover\:block {
	display: block;
	animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-5px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>