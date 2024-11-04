<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 0)
})
</script>

<template>
  <main>
    <div class="container" :class="{ 'container--is-loaded': isLoaded }">
      <section>
        <h1 class="text-center">Welcome</h1>
        <RouterView />
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 0.6em;
}
</style>
