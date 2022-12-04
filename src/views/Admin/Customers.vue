<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">List of Customers</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="customers">
            <div v-if="usersSearch('customer', query).length <= 1">
              {{ usersSearch("customer", query).length }} Customer
            </div>
            <div v-else>
              {{ usersSearch("customer", query).length }} Customers
            </div>
          </div>
        </div>
        <input
          type="text"
          v-model="query"
          placeholder="Search…"
          class="input input-primary input-bordered"
        />
      </div>
    </div>
    <div class="">
      <table class="table table-compact text-center w-full">
        <thead>
          <tr>
            <th class="bg-primary text-primary-content">ID</th>
            <th class="bg-primary text-primary-content">Nama</th>
            <th class="bg-primary text-primary-content">Email</th>
            <th class="bg-primary text-primary-content">Alamat</th>
            <th class="bg-primary text-primary-content">Nomor Telepon</th>
            <th class="bg-primary text-primary-content">Status</th>
            <th class="bg-primary text-primary-content">Action</th>
          </tr>
        </thead>
        <tbody v-if="customers">
          <tr v-for="customer in usersSearch('customer', query)" class="hover">
            <td>{{ customer.users_id }}</td>
            <td>{{ customer.users_nama }}</td>
            <td>{{ customer.users_email }}</td>
            <td>{{ customer.users_alamat }}</td>
            <td>{{ customer.users_telepon }}</td>
            <td>{{ customer.users_status.toUpperCase() }}</td>
            <td>
              <button
                v-if="customer.users_status == 'aktif'"
                @click="ban(customer.users_id)"
                class="btn btn-primary rounded-lg"
              >
                Ban
              </button>
              <button
                v-else
                @click="unban(customer.users_id)"
                class="btn btn-error rounded-lg"
              >
                Unban
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="7">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full flex justify-center">
        <pagination-vue :maxPage="10" v-model:currentPage="currentPage" />
      </div>
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
      "usersSearch",
      "banUser",
      "unbanUser",
    ]),
    ban(id) {
      this.banUser("customer", id);
    },
    unban(id) {
      this.unbanUser("customer", id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["result", "customers"]),
  },
  created() {
    this.fetchCustomers();
  },
};
</script>
<style></style>
