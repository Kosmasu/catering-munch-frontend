<template>
  <div class="border-solid border-2 rounded-lg m-12 p-4">
    <button @click="back" class="btn btn-primary">&lt; Back</button>
    <div class="text-3xl">History Pemesanan Detail</div>
    <table v-if="histories" class="text-xl border-separate mb-4">
      <thead>
        <tr>
          <th>ID Pemesanan {{ histories.pemesanan_id }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tanggal</td>
          <td>:</td>
          <td>{{ formatDate(new Date(histories.created_at)) }}</td>
        </tr>
        <tr>
          <td>Provider</td>
          <td>:</td>
          <td>{{ histories.users_provider.users_nama }}</td>
        </tr>
        <tr>
          <td>Customer</td>
          <td>:</td>
          <td>{{ histories.users_customer.users_nama }}</td>
        </tr>
        <tr>
          <td>Alamat Customer</td>
          <td>:</td>
          <td>{{ histories.users_customer.users_alamat }}</td>
        </tr>
        <tr>
          <td>Telepon Customer</td>
          <td>:</td>
          <td>{{ histories.users_customer.users_telepon }}</td>
        </tr>
        <tr>
          <td>Jumlah</td>
          <td>:</td>
          <td>{{ histories.pemesanan_jumlah }}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>:</td>
          <td>
            Rp. {{ histories.pemesanan_total.toLocaleString("id-ID") }},00
          </td>
        </tr>
        <tr>
          <td>Rating</td>
          <td>:</td>
          <td>{{ histories.pemesanan_rating }}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>:</td>
          <td class="capitalize">{{ histories.pemesanan_status }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table table-compact w-full text-center">
      <thead>
        <tr>
          <th class="bg-primary">Tanggal</th>
          <th class="bg-primary">Menu</th>
          <th class="bg-primary">Jumlah</th>
          <th class="bg-primary">Total</th>
          <th class="bg-primary">Status</th>
        </tr>
      </thead>
      <tbody v-if="histories">
        <tr
          v-for="(history, index) in histories.detail_pemesanan"
          :key="index"
          class="hover"
        >
          <td class="whitespace-normal">
            {{ formatDate(new Date(history.detail_tanggal)) }}
          </td>
          <td class="whitespace-normal">{{ history.menu.menu_nama }}</td>
          <td>{{ history.detail_jumlah }}</td>
          <td class="whitespace-normal">
            Rp. {{ history.detail_total.toLocaleString("id-ID") }},00
          </td>
          <td class="capitalize">{{ history.detail_status }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="6">
            <font-awesome-icon
              icon="fa-solid fa-spinner"
              class="text-6xl animate-spin"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useAdminStore } from "@/stores/AdminStore";
import router from "@/router";

export default {
  name: "AdminHistoryDetail",
  components: {},
  methods: {
    ...mapActions(useAdminStore, ["fetchHistoryPemesananDetail"]),
    back() {
      router.go(-1);
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
    ...mapState(useAdminStore, ["histories"]),
  },
  created() {
    this.fetchHistoryPemesananDetail(this.$route.params.id);
  },
};
</script>
<style></style>
