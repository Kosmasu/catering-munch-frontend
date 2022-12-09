<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="text-3xl m-2">Summary</div>
    <div class="divider"></div>
    <div class="stats shadow w-full">
      <div class="stat place-items-center">
        <div class="stat-title">Registered Accounts</div>
        <div class="stat-value">
          <div v-if="customers && providers">
            <div>{{ customers.length + providers.length }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 shadow w-full rounded-lg my-4">
      <div class="stat place-items-center">
        <div class="stat-title">Customers</div>
        <div class="stat-value">
          <div v-if="customers">
            <div>{{ customers.length }}</div>
          </div>
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Verified Providers</div>
        <div class="stat-value">
          <div v-if="providers">
            <div>{{ providers.length - providerWaiting().length }}</div>
          </div>
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Unverified Providers</div>
        <div class="stat-value">
          <div v-if="providers">
            <div>{{ providerWaiting().length }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-2xl mt-8 mb-2">Recent Provider Registration</div>
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
        <tbody v-if="providers">
          <tr v-for="provider in providerWaiting()" class="hover">
            <td>{{ provider.users_id }}</td>
            <td>{{ provider.users_nama }}</td>
            <td>{{ provider.users_email }}</td>
            <td>{{ provider.users_alamat }}</td>
            <td>{{ provider.users_telepon }}</td>
            <td>{{ provider.users_status.toUpperCase() }}</td>
            <td>
              <button @click="approve(provider.users_id)" class="btn btn-primary rounded-lg">
                Approve
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";

export default {
  name: "AdminHome",
  components: {
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
    ...mapState(useAdminStore, ["result", "customers", "providers"]),
  },
  created() {
    this.fetchCustomers();
    this.fetchProviders();
  },
};
</script>
<style>

</style>
