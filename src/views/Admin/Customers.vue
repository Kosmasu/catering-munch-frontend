<template>
  <div class="flex">
    <div class="flex-initial w-1/5">
      <navbar />
    </div>

    <div class="flex-1 container">
      <div class="border-solid border-2 rounded-md m-8 p-4">
        <div class="flex justify-between mb-8">
          <div class="text-3xl m-2">List of Customer</div>
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
              class="input input-bordered rounded-lg"
            />
          </div>
        </div>
        <div class="overflow-x-auto">
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
            <tbody v-if="customers">
              <tr
                v-for="customer in usersSearch('customer', query)"
                class="hover"
              >
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import Navbar from "@/components/AdminNavbar.vue";

export default {
  name: "AdminCustomers",
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
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
    ...mapState(useAdminStore, ["status", "customers"]),
  },
  created() {
    this.fetchCustomers();
  },
};
</script>
<style></style>
