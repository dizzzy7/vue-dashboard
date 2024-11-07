<script setup lang="ts">
defineProps<{
  isLoading: boolean
  weatherCode: number
  isDay: number
}>()

import DefaultIcon from '@/assets/icons/cloudy.svg?component'
import RainAnimation from '@/assets/icons/animated/rainy-2.svg?component'
import NightIcon from '@/assets/icons/animated/night.svg?component'
import CloudyDayAnimation from '@/assets/icons/animated/cloudy-day-1.svg?component'
import CloudyNightAnimation from '@/assets/icons/animated/cloudy-night-1.svg?component'
import DayAnimation from '@/assets/icons/animated/day.svg?component'
import SnowyAnimation from '@/assets/icons/animated/snowy-6.svg?component'

const isSnowing = [
  20, 22, 23, 26, 36, 37, 38, 39, 68, 69, 70, 71, 72, 73, 74, 75, 77, 78, 85,
  86, 87, 88, 93, 94,
]

const isRaining = [
  21, 25, 27, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 80, 81, 82, 83,
  84,
]

const skyInvisible = [43, 45, 47, 49]

const skyVisible = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 18, 19, 42, 44, 46, 48,
]

const dimensions = {
  width: 100,
  height: 100,
  viewBox: '0 0 64 64',
}
</script>

<template>
  <div class="weather-icon">
    <div v-if="isLoading" class="weather-icon__placeholder">
      <div class="weather-icon__placeholder-image">
        <DefaultIcon width="100" height="100" viewBox="0 0 64 64" />
      </div>
    </div>
    <div v-else-if="isDay !== 0">
      <SnowyAnimation
        v-if="isSnowing.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
      <RainAnimation
        v-else-if="isRaining.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
      <DayAnimation
        v-else-if="skyVisible.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
      <CloudyDayAnimation
        v-else-if="skyInvisible.indexOf(weatherCode)"
        v-bind="dimensions"
      />
    </div>
    <div v-else-if="isDay === 0" class="weather-icon__night-time">
      <NightIcon
        v-if="skyVisible.indexOf(weatherCode) !== -1"
        class="weather-icon__night-time-icon"
        v-bind="dimensions"
      />
      <SnowyAnimation
        v-if="isSnowing.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
      <RainAnimation
        v-else-if="isRaining.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
      <CloudyNightAnimation
        v-else-if="skyInvisible.indexOf(weatherCode) !== -1"
        v-bind="dimensions"
      />
    </div>
  </div>
</template>

<style lang="scss">
.weather-icon {
  &__placeholder {
    display: flex;
  }

  svg {
    height: 100%;
  }

  &__placeholder-image {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    border-radius: 100%;
    filter: grayscale(1) brightness(1.2);

    svg {
      opacity: 0.8;
    }
  }

  &__night-time {
    position: relative;
    width: 100px;
    height: 100px;

    @media screen and (max-width: $sm-screen) {
      width: 70px;
      height: 70px;
      margin-right: 0.5em;
    }
  }

  &__night-time-icon {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>
