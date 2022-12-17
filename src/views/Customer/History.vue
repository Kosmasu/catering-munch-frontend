<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div
        class="flex flex-col xl:flex-row xl:space-x-8 items-center justify-between mb-4"
      >
        <div class="flex-1 text-3xl m-2 xl:mt-6">History</div>
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
            <option value="pemesanan">Pemesanan</option>
            <option value="topup">Topup</option>
          </select>
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
      <table
        v-if="filter == 'pemesanan'"
        class="table table-compact text-center w-full"
      >
        <thead>
          <tr>
            <th class="bg-primary">No</th>
            <th class="bg-primary">Provider</th>
            <th class="bg-primary">Total</th>
            <th class="bg-primary">Tanggal</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="histories">
          <tr
            v-for="(pemesanan, index) in histories.data"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td class="capitalize whitespace-normal">
              {{ pemesanan.users_provider.users_nama }}
            </td>
            <td class="whitespace-normal">
              Rp. {{ pemesanan.pemesanan_total.toLocaleString("id-ID") }},00
            </td>
            <td class="whitespace-normal">
              {{ formatDate(new Date(pemesanan.created_at)) }}
            </td>
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
        v-else-if="filter == 'topup'"
        class="table table-compact text-center w-full"
      >
        <thead>
          <tr>
            <th class="bg-primary">No</th>
            <th class="bg-primary">Nominal</th>
            <th class="bg-primary">Response</th>
            <th class="bg-primary">Tanggal</th>
          </tr>
        </thead>
        <tbody v-if="histories">
          <tr
            v-for="(topup, index) in histories.data"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>Rp. {{ topup.topup_nominal.toLocaleString("id-ID") }},00</td>
            <td class="capitalize">{{ topup.topup_response }}</td>
            <td>{{ formatDate(new Date(topup.topup_tanggal)) }}</td>
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
import { useCustomerStore } from "@/stores/CustomerStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";
import router from "@/router";

export default {
  name: "CustomerHistory",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      filter: "pemesanan",
      date_lower: "",
      date_upper: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchHistoryPemesanan",
      "fetchHistoryTopup",
    ]),
    detail(id) {
      router.push({ name: "customer-history-detail", params: { id } });
    },
    onBatchChange() {
      if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan();
      } else {
        this.fetchHistoryTopup();
      }
    },
    onFilterChange() {
      this.currentPage = 1;
      if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan();
      } else {
        this.fetchHistoryTopup();
      }
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
    ...mapState(useCustomerStore, ["histories"]),
  },
  created() {
    this.fetchHistoryPemesanan();
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(newCurrentPage);
      } else {
        this.fetchHistoryTopup(newCurrentPage);
      }
    },
    date_lower(newQuery, oldQuery) {
      this.currentPage = 1;
      if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(this.currentPage, newQuery, this.date_upper);
      } else {
        this.fetchHistoryTopup(this.currentPage, newQuery, this.date_upper);
      }
    },
    date_upper(newQuery, oldQuery) {
      this.currentPage = 1;
      if (this.filter == "pemesanan") {
        this.fetchHistoryPemesanan(this.currentPage, this.date_lower, newQuery);
      } else {
        this.fetchHistoryTopup(this.currentPage, this.date_lower, newQuery);
      }
    },
  },
};
</script>
<style></style>
