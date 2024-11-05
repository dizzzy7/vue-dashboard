<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WeatherWidget from '@/components/widgets/CurrentWeatherWidget.vue'
import DashboardNavigation from '../DashboardNavigation.vue'
import { useLocation } from '@/api/locationService'
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useWeather } from '@/api/weatherService'

const { isPending: locationIsPending, data: locationData } = useLocation()

const location = computed(() => ({
  lat: locationData.value?.lat,
  lon: locationData.value?.lon,
}))

const enabled = computed(() => !!locationData.value)

const { isPending: currentWeatherIsPending, data: currentWeatherData } =
  useWeather(location, enabled, 'current')

const { isPending: hourlyWeatherIsPending, data: hourlyWeatherData } =
  useWeather(location, enabled, 'hourly')
</script>

<template>
  <div class="dashboard">
    <DashboardNavigation active-item="Weather" />
    <section class="dashboard__body">
      <div class="dashboard__body-item dashboard__item--span-one">
        <WeatherWidget
          v-if="locationData"
          :location-data="locationData"
          :weather-data="currentWeatherData"
          :weather-is-pending="currentWeatherIsPending"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  padding: 1em;
  grid-auto-flow: row;
  justify-content: center;
  border-radius: 1em;
  display: grid;
  gap: 1em;
  grid-template-columns: 200px 1fr;

  @media screen and (max-width: $xl-screen) {
  }

  @media screen and (max-width: $lg-screen) {
  }

  @media screen and (max-width: $md-screen) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: $sm-screen) {
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, auto));
    padding: 1em;
    gap: 0.5em;
    grid-auto-flow: row;
    justify-content: center;
    border-radius: 1em;
    background: #58546d;
    width: 100%;
  }

  &__body-item {
    border-radius: 0.7em;
    background-color: #8680a5;
    padding: 0.5em 1em;
    min-height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;

    &--span-one {
      grid-column-start: span 1;
    }
    &--span-two {
      grid-column-start: span 2;
    }
    &--span-three {
      grid-column-start: span 3;
    }

    @media screen and (max-width: $md-screen) {
      &--span-two {
        grid-column-start: span 2;
      }

      &--span-three {
        grid-column-start: span 2;
      }
    }

    @media screen and (max-width: $sm-screen) {
    }
  }
}
</style>
