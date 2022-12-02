import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // ref = state
  const count = ref(0)
  // computed = getters
  const doubleCount = computed(() => count.value * 2)
  // function = method
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
