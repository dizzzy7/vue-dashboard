<script setup lang="ts">
import { useCurrency, useCurrencySingle } from '@/api/currencyService'
import DashboardNavigation from '../DashboardNavigation.vue'
import { computed, ref } from 'vue'
import CurrencyGraphWidget from '../widgets/CurrencyGraphWidget.vue'
import { useWindowSize } from '@vueuse/core'
import CurrencySelectorWidget from '../widgets/CurrencySelectorWidget.vue'

const { data } = useCurrencySingle()

const results = useCurrency('lastMonth')
const { width, height } = useWindowSize()

const selectedCurrency = ref<string>('jpy')

const navigationHidden = ref(false)

const isLoading = computed(() => results.value.some(query => query.isLoading))
</script>

<template>
  <div class="dashboard currency-dashboard">
    <DashboardNavigation :navigationHidden active-item="Currency Graph" />
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
    <section class="dashboard__body currency-dashboard__body">
      <div class="dashboard__body-item dashboard__item--span-one">
        <div v-if="!isLoading">
          <CurrencyGraphWidget
            :currency-is-pending="isLoading"
            :viewport="[width, height]"
            :currency-data="
              results.map(result => {
                return {
                  date: result.data.date as string,
                  value: result.data.eur[selectedCurrency] as number,
                }
              })
            "
          />
        </div>
      </div>
      <div
        class="dashboard__body-item dashboard__item--span-one currency-dashboard__item--first"
      >
        <div v-if="data">
          <CurrencySelectorWidget
            v-model="selectedCurrency"
            :currencies="Object.keys(data.eur)"
            :current-value="data.eur[selectedCurrency]"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.dashboard__menu-toggle {
  position: fixed;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  color: $background-tertiary-color;
  background: $background-primary-color;
  border-radius: 1em;
  margin: 1em;
  display: hidden;

  @media screen and (max-width: $md-screen) {
    // display: block;
  }
  box-shadow: 0px 0px 13px 0px $background-color;
}
.currency-dashboard__body {
  .dashboard__body-item {
    @media screen and (max-width: $sm-screen) {
      grid-column-start: span 2;
    }
  }
}

.currency-dashboard__item {
  &--first {
    @media screen and (max-width: $sm-screen) {
      order: -1;
    }
  }
}
</style>
