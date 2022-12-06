<template>
  <div class="container">
    <div class="m-4 font-semibold text-2xl text-center">Pesan Menu</div>
    <div class="rounded-lg border-2 p-4">
      <div class="font-semibold text-xl">List Menu</div>
      <div class="flex flex-col">
        <div><input type="checkbox" name="" id="" />Nama Menu</div>
        <div><input type="checkbox" name="" id="" />Nama Menu</div>
      </div>
      <div>
        <input type="date" name="" id="" />
      </div>
      <select name="" id="">
        <option value="">Every Monday</option>
        <option value="">Every Tuesday</option>
        <option value="">Every Wednesday</option>
        <option value="">Every Thursday</option>
        <option value="">Every Friday</option>
        <option value="">Every Saturday</option>
        <option value="">Every Sunday</option>
      </select>
      <div>
        <button class="btn btn-primary">Submit</button>
      </div>
    </div>
    <div class="rounded-lg border-2 p-4">
      <div class="font-semibold text-xl">List Pemesanan</div>
      <div class="font-semibold text-lg">Detail</div>
      <div>
        <div class="font-semibold">7/12/2022</div>
        <div>- Ayam Panggang</div>
        <div class="font-semibold">8/12/2022</div>
        <div>- Ayam Panggang</div>
      </div>
      <div class="font-semibold text-lg">Summary</div>
      <div>Jumlah : 0</div>
      <div>Total : Rp. 0,00</div>
      <div>
        <button class="btn btn-primary">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "CustomerPesan",
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {},
};
</script>
<style></style>
