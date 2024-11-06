<script setup lang="ts">
import navigatableRoutes from '@/router/routes'
</script>

<template>
  <nav class="dashboard__navigation">
    <div class="dashboard__navigation-inner-container">
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
  }
  &__navigation {
    position: relative;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $md-screen) {
      display: none;
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
