<template>
  <div class="px-4 py-8">
    <div class="grid grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
      <StockCard
        v-for="item in stocks"
        :key="item.ID"
        :company="item.Company"
        :time="item.Time"
        :targetFrom="item.TargetFrom"
        :targetTo="item.TargetTo"
        :ratingFrom="item.RatingFrom"
        :ratingTo="item.RatingTo"
        :brokerage="item.Brokerage"
        :action="item.Action"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import StockCard from './StockCard.vue'

const stocks = Array.from({ length: 100 }, (_, i) => ({
  ID: i + 1,
  Company: `Company ${i + 1}`,
  Time: new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
  TargetFrom: `$${(Math.random() * 100 + 20).toFixed(2)}`,
  TargetTo: `$${(Math.random() * 100 + 20).toFixed(2)}`,
  RatingFrom: ['Outperform', 'Neutral', 'Buy', 'Sell'][Math.floor(Math.random() * 4)],
  RatingTo: ['Outperform', 'Neutral', 'Buy', 'Sell'][Math.floor(Math.random() * 4)],
  Brokerage: ['Goldman Sachs', 'JP Morgan', 'Morgan Stanley', 'Wedbush', 'UBS'][Math.floor(Math.random() * 5)],
  Action: ['reiterated by', 'downgraded by', 'upgraded by', 'initiated by', 'target raised by'][Math.floor(Math.random() * 5)]
}))
</script>
