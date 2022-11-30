<template>
  <div class="navbar bg-primary-content">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
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
          <li v-bind:class="getPage('admin-customers')">
            <RouterLink to="/admin/customers">Customers</RouterLink>
          </li>
          <li v-bind:class="getPage('admin-providers')">
            <RouterLink to="/admin/providers">Providers</RouterLink>
          </li>
          <li v-bind:class="getPage('admin-history')">
            <RouterLink to="/admin/history">History</RouterLink>
          </li>
        </ul>
      </div>
      <button
        class="btn btn-ghost normal-case text-xl text-primary hover:btn-primary"
      >
        <RouterLink to="/admin">Munch</RouterLink>
      </button>
      <div class="hidden lg:flex">
        <ul class="menu menu-horizontal p-0 space-x-2 rounded-full">
          <li v-bind:class="getPage('admin-customers')">
            <RouterLink to="/admin/customers">Customers</RouterLink>
          </li>
          <li v-bind:class="getPage('admin-providers')">
            <RouterLink to="/admin/providers">Providers</RouterLink>
          </li>
          <li v-bind:class="getPage('admin-history')">
            <RouterLink to="/admin/history">History</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-end">
      <button class="btn btn-primary">
        <RouterLink to="/">Logout</RouterLink>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getPage(name) {
      return {
        "bg-primary rounded-full": this.$route.name == name,
        "text-primary hover:bg-primary hover:text-neutral":
          this.$route.name != name,
      };
    },
  },
};
</script>
<style></style>
