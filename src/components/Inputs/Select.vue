<template>
  <select class="select select-bordered w-full max-w-xs" :value="modelValue" @change="this.$emit('update:modelValue', $event.target.value)">
    <option v-for="(item, index) in data" :key="index" :value="item.value">{{ item.item }}</option>
  </select>
</template>
<script>
export default {
  props: {
    modelValue: {
      required: true,
      type: Number,
    },
    data: {
      required: true,
      type: Object,
      default() {
        return {
          value: null,
          item: null,
        }
      }
    }
  },
  emits: ["update:modelValue"],
}
</script>