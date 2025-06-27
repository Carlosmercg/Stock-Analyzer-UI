<template>
  <div
    class="w-full bg-white text-black border border-gray-200 rounded-xl p-8 shadow-lg text-left h-full min-h-[320px] text-base"
  >
    <div class="mb-4">
      <h2 class="text-xl font-bold">{{ company }}</h2>
      <p class="text-sm text-gray-600">{{ timeFormatted }}</p>
    </div>

    <div class="space-y-2 text-[1rem] leading-relaxed">
      <p>
        <strong>Target:</strong>
        <span class="text-blue-700">{{ targetFrom }}</span>
        →
        <span class="text-blue-700">{{ targetTo }}</span>
      </p>
      <p>
        <strong>Rating:</strong>
        <span class="text-green-700">{{ ratingFrom }}</span>
        →
        <span class="text-green-700">{{ ratingTo }}</span>
      </p>
      <p>
        <strong>Brokerage:</strong> {{ brokerage }}
      </p>
      <p>
        <strong>Action:</strong> {{ action }}
      </p>
    </div>

    <div class="mt-6">
      <button
        class="w-full rounded-md bg-slate-700 py-3 text-white text-base font-semibold hover:bg-gray-800 transition"
      >
        Show More
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  company: string
  time: string
  targetFrom: string
  targetTo: string
  ratingFrom: string
  ratingTo: string
  brokerage: string
  action: string
}>()

const timeFormatted = new Date(props.time).toLocaleDateString()
</script>
