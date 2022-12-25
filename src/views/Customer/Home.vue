<template>
  <div class="container space-y-4 mt-8">
    <div class="font-bold text-3xl text-center">MUNCH</div>
    <div class="font-semibold text-2xl">Catering Anda</div>
    <div class="flex gap-2">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th class="bg-primary">Menu</th>
            <th class="bg-primary">Jumlah</th>
            <th class="bg-primary">Tanggal</th>
            <th class="bg-primary">Status</th>
            <th class="bg-primary">Action</th>
          </tr>
        </thead>
        <tbody v-if="cateringAnda">
          <tr v-for="catering in cateringAnda">
            <td>{{ catering.menu.menu_nama }}</td>
            <td>{{ catering.detail_jumlah }}</td>
            <td>{{ formatDate(new Date(catering.detail_tanggal)) }}</td>
            <td class="capitalize">{{ catering.detail_status }}</td>
            <td>
              <button
                @click="accept(catering.detail_id)"
                v-if="catering.detail_status == 'terkirim'"
                class="btn btn-primary"
              >
                Diterima
              </button>
              <div v-else>-</div>
            </td>
          </tr>
          <tr v-if="cateringAnda.length == 0">
            <td colspan="5">Tidak ada Catering bulan ini!</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="font-semibold text-2xl">Top Catering</div>
    <div class="flex gap-2">
      <carousel-menu-vue v-if="topCatering" :providers="topCatering" />
      <div v-else>
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          class="text-6xl animate-spin"
        />
      </div>
    </div>
    <div class="font-semibold text-2xl">Pesan Lagi</div>
    <div class="flex gap-2">
      <carousel-menu-vue
        v-if="pesanLagi"
        :providers="pesanLagi"
        :type="'objek'"
      />
      <div v-else>
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          class="text-6xl animate-spin"
        />
      </div>
      <div v-if="pesanLagi && pesanLagi.length == 0">
        Anda belum pernah memesan Catering!
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore";
import CardMenuVue from "@/components/CardMenu.vue";
import CarouselMenuVue from "@/components/CarouselMenu.vue";

export default {
  name: "CustomerHome",
  components: {
    CarouselMenuVue,
    CardMenuVue,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(useCustomerStore, [
      "fetchCateringAnda",
      "fetchTopCatering",
      "fetchPesanLagi",
      "acceptPesanan",
    ]),
    accept(detail_id) {
      this.acceptPesanan(detail_id);
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
    ...mapState(useCustomerStore, ["cateringAnda", "topCatering", "pesanLagi"]),
  },
  created() {
    this.fetchCateringAnda();
    this.fetchTopCatering();
    this.fetchPesanLagi();
  },
};
</script>
<style></style>
