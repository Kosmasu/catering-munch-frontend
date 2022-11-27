<template>
  <!-- pascal case -> kebab case -->
  <!-- IniNamaFileNya -> ini-nama-file-nya -->
  <navbar-vue></navbar-vue>

  <div>
    <h1 id="hai" class="text-2xl bg-indigo-500 font-bold">
      Hai
    </h1>
  </div>
  <div class="flex items-center justify-center">
    <button @click="decrement" class="btn ">
      -
    </button>
    <div class="text-lg">
      {{ counter }}
    </div>
    <button @click="increment" class="btn">
      +
    </button>
  </div>
</template>

<script>
// 
import NavbarVue from '../components/Navbar.vue';
import ComponentLain from '../components/Navbar.vue';
export default {
  name: "OdiGanteng", // samain nama file
  data() {
    return {
      counter: 0,
    }
  },
  components: { // list component yang dipake
    NavbarVue,
    ComponentLain
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--;
    }
  }
}
</script>

<style>
</style>