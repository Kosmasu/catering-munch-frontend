import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";

export const useProviderStore = defineStore("ProviderStore", {
  state: () => ({
    menus: undefined,
    listPesanan: undefined,
    result: undefined,
  }),
  getters: {},
  actions: {
    async fetchMenus(batch_size = 20, currentPage = 1, provider_id) {
      await MunchService.menu(batch_size, (currentPage = 1), provider_id)
        .then((response) => {
          this.menus = response.data.data.data;
          console.log("this.menus:", this.menus);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchListPesanan() {
      await MunchService.getPesananProvider()
        .then((response) => {
          this.listPesanan = response.data;
          console.log("this.listPesanan:", this.listPesanan);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    menusSearch(query) {
      if (this.menus) {
        return this.menus.filter((menu) => {
          return menu.menu_nama.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }
    },
  },
});
