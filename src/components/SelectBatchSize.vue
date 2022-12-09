<template>
  <select class="select select-bordered w-full max-w-xs" v-model="this.batch_size" @change="this.$emit('onBatchSizeChange')">
    <option v-for="(item, index) in this.SELECT_BATCH_SIZE" :key="index" :value="item.value">{{ item.item }}</option>
  </select>
</template>
<script>
import { mapState, mapWritableState } from "pinia";
import { useSettingStore } from "@/stores/SettingStore";
export default {
  emits: ['onBatchSizeChange'],
  computed: {
    ...mapState(useSettingStore, ["SELECT_BATCH_SIZE"]),
    ...mapWritableState(useSettingStore, ["batch_size"]),
  },
}
</script>