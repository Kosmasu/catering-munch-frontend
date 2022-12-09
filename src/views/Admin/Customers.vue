<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">List Customer</div>
      <div class="flex space-x-8 items-center">
        <input type="text" v-model="this.query" placeholder="Search…" class="input input-bordered" />
      </div>
    </div>
    <table class="table table-compact text-center w-full">
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
      <tbody v-if="customers">
        <tr v-for="customer in this.customers.data" class="hover">
          <td>{{ customer.users_id }}</td>
          <td class="capitalize">{{ customer.users_nama }}</td>
          <td>{{ customer.users_email }}</td>
          <td>{{ customer.users_alamat }}</td>
          <td>{{ customer.users_telepon }}</td>
          <td class="capitalize">{{ customer.users_status }}</td>
          <td>
            <button v-if="customer.users_status == 'aktif'" @click="this.banUser('customer', customer.users_id)"
              class="btn btn-primary rounded-lg text-base-content">
              Ban
            </button>
            <button v-else @click="this.unbanUser('customer', customer.users_id)" class="btn btn-error rounded-lg">
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
    <div v-if="this.customers" class="p-2">
      <pagination-vue v-model="currentPage" :paginatedData="this.customers" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import AdminLayout from "@/views/Admin/Layout.vue";
import PaginationVue from "@/components/Pagination.vue";

export default {
  name: "AdminCustomers",
  components: {
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
      "fetchCustomers",
      "banUser",
      "unbanUser",
    ]),
  },
  computed: {
    ...mapState(useAdminStore, ["result", "customers"]),
  },
  created() {
    this.fetchCustomers(5, 1).then(response => {
      console.log('this.customers:', this.customers);
    })
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchCustomers(5, newCurrentPage)
    },
    query(newQuery, oldQuery) {
      this.currentPage = 1
      this.fetchCustomers(5, this.currentPage, newQuery)
    },
  }
};
</script>
<style>

</style>
