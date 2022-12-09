import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";
import { useAuthStore } from "@/stores/Auth/AuthStore";

export const useProviderStore = defineStore("ProviderStore", {
  state: () => ({
    menus: undefined,
    listPesanan: undefined,
    result: undefined,
  }),
  getters: {},
  actions: {
    async fetchMenus(currentPage = 1, menu_nama = "") {
      await MunchService.getMenus(
        useSettingStore().batch_size,
        currentPage,
        useAuthStore().user.id,
        menu_nama
      )
        .then((response) => {
          this.menus = response.data.data;
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
