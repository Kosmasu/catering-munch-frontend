<template>
  <div class="w-full flex justify-center">
    <div class="btn-group">
      <button class="btn" @click="goToFirstPage">&lt;&lt;</button>
      <button class="btn" @click="decrementPage">&lt;</button>
      <button v-for="page in PAGE_SHOWN" class="btn" :class="{'btn-primary': isCurrentPage(getPageRender(page))}" @click="goTo(page)">{{ getPageRender(page) }}</button>
      <button class="btn" @click="incrementPage">&gt;</button>
      <button class="btn" @click="goToLastPage">&gt;&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PAGE_SHOWN: 5
    };
  },
  props: {
    maxPage: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    }
  },
  emits: [
    "update:modelValue",
  ],
  computed: {
    lowerPageBoundary() {
      if (
        this.modelValue <= Math.floor(this.PAGE_SHOWN / 2)
      ) { 
        return 1
      }
      else if (
        this.modelValue <= this.maxPage - Math.floor(this.PAGE_SHOWN / 2)
      ) {
        return this.modelValue - Math.floor(this.PAGE_SHOWN / 2)
      }
      else  {
        return this.maxPage - this.PAGE_SHOWN + 1
      }
    },
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
      if (this.modelValue < this.maxPage) {
        this.updateCurrentPage(this.modelValue + 1)
      }
    },
    goToLastPage() {
      this.updateCurrentPage(this.maxPage)
    }
  },
  created() {
    let page = this.$route.params.page
    if (page == undefined) {
      throw Error("To include pagination, the page must have an optional param named \"page\"")
    }
    if (page <= 0 || page > this.maxPage) {
      page = 1
    }
  }
};
</script>

<style>
</style>