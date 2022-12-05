<template>
  <label class="label">
    <span class="label-text">{{ this.label }}</span>
  </label>
  <input
    :type="this.type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="this.label"
    class="input input-bordered"
  />
  <label v-if="this.errorMessages && Object.hasOwn(this.errorMessages, this.name)" class="label">
    <span v-for="(item, index) in this.errorMessages[this.name]" :key="index" class="label-text text-error">
      {{ item }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true, 
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "No Type Passed",
    },
    label: {
      type: String,
      required: true,
      default: "No Label Passed",
    },
    name: {
      type: String,
      required: true,
      default: "No Name Passed",
    },
    errorMessages: {
      required: true,
      default: null,
    },
  },
  emits: [
    "update:modelValue",
  ],
}
</script>

<style>

</style>