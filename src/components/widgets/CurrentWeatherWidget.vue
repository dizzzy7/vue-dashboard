<script setup lang="ts">
/**
 * The widget displays:
 * weather icon, location, temperature
 *
 * icons used:
 * https://www.amcharts.com/free-animated-svg-weather-icons/
 */

import { ref, watch } from 'vue'
import WeatherIcon from '../WeatherIcon.vue'

type WeatherWidgetProps = {
  weatherIsPending: boolean
  locationData: { city: string }
  weatherData: {
    current: {
      temperature_2m: string
    }
    current_units: {
      temperature_2m: string
    }
  }
}

const date = ref(new Date())

watch(
  date,
  () => {
    setTimeout(() => {
      date.value = new Date()
    }, 1000)
  },
  { immediate: true },
)

defineProps<WeatherWidgetProps>()
</script>

<template>
  <div
    class="weather-widget"
    :class="{ 'weather-widget--is-loading': weatherIsPending }"
  >
    <div class="weather-widget__icon">
      <WeatherIcon :isLoading="weatherIsPending" />
    </div>
    <div class="weather-widget__details">
      <div class="weather-widget__location">
        <div
          class="weather-widget__location-placeholder"
          v-if="weatherIsPending"
        ></div>
        <span v-else-if="locationData">{{ locationData.city }}</span>
      </div>
      <div class="weather-widget__temperature">
        <div
          class="weather-widget__temperature-placeholder"
          v-if="weatherIsPending"
        ></div>
        <div v-if="weatherData">
          <div>
            {{ weatherData.current.temperature_2m }}
            {{ weatherData.current_units.temperature_2m }}
          </div>
        </div>
      </div>
    </div>
    <div class="weather-widget__extra">
      <span class="weather-widget_-extra-date">{{
        date.toLocaleDateString()
      }}</span>
      <span class="weather-widget__extra-time">{{
        date.toLocaleTimeString()
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-widget {
  display: flex;
  align-items: center;
  transition: opacity 1s;
  width: 100%;

  &--is-loading {
    opacity: 0;
  }

  &__icon {
    transition:
      opacity 0.5s,
      filter 0.5s;
    &--loading {
      opacity: 0.8;
      filter: grayscale(0.8);
    }
  }

  &__extra {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  &__extra-time {
    font-size: 2rem;

    @media screen and (max-width: $md-screen) {
      font-size: 1.5rem;
    }
  }

  &__extra-date {
  }

  &__location-placeholder {
    background: var(--background-color);
    width: 160px;
    height: 10px;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    border-radius: 1em;
    margin-bottom: 0.5em;
  }

  &__temperature-placeholder {
    background: $placeholder-color;
    width: 50px;
    height: 10px;
    display: inline-block;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    border-radius: 1em;
  }

  @media screen and (max-width: $xl-screen) {
  }

  @media screen and (max-width: $lg-screen) {
  }

  @media screen and (max-width: $md-screen) {
  }

  @media screen and (max-width: $sm-screen) {
  }
}
</style>
