<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="text-3xl m-2">Summary</div>
    <div class="divider"></div>
    <div class="stats shadow w-full">
      <div class="stat place-items-center">
        <div class="stat-title">Registered Accounts</div>
        <div class="stat-value">
          <div v-if="this.customers && this.providers">
            <div>{{ this.customers.data.length + this.providers.data.length }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 shadow w-full rounded-lg my-4">
      <div class="stat place-items-center">
        <div class="stat-title">Customers</div>
        <div class="stat-value">
          <div v-if="this.customers">
            <div>{{ this.customers.data.length }}</div>
          </div>
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Verified Providers</div>
        <div class="stat-value">
          <div v-if="this.providers && this.waitingProviders">
            <div>{{ this.providers.data.length - this.waitingProviders.data.length }}</div>
          </div>
        </div>
      </div>
      <div class="stat place-items-center">
        <div class="stat-title">Unverified Providers</div>
        <div class="stat-value">
          <div v-if="this.waitingProviders">
            <div>{{ this.waitingProviders.data.length }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">Recent Provider Registration</div>
      <div class="flex space-x-8 items-center">
        <div>
          <select-batch-size @on-batch-size-change="this.fetchWaitingProviders(); this.currentPage = 1" />
        </div>
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
      <tbody v-if="this.waitingProviders">
        <tr v-for="provider in this.waitingProviders.data" class="hover">
          <td>{{ provider.users_id }}</td>
          <td class="capitalize">{{ provider.users_nama }}</td>
          <td>{{ provider.users_email }}</td>
          <td>{{ provider.users_alamat }}</td>
          <td>{{ provider.users_telepon }}</td>
          <td class="capitalize">{{ provider.users_status }}</td>
          <td>
            <button @click="approve(provider.users_id)" class="btn btn-primary text-base-content rounded-lg">
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
    <div v-if="this.waitingProviders" class="p-2">
      <pagination-vue v-model="currentPage" :paginatedData="this.waitingProviders" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";

export default {
  name: "AdminHome",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useAdminStore, [
      "fetchCustomers",
      "fetchProviders",
      "fetchWaitingProviders",
      "providerWaiting",
      "approveProvider",
    ]),
    approve(id) {
      this.approveProvider(id);
    },
  },
  computed: {
    ...mapState(useAdminStore, ["result", "customers", "providers", "waitingProviders"]),
  },
  created() {
    this.fetchCustomers();
    this.fetchProviders();
    this.fetchWaitingProviders();
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchWaitingProviders(newCurrentPage)
    },
  }
};
</script>
<style>

</style>
