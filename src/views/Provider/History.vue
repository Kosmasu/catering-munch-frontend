<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="text-3xl">History Pemesanan</div>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead>
          <tr>
            <th>Menu</th>
            <th>Jumlah</th>
            <th>Subtotal</th>
            <th>Tanggal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/ProviderNavbar.vue";
export default {
  name: "ProviderHistory",
  components: {
    Navbar,
  },
  data() {},
  methods: {},
};
</script>
<style></style>
