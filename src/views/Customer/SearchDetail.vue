<template>
  <div class="container">
    <div v-if="menus">
      <div class="mt-6 font-semibold text-4xl text-center">Provider</div>
      <div class="mb-6 font-semibold text-2xl underline text-center">
        {{ menus.data[0].users.users_nama }}
      </div>
      <div class="flex flex-col border-2 p-4 rounded-lg text-xl">
        <button @click="pesan" class="btn btn-primary w-1/2 self-center">
          Pesan Sekarang
        </button>
        <table class="table table-compact text-center w-full">
          <tbody>
            <tr v-for="menu in menus.data">
              <td>
                <img
                  :src="'http://localhost:8000/storage/' + menu.menu_foto"
                  class="w-24"
                />
              </td>
              <td class="capitalize">{{ menu.menu_nama }}</td>
              <td>Rp, {{ menu.menu_harga.toLocaleString("id-ID") }},00</td>
              <td class="capitalize">{{ menu.menu_status }}</td>
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
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore";
import router from "@/router";

export default {
  name: "CustomerSearchProvider",
  components: {},
  data() {
    return {
      provider_id: undefined,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchProviderMenus"]),
    pesan() {
      router.push({
        name: "customer-pesan",
        params: { id: this.$route.params.id },
      });
    },
  },
  computed: {
    ...mapState(useCustomerStore, ["menus"]),
  },
  created() {
    this.provider_id = this.$route.params.id;
    this.fetchProviderMenus(this.provider_id);
  },
  watch: {},
};
</script>
<style></style>
