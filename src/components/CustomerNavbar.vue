<template>
  <div class="navbar bg-accent">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-bind:class="getPage('customer-search')">
            <RouterLink to="/customer/search">Search</RouterLink>
          </li>
        </ul>
      </div>
      <button
        class="btn btn-ghost normal-case text-xl text-accent-content hover:btn-accent-focus"
      >
        <RouterLink to="/customer"> Munch </RouterLink>
      </button>
      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal p-0 space-x-2 rounded-full">
          <li v-bind:class="getPage('customer-search')">
            <RouterLink to="/customer/search">Search</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-end">
      <button class="btn btn-accent-focus">
        <RouterLink to="/">Welcome, Customer</RouterLink>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getPage(name) {
      return {
        "bg-accent-content text-accent rounded-full": this.$route.name == name,
        "text-accent-content hover:bg-accent-content hover:text-accent":
          this.$route.name != name,
      };
    },
  },
};
</script>
<style></style>
