<template>
  <div class="container">
    <div class="m-12 font-semibold text-4xl text-center">Profile</div>
    <div class="border-2 p-4 rounded-lg text-xl">
      <table class="border-separate">
        <tbody v-if="profile">
          <tr>
            <td>Nama</td>
            <td>:</td>
            <td class="capitalize">{{ profile.users_nama }}</td>
          </tr>
          <tr>
            <td>Saldo</td>
            <td>:</td>
            <td>Rp. {{ profile.users_saldo.toLocaleString("id-ID") }},00</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{{ profile.users_email }}</td>
          </tr>
          <tr>
            <td>Nomor Telepon</td>
            <td>:</td>
            <td>{{ profile.users_telepon }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>:</td>
            <td>{{ profile.users_alamat }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!profile" class="text-center">
        <font-awesome-icon
          icon="fa-solid fa-spinner"
          class="text-6xl animate-spin"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";

export default {
  name: "CustomerProfile",
  data() {
    return {};
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchProfile"]),
  },
  computed: {
    ...mapState(useCustomerStore, ["profile"]),
  },
  created() {
    this.fetchProfile();
  },
};
</script>
<style></style>
