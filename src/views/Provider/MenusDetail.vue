<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">Detail Menu</div>
    <div>
      <img src="" alt="Foto" />
    </div>
    <div>
      <div>Nama : {{ menu.nama }}</div>
      <div>Harga : {{ menu.harga }}</div>
      <div>Availability : {{ menu.availability }}</div>
      <div>Tanggal : {{ menu.tanggal }}</div>
    </div>
    <div>
      <button class="btn btn-warning">Edit Details</button>
      <button class="btn btn-error">Delete Menu</button>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/ProviderNavbar.vue";
export default {
  name: "ProviderMenusDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      menu: [
        {
          nama: "nama",
          harga: "harga",
          availability: "Tersedia",
          tanggal: "2022-11-29",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style></style>
