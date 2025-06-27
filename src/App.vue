<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  console.log('Buscar:', searchQuery.value)
}
</script>

<template>
  <div class="min-h-screen bg-slate-300 text-black">
    <!-- 🔵 BANNER SUPERIOR (Sticky y claro) -->
    <div class="sticky top-0 z-50 bg-slate-700 text-black px-6 py-4 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- 🔍 Input de búsqueda -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar empresa, broker..."
          @keydown.enter="handleSearch"
          class="w-full lg:max-w-md rounded-md bg-white text-black px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <!-- 🔘 Botones de filtros -->
        <div class="flex flex-wrap gap-2">
          <button class="rounded-md bg-blue-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Fecha
          </button>
          <button class="rounded-md bg-blue-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Rating
          </button>
          <button class="rounded-md bg-blue-700 hover:bg-slate-500 px-4 py-2 text-sm font-semibold text-white">
            Filtrar por Broker
          </button>
        </div>
      </div>
    </div>

    <!-- 🔻 CONTENIDO PRINCIPAL -->
    <div class="px-4 py-8">
      <router-view />
    </div>
  </div>
</template>
