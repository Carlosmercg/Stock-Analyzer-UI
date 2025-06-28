<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const searchQuery = ref('')
const route = useRoute()
const router = useRouter()

const handleSearch = () => {
  if (route.name === 'Home') {
    // Nada, ya se reactiva vía prop
  }
}

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
          @keydown.enter="handleSearch"
          class="w-full lg:max-w-md rounded-md bg-white text-black px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <!-- 🔘 Botones de filtros -->
        <div class="flex flex-wrap gap-2">
          <button class="rounded-md bg-slate-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Fecha
          </button>
          <button class="rounded-md bg-slate-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Rating
          </button>
          <button class="rounded-md bg-slate-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Broker
          </button>
        </div>
      </div>
    </div>

    <!-- 🔻 CONTENIDO -->
    <div class="px-4 py-8">
      <router-view :search-query="searchQuery" />
    </div>
  </div>
</template>
