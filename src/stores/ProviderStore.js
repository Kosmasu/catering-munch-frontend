import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";
import { useAuthStore } from "@/stores/Auth/AuthStore";
import router from "@/router";

export const useProviderStore = defineStore("ProviderStore", {
  state: () => ({
    menus: undefined,
    listPesanan: undefined,
    form: {
      menu_foto: undefined,
      menu_nama: undefined,
      menu_harga: undefined,
      menu_status: undefined,
    },
    errorData: {
      status: undefined,
      message: undefined,
      errors: undefined,
    },
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
    async fetchDetail(menu_id) {
      await MunchService.getDetailMenu(menu_id)
        .then((response) => {
          this.menus = response.data.data;
          console.log("this.menus", this.menus);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async addMenu() {
      const formData = new FormData();
      formData.append("menu_foto", this.form.menu_foto);
      formData.append("menu_nama", this.form.menu_nama);
      formData.append("menu_harga", this.form.menu_harga);
      formData.append("menu_status", this.form.menu_status);
      return await MunchService.addMenu(formData)
        .then((response) => {
          if (response.data.status == "success") {
            router.push({ name: "provider-menus", params: { page: 1 } });
          } else {
            console.log(this.result.status);
          }
        })
        .catch((error) => {
          this.errorData = error.response.data;
          console.log("error add menu:", error);
        });
    },
    async editMenu() {},
    async deleteMenu() {
      return await MunchService.deleteMenu(this.menus.menu_id)
        .then((response) => {
          if (response.data.status == "success") {
            router.push({
              name: "provider-menus",
              replace: true,
              params: { page: 1 },
            });
          } else {
            console.log(this.result.status);
          }
        })
        .catch((error) => {
          this.errorData = error.response.data;
          console.log("error delete menu:", error);
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
  },
});
