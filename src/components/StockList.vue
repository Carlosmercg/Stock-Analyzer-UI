<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import StockCard from './StockCard.vue'
import { fetchStocks, fetchFilteredStocks, fetchTopStocks } from '../services/stockService'
import type { Stock } from '../types/Stock'
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()

const stocks = ref<Stock[]>([])
const topStocks = ref<Stock[]>([])
const currentPage = ref(1)
const itemsPerPage = 21
const totalItems = ref(0)
const scrollContainer = ref<HTMLElement | null>(null)

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const goToCompany = (company: string) => {
  router.push({ name: 'CompanyDetail', params: { company } })
}

const loadPage = async (page: number) => {
  try {
    const query = route.query

    const filters = {
      company: typeof query.company === 'string' ? query.company.trim() : undefined,
      rating_to: typeof query.ratingto === 'string' ? query.ratingto : undefined,
      brokerage: typeof query.brokerage === 'string' ? query.brokerage : undefined,
      // Puedes agregar aquí más filtros si los usas luego
    }

    const hasAnyFilter = Object.values(filters).some((v) => !!v)

    if (hasAnyFilter) {
    const result = await fetchFilteredStocks(filters, page, itemsPerPage)
    stocks.value = result.data
    totalItems.value = result.total
    } else {
      const response = await fetchStocks(page, itemsPerPage)
      stocks.value = response.data
      totalItems.value = response.total
    }
  } catch (error) {
    console.error('Error cargando stocks:', error)
  }
}


const loadTopStocks = async () => {
  try {
    topStocks.value = await fetchTopStocks()
  } catch (error) {
    console.error('Error cargando top stocks:', error)
  }
}

onMounted(() => {
  loadPage(currentPage.value)
  loadTopStocks()
})

watch(currentPage, (newPage) => loadPage(newPage))


watch(() => route.query, () => {
  currentPage.value = 1
  loadPage(1)
})


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

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}
const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>

<template>
  <div class="px-4 py-1">
    <!-- 🔝 Top 20 Recomendadas -->
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-slate-800 mb-4">Top 20 Acciones Recomendadas</h2>

      <div class="relative">
        <button
          @click="scrollLeft"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-700 text-white p-2 rounded-full shadow hover:bg-slate-600"
        >
          ‹
        </button>

        <div
          ref="scrollContainer"
          class="flex overflow-x-auto gap-4 px-10 scroll-smooth no-scrollbar"
        >
        <div
          v-for="(stock, i) in topStocks"
          :key="stock.ID"
          @click="goToCompany(stock.Company)"
          :class="[
          'min-w-[240px] flex-shrink-0 border rounded-lg p-4 shadow-sm cursor-pointer transition',
          'hover:bg-slate-200',
          route.params.company === stock.Company ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-300'
          ]"
            >
            <div class="text-sm text-gray-500">#{{ i + 1 }}</div>
            <div class="font-semibold text-lg truncate">{{ stock.Company }}</div>
            <div class="text-sm">🎯 {{ stock.TargetFrom }} → {{ stock.TargetTo }}</div>
            <div class="text-sm">🏢 {{ stock.Brokerage }}</div>
            <div class="text-sm">⭐ {{ stock.RatingTo }}</div>
          </div>
        </div>

        <button
          @click="scrollRight"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-700 text-white p-2 rounded-full shadow hover:bg-slate-600"
        >
          ›
        </button>
      </div>
    </div>

    <!-- 📄 Lista de Tarjetas -->
    <div class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StockCard
        v-for="item in stocks"
        :key="item.ID"
        v-bind="item"
      />
    </div>

    <!-- 🔽 Controles de Paginación -->
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

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
