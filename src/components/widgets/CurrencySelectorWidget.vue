<script setup lang="ts">
defineProps<{
  currencies: string[]
  modelValue: string
  currentValue: number
}>()
defineEmits<(e: 'update:modelValue', newValue: string) => void>()
</script>
<template>
  <div class="currency-selector-widget">
    <select
      class="currency-selector-widget__select"
      :value="modelValue"
      @change="
        e => {
          $emit('update:modelValue', (e.target as HTMLSelectElement).value)
        }
      "
    >
      <option
        :selected="modelValue === currency"
        v-for="currency in currencies"
        :key="currency"
      >
        {{ currency }}
      </option>
    </select>
    <div class="currency-selector-widget__currency-details">
      Euro in {{ modelValue.toUpperCase() }}
    </div>
    <div class="currency-selector-widget__current-value">
      {{ currentValue.toFixed(2) }}
    </div>
  </div>
</template>
<style lang="scss">
.currency-selector-widget {
  &__select {
    padding: 0.5em;
  }
  display: flex;
  flex-direction: column;
  &__currency-details {
    margin-top: 0.9em;
  }
  &__current-value {
    font-size: 1.75rem;
    margin-top: -0.1em;
  }
}
</style>
