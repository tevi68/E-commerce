<template>
	<nav class="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
		<!-- Top promotional banner -->
		<!-- <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 text-sm font-medium xl:hidden">
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
			<div class="flex items-center justify-between py-3">
				<!-- Logo -->
				<router-link to="/" class="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
					AllExpress
				</router-link>

				<!-- Enhanced Search Bar Component -->
				<div class="flex flex-1 mx-12">
					<div @mouseenter="isHoveringSearch = true" @mouseleave="handleSearchMouseLeave" class="relative w-full group">
						
						<!-- Search Input -->
						<div class="relative transform transition-all duration-300 group-hover:scale-[1.02]">
						<input
							type="text"
							placeholder="Search for products, brands and more..."
							class="w-full py-3 px-6 border-2 border-gray-200 rounded-l-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-700 placeholder-gray-500"
							v-model="searchQuery"
							@focus="searchActive = true"
							ref="searchInput"
						/>
						</div>
						
						<!-- Search Button -->
						<router-link to="/shopcard" class="absolute right-0 top-0 h-full px-6 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-r-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
							aria-label="Search"
						>
							<i class="pi pi-search text-xl"></i>
						</router-link>

						<!-- Search Dropdown -->
						<div v-if="searchActive" class="absolute z-50 w-full mt-3 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up max-h-[80vh] flex flex-col">
						
							<!-- Header Section -->
							<div class="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-1">
								<div class="bg-white/80 backdrop-blur-sm rounded-t-3xl p-6">
								
								<!-- Recent Searches -->
								<div v-if="recentSearches.length > 0" class="mb-6">
									<div class="flex justify-between items-center mb-4">
									<h3 class="text-sm font-bold text-gray-700 flex items-center">
										<i class="pi pi-clock text-orange-500 mr-2"></i>
										RECENT SEARCHES
									</h3>
									<button @click="clearRecentSearches" 
											class="text-xs text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200">
										Clear all
									</button>
									</div>
									<div class="max-h-48 overflow-y-auto custom-scrollbar">
									<ul class="space-y-1 pr-2">
										<li v-for="(search, index) in recentSearches" 
										:key="index"
										class="flex justify-between items-center py-3 px-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-xl cursor-pointer transition-all duration-200 group">
										<span @click="selectRecentSearch(search)" class="flex-1 flex items-center">
											<i class="pi pi-history text-gray-400 mr-3 group-hover:text-orange-500 transition-colors duration-200"></i>
											<span class="text-gray-700 group-hover:text-gray-900 font-medium">{{ search }}</span>
										</span>
										<button @click.stop="removeRecentSearch(index)" 
												class="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-all duration-200">
											<i class="pi pi-times text-sm"></i>
										</button>
										</li>
									</ul>
									</div>
								</div>
								
								<!-- Popular Suggestions -->
								<div class="mb-6">
									<h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
										<i class="pi pi-star text-orange-500 mr-2"></i>
										POPULAR SUGGESTIONS
									</h3>
									<div class="max-h-40 overflow-y-auto custom-scrollbar">
										<!-- Scrollable Main Content -->
										<div class="flex-1 overflow-y-auto custom-scrollbar">
											<!-- Featured Products -->
											<div class="p-6">
											<div class="flex justify-between items-center mb-4">
												<h3 class="text-sm font-bold text-gray-700 flex items-center">
												<i class="pi pi-heart text-orange-500 mr-2"></i>
												FEATURED PRODUCTS
												</h3>
												<button @click="showMoreRecommendations"
														class="text-sm text-orange-500 hover:text-orange-600 flex items-center cursor-pointer font-medium hover:underline transition-all duration-200">
												<span>Other recommendations</span>
												<i class="pi pi-arrow-right ml-1 text-xs"></i>
												</button>
											</div>
											
											<div class="grid grid-cols-5 gap-4 pr-2">
												<div v-for="(product, index) in visibleFeaturedProducts"
												:key="'product-'+index"
												@click="selectSuggestion(product.title)"
												class="p-3 border border-gray-100 rounded-2xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group">
												
												<div class="w-full h-24 mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative">
													<img :src="product.image" 
													:alt="product.title"
													class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
													@error="handleImageError"/>
													<div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
												</div>
												
												<div class="font-semibold text-sm line-clamp-2 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
													{{ product.title }}
												</div>
												</div>
											</div>
											</div>

											<!-- Discover More -->
											<div class="bg-gradient-to-r from-gray-50 to-white p-6 border-t border-gray-100">
											<h3 class="text-sm font-bold text-gray-700 mb-4 flex items-center">
												<i class="pi pi-compass text-orange-500 mr-2"></i>
												DISCOVER MORE
											</h3>
											<div class="flex flex-wrap gap-3 pr-2">
												<span v-for="(item, index) in discoverMoreItems"
												:key="'discover-'+index"
												@click="selectSuggestion(item)"
												class="inline-flex items-center px-4 py-2 bg-white hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 rounded-full text-sm cursor-pointer border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-md font-medium text-gray-600 hover:text-gray-900">
												<i class="pi pi-search text-xs mr-1 opacity-60"></i>
												{{ item }}
												</span>
											</div>
											</div>
										</div>
										
										<div class="flex flex-wrap gap-3 pr-2">
											<span v-for="(suggestion, index) in popularSuggestions" 
											:key="'suggestion-'+index"
											@click="selectSuggestion(suggestion)"
											class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-orange-100 hover:to-red-100 rounded-full text-sm cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-orange-300">
											<i class="pi pi-hashtag text-xs mr-1 opacity-60"></i>
											{{ suggestion }}
											</span>
										</div>
									</div>
								</div>
								</div>
							</div>
							
							
						</div>
					</div>
				</div>

				<!-- Right Side Actions -->
				<div class="flex items-center space-x-4">
					<!-- Language Selector -->
					<div class="relative" @keydown.esc="languageDropdownOpen = false" @focusout="languageDropdownOpen = false">
						<button class="flex items-center text-gray-700 hover:text-orange-500 p-3 focus:outline-none rounded-lg hover:bg-orange-50 transition-all duration-200" @click="languageDropdownOpen = !languageDropdownOpen" :aria-expanded="languageDropdownOpen"  aria-haspopup="true" tabindex="0">
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
							:aria-expanded="isOpen"
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
			<div class="flex items-center justify-between py-0 border-t border-gray-100">
				<!-- Left Section - Main Navigation -->
				<div class="flex items-center space-x-8">
					<!-- Categories Dropdown -->
					<div class="relative" @keydown.esc="isCategoryOpen = false" @focusout="isCategoryOpen = false">
						<button @click="toggleCategory" :aria-expanded="isCategoryOpen" class="flex items-center text-gray-700 hover:text-orange-500 p-3 focus:outline-none rounded-lg hover:bg-orange-50 transition-all duration-200 group" tabindex="0">
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

				<!-- Right Section - Support Contacts -->
				<div class="flex items-center space-x-6">
					<!-- Enhanced Support Contact -->
					<div class="relative group">
						<a href="tel:+1234567890" class="flex items-center px-4 py-3 hover:-translate-y-0.5">
							<!-- Animated Icon Container -->
							<div class="relative mr-4">
								<div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
								<i class="pi pi-headphones text-orange-500 group-hover:text-orange-600 transition-all duration-300" style="font-size: 1.5rem;"></i>
								</div>
								<!-- Pulsing Animation -->
								<div class="absolute inset-0 rounded-full border-2 border-orange-200 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity duration-300"></div>
							</div>
							
							<!-- Contact Info -->
							<div class="text-left">
								<div class="text-xs font-medium text-gray-500 mb-1">24/7 SUPPORT</div>
								<div class="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
								(123) 456-7890
								</div>
							</div>
							
							<!-- Call Now Badge -->
							<div class="ml-6 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-sm transform group-hover:scale-105 transition-transform duration-300">
								CALL NOW
							</div>
						</a>
						
						<!-- Tooltip -->
						<div class="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
							Click to call our support team
							<div class="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-l-transparent border-r-transparent"></div>
						</div>
					</div>
				</div>
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
			<div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg max-h-[100vh] overflow-y-auto">
				<div class="p-6 space-y-4">
					<!-- User Section -->
					<div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
						<div class="flex items-center space-x-3">
							<div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
								<i class="pi pi-user text-white"></i>
							</div>
							<div>
								<router-link to="/login" class="font-semibold text-gray-800 hover:text-orange-500 transition-colors duration-200">
									<p class="font-semibold text-gray-800">Welcome!</p>
									<p class="text-sm text-gray-600">Sign in for better experience</p>
								</router-link>
							</div>
						</div>
					</div>

					<!-- Navigation Links -->
					<div class="space-y-2">
						<router-link @click="closeMobileMenu" to="/" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-home mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Home</span>
						</router-link>
						<router-link @click="closeMobileMenu" to="/shopcard" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-shopping-cart mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Shop</span>
						</router-link>
						<router-link @click="closeMobileMenu" to="/blog" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-book mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">Blog</span>
						</router-link>
						<router-link @click="closeMobileMenu" to="/about" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
							<i class="pi pi-info-circle mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
							<span class="font-medium">About</span>
						</router-link>
						<router-link @click="closeMobileMenu" to="/contact" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
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
							<router-link @click="closeMobileMenu" to="/electronics" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-mobile mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Electronics</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/clothing" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-shopping-bag mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Fashion & Clothing</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/home-garden" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-home mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Home & Garden</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/beauty" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-star mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Beauty & Health</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/toys" class="nav-link-mobile flex items-center p-3 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-gift mr-3 text-orange-400 group-hover:scale-110 transition-transform duration-200"></i> 
								<span>Toys & Games</span>
							</router-link>
						</div>
					</div>

					<!-- Account Section -->
					<div class="border-t border-gray-200 pt-4">
						<div class="space-y-2">
							<router-link @click="closeMobileMenu" to="/myaccount" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-user mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
								<span class="font-medium">My Account</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/myorders" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group">
								<i class="pi pi-shopping-cart mr-4 text-lg group-hover:scale-110 transition-transform duration-200"></i> 
								<span class="font-medium">My Orders</span>
							</router-link>
							<router-link @click="closeMobileMenu" to="/viewfavorite" class="nav-link-mobile flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 group">
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
import { ref, nextTick, onMounted, onUnmounted, computed, watch } from 'vue';
import { useCartStore } from '../store/cartStore';
import { storeToRefs } from 'pinia';
import useFavorites from '../store/favoritesStore';
import { products } from '../store/storeProduct';
import type { Product } from '../store/storeProduct';

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
	//=================== ផ្ទុកផលិតផលដែលបានណែនាំ
	allFeaturedProducts.value = products
		.filter(product => product.isOnProduct && product.today)
		.sort(() => Math.random() - 0.5); //=================== ដាក់រៀងចៃដន្យ
});

onUnmounted(() => {
	localStorage.setItem('recentSearches', JSON.stringify(recentSearches.value));
	//=================== ឈប់ប្រើ event listener
	document.removeEventListener('keydown', handleKeyDown);
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

//=================== របស់ផ្សេងទៀតសម្រាប់ស្វែងរក
const discoverMoreItems = ref([
	'smartwatch',
	'headphones',
	'fitness tracker',
	'gaming controller',
	'wireless earbuds',
	'sneakers',
	'leather wallet',
	'sunglasses'
]);
//=================== ផលិតផលដែលបានណែនាំ
const currentRecommendationIndex = ref(0);
const productsPerPage = 5; //=================== ចំនួនបង្ហាញក្នុងមួយទំព័រ
const allFeaturedProducts = ref<Product[]>([]); //=================== ទាំងអស់ដែលត្រូវបានជ្រើសរើស

//=================== បង្ហាញផលិតផលដែលអាចមើលបានបច្ចុប្បន្ន
const visibleFeaturedProducts = computed(() => {
	const start = currentRecommendationIndex.value * productsPerPage;
	return allFeaturedProducts.value.slice(start, start + productsPerPage);
});
//=================== ប្តូរទំព័រផលិតផលណែនាំ
const showMoreRecommendations = () => {
	const totalPages = Math.ceil(allFeaturedProducts.value.length / productsPerPage);
	currentRecommendationIndex.value = (currentRecommendationIndex.value + 1) % totalPages;
};

//=================== ប្រើ placeholder បើរូបភាពមិនទាន់មាន
const handleImageError = (event: Event) => {
	const img = event.target as HTMLImageElement;
	img.src = 'https://via.placeholder.com/150?text=No+Image';
};

const signOut = () => {
	console.log('Signing out...');
	isOpen.value = false;
};
function closeMobileMenu() {
  mobileMenuOpen.value = false;
}

const isHoveringSearch = ref(false);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;

const handleSearchMouseLeave = () => {
  isHoveringSearch.value = false;

  // Delay closing to give user chance to return
  closeTimeout = setTimeout(() => {
    if (!isHoveringSearch.value && !searchInput.value?.matches(':focus')) {
      searchActive.value = false;
    }
  }, 300); // 300ms delay
};

// Cancel timeout if user returns mouse
watch(isHoveringSearch, (hovering) => {
  if (hovering && closeTimeout) {
    clearTimeout(closeTimeout);
    closeTimeout = null;
  }
});

</script>


<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  position: relative;
}

.nav-link:hover {
  color: #ea580c;
}

.nav-link.router-link-active {
  color: #ea580c;
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ea580c;
  transform: scaleX(1);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.nav-link-mobile {
  padding: 0.75rem 1rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  margin: 0.25rem 0;
}

.nav-link-mobile:hover {
  color: #ea580c;
  background-color: #ffedd5;
  transform: translateX(2px);
}

.nav-link-mobile.router-link-active {
  color: #fff;
  font-weight: 600;
  background-color: #ea580c;
  box-shadow: 0 2px 4px rgba(234, 88, 12, 0.2);
}

/* Enhanced dropdown animations */
.group:hover .group-hover\:block {
  display: block;
  animation: fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add a subtle scale effect on hover for better interactivity */
.nav-item:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>