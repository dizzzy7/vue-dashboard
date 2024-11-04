<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import WeatherWidget from './widgets/WeatherWidget.vue'
</script>

<template>
  <div class="dashboard">
    <nav class="dashboard__navigation">
      <ul class="dashboard__navigation-list">
        <li class="dashboard__navigation-list-item">Weather</li>
        <li class="dashboard__navigation-list-item">Currency Graph</li>
        <li class="dashboard__navigation-list-item">BVG/S-Bahn</li>
        <li class="dashboard__navigation-list-item">Open Street Maps</li>
      </ul>
    </nav>
    <section class="dashboard__body">
      <div class="dashboard__body-item dashboard__item--span-one">
        <WeatherWidget />
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

  &__navigation {
    background-color: #58546d;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__navigation-list {
    padding-left: 0;
  }

  &__navigation-list-item {
    list-style-type: none;
    padding: 0.5em 0;
    border-bottom: 1px solid #fff8;

    &:last-child {
      border-bottom: 0;
    }
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
