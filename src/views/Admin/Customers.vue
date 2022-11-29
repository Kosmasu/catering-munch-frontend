<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl">List of Customer</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="customerList.length <= 1">
            {{ customerList.length }} Customer
          </div>
          <div v-else>{{ customerList.length }} Customers</div>
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
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Alamat</th>
            <th>Nomor Telepon</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="customerList.length > 0">
          <tr v-for="customer in customerSearch" class="hover">
            <td>{{ customer.id }}</td>
            <td>{{ customer.nama }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.alamat }}</td>
            <td>{{ customer.telepon }}</td>
            <td>{{ customer.status }}</td>
            <td>
              <form @submit.prevent="submit" class="form-control">
                <button
                  @click.prevent="ban(customer.id)"
                  class="btn btn-error rounded-lg"
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
              Tidak ada customer saat ini!
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/AdminNavbar.vue";
export default {
  name: "AdminCustomers",
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
      customerList: [
        {
          id: 1,
          nama: "Customer1",
          email: "Customer1@gmail.com",
          alamat: "Surabaya",
          telepon: "0812345678",
          status: "Aktif",
        },
        {
          id: 2,
          nama: "Customer2",
          email: "Customer2@gmail.com",
          alamat: "Surabaya",
          telepon: "0812345678",
          status: "Banned",
        },
      ],
    };
  },
  computed: {
    customerSearch() {
      return this.customerList.filter((customer) => {
        return customer.nama.indexOf(this.query) > -1;
      });
    },
  },
  methods: {
    submit(id) {
      console.log(this.customerList.find((customer) => customer.id == id));
    },
    ban(id) {
      this.submit(id);
    },
  },
};
</script>
<style></style>
