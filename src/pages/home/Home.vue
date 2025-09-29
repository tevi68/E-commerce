<template>
    <Banner />
    <Today />
    <WeeklyDeals />
    <ShopByCategory />
    <Produict_Item />
    <div class="p-4">
      <span>
        {{ currencyStore.getDisplayPrice(samplePrice) }}
      </span>
    </div>
</template>

<script setup lang="ts">
import Banner from '../../components/Banner.vue';
import Today from '../../pages/hom-page/today.vue/TodayDealCard.vue';
import ShopByCategory from '../hom-page/categories/ShopByCategory.vue';
import WeeklyDeals from '../hom-page/categories/WeeklyDeals.vue';
import Produict_Item from '../hom-page/product/Produict.vue';
import { useCurrencyStore } from '../../store/currencyStore'
const currencyStore = useCurrencyStore();
const samplePrice = 100;
</script>
