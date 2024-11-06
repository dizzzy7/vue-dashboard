<script setup lang="ts">
/**
 * The widget displays:
 * - a graph displaying the rain for the day
 */

import range from '@/util/range'
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
} from 'chart.js'

import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  Title,
  BarElement,
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
      precipitation_probability: number[]
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
    class="rain-graph-widget"
    :class="{ 'rain-graph-widget--is-loading': weatherIsPending }"
  >
    <div v-if="weatherData" class="rain-graph-widget__graph">
      <Bar
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
              border: {
                color: 'transparent',
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
              max: 130,
            },
          },
        }"
        :data="{
          labels: range(24),
          datasets: [
            {
              datalabels: {
                color: '#fff',
                anchor: 'end',
                align: 'top',
              },
              data: weatherData.hourly.precipitation_probability,
              backgroundColor: '#5f84f599',
              hoverBackgroundColor: '#5f84f599',
            },
          ],
        }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.rain-graph-widget {
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
