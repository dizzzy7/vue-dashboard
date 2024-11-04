<script setup lang="ts">
import navigatableRoutes from '@/router/routes'
</script>

<template>
  <nav class="dashboard__navigation">
    <ul class="dashboard__navigation-list">
      <li
        v-for="navigatableRoute of navigatableRoutes"
        class="dashboard__navigation-list-item"
      >
        <RouterLink
          active-class="dashboard__navigation-list-item--active"
          :to="navigatableRoute.path"
          >{{ navigatableRoute.name }}</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.dashboard {
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
    opacity: 0.8;
    transition: opacity 0.5s;

    &:hover {
      opacity: 1;
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
