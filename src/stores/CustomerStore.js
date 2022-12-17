import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";
import { useAuthStore } from "@/stores/Auth/AuthStore";
import router from "@/router";

export const useCustomerStore = defineStore("CustomerStore", {
  state: () => ({
    menus: undefined,
    histories: undefined,
    profile: undefined,
    formTopup: {
      nominal: undefined,
      password: undefined,
    },
    errorData: {
      status: undefined,
      message: undefined,
      errors: undefined,
    },
    cateringAnda: undefined,
    topCatering: undefined,
    pesanLagi: undefined,
  }),
  getters: {},
  actions: {
    async fetchProfile() {
      await MunchService.me()
        .then((response) => {
          this.profile = response.data.data;
          console.log(this.profile);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchMenus(
      currentPage = 1,
      menu_nama = "",
      menu_status = "tersedia",
      sort_column = "menu_nama",
      sort_type = "asc"
    ) {
      await MunchService.getMenus(
        8,
        currentPage,
        null,
        menu_nama,
        menu_status,
        sort_column,
        sort_type
      )
        .then((response) => {
          this.menus = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProviderMenus(
      provider_id,
      currentPage = 1,
      menu_nama = "",
      menu_status = "tersedia",
      sort_column = "menu_nama",
      sort_type = "asc"
    ) {
      await MunchService.getMenus(
        useSettingStore().batch_size,
        currentPage,
        provider_id,
        menu_nama,
        menu_status,
        sort_column,
        sort_type
      );
    },
    async fetchHistoryPemesanan(
      currentPage = 1,
      date_lower = "",
      date_upper = ""
    ) {
      await MunchService.getHistoryPemesanan(
        useSettingStore().batch_size,
        currentPage,
        date_lower,
        date_upper
      )
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryTopup(currentPage = 1, date_lower = "", date_upper = "") {
      return await MunchService.getHistoryTopup(
        useSettingStore().batch_size,
        currentPage,
        date_lower,
        date_upper
      )
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchHistoryPemesananDetail(pemesanan_id) {
      await MunchService.getHistoryPemesananDetail(pemesanan_id)
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async topup() {
      return await MunchService.topup(this.formTopup)
        .then((response) => {
          if (response.data.status == "success") {
            useAuthStore().me();
            router.push({ name: "customer" });
          } else {
            console.log(this.result.status);
          }
        })
        .catch((error) => {
          this.errorData = error.response.data;
          console.log("error topup:", error);
        });
    },
  },
});
