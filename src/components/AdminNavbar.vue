<template>
  <div class="bg-base-100 drop-shadow-md w-48 min-h-screen">
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
      <li class="justify-self-end">
        <RouterLink to="/" class="btn btn-primary">Logout</RouterLink>
      </li>
    </ul>
  </div>
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
