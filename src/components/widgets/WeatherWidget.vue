<script setup lang="ts">
import { getLocation } from '@/api/locationService'
import { getDailyWeather } from '@/api/weatherService'
/**
 * The widget displays:
 * weather icon, location, temperature, (the same or mini version for following days)
 * (the ability to select and change the location might get added later)
 * get estimated location from user through IP Geolocation API
 * http://ip-api.com/json/{query}


 *
 * icons used:
 * https://www.amcharts.com/free-animated-svg-weather-icons/
 */

import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { isPending: locationIsPending, data: locationData } = useQuery<{
  city: string
  lat: number
  lon: number
}>({
  queryKey: ['location', 'estimated'],
  queryFn: getLocation,
})

const location = computed(() => ({
  lat: locationData.value?.lat,
  lon: locationData.value?.lon,
}))

const enabled = computed(() => !!locationData.value)

const { isPending: weatherIsPending, data: weatherData } = useQuery({
  queryKey: ['weather'],
  queryFn: () => {
    if (
      location.value !== undefined &&
      location.value.lat &&
      location.value.lon
    ) {
      return getDailyWeather(location.value.lat, location.value.lon)
    }
  },
  enabled: enabled,
})

const currentHour = new Date().getHours()

console.log(weatherData)

import DefaultIcon from '@/assets/icons/cloudy-day-1.svg?component'
import AnimatedIcon from '@/assets/icons/animated/rainy-2.svg?component'
// import DefaultIcon from '@/assets/icons/animated/cloudy-day-2.svg?component'
</script>

<template>
  <div class="weather-widget">
    <div
      class="weather-widget__icon"
      :class="{
        'weather-widget__icon--loading': weatherIsPending.valueOf(),
      }"
    >
      <DefaultIcon width="100" height="100" v-if="weatherIsPending.valueOf()" />
      <AnimatedIcon
        width="100"
        height="100"
        viewBox="0 0 64 64"
        v-if="!weatherIsPending.valueOf()"
      />
      <!-- dynamically load image from -->
    </div>
    <div>
      <!-- TODO: use spinner to indicate loading of weather -->
      <div class="weather-widget__location">
        <span v-if="locationIsPending">...</span>
        <span v-if="locationData">{{ locationData.city }}</span>
      </div>
      <div class="weather-widget__temperature">
        <span v-if="weatherIsPending">...</span>
        <div v-if="weatherData">
          <div>
            {{ weatherData.hourly.temperature_2m[currentHour] }}
            {{ weatherData.hourly_units.temperature_2m }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-widget {
  display: flex;
  align-items: center;

  &__icon {
    transition:
      opacity 0.5s,
      filter 0.5s;
    &--loading {
      opacity: 0.8;
      filter: grayscale(0.8);
    }
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
