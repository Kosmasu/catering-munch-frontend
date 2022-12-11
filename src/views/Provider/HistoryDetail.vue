<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <button @click="back" class="btn btn-primary">&lt; Back</button>
      <div class="text-3xl">Detail History</div>
      <div v-if="histories" class="text-xl">
        <div class="font-bold">ID Pemesanan {{ histories.pemesanan_id }}</div>
        <div>Customer : {{ histories.users_customer }}</div>
        <div>Rating : {{ histories.pemesanan_rating }}</div>
        <div>Jumlah : {{ histories.pemesanan_jumlah }}</div>
        <div>
          Total : Rp. {{ histories.pemesanan_total.toLocaleString("id-ID") }},00
        </div>
        <div>
          Tanggal :
          <!-- {{ new Date(history.created_at).toLocaleDateString("en-EN") }} -->
        </div>
        <div class="capitalize">Status : {{ histories.pemesanan_status }}</div>
        <table class="table table-compact w-full text-center">
          <thead>
            <tr>
              <th class="bg-primary">No</th>
              <th class="bg-primary">Menu</th>
              <th class="bg-primary">Jumlah</th>
              <th class="bg-primary">Total</th>
              <th class="bg-primary">Tanggal</th>
              <th class="bg-primary">Status</th>
            </tr>
          </thead>
          <tbody v-if="histories.detail_pemesanan">
            <tr
              v-for="(history, index) in histories.detail_pemesanan"
              :key="index"
              class="hover"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ history.menu_id }}</td>
              <td>{{ history.detail_jumlah }}</td>
              <td>Rp. {{ history.detail_total.toLocaleString("id-ID") }},00</td>
              <td>
                {{
                  new Date(history.detail_tanggal).toLocaleDateString("en-EN")
                }}
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
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import router from "@/router";

export default {
  name: "ProviderHistoryDetail",
  components: {},
  methods: {
    ...mapActions(useProviderStore, ["fetchHistoryDetail"]),
    back() {
      router.go(-1);
    },
  },
  computed: {
    ...mapState(useProviderStore, ["histories"]),
  },
  created() {
    this.fetchHistoryDetail(this.$route.params.id);
  },
};
</script>
<style></style>
