<script setup lang="ts">
/**
 * The widget displays:
 * - a graph displaying the currency
 */

import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'

import { computed } from 'vue'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  Title,
  PointElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Filler,
  ChartDataLabels,
)

/**
 * data structure:
 * - lastMonth <- array represents 31 days
 * - lastSixMonths <- 180/5 === 36 days
 * - lastYear <- 365/5 === 73 items days
 */

type CurrencyWidgetProps = {
  currencyIsPending: boolean
  currencyData: { date: string; value: number }[]
  viewport: number[]
}

const props = defineProps<CurrencyWidgetProps>()

const aspectRatio = computed(() => {
  let result
  if (props.viewport[0] < 425) {
    result = 2
  } else if (props.viewport[0] < 768) {
    result = 3
  } else {
    result = 2
  }

  return result
})

const maxTicks = computed(() => {
  let result
  if (props.viewport[0] < 425) {
    result = 3
  } else {
    result = 4
  }
  return result
})
</script>

<template>
  <div
    class="currency-graph-widget"
    :class="{ 'currency-graph-widget--is-loading': currencyIsPending }"
  >
    <div v-if="currencyData" class="currency-graph-widget__graph">
      <Line
        id="my-chart-id"
        :plugins="[ChartDataLabels]"
        :options="{
          responsive: true,
          color: '#aabbcc',
          aspectRatio: aspectRatio,
          borderColor: '#ffa3c6',
          scales: {
            x: {
              grid: {
                color: '#fff3',
              },
              ticks: {
                maxTicksLimit: maxTicks,
                color: '#fffa',
              },
            },
            y: {
              grid: {
                color: '#fffa',
              },
              ticks: {
                color: '#fff',
              },
            },
          },
        }"
        :data="{
          labels: currencyData.map(currency => currency.date),
          datasets: [
            {
              datalabels: {
                color: '#fff0',
              },
              fill: true,
              pointStyle: 'line',
              pointBackgroundColor: '#a380a5cc',
              data: currencyData.map(currency => currency.value),
              backgroundColor: ctx => {
                const canvas = ctx.chart.ctx

                const gradient = canvas.createLinearGradient(
                  0,
                  0,
                  0,
                  canvas.canvas.height,
                )

                gradient.addColorStop(0.5, '#a380a588')
                gradient.addColorStop(0.8, '#a380a533')
                gradient.addColorStop(1, '#a380a500')

                return gradient
              },
            },
          ],
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.currency-graph-widget {
  display: flex;
  align-items: center;
  transition: opacity 1s;
  width: 100%;
  height: 100%;
  aspect-ratio: 2/1;

  &__graph {
    width: 100%;
    height: 100%;
  }

  &--is-loading {
    opacity: 0;
  }

  @media screen and (max-width: $xl-screen) {
  }

  @media screen and (max-width: $lg-screen) {
  }

  @media screen and (max-width: $md-screen) {
    aspect-ratio: 3/1;
  }

  @media screen and (max-width: $sm-screen) {
    aspect-ratio: 2/1;
  }
}
</style>
