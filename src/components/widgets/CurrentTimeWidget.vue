<script setup lang="ts">
import { ref, watch } from 'vue'

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
</script>

<template>
  <div class="current-time-widget__extra">
    <span class="current-time-widget_-extra-date">{{
      date.toLocaleDateString()
    }}</span>
    <span class="current-time-widget__extra-time">{{
      date.toLocaleTimeString()
    }}</span>
  </div>
</template>

<style lang="scss">
.current-time-widget {
  &__extra {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: end;
    height: 100%;
    justify-content: center;
  }

  &__extra-time {
    font-size: 2rem;

    @media screen and (max-width: $md-screen) {
      font-size: 1.5rem;
    }

    @media screen and (max-width: $sm-screen) {
      font-size: 1.15rem;
    }
  }

  &__extra-date {
  }
}
</style>
