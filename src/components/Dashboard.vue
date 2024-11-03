<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="dashboard">
    <div class="dashboard__item dashboard__item--span-one">Small item 1</div>
    <div class="dashboard__item dashboard__item--span-one">Small item 2</div>
    <div class="dashboard__item dashboard__item--span-one">Small item 3</div>
    <div class="dashboard__item dashboard__item--span-three">3 Span Item</div>
    <div class="dashboard__item dashboard__item--span-two">2 Span Item</div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  background: #58546d;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 1em;
  gap: 0.5em;
  grid-auto-flow: row;
  justify-content: center;
  border-radius: 1em;

  @media screen and (max-width: $xl-screen) {
  }

  @media screen and (max-width: $lg-screen) {
  }

  @media screen and (max-width: $md-screen) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: $sm-screen) {
  }

  &__item {
    border-radius: 0.7em;
    background-color: #7e77a1;
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
