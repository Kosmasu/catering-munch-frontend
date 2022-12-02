<template>
  <navbar />
  <div class="container">
    <div class="border-solid border-2 rounded-md m-8 p-4">
      <div class="flex justify-between mb-8">
        <div class="text-3xl">List of Customer</div>
        <div class="flex space-x-8">
          <div>
            <div>Showing :</div>
            <div v-if="customers">
              <div v-if="customerSearch(this.query).length <= 1">
                {{ customerSearch(this.query).length }} Customer
              </div>
              <div v-else>
                {{ customerSearch(this.query).length }} Customers
              </div>
            </div>
          </div>
          <form class="form-control">
            <div class="input-group">
              <input
                type="text"
                v-model="query"
                placeholder="Search…"
                class="input input-bordered"
              />
              <!-- <button class="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button> -->
            </div>
          </form>
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
            <tr v-for="customer in customerSearch(query)" class="hover">
              <td>{{ customer.users_id }}</td>
              <td>{{ customer.users_nama }}</td>
              <td>{{ customer.users_email }}</td>
              <td>{{ customer.users_alamat }}</td>
              <td>{{ customer.users_telepon }}</td>
              <td>{{ customer.users_status }}</td>
              <td>
                <form @submit.prevent="submit" class="form-control">
                  <button
                    @click.prevent="ban(customer.users_id)"
                    class="btn btn-primary rounded-lg"
                  >
                    Ban
                  </button>
                </form>
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
</template>
<script>
import Navbar from "@/components/AdminNavbar.vue";
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";

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
    ...mapActions(useAdminStore, ["fetchCustomers", "customerSearch"]),
    submit(id) {
      // console.log(this.customers.find((customer) => customer.users_id == id));
    },
    ban(id) {
      this.submit(id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["customers"]),
    // listCustomerSearch(query) {
    //   if (this.customerSearch) return this.customerSearch(query);
    // },
  },
  created() {
    this.fetchCustomers();
  },
};
</script>
<style></style>
