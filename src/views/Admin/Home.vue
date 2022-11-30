<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">Summary</div>
    <div class="divider"></div>
    <div
      class="border-solid border-2 rounded-md my-2 py-4 text-center text-2xl"
    >
      <div class="font-bold">Registered Munch Accounts</div>
      <div>{{ registeredAccount }}</div>
    </div>
    <div class="grid grid-cols-3 gap-4 mb-8 text-center text-xl">
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Customers</div>
        <div>{{ totalCustomer }}</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Providers</div>
        <div>{{ totalProvider }}</div>
      </div>
      <div class="border-solid border-2 rounded-md py-4">
        <div class="font-bold">Unverified Accounts</div>
        <div>{{ totalUnverified }}</div>
      </div>
    </div>
    <div class="text-2xl mb-2">Recent Provider Registration</div>
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
        <tbody v-if="providerList.length > 0">
          <tr v-for="provider in providerList" class="hover">
            <td>{{ provider.id }}</td>
            <td>{{ provider.nama }}</td>
            <td>{{ provider.email }}</td>
            <td>{{ provider.alamat }}</td>
            <td>{{ provider.telepon }}</td>
            <td>{{ provider.status }}</td>
            <td>
              <form @submit.prevent="submit" class="form-control">
                <button
                  @click.prevent="approve(provider.id)"
                  class="btn btn-primary rounded-lg"
                >
                  Approve
                </button>
              </form>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="7">
              Tidak ada yang sedang menunggu!
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
  name: "AdminHome",
  components: {
    Navbar,
  },
  data() {
    return {
      registeredAccount: 4,
      totalCustomer: 2,
      totalProvider: 1,
      totalUnverified: 1,
      providerList: [
        {
          id: 4,
          nama: "Provider2",
          email: "Provider2@gmail.com",
          alamat: "Surabaya",
          telepon: "0812345678",
          status: "Menunggu",
        },
      ],
    };
  },
  methods: {
    submit(id) {
      console.log(this.providerList.find((provider) => provider.id == id));
    },
    approve(id) {
      this.submit(id);
    },
  },
};
</script>

<style></style>
