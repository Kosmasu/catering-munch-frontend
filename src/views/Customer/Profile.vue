<template>
  <div class="container">
    <div class="border-2 rounded-lg my-8 p-4 text-xl">
      <div class="text-3xl">Profile</div>
      <table class="border-separate">
        <tbody>
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td class="capitalize">{{ user.nama }}</td>
          </tr>
          <tr>
            <td>Saldo</td>
            <td>:</td>
            <td>Rp. {{ user.saldo.toLocaleString("id-ID") }},00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth/AuthStore.js";

export default {
  name: "CustomerProfile",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>
<style></style>
