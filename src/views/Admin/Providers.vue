<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">List Provider</div>
      <div class="flex space-x-8 items-center">
        <input type="text" v-model="this.query" placeholder="Search…" class="input input-bordered" />
      </div>
    </div>
    <table class="table table-compact w-full text-center">
      <thead>
        <tr>
          <th class="bg-primary">ID</th>
          <th class="bg-primary">Nama</th>
          <th class="bg-primary">Email</th>
          <th class="bg-primary">Alamat</th>
          <th class="bg-primary">Nomor Telepon</th>
          <th class="bg-primary">Status</th>
          <th class="bg-primary">Action</th>
        </tr>
      </thead>
      <tbody v-if="providers">
        <tr v-for="provider in this.providers.data" class="hover">
          <td>{{ provider.users_id }}</td>
          <td class="capitalize">{{ provider.users_nama }}</td>
          <td>{{ provider.users_email }}</td>
          <td>{{ provider.users_alamat }}</td>
          <td>{{ provider.users_telepon }}</td>
          <td class="capitalize">{{ provider.users_status }}</td>
          <td>
            <button v-if="provider.users_status == 'aktif'" @click="this.banUser('provider', provider.users_id)"
              class="btn btn-primary rounded-lg text-base-content">
              Ban
            </button>
            <button v-else @click="this.unbanUser('provider', provider.users_id)" class="btn btn-error rounded-lg">
              Unban
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="7">
            <font-awesome-icon icon="fa-solid fa-spinner" class="text-6xl animate-spin" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="this.providers" class="p-2">
      <pagination-vue v-model="currentPage" :paginatedData="this.providers" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import Navbar from "@/components/AdminNavbar.vue";
import AdminLayout from "@/views/Admin/Layout.vue";
import PaginationVue from "@/components/Pagination.vue";

export default {
  name: "AdminProviders",
  components: {
    Navbar,
    AdminLayout,
    PaginationVue,
  },
  data() {
    return {
      query: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useAdminStore, [
      "fetchProviders",
      "usersSearch",
      "banUser",
      "unbanUser",
    ]),
    ban(id) {
      this.banUser("provider", id);
    },
    unban(id) {
      this.unbanUser("provider", id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["result", "providers"]),
  },
  created() {
    this.fetchProviders(5, 1).then(response => {
      console.log('this.providers:', this.providers);
    })
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchProviders(5, newCurrentPage)
    },
    query(newQuery, oldQuery) {
      this.currentPage = 1
      this.fetchProviders(5, this.currentPage, newQuery)
    },
  }
};
</script>
<style>

</style>
