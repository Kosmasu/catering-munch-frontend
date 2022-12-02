<template>
  <div class="flex">
    <div class="flex-initial w-1/5">
      <navbar />
    </div>

    <div class="flex-1 container">
      <div class="border-solid border-2 rounded-md m-8 p-4">
        <div class="text-3xl m-2">Summary</div>
        <div class="divider"></div>
        <div
          class="border-solid border-2 rounded-md my-2 py-4 text-center text-2xl"
        >
          <div class="font-bold">Registered Munch Accounts</div>
          <div v-if="customers && providers">
            <div>{{ customers.length + providers.length }}</div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-8 text-center text-xl">
          <div class="border-solid border-2 rounded-md py-4">
            <div class="font-bold">Customers</div>
            <div v-if="customers">
              <div>{{ customers.length }}</div>
            </div>
          </div>
          <div class="border-solid border-2 rounded-md py-4">
            <div class="font-bold">Verified Providers</div>
            <div v-if="providers">
              <div>{{ providers.length - providerWaiting().length }}</div>
            </div>
          </div>
          <div class="border-solid border-2 rounded-md py-4">
            <div class="font-bold">Unverified Providers</div>
            <div v-if="providers">
              <div>{{ providerWaiting().length }}</div>
            </div>
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
            <tbody v-if="providers">
              <tr v-for="provider in providerWaiting()" class="hover">
                <td>{{ provider.users_id }}</td>
                <td>{{ provider.users_nama }}</td>
                <td>{{ provider.users_email }}</td>
                <td>{{ provider.users_alamat }}</td>
                <td>{{ provider.users_telepon }}</td>
                <td>{{ provider.users_status.toUpperCase() }}</td>
                <td>
                  <button
                    @click="approve(provider.users_id)"
                    class="btn btn-primary rounded-lg"
                  >
                    Approve
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
  name: "AdminHome",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useAdminStore, [
      "fetchCustomers",
      "fetchProviders",
      "providerWaiting",
      "approveProvider",
    ]),
    approve(id) {
      this.approveProvider(id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["status", "customers", "providers"]),
  },
  created() {
    this.fetchCustomers();
    this.fetchProviders();
  },
};
</script>
<style></style>
