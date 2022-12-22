<template>
  <div v-if="histories" class="container">
    <div
      v-if="histories.pemesanan_status == 'selesai'"
      class="flex flex-col items-center font-semibold text-xl space-y-4"
    >
      <div class="flex flex-col items-center">
        <div>Rate</div>
        <div>Pesanan Anda</div>
      </div>
      <div v-if="histories.pemesanan_rating > 0" class="rating rating-lg">
        <div
          v-for="index in histories.pemesanan_rating"
          :key="index"
          class="mask mask-star-2 bg-primary w-10 h-10"
        />
      </div>
      <div
        v-if="
          histories.pemesanan_rating == null || histories.pemesanan_rating == 0
        "
        class="flex flex-col space-y-4"
      >
        <div class="rating rating-lg">
          <input
            type="radio"
            v-model="rating"
            value="0"
            class="rating-hidden"
          />
          <input
            type="radio"
            v-model="rating"
            value="1"
            class="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            v-model="rating"
            value="2"
            class="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            v-model="rating"
            value="3"
            class="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            v-model="rating"
            value="4"
            class="mask mask-star-2 bg-primary"
          />
          <input
            type="radio"
            v-model="rating"
            value="5"
            class="mask mask-star-2 bg-primary"
          />
        </div>
        <div @click="submit" class="btn btn-primary">Submit Rating</div>
      </div>
    </div>
    <div class="rounded-lg border-2 p-4 m-4">
      <div class="font-semibold text-xl text-center">
        <div>Pesanan Anda</div>
        <div>ID Pemesanan : {{ histories.pemesanan_id }}</div>
      </div>
      <table class="table table-compact text-center w-full">
        <tbody>
          <tr
            v-for="(detail, index) in histories.detail_pemesanan"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img
                :src="'http://localhost:8000/storage/' + detail.menu.menu_foto"
                class="w-24"
              />
            </td>
            <td class="capitalize">{{ detail.menu.menu_nama }}</td>
            <td>Rp. {{ detail.detail_total.toLocaleString("id-ID") }},00</td>
            <td>{{ formatDate(new Date(detail.detail_tanggal)) }}</td>
            <td class="capitalize">{{ detail.detail_status }}</td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="flex flex-col">
                <div>
                  Total: Rp.
                  {{ histories.pemesanan_total.toLocaleString("id-ID") }},00
                </div>
                <div>Jumlah Pesanan: {{ histories.pemesanan_jumlah }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="m-12 text-center">
    <font-awesome-icon
      icon="fa-solid fa-spinner"
      class="text-6xl animate-spin"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "../../stores/CustomerStore";

export default {
  name: "CustomerHistoryDetail",
  components: {},
  data() {
    return {
      rating: 0,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchHistoryPemesananDetail",
      "ratePesanan",
    ]),
    submit() {
      if (this.rating > 0) {
        this.ratePesanan(this.$route.params.id, this.rating);
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
    this.fetchHistoryPemesananDetail(this.$route.params.id);
  },
};
</script>
<style></style>
