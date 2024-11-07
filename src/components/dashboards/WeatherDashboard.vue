<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import CurrentWeatherWidget from '@/components/widgets/CurrentWeatherWidget.vue'
import CurrentTimeWidget from '@/components/widgets/CurrentTimeWidget.vue'
import DashboardNavigation from '../DashboardNavigation.vue'
import { useLocation } from '@/api/locationService'
import { computed, ref } from 'vue'
import { useWeather } from '@/api/weatherService'
import WeatherGraphWidget from '../widgets/WeatherGraphWidget.vue'
import RainGraphWidget from '../widgets/RainGraphWidget.vue'
import { useWindowSize } from '@vueuse/core'

const { data: locationData } = useLocation()

const location = computed(() => ({
  lat: locationData.value?.lat,
  lon: locationData.value?.lon,
}))

const enabled = computed(() => !!locationData.value)

const tabs = ['Temperatur', 'Niederschlag']
const components = [WeatherGraphWidget, RainGraphWidget]
const activeTab = ref<number>(0)

const { isPending: currentWeatherIsPending, data: currentWeatherData } =
  useWeather(location, enabled, 'current')

const { isPending: hourlyWeatherIsPending, data: hourlyWeatherData } =
  useWeather(location, enabled, 'hourly')

const navigationHidden = ref(false)

const { width, height } = useWindowSize()
</script>

<template>
  <div class="dashboard">
    <DashboardNavigation :navigationHidden active-item="Weather" />
    <div
      class="dashboard__menu-toggle"
      @click="
        () => {
          navigationHidden = !navigationHidden
        }
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        width="40px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
    <section class="dashboard__body">
      <div class="dashboard__body-item dashboard__body-item--span-one">
        <CurrentWeatherWidget
          v-if="!currentWeatherIsPending && locationData"
          :location-data="locationData"
          :weather-data="currentWeatherData"
          :weather-is-pending="currentWeatherIsPending"
        />
      </div>
      <div class="dashboard__body-item dashboard__body-item--span-one">
        <CurrentTimeWidget />
      </div>
      <div class="dashboard__body-item dashboard__body-item--span-two">
        <div class="dashboard__tabs">
          <div
            class="dashboard__tab"
            v-for="(tab, index) in tabs"
            :key="tab"
            @click="() => (activeTab = index)"
            :class="{ 'dashboard__tab--active': activeTab === index }"
          >
            {{ tab }}
          </div>
        </div>
        <component
          :is="components[activeTab.valueOf()]"
          :weather-data="hourlyWeatherData"
          :weather-is-pending="hourlyWeatherIsPending"
          :viewport="[width, height]"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
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
    display: block;
    padding: 0;
  }

  @media screen and (max-width: $sm-screen) {
  }

  &__tabs {
    display: flex;
    flex-direction: row;
    gap: 1em;
    padding-bottom: 1em;

    @media screen and (max-width: $sm-screen) {
      gap: 0.8em;
    }
  }

  &__tab {
    background-color: $background-tertiary-color;
    padding: 0.5em 1em;
    border-radius: 0.4em;
    cursor: pointer;

    @media screen and (max-width: $sm-screen) {
      padding: 0.3em 0.8em;
      background-color: $background-secondary-color;
    }

    &:hover {
      filter: brightness(1.1);
    }

    &--active {
      background-color: $primary-button-active-color;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 2px;
      text-decoration-color: #fff6;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: minmax(200px, 2fr) minmax(180px, 1fr);
    padding: 1em;
    gap: 0.8em;
    grid-auto-flow: row;
    justify-content: center;
    border-radius: 1em;
    background: $background-primary-color;
    width: 100%;

    @media screen and (max-width: $lg-screen) {
      grid-template-columns: minmax(250px, 2fr) minmax(160px, 1fr);
    }

    @media screen and (max-width: $md-screen) {
      grid-template-columns: minmax(288px, 2fr);
      background-color: transparent;
    }

    @media screen and (max-width: $sm-screen) {
      grid-template-columns: minmax(0, 2fr) minmax(100px, 1fr);
      padding: 0;
      background: linear-gradient(
        90deg,
        $background-primary-color--fade-out,
        $background-primary-color,
        $background-primary-color--fade-out
      );
      border-radius: 0;
    }
  }

  &__body-item {
    border-radius: 0.7em;
    background-color: $background-secondary-color;
    padding: 1em;
    min-height: 4em;

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
      border-radius: 0em;
      padding: 1em;
      outline: 13px solid $background-color;
      background-color: transparent;
    }
  }
}
</style>
