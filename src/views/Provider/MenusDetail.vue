<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg m-12 p-4">
      <div class="text-3xl">Detail Menu</div>
      <div
        v-if="menus"
        class="flex flex-col lg:space-x-12 lg:flex-row mt-4 p-8"
      >
        <!-- FOTO -->
        <div class="flex-initial justify-center w-1/3">
          <img
            v-if="menus.menu_foto"
            :src="'http://localhost:8000/storage/' + menus.menu_foto"
            alt="Foto"
          />
        </div>
        <div class="flex flex-col flex-1 justify-center text-xl space-y-4">
          <div>Nama : {{ menus.menu_nama }}</div>
          <div>Harga : {{ menus.menu_harga }}</div>
          <div class="capitalize">Status : {{ menus.menu_status }}</div>
        </div>
        <div class="flex flex-col justify-center">
          <button @click="editMenu(menus.menu_id)" class="btn btn-warning m-4">
            Edit Details
          </button>
          <button @click="deleteMenu" class="btn btn-error m-4">
            Delete Menu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import router from "@/router";

export default {
  name: "ProviderMenusDetail",
  components: {},
  methods: {
    ...mapActions(useProviderStore, ["fetchMenuDetail", "deleteMenu"]),
    editMenu(id) {
      router.push({ name: "provider-menus-edit", params: { id } });
    },
  },
  computed: {
    ...mapState(useProviderStore, ["menus"]),
  },
  created() {
    this.fetchMenuDetail(this.$route.params.id);
  },
};
</script>
<style></style>
