<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div class="text-3xl">Overview</div>
      <div>Monthly Review</div>
      <div class="divider" />
      <div v-if="stats" class="flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0 justify-between text-center text-xl">
        <div class="flex-1 border-solid border-2 rounded-lg py-4">
          <div class="font-bold">Current Customer</div>
          <div>{{ stats.thismonth_delivery }}</div>
        </div>
        <div class="flex-1 border-solid border-2 rounded-lg py-4">
          <div class="font-bold">Total Pendapatan</div>
          <div>Rp. {{ stats.total_pendapatan }},00</div>
        </div>
        <div class="flex-1 border-solid border-2 rounded-lg py-4">
          <div class="font-bold">Made Deliveries</div>
          <div>{{ stats.made_delivery }}</div>
        </div>
      </div>
      <div class="text-2xl my-4">New Order</div>
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">Nama</th>
            <th class="bg-primary">Alamat</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="histories">
          <tr
            v-for="(history, index) in this.histories.data"
            :key="index"
            class="hover"
          >
            <td class="whitespace-normal">
              {{ history.users_customer.users_nama }}
            </td>
            <td class="whitespace-normal">
              {{ history.users_customer.users_alamat }}
            </td>
            <td>
              <div
                class="flex flex-col lg:flex-row lg:space-x-2 justify-center"
              >
                <button
                  @click="detail(history.pemesanan_id)"
                  class="btn btn-warning"
                >
                  Detail
                </button>
                <button
                  @click="accept(history.pemesanan_id)"
                  class="btn btn-primary"
                >
                  Accept
                </button>
                <button
                  @click="reject(history.pemesanan_id)"
                  class="btn btn-error"
                >
                  Reject
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="text-center" colspan="5">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-2xl my-4">This Month's Delivery</div>
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">No</th>
            <th class="bg-primary">Tanggal</th>
            <th class="bg-primary">Menu</th>
            <th class="bg-primary">Alamat</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="orders">
          <tr v-for="(order, index) in this.orders" :key="index" class="hover">
            <td>{{ index + 1 }}</td>
            <td class="whitespace-normal">
              {{ formatDate(new Date(order.detail_tanggal)) }}
            </td>
            <td class="whitespace-normal">{{ order.menu.menu_nama }}</td>
            <td class="whitespace-normal">
              {{ order.history_pemesanan.users_customer.users_alamat }}
            </td>
            <td class="capitalize whitespace-normal">
              {{ order.detail_status }}
            </td>
            <td>
              <button @click="deliver(order.detail_id)" class="btn btn-primary">
                Deliver
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
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import router from "@/router";

export default {
  name: "ProviderHome",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(useProviderStore, [
      "fetchStats",
      "fetchWaiting",
      "fetchOrders",
      "acceptPesanan",
      "rejectPesanan",
      "kirimPesanan",
    ]),
    detail(id) {
      router.push({
        name: "provider-history-detail",
        params: { id },
      });
    },
    accept(detail_id) {
      this.acceptPesanan(detail_id);
    },
    reject(detail_id) {
      this.rejectPesanan(detail_id);
    },
    deliver(detail_id) {
      this.kirimPesanan(detail_id);
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
    ...mapState(useProviderStore, ["stats", "histories", "orders"]),
  },
  created() {
    this.fetchStats();
    this.fetchWaiting();
    this.fetchOrders();
  },
};
</script>
<style></style>
