<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">Add New Menu</div>
    <div>
      <img src="" alt="Foto" />
      <input type="file" name="" id="" />
    </div>
    <div>
      <div>Nama : {{ menu.nama }}</div>
      <div>Harga : {{ menu.harga }}</div>
      <div>Availability : {{ menu.availability }}</div>
      <div>Tanggal : {{ menu.tanggal }}</div>
    </div>
    <div>
      <button class="btn btn-info">Submit</button>
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
      menu: [],
    };
  },
  methods: {},
};
</script>
<style></style>
