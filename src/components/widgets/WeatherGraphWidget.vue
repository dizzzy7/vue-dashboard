<script setup lang="ts">
/**
 * The widget displays:
 * - a graph displaying the weather - shows rain and temperature for the (day)
 */

import range from '@/util/range'
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

type WeatherWidgetProps = {
  weatherIsPending: boolean
  weatherData: {
    hourly: {
      temperature_2m: number[]
      rain: number[]
    }
    hourly_units: {
      temperature_2m: string
    }
  }
  viewport: number[]
}

defineProps<WeatherWidgetProps>()
</script>

<template>
  <div
    class="weather-graph-widget"
    :class="{ 'weather-graph-widget--is-loading': weatherIsPending }"
  >
    <div v-if="weatherData" class="weather-graph-widget__graph">
      <Line
        id="my-chart-id"
        :plugins="[ChartDataLabels]"
        :options="{
          responsive: true,
          color: '#aabbcc',
          aspectRatio: viewport[0] < 500 ? 2 : 4,
          borderColor: '#ffa3c6',
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#fffc',
                callback: (value, index, ticks) => {
                  if (index % 3 === 0) {
                    return value + ':00'
                  }
                },
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#fffa',
                display: false,
              },
              max: Math.round(
                weatherData.hourly.temperature_2m.reduce(
                  (acc = 0, value: number) => {
                    return Math.max(acc, value)
                  },
                ) * 1.15,
              ),
            },
          },
        }"
        :data="{
          labels: range(24),
          datasets: [
            {
              datalabels: {
                color: '#fff',
                align: -80,
                offset: 2,
                padding: {
                  left: 10,
                },
                formatter: (value, context) => {
                  const index = context.dataIndex
                  const result = context.dataset.data[index]

                  if (index % 3 === 0) {
                    return Math.round(value)
                  }
                  return ' '
                },
              },
              fill: true,
              pointStyle: 'line',
              pointBackgroundColor: '#a380a5cc',
              data: weatherData.hourly.temperature_2m,
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
.weather-graph-widget {
  display: flex;
  align-items: center;
  transition: opacity 1s;
  width: 100%;
  height: 100%;
  aspect-ratio: 4/1;

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
  }

  @media screen and (max-width: $sm-screen) {
    aspect-ratio: 2/1;
  }
}
</style>
