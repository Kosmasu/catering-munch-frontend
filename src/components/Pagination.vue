<template>
  <div class="w-full flex justify-center">
    <div class="btn-group">
      <button class="btn" @click="goToFirstPage">&lt;&lt;</button>
      <button class="btn" @click="decrementPage">&lt;</button>
      <button v-for="page in maxPage" class="btn" :class="{'btn-primary': isCurrentPage(page)}" @click="goTo(page)">{{ page }}</button>
      <button class="btn" @click="incrementPage">&gt;</button>
      <button class="btn" @click="goToLastPage">&gt;&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 2,
    };
  },
  props: {
    maxPage: {
      type: String,
      required: true,
    },
  },
  methods: {
    isCurrentPage(page) {
      return this.currentPage == page
    },
    goTo(page) {
      this.currentPage = page
    },
    goToFirstPage() {
      this.currentPage = 1
    },
    decrementPage() {
      this.currentPage--
    },
    incrementPage() {
      this.currentPage++;
    },
    goToLastPage() {
      this.currentPage = this.maxPage
    }
  }
};
</script>

<style>
</style>