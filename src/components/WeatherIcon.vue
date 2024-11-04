<script setup lang="ts">
defineProps<{ isLoading: boolean }>()

import DefaultIcon from '@/assets/icons/cloudy.svg?component'
import AnimatedIcon from '@/assets/icons/animated/rainy-2.svg?component'
</script>

<template>
  <div v-if="isLoading" class="weather-icon__placeholder">
    <div class="weather-icon__placeholder-image">
      <DefaultIcon width="100" height="100" viewBox="0 0 64 64" />
    </div>
  </div>
  <div v-else>
    <AnimatedIcon width="100" height="100" viewBox="0 0 64 64" />
  </div>
</template>

<style lang="scss">
.weather-icon {
  &__placeholder {
    display: flex;
  }

  &__placeholder-image {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    border-radius: 100%;
    filter: grayscale(1) brightness(1.2);

    svg {
      opacity: 0.8;
    }
  }
}
</style>
