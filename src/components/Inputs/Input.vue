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
    :class="{'input-bordered': !this.isError, 'input-error': this.isError}"
  />
  <label v-if="this.errors && Object.hasOwn(this.errors, this.name)" class="label">
    <span v-for="(item, index) in this.errors[this.name]" :key="index" class="label-text text-error">
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
    errors: {
      required: true,
      default: null,
    },
  },
  emits: [
    "update:modelValue",
  ],
  computed: {
    isError() {
      return this.errors && Object.hasOwn(this.errors, this.name)
    }
  }
}
</script>

<style>

</style>