import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const DEFAULT_USD_TO_KHR = 4100

export const useCurrencyStore = defineStore('currency', () => {
  const currency = ref(localStorage.getItem('currency') || 'USD')
  const USD_TO_KHR = ref(parseFloat(localStorage.getItem('USD_TO_KHR') || DEFAULT_USD_TO_KHR.toString()))
  
  function setCurrency(val: string) {
    currency.value = val
    localStorage.setItem('currency', val)
  }
  
  function setUSDToKHR(rate: number) {
    USD_TO_KHR.value = rate
    localStorage.setItem('USD_TO_KHR', rate.toString())
  }
  
  function getDisplayPrice(amount: number): string {
    if (currency.value === 'KHR') {
      return 'KHR ' + Math.round(amount * USD_TO_KHR.value).toLocaleString()
    } else {
      return 'USD ' + amount.toLocaleString(undefined, { maximumFractionDigits: 2 })
    }
  }
  
  // Keep currency in sync with localStorage if changed elsewhere
  watch(currency, (val) => {
    localStorage.setItem('currency', val)
  })
  
  watch(USD_TO_KHR, (val) => {
    localStorage.setItem('USD_TO_KHR', val.toString())
  })
  
  return { 
    currency, 
    setCurrency, 
    getDisplayPrice, 
    USD_TO_KHR,
    setUSDToKHR
  }
})