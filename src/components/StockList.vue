<template>
  <div class="p-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start">
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

const stocks = [
  {
    ID: 1,
    Company: 'Nuvalent',
    Time: '2025-06-26T00:30:05.314624Z',
    TargetFrom: '$105.00',
    TargetTo: '$112.00',
    RatingFrom: 'Outperform',
    RatingTo: 'Outperform',
    Brokerage: 'Robert W. Baird',
    Action: 'target raised by'
  },
  {
    ID: 2,
    Company: 'Voyager Therapeutics',
    Time: '2025-01-14T00:30:05.813548892Z',
    TargetFrom: '$11.00',
    TargetTo: '$9.00',
    RatingFrom: 'Outperform',
    RatingTo: 'Outperform',
    Brokerage: 'Wedbush',
    Action: 'reiterated by'
  },
  // Agrega más objetos aquí...
]
</script>
