<template>
    <section class="relative bg-gradient-to-r from-[#fff8f3] via-[#fce3c9] to-[#ffe7d6] overflow-hidden w-full h-auto py-12 md:h-[520px] md:py-0">
        <!-- Decorative Background -->
        <img
            src="/banner/banner-hero.png"
            alt="Decor"
            class="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        <div class="relative container mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <!-- Text Content -->
            <div class="z-10 space-y-4 text-center md:text-left">
                <h1 class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                    Discover the Best Deals <br />
                    on <span class="text-orange-500">AllExpress</span>
                </h1>
                <p class="text-gray-700 text-sm sm:text-base max-w-md mx-auto md:mx-0">
                    Shop top electronics, clothing, beauty & more. Fast shipping, trusted brands.
                </p>
                <div>
                    <router-link
                        to="/shop"
                        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
                    >
                        Shop Now
                    </router-link>
                </div>
            </div>

            <!-- Image -->
            <div class="relative z-10 flex justify-center">
                <img
                    src="/banner/IMG_7460.PNG"
                    alt="Promo"
                    class="w-56 sm:w-72 md:w-full max-w-md md:max-w-lg lg:max-w-xl animate-fadeIn
                        filter brightness-110 contrast-125 saturate-150 drop-shadow-xl"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fadeIn {
    animation: fadeIn 1s ease-out;
}
</style>
