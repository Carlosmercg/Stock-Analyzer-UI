<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

const handleSearch = () => {
  console.log('Buscar:', searchQuery.value)
  // Aquí puedes emitir un evento o filtrar
}
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- 🔵 BANNER SUPERIOR (Search + Filtros) -->
    <div class="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <!-- 🔍 Input de búsqueda -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar empresa, broker..."
          @keydown.enter="handleSearch"
          class="w-full lg:max-w-md rounded-md bg-gray-200 text-black px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <!-- 🔘 Botones de filtros -->
        <div class="flex flex-wrap gap-2">
          <button
            class="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Filtrar por Fecha
          </button>
          <button
            class="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Filtrar por Rating
          </button>
          <button
            class="rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-white"
          >
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
