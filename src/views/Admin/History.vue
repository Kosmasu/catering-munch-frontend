<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <div
      class="flex flex-col xl:flex-row xl:space-x-8 items-center justify-between mb-4"
    >
      <div class="flex-1 text-3xl m-2 xl:mt-6">Admin Log History</div>
      <div class="xl:mt-6">
        <select-batch-size @on-batch-size-change="onBatchChange" />
      </div>
      <div>
        <div class="text-center xl:text-left">History Filter</div>
        <select
          v-model="filter"
          @change="onFilterChange"
          class="select select-bordered"
        >
          <option value="log">Log</option>
          <option value="menu">Menu</option>
          <option value="pemesanan">Pemesanan</option>
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
    <table
      v-if="filter == 'log'"
      class="table table-compact w-full text-center"
    >
      <thead>
        <tr>
          <th class="bg-primary">ID</th>
          <th class="bg-primary">Level</th>
          <th class="bg-primary">Title</th>
          <th class="bg-primary">Description</th>
          <th class="bg-primary">Users</th>
          <th class="bg-primary">Timestamp</th>
        </tr>
      </thead>
      <tbody v-if="histories">
        <tr v-for="log in histories.data">
          <td>{{ log.log_id }}</td>
          <td class="capitalize">{{ log.log_level }}</td>
          <td class="capitalize">{{ log.log_title }}</td>
          <td>{{ log.log_desc }}</td>
          <td>{{ log.users_id }}</td>
          <td>{{ log.log_timestamp }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="filter == 'menu'"
      class="table table-compact w-full text-center"
    >
      <thead>
        <tr>
          <th class="bg-primary">ID</th>
          <th class="bg-primary">Menu ID</th>
          <th class="bg-primary">Action</th>
          <th class="bg-primary">Timestamp</th>
        </tr>
      </thead>
      <tbody v-if="histories">
        <tr v-for="menu in histories.data">
          <td>{{ menu.history_menu_id }}</td>
          <td>{{ menu.menu_id }}</td>
          <td class="capitalize">{{ menu.history_menu_action }}</td>
          <td>{{ menu.created_at }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="filter == 'pemesanan'"
      class="table table-compact w-full text-center"
    >
      <thead>
        <tr>
          <th class="bg-primary">ID</th>
          <th class="bg-primary">Provider</th>
          <th class="bg-primary">Customer</th>
          <th class="bg-primary">Jumlah</th>
          <th class="bg-primary">Total</th>
          <th class="bg-primary">Rating</th>
          <th class="bg-primary">Status</th>
          <th class="bg-primary">Action</th>
        </tr>
      </thead>
      <tbody v-if="histories">
        <tr v-for="pemesanan in histories.data">
          <td>{{ pemesanan.pemesanan_id }}</td>
          <td class="capitalize">{{ pemesanan.users_provider.users_nama }}</td>
          <td class="capitalize">{{ pemesanan.users_customer.users_nama }}</td>
          <td>{{ pemesanan.pemesanan_jumlah }}</td>
          <td>
            Rp. {{ pemesanan.pemesanan_total.toLocaleString("id-ID") }},00
          </td>
          <td>{{ pemesanan.pemesanan_rating }}</td>
          <td class="capitalize">{{ pemesanan.pemesanan_status }}</td>
          <td>
            <button
              @click="detail(pemesanan.pemesanan_id)"
              class="btn btn-primary"
            >
              Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      v-if="filter == 'topup'"
      class="table table-compact w-full text-center"
    >
      <thead>
        <tr>
          <th class="bg-primary">ID</th>
          <th class="bg-primary">Customer</th>
          <th class="bg-primary">Nominal</th>
          <th class="bg-primary">Response</th>
          <th class="bg-primary">Timestamp</th>
        </tr>
      </thead>
      <tbody v-if="histories">
        <tr v-for="topup in histories.data">
          <td>{{ topup.topup_id }}</td>
          <td>{{ topup.users.users_nama }}</td>
          <td>Rp. {{ topup.topup_nominal.toLocaleString("id-ID") }},00</td>
          <td>{{ topup.topup_response }}</td>
          <td>{{ topup.topup_tanggal }}</td>
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
import router from "@/router";

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
    detail(id) {
      router.push({ name: "admin-history-detail", params: { id } });
    },
    onBatchChange() {
      if (this.filter == "log") {
        this.fetchHistoryLog();
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu();
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan();
      } else {
        this.fetchHistoryTopup();
      }
    },
    onFilterChange() {
      this.currentPage = 1;
      if (this.filter == "log") {
        this.fetchHistoryLog();
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu();
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan();
      } else {
        this.fetchHistoryTopup();
      }
    },
  },
  computed: {
    ...mapState(useAdminStore, ["histories"]),
  },
  created() {
    this.fetchHistoryLog();
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      if (this.filter == "log") {
        this.fetchHistoryLog(newCurrentPage);
      } else if (this.filter == "menu") {
        this.fetchHistoryMenu(newCurrentPage);
      } else if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(newCurrentPage);
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
      } else {
        this.fetchHistoryTopup(this.currentPage, this.date_lower, newQuery);
      }
    },
  },
};
</script>
<style></style>
