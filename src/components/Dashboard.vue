<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard">Dashboard goes here</div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.dashboard {
  background: lightblue;

  @media screen and (max-width: $xl-screen) {
    background: red;
  }

  @media screen and (max-width: $lg-screen) {
    background: lightpink;
  }
}
</style>
