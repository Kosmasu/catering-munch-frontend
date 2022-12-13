<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div
        class="flex flex-col lg:flex-row lg:space-x-8 items-center justify-between mb-4"
      >
        <div class="flex-1 text-3xl m-2 lg:mt-6">History Pemesanan</div>
        <div class="lg:mt-6">
          <select-batch-size @on-batch-size-change="this.fetchHistory()" />
        </div>
        <div>
          <div class="text-center lg:text-left">Min Date</div>
          <input
            type="date"
            v-model="this.date_lower"
            class="input input-bordered"
          />
        </div>
        <div>
          <div class="text-center lg:text-left">Max Date</div>
          <input
            type="date"
            v-model="this.date_upper"
            class="input input-bordered"
          />
        </div>
      </div>
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">ID</th>
            <th class="bg-primary">Customer</th>
            <th class="bg-primary">Tanggal</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="histories">
          <tr
            v-for="(history, index) in this.histories.data"
            :key="index"
            class="hover"
          >
            <td>{{ history.pemesanan_id }}</td>
            <td class="whitespace-normal">
              {{ history.users_customer.users_nama }}
            </td>
            <td class="whitespace-normal">
              {{ formatDate(new Date(history.created_at)) }}
            </td>
            <td class="capitalize">{{ history.pemesanan_status }}</td>
            <td>
              <button
                @click="detail(history.pemesanan_id)"
                class="btn btn-primary"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="8">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="histories" class="p-2">
        <pagination-vue v-model="currentPage" :paginatedData="histories" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";
import router from "@/router";

export default {
  name: "ProviderHistory",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      date_lower: "",
      date_upper: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useProviderStore, ["fetchHistory"]),
    detail(id) {
      router.push({ name: "provider-history-detail", params: { id } });
    },
    formatDate(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    },
  },
  computed: {
    ...mapState(useProviderStore, ["histories"]),
  },
  created() {
    this.fetchHistory().then((response) => {
      console.log("this.histories", this.histories);
    });
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchHistory(newCurrentPage);
    },
    date_lower(newQuery, oldQuery) {
      this.currentPage = 1;
      this.fetchHistory(this.currentPage, newQuery, this.date_upper);
    },
    date_upper(newQuery, oldQuery) {
      this.currentPage = 1;
      this.fetchHistory(this.currentPage, this.date_lower, newQuery);
    },
  },
};
</script>
<style></style>
