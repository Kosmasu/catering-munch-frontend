<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div class="text-3xl">Overview</div>
      <div class="text-stone-400">Monthly Review</div>
      <div class="divider" />
      <div class="grid grid-cols-3 gap-4 mb-8 text-center text-xl">
        <div class="border-solid border-2 rounded-md py-4">
          <div class="font-bold">Current Customer</div>
          <div></div>
        </div>
        <div class="border-solid border-2 rounded-md py-4">
          <div class="font-bold">Total Pendapatan</div>
          <div>Rp. 0,00</div>
        </div>
        <div class="border-solid border-2 rounded-md py-4">
          <div class="font-bold">Made Deliveries</div>
          <div></div>
        </div>
      </div>
      <div class="text-2xl">New Notification</div>
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">No</th>
            <th class="bg-primary">Nama</th>
            <th class="bg-primary">Alamat</th>
            <th class="bg-primary">Nomor Telepon</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="orders">
          <tr v-for="(order, index) in this.orders" :key="index" class="hover">
            <td>{{ index + 1 }}</td>
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
      <div class="text-2xl">This Month's Delivery</div>
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
            <td>{{ order.detail_tanggal.substring(0, 10) }}</td>
            <td>{{ order.menu.menu_nama }}</td>
            <td>{{ order.history_pemesanan.users_customer.users_alamat }}</td>
            <td class="capitalize">{{ order.detail_status }}</td>
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

export default {
  name: "ProviderHome",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(useProviderStore, [
      "fetchOrders",
      "acceptPesanan",
      "rejectPesanan",
      "kirimPesanan",
    ]),
    deliver(detail_id) {
      this.kirimPesanan(detail_id);
    },
  },
  computed: {
    ...mapState(useProviderStore, ["orders"]),
  },
  created() {
    this.fetchOrders().then((response) => {
      console.log("this.orders:", this.orders);
    });
  },
};
</script>
<style></style>
