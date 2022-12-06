<template>
  <div class="bg-base-100 drop-shadow-md">
    <div class="container">
      <div class="navbar">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li v-bind:class="getPage('provider-menus')">
                <RouterLink to="/provider/menus">Menus</RouterLink>
              </li>
              <li v-bind:class="getPage('provider-history')">
                <RouterLink to="/provider/history">History</RouterLink>
              </li>
            </ul>
          </div>
          <button
            class="btn btn-ghost normal-case text-xl text-accent-content hover:btn-accent-focus"
          >
            <RouterLink to="/provider">
              <img src="@/assets/munch.png" alt="" class="h-12" />
            </RouterLink>
          </button>
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal rounded-box p-2 space-x-2">
              <li class="relative" v-bind:class="getPage('provider-menus')">
                <RouterLink to="/provider/menus">Menus</RouterLink>
                <!-- <div
                  v-if="isThisPage('provider-menus')"
                  class="absolute h-1 w-full bg-munch p-0 rounded bottom-0"
                ></div> -->
              </li>
              <li class="relative" v-bind:class="getPage('provider-history')">
                <RouterLink to="/provider/history">History</RouterLink>
                <!-- <div
                  v-if="isThisPage('provider-history')"
                  class="absolute h-1 w-full bg-munch p-0 rounded bottom-0"
                ></div> -->
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-end">
          <div class="dropdown dropdown-hover">
            <label tabindex="0" class="btn btn-primary">
              Welcome, {{ this.firstName }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-4 h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  clip-rule="evenodd"
                  d="m17.9809 20.015c-1.668 1.2468-3.7383 1.985-5.9809 1.985-2.66973 0-5.09512-1.0462-6.88854-2.751-1.91661-1.8218-3.11146-4.3959-3.11146-7.249 0-5.52285 4.47715-10 10-10 5.5228 0 10 4.47715 10 10 0 2.8531-1.1949 5.4272-3.1115 7.249-.2869.2727-.5899.5286-.9076.766zm-1.9809-9.515c0-2.20914-1.7909-4-4-4-2.20914 0-4 1.79086-4 4 0 1.4014.72069 2.6345 1.81166 3.3489-2.04513.6724-3.67412 2.2619-4.40057 4.2819-1.49598-1.607-2.41109-3.762-2.41109-6.1308 0-4.97056 4.02944-9 9-9 4.9706 0 9 4.02944 9 9 0 2.3688-.9151 4.5238-2.4111 6.1308-.7264-2.02-2.3554-3.6095-4.4006-4.2819 1.091-.7144 1.8117-1.9475 1.8117-3.3489zm-1 0c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3c0-1.65685 1.3431-3 3-3s3 1.34315 3 3zm-8.78326 8.3962c1.56407 1.313 3.58132 2.1038 5.78326 2.1038 2.2019 0 4.2192-.7908 5.7833-2.1038-.7015-2.535-3.0251-4.3962-5.7833-4.3962-2.75825 0-5.08179 1.8612-5.78326 4.3962z"
                  fill="rgb(0,0,0)"
                  fill-rule="evenodd"
                  style="fill: rgb(255, 255, 255)"
                ></path>
              </svg>
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><RouterLink @click="logout" to="">Logout</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '../stores/Auth/AuthStore';
import { mapActions, mapState } from 'pinia';

export default {
  computed: {
    ...mapState(useAuthStore, ['firstName'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout']),
    isThisPage(name) {
      return this.$route.name == name;
    },
    getPage(name) {
      return {
        "bordered font-semibold": this.isThisPage(name),
      };
    },
  },
};
</script>
<style></style>
