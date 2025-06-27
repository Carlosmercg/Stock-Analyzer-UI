<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import StockCard from './StockCard.vue'
import { fetchStocks } from '../services/stockService'
import type { Stock } from '../types/Stock'


const stocks = ref<Stock[]>([])
const currentPage = ref(1)
const itemsPerPage = 21
const totalItems = ref(0)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const loadPage = async (page: number) => {
  try {
    const response = await fetchStocks(page, itemsPerPage)
    stocks.value = response.data
    totalItems.value = response.total
  } catch (error) {
    console.error('Error cargando stocks:', error)
  }
}

onMounted(() => loadPage(currentPage.value))

watch(currentPage, (newPage) => loadPage(newPage))

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
const prevPage = () => {
    if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="px-4 py-8">
    <div class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StockCard
        v-for="item in stocks"
        :key="item.ID"
        v-bind="item"
      />
    </div>

    <!-- Pagination Controls -->
    <div class="mt-8 flex justify-center gap-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        Anterior
      </button>
      <span class="self-center text-black">Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
