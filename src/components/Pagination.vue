<template>
  <div class="w-full flex flex-col sm:flex-row justify-between">
    <div class="flex items-center whitespace-pre">
      Showing
      <span class="font-bold"> {{ this.lowerItemBoundary }} </span>
      to
      <span class="font-bold"> {{ this.upperItemBoundary }} </span>
      of
      <span class="font-bold"> {{ this.paginatedData.total }} </span>
      results
    </div>
    <div class="btn-group">
      <button
        class="btn bg-base-100 font-normal text-base-content border-0 text-lg text-lg hover:bg-base-200 hover:font-semibold"
        @click="goToFirstPage">&lt;&lt;</button>
      <button
        class="btn bg-base-100 font-normal text-base-content border-0 text-lg text-lg hover:bg-base-200 hover:font-semibold"
        @click="decrementPage">&lt;</button>
      <button v-for="page in this.loop" class="btn bg-base-100 text-base-content border-0 text-lg text-lg relative"
        :class="{ 'font-normal hover:bg-base-200 hover:font-semibold': !isCurrentPage(getPageRender(page)), 'font-bold hover:cursor-default hover:bg-base-100 hover:font-bold': isCurrentPage(getPageRender(page)) }"
        @click="goTo(page)">
        {{ getPageRender(page) }}
        <div v-if="isCurrentPage(getPageRender(page))" class="absolute w-full h-1 top-0 bg-primary"></div>
      </button>
      <button
        class="btn bg-base-100 font-normal text-base-content border-0 text-lg text-lg hover:bg-base-200 hover:font-semibold"
        @click="incrementPage">&gt;</button>
      <button
        class="btn bg-base-100 font-normal text-base-content border-0 text-lg text-lg hover:bg-base-200 hover:font-semibold"
        @click="goToLastPage">&gt;&gt;</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from "pinia";
import { useSettingStore } from "@/stores/SettingStore";

export default {
  data() {
    return {
      PAGE_SHOWN: 5
    };
  },
  props: {
    modelValue: { 
      type: Number,
      required: true,
    },
    paginatedData: {
      type: Object,
      required: true,
    }
  },
  emits: [
    "update:modelValue",
  ],
  computed: {
    ...mapState(useSettingStore, ["batch_size"]),
    loop() {
      return (this.paginatedData.last_page < this.PAGE_SHOWN ? this.paginatedData.last_page : this.PAGE_SHOWN)
    },
    lowerPageBoundary() {
      if (
        this.modelValue <= Math.floor(this.PAGE_SHOWN / 2)
        || this.paginatedData.last_page <= this.PAGE_SHOWN
      ) {
        console.log("1");
        return 1
      }
      else if (
        this.modelValue <= this.paginatedData.last_page - Math.floor(this.PAGE_SHOWN / 2) 
      ) {
        console.log("2");
        return this.modelValue - Math.floor(this.PAGE_SHOWN / 2)
      }
      else {
        console.log("3");
        return this.paginatedData.last_page - this.PAGE_SHOWN + 1
      }
    },
    lowerItemBoundary() {
      return ((this.modelValue - 1) * this.batch_size) + 1
    },
    upperItemBoundary() {
      let temp = this.lowerItemBoundary + this.paginatedData.per_page - 1
      return (temp < this.paginatedData.total ? temp : this.paginatedData.total)
    }
  },
  methods: {
    getPageRender(index) {
      let page = this.lowerPageBoundary + (index - 1)
      return page
    },
    isCurrentPage(page) {
      return this.modelValue == page
    },
    updateCurrentPage(page) {
      this.$emit('update:modelValue', page)
    },
    goTo(page) {
      this.updateCurrentPage(page)
    },
    goToFirstPage() {
      this.updateCurrentPage(1)
    },
    decrementPage() {
      if (this.modelValue > 1) {
        this.updateCurrentPage(this.modelValue - 1)
      }
    },
    incrementPage() {
      if (this.modelValue < this.paginatedData.last_page) {
        this.updateCurrentPage(this.modelValue + 1)
      }
    },
    goToLastPage() {
      this.updateCurrentPage(this.paginatedData.last_page)
    }
  },
  created() {
    let page = this.$route.params.page
    if (page == undefined) {
      throw Error("To include pagination, the page must have an optional param named \"page\"")
    }
    if (page <= 0 || page > this.paginatedData.last_page) {
      page = 1
    }
  }
};
</script>

<style>

</style>