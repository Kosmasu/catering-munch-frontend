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
    currentPage: {
      type: Number,
      required: true,
    }
  },
  emits: [
    "update:currentPage",
  ],
  computed: {
    lowerPageBoundary() {
      if (
        this.currentPage <= Math.floor(this.PAGE_SHOWN / 2)
      ) { 
        return 1
      }
      else if (
        this.currentPage <= this.maxPage - Math.floor(this.PAGE_SHOWN / 2)
      ) {
        return this.currentPage - Math.floor(this.PAGE_SHOWN / 2)
      }
      else  {
        return this.maxPage - this.PAGE_SHOWN + 1
      }
    },
    upperPageBoundary() {
      if (this.currentPage < this.maxPage - Math.floor(this.PAGE_SHOWN / 2)) {
        return this.currentPage + Math.floor(this.PAGE_SHOWN / 2)
      }
      else 
       return this.maxPage
    }
  },
  methods: {
    getPageRender(index) {
      let page = this.lowerPageBoundary + (index - 1)
      // if (page >= this.maxPage - Math.floor(this.PAGE_SHOWN/2)) {
      //   page = this.maxPage - index
      // }
      return page
    },
    isCurrentPage(page) {
      return this.currentPage == page
    },
    updateCurrentPage(page) {
      this.$emit('update:currentPage', page)
    },
    goTo(page) {
      this.updateCurrentPage(page)
    },
    goToFirstPage() {
      this.updateCurrentPage(1)
    },
    decrementPage() {
      if (this.currentPage > 1) {
        this.updateCurrentPage(this.currentPage - 1)
      }
    },
    incrementPage() {
      if (this.currentPage < this.maxPage) {
        this.updateCurrentPage(this.currentPage + 1)
      }
    },
    goToLastPage() {
      this.updateCurrentPage(this.maxPage)
    }
  }
};
</script>

<style>
</style>