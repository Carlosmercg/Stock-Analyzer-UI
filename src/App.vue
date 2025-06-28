<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchBrokerages, fetchRatings } from './services/stockService'

const searchQuery = ref('')
const selectedDateOrder = ref('')
const selectedRating = ref('')
const selectedBrokerage = ref('')
const brokerages = ref<string[]>([])

const route = useRoute()
const router = useRouter()
const ratings = ref<string[]>([])

// 🟡 OPCIONAL: Cargar valores desde la URL si existen
onMounted(async () => {
  searchQuery.value = (route.query.company as string) || ''
  selectedRating.value = (route.query.ratingTo as string) || ''
  selectedBrokerage.value = (route.query.brokerage as string) || ''
  selectedDateOrder.value = (route.query.order as string) || ''

  try {
    brokerages.value = await fetchBrokerages()
  } catch (err) {
    console.error('Error cargando brokerages:', err)
  }

    try {
    ratings.value = await fetchRatings()
  } catch (err) {
    console.error('Error cargando ratings:', err)
  }
})

// 🔁 Función centralizada para cambiar ruta con todos los filtros
const handleSearch = () => {
  const query: Record<string, string> = {}

  if (searchQuery.value.trim()) {
    query.company = searchQuery.value.trim()
  }
  if (selectedRating.value) {
    query.ratingto = selectedRating.value
  }
  if (selectedBrokerage.value) {
    query.brokerage = selectedBrokerage.value
  }
  if (selectedDateOrder.value) {
    query.order = selectedDateOrder.value
  }

  router.push({ name: 'Home', query })
}

// ✅ Los filtros reutilizan la función de búsqueda
const handleBrokerageFilter = handleSearch
const handleRatingFilter = handleSearch
const handleDateFilter = handleSearch

const goHome = () => {
  router.push({ name: 'Home' })
}
</script>


<template>
  <div class="min-h-screen bg-slate-300 text-black">
    <!-- 🔵 BANNER -->
    <div class="sticky top-0 z-50 bg-blue-400 text-black px-6 py-4 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <!-- 🔙 Logo con navegación -->
        <div @click="goHome" class="cursor-pointer flex items-center space-x-2">
          <img src="/Logo.png" alt="Stock Analyzer Logo" class="h-20 w-auto" />
        </div>

        <!-- 🔍 Input búsqueda -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar empresa ...."
          @input="handleSearch"
          class="w-full lg:max-w-md rounded-md bg-white text-black px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

    <!-- 🔘 Filtros desplegables -->
    <div class="flex flex-wrap gap-2 items-center">
      <!-- Fecha -->
      <div class="relative">
        <details class="min-w-[12rem] rounded-md bg-slate-700 text-white px-3 py-2 text-sm font-semibold w-50">
          <summary class="cursor-pointer select-none">
            {{
              selectedDateOrder === 'desc' ? 'Más recientes primero' :
              selectedDateOrder === 'asc' ? 'Más antiguas primero' :
              'Filtrar por Fecha'
            }}
          </summary>
          <ul class="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white text-black w-full border rounded shadow">
            <li
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedDateOrder = ''; handleDateFilter()"
            >
              Sin orden de fecha
            </li>
            <li
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedDateOrder = 'desc'; handleDateFilter()"
            >
              Más recientes primero
            </li>
            <li
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedDateOrder = 'asc'; handleDateFilter()"
            >
              Más antiguas primero
            </li>
          </ul>
        </details>
      </div>
    <!-- Rating -->
<!-- Rating -->
      <div class="relative">
        <details class="min-w-[12rem] rounded-md bg-slate-700 text-white px-3 py-2 text-sm font-semibold">
          <summary class="cursor-pointer select-none">
            {{ selectedRating || 'Filtrar por Rating' }}
          </summary>
          <ul class="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white text-black w-full border rounded shadow">
            <li
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedRating = ''; handleRatingFilter()"
            >
              Todos los Ratings
            </li>
            <li
              v-for="rating in ratings"
              :key="rating"
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedRating = rating; handleRatingFilter()"
            >
              {{ rating }}
            </li>
          </ul>
        </details>
      </div>


    <!-- Brokerage -->
      <div class="relative">
        <details class="min-w-[12rem] rounded-md bg-slate-700 text-white px-3 py-2 text-sm font-semibold w-50">
          <summary class="cursor-pointer select-none">
            {{ selectedBrokerage || 'Filtrar por Broker' }}
          </summary>
          <ul class="absolute z-10 mt-1 max-h-60 overflow-y-auto bg-white text-black w-full border rounded shadow">
            <li
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedBrokerage = ''; handleBrokerageFilter()"
            >
              Todos los Brokers
            </li>
            <li
              v-for="broker in brokerages"
              :key="broker"
              class="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              @click="selectedBrokerage = broker; handleBrokerageFilter()"
            >
              {{ broker }}
            </li>
          </ul>
        </details>
      </div>

    </div> <!-- ← cierre de .flex -->
    </div> <!-- ← cierre de .max-w-7xl -->
    </div> <!-- ← cierre de .sticky banner -->

    <!-- 🔻 CONTENIDO -->
    <div class="px-4 py-8">
      <router-view
        :search-query="searchQuery"
        :date-order="selectedDateOrder"
        :rating-filter="selectedRating"
        :brokerage-filter="selectedBrokerage"
      />
    </div>
  </div>
</template>
