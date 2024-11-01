<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="dashboard">
    <div class="dashboard__item--span-one">Small item 1</div>
    <div class="dashboard__item--span-one">Small item 2</div>
    <div class="dashboard__item--span-one">Small item 3</div>
    <div class="dashboard__item--span-three">3 Span Item</div>
    <div class="dashboard__item--span-two">2 Span Item</div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  background: lightblue;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1em;
  gap: 0.5em;

  > * {
    background-color: red;
    border-radius: 0.4em;
  }

  @media screen and (max-width: $xl-screen) {
  }

  @media screen and (max-width: $lg-screen) {
  }

  @media screen and (max-width: $md-screen) {
    grid-template-columns: 1fr 1fr;
  }

  &__item {
    @at-root [class*='#{&}'] {
      background-color: green !important;
    }

    &--span-one {
      grid-column-start: span 1;
    }
    &--span-two {
      grid-column-start: span 2;
    }
    &--span-three {
      grid-column-start: span 3;
    }
  }
}
</style>
