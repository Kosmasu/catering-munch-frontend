<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl m-2">List Provider</div>
      <div class="flex space-x-8 items-center">
        <div>
          <select-batch-size @on-batch-size-change="this.fetchProviders()" />
        </div>
        <input
          type="text"
          v-model="this.query"
          placeholder="Search…"
          class="input input-bordered"
        />
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
            <button
              v-if="provider.users_status == 'aktif'"
              @click="this.banUser('provider', provider.users_id)"
              class="btn btn-error rounded-lg text-base-content"
            >
              Ban
            </button>
            <button
              v-else-if="provider.users_status == 'banned'"
              @click="this.unbanUser('provider', provider.users_id)"
              class="btn btn-primary rounded-lg"
            >
              Unban
            </button>
            <button
              v-else-if="provider.users_status == 'menunggu'"
              @click="this.approveProvider(provider.users_id)"
              class="btn btn-primary text-base-content rounded-lg"
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
    <div v-if="this.providers" class="p-2">
      <pagination-vue v-model="currentPage" :paginatedData="this.providers" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";

export default {
  name: "AdminProviders",
  components: {
    PaginationVue,
    SelectBatchSize,
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
      "banUser",
      "unbanUser",
      "approveProvider",
    ]),
  },
  computed: {
    ...mapState(useAdminStore, ["providers"]),
  },
  created() {
    this.fetchProviders().then((response) => {
      // console.log('this.providers:', this.providers);
    });
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchProviders(newCurrentPage);
    },
    query(newQuery, oldQuery) {
      this.currentPage = 1;
      this.fetchProviders(this.currentPage, newQuery);
    },
  },
};
</script>
<style></style>
