<script setup lang="ts">
import navigatableRoutes from '@/router/routes'
defineProps<{ navigationHidden: boolean }>()
</script>

<template>
  <nav class="dashboard__navigation">
    <div
      class="dashboard__navigation-inner-container"
      :class="{
        'dashboard__navigation-inner-container--hidden': !navigationHidden,
      }"
    >
      <ul class="dashboard__navigation-list">
        <li v-for="(navigatableRoute, index) of navigatableRoutes" :key="index">
          <RouterLink
            active-class="dashboard__navigation-list-item--active"
            class="dashboard__navigation-list-item"
            :to="navigatableRoute.path"
          >
            {{ navigatableRoute.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.dashboard {
  &__navigation-inner-container {
    position: fixed;
    background-color: $background-primary-color;
    top: 48px;
    width: 190px;
    border-radius: 1em;
    padding: 0.5em;
    z-index: 10;
    transition:
      transform 0.2s,
      opacity 0.2s;
    opacity: 1;

    @media screen and (max-width: $md-screen) {
      top: 0;
      left: 0;
      right: 0;
      bottom: calc(100% - 125px);
      width: 100%;
      border-radius: 0;
    }

    &--hidden {
      @media screen and (max-width: $md-screen) {
        pointer-events: none;
        transform: translateX(5%);
        opacity: 0;
      }
    }
  }
  &__navigation {
    position: relative;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $md-screen) {
      padding: 0em;
    }
  }

  &__navigation-list {
    padding-left: 0;
    list-style-type: none;
  }

  &__navigation-list-item {
    display: block;
    list-style-type: none;
    padding: 0.5em 0;
    border-bottom: 1px solid #fff8;
    opacity: 0.8;
    width: 100%;
    transition:
      opacity 0.5s,
      text-decoration-color 0.2s;
    color: var(--text-primary-color);
    text-decoration-color: #fff0;
    text-underline-offset: 3px;
    transition: background-color 0.2s;
    border-radius: 0.5em;
    padding: 0.5em 0.75em;

    &--active {
      opacity: 1;
      text-decoration-color: #fff;
    }

    &:hover {
      opacity: 1;
      background-color: $background-secondary-color;
    }

    &--active {
      opacity: 1;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
}
</style>
