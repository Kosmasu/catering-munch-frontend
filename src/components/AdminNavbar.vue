<template>
  <div class="bg-base-100 drop-shadow-md w-48 min-h-screen bg-base-100">
    <ul class="menu flex flex-col w-full pt-6 space-y-4">
      <RouterLink to="/admin" class="btn btn-ghost h-fit">
        <img src="@/assets/munch.png" alt="" class="h-16" />
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
      <li>
        <button @click="btnLogout" class="btn btn-primary">Logout</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  name: "NavbarAdmin",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    isThisPage(name) {
      return this.$route.name == name;
    },
    getPage(name) {
      return {
        "bordered font-semibold text-primary": this.isThisPage(name),
      };
    },
    btnLogout() {
      this.logout();
    },
  },
  computed: {
    ...mapState(useAuthStore, ["result"]),
  },
  created() {},
};
</script>
<style></style>
