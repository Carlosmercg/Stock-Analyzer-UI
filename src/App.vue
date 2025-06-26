<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-8">
    <div class="flex gap-6 mb-8">
      <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
        <img src="/vite.svg" class="h-24 transition hover:drop-shadow-[0_0_2em_#646cffaa]" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
        <img src="./assets/vue.svg" class="h-24 transition hover:drop-shadow-[0_0_2em_#42b883aa]" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="Vite + Vue + Tailwind CSS" />
  </div>
</template>
