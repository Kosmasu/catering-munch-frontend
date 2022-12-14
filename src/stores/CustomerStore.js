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
    carts: undefined,
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
    async fetchCart() {
      await MunchService.getCart()
        .then((response) => {
          this.carts = response.data.data;
          console.log(this.carts);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchCateringAnda() {
      await MunchService.getPesanan(
        new Date().getMonth() + 1,
        new Date().getFullYear(),
        "terkirim"
      )
        .then((response) => {
          this.cateringAnda = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchTopCatering() {
      await MunchService.getProviders(5, 1, "", "users_rating", "desc")
        .then((response) => {
          this.topCatering = response.data.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchPesanLagi() {
      await MunchService.getHistoryPemesanan(5, 1, "", "", "selesai")
        .then((response) => {
          this.pesanLagi = response.data.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProfile() {
      await MunchService.me()
        .then((response) => {
          this.profile = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchMenus(
      currentPage = 1,
      menu_nama = "",
      sort_column = "menu_nama",
      sort_type = "asc",
      menu_status = "tersedia"
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
      )
        .then((response) => {
          this.menus = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
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
    async acceptPesanan(detail_id) {
      await MunchService.terimaPesanan(detail_id)
        .then((response) => {
          this.fetchCateringAnda();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async addCart(menu_id, cart_tanggal) {
      await MunchService.addCart(menu_id, 1, cart_tanggal)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // async editCart() {},
    async deleteCart(cart_id) {
      await MunchService.deleteCart(cart_id)
        .then((response) => {
          this.fetchCart();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async clearCart() {
      await MunchService.clearCart()
        .then((response) => {
          this.fetchCart();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async checkoutCart() {
      this.errorData.message = undefined;
      await MunchService.checkoutCart()
        .then((response) => {
          this.fetchCart();
          router.push({ name: "customer" });
        })
        .catch((error) => {
          this.errorData.message = error.response.data.message;
          console.error(error);
        });
    },
    async ratePesanan(pemesanan_id, rating) {
      await MunchService.ratePesanan(pemesanan_id, rating)
        .then((response) => {
          this.fetchHistoryPemesananDetail(pemesanan_id);
        })
        .catch((error) => {
          console.log(error);
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
