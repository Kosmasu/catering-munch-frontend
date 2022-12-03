import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";

// composition sama option
// ini option api
export const useProviderStore = defineStore("ProviderStore", {
  // state itu data
  state: () => ({
    menus: undefined,
    listPesanan: undefined,
    result: undefined,
  }),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {
    async fetchMenus() {
      await MunchService.menu()
        .then((response) => {
          this.menus = response.data;
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
