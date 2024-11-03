<script setup lang="ts">
/**
 * The widget displays:
 * weather icon, location, temperature, (the same or mini version for following days)
 * (the ability to select and change the location might get added later)
 *
 * icons used:
 * https://www.amcharts.com/free-animated-svg-weather-icons/
 */

import DefaultIcon from '@/assets/icons/cloudy-day-1.svg?component'
</script>

<template>
  <div class="weather-widget">
    <div class="weather-widget__location weather-widget__location--loading">
      <DefaultIcon />
    </div>
    <div>
      <div class="weather-widget__location">Location</div>
      <div class="weather-widget__temperature">20 Celcius</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-widget {
  display: flex;
  align-items: center;
  gap: 1em;

  &__location {
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
