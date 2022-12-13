<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div
      class="flex flex-col xl:flex-row xl:space-x-8 items-center justify-between mb-4"
    >
      <div class="flex-1 text-3xl m-2 xl:mt-6">Admin Log History</div>
      <div class="xl:mt-6">
        <select-batch-size @on-batch-size-change="this.fetchHistory()" />
      </div>
      <div>
        <div class="text-center xl:text-left">History Filter</div>
        <select v-model="filter" class="select select-bordered">
          <option value="log">Log</option>
          <option value="menu">Menu</option>
          <option value="pemesanan">Pemesanan</option>
          <option value="rating">Rating</option>
          <option value="topup">Topup</option>
        </select>
      </div>
      <div>
        <div class="text-center xl:text-left">Min Date</div>
        <input
          type="date"
          v-model="this.date_lower"
          class="input input-bordered"
        />
      </div>
      <div>
        <div class="text-center xl:text-left">Max Date</div>
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
          <th class="bg-primary">Action</th>
          <th class="bg-primary">Detail</th>
          <th class="bg-primary">Waktu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in histories">
          <td>{{ log.log_id }}</td>
          <td>{{ log.log_title }}</td>
          <td>{{ log.log_desc }}</td>
          <td>{{ log.log_datetime }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="histories" class="p-2">
      <pagination-vue v-model="currentPage" :paginatedData="histories" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";

export default {
  name: "AdminHistory",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      filter: "log",
      date_lower: "",
      date_upper: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useAdminStore, [
      "fetchHistoryLog",
      "fetchHistoryMenu",
      "fetchHistoryPemesanan",
      "fetchHistoryRating",
      "fetchHistoryTopup",
    ]),
  },
  computed: {
    ...mapState(useAdminStore, ["histories"]),
  },
  created() {
    this.fetchHistoryLog().then((response) => {
      console.log("this.histories", this.histories);
    });
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      if (this.filter == "log") {
        this.fetchHistoryLog(newCurrentPage);
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu(newCurrentPage);
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(newCurrentPage);
      } else if (this.filter == "rating") {
        this.fetchHistoryRating(newCurrentPage);
      } else {
        this.fetchHistoryTopup(newCurrentPage);
      }
    },
    date_lower(newQuery, oldQuery) {
      this.currentPage = 1;
      if (this.filter == "log") {
        this.fetchHistoryLog(this.currentPage, newQuery, this.date_upper);
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu(this.currentPage, newQuery, this.date_upper);
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(this.currentPage, newQuery, this.date_upper);
      } else if (this.filter == "rating") {
        this.fetchHistoryRating(this.currentPage, newQuery, this.date_upper);
      } else {
        this.fetchHistoryTopup(this.currentPage, newQuery, this.date_upper);
      }
    },
    date_upper(newQuery, oldQuery) {
      this.currentPage = 1;
      if (this.filter == "log") {
        this.fetchHistoryLog(this.currentPage, this.date_lower, newQuery);
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu(this.currentPage, this.date_lower, newQuery);
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(this.currentPage, this.date_lower, newQuery);
      } else if (this.filter == "rating") {
        this.fetchHistoryRating(this.currentPage, this.date_lower, newQuery);
      } else {
        this.fetchHistoryTopup(this.currentPage, this.date_lower, newQuery);
      }
    },
  },
};
</script>
<style></style>
