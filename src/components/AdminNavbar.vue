<template>
  <div class="bg-base-100 drop-shadow-md min-h-screen">
    <ul class="menu flex flex-col w-full pt-6 space-y-4">
      <RouterLink to="/admin" class="btn btn-ghost">
        <img src="@/assets/munch.png" alt="" class="h-12" />
      </RouterLink>
      <li v-bind:class="getPage('admin-customers')">
        <RouterLink to="/admin/customers">Customers</RouterLink>
      </li>
      <li v-bind:class="getPage('admin-providers')">
        <RouterLink to="/admin/providers">Providers</RouterLink>
      </li>
      <li v-bind:class="getPage('admin-history')">
        <RouterLink to="/admin/history">History</RouterLink>
      </li>
      <RouterLink to="/" class="btn btn-primary">Logout</RouterLink>
    </ul>
  </div>
  <!-- <div class="bg-base-100 drop-shadow-md">
    <div class="container">
      <div class="navbar">
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
          <button class="btn btn-ghost normal-case text-xl">
            <RouterLink to="/admin">
              <img src="@/assets/munch.png" alt="" class="h-12" />
            </RouterLink>
          </button>
          <div class="hidden lg:flex">
            <ul class="menu menu-horizontal rounded-box p-2 space-x-2">
              <li class="relative" v-bind:class="getPage('admin-customers')">
                <RouterLink to="/admin/customers">Customers</RouterLink>
                <div
                  v-if="isThisPage('admin-customers')"
                  class="absolute h-1 w-full bg-munch p-0 rounded bottom-0"
                />
              </li>
              <li class="relative" v-bind:class="getPage('admin-providers')">
                <RouterLink to="/admin/providers">Providers</RouterLink>
                <div
                  v-if="isThisPage('admin-providers')"
                  class="absolute h-1 w-full bg-munch p-0 rounded bottom-0"
                />
              </li>
              <li class="relative" v-bind:class="getPage('admin-history')">
                <RouterLink to="/admin/history">History</RouterLink>
                <div
                  v-if="isThisPage('admin-history')"
                  class="absolute h-1 w-full bg-munch p-0 rounded bottom-0"
                />
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
    </div>
  </div> -->
</template>
<script>
export default {
  methods: {
    isThisPage(name) {
      return this.$route.name == name;
    },
    getPage(name) {
      return {
        "bordered font-semibold text-primary": this.isThisPage(name),
      };
    },
  },
};
</script>
<style></style>
