<script setup lang="ts">
import type { Stock } from '../types/Stock'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { fetchFilteredStocks, fetchTopByBrokerage } from '../services/stockService'

const route = useRoute()
const router = useRouter()
const companyName = route.params.company as string

const stock = ref<Stock | null>(null)
const topByBrokerage = ref<Stock[]>([])
const scrollContainer = ref<HTMLElement | null>(null)

const loadData = async (company: string) => {
  const results = await fetchFilteredStocks({ company })
  stock.value = results.data[0] || null

  if (stock.value?.Brokerage) {
    const top = await fetchTopByBrokerage(stock.value.Brokerage)
    topByBrokerage.value = top
  } else {
    topByBrokerage.value = []
  }
}
onMounted(() => {
  loadData(companyName)
})

watch(() => route.params.company, async (newCompany) => {
  if (typeof newCompany === 'string') {
    await loadData(newCompany)
  }
})

const formatDate = (iso: string) => new Date(iso).toLocaleDateString()

const goToCompany = (company: string) => {
  router.push({ name: 'CompanyDetail', params: { company } })
}

const scrollLeft = () => {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })
}
const scrollRight = () => {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })
}
</script>


<template>
  <div class="min-h-screen bg-slate-200 py-12 px-4 flex justify-center items-start">
    <div class="w-full max-w-6xl space-y-12">

      <!-- 🏢 INFORMACIÓN DE LA EMPRESA -->
      <div class="w-full bg-white rounded-xl p-12 shadow-sm text-black space-y-8">
        <div v-if="stock">
          <div class="text-center mb-4">
            <h1 class="text-5xl font-bold text-slate-800">
              {{ stock.Company }}
            </h1>
            <div
              v-if="stock.Ticker"
              class="mt-2 inline-block text-2xl font-semibold text-blue-600 bg-blue-100 px-4 py-1 rounded-md shadow-sm"
            >
              {{ stock.Ticker }}
            </div>
          </div>
          <p class="text-center text-gray-500 text-lg mb-10">
            Última actualización: {{ formatDate(stock.Time) }}
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl leading-relaxed">
            <div>
              <strong class="text-slate-700 block mb-1">🎯 Precio objetivo:</strong>
              <span class="text-blue-700">{{ stock.TargetFrom }}</span>
              →
              <span class="text-blue-700">{{ stock.TargetTo }}</span>
            </div>

            <div>
              <strong class="text-slate-700 block mb-1">📈 Calificación:</strong>
              <span class="text-green-700">{{ stock.RatingFrom }}</span>
              →
              <span class="text-green-700">{{ stock.RatingTo }}</span>
            </div>

            <div>
              <strong class="text-slate-700 block mb-1">🏢 Corredora:</strong>
              {{ stock.Brokerage }}
            </div>

            <div>
              <strong class="text-slate-700 block mb-1">📝 Acción:</strong>
              {{ stock.Action }}
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 text-lg">
          Cargando información de la empresa...
        </div>
      </div>

      <!-- 🔝 TOP POR BROKERAGE (scrollable) -->
      <div v-if="topByBrokerage.length" class="bg-white rounded-xl p-6 shadow-sm text-black">
        <h2 class="text-2xl font-bold mb-4 text-slate-800 text-center">
          Top Acciones Recomendadas por {{ stock?.Brokerage }}
        </h2>

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
              v-for="(item, i) in topByBrokerage"
              :key="item.ID"
              @click="goToCompany(item.Company)"
              class="min-w-[240px] flex-shrink-0 bg-slate-100 text-black border border-gray-300 rounded-lg p-4 shadow-sm hover:bg-slate-200 cursor-pointer"
            >
              <div class="text-sm text-gray-500">#{{ i + 1 }}</div>
              <div class="font-semibold text-lg truncate">{{ item.Company }}</div>
              <div class="text-sm">🎯 {{ item.TargetFrom }} → {{ item.TargetTo }}</div>
              <div class="text-sm">⭐ {{ item.RatingTo }}</div>
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
