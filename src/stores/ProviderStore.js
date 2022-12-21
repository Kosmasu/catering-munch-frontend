import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";
import { useAuthStore } from "@/stores/Auth/AuthStore";
import router from "@/router";

export const useProviderStore = defineStore("ProviderStore", {
  state: () => ({
    stats: undefined,
    menus: undefined,
    histories: undefined,
    orders: undefined,
    profile: undefined,
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
    async fetchProfile() {
      await MunchService.me()
        .then((response) => {
          this.profile = response.data.data;
          console.log("this.profile", this.profile);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchStats() {
      await MunchService.mystat()
        .then((response) => {
          this.stats = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchMenus(
      currentPage = 1,
      menu_nama = "",
      menu_status = null,
      sort_column = "menu_id",
      sort_type = "asc"
    ) {
      await MunchService.getMenus(
        useSettingStore().batch_size,
        currentPage,
        useAuthStore().user.id,
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
    async fetchMenuDetail(menu_id) {
      await MunchService.getMenuDetail(menu_id)
        .then((response) => {
          this.menus = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistory(
      currentPage = 1,
      date_lower = "",
      date_upper = "",
      pemesanan_status = ""
    ) {
      await MunchService.getHistoryPemesanan(
        useSettingStore().batch_size,
        currentPage,
        date_lower,
        date_upper,
        pemesanan_status
      )
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryDetail(pemesanan_id) {
      await MunchService.getHistoryPemesananDetail(pemesanan_id)
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchWaiting() {
      await MunchService.getHistoryPemesanan(10, 1, "", "", "menunggu")
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchOrders() {
      await MunchService.getPesanan(
        new Date().getMonth() + 1,
        new Date().getFullYear()
      )
        .then((response) => {
          this.orders = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async updateDesc() {
      return await MunchService.updateDesc(
        useAuthStore().user.id,
        this.profile.users_desc
      )
        .then((response) => {
          if (response.data.status == "created") {
            useAuthStore().me();
            router.push({ name: "provider" });
          }
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
    async editMenu() {
      const formData = new FormData();
      formData.append("menu_foto", this.form.menu_foto);
      formData.append("menu_nama", this.form.menu_nama);
      formData.append("menu_harga", this.form.menu_harga);
      formData.append("menu_status", this.form.menu_status);
      return await MunchService.editMenu(formData, this.menus.menu_id)
        .then((response) => {
          if (response.data.status == "success") {
            router.push({ name: "provider-menus", params: { page: 1 } });
          } else {
            console.log(this.result.status);
          }
        })
        .catch((error) => {
          this.errorData = error.response.data;
          console.log("error edit menu:", error);
        });
    },
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
    async acceptPesanan(detail_id) {
      await MunchService.acceptPesanan(detail_id)
        .then((response) => {
          this.fetchWaiting();
          this.fetchOrders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async rejectPesanan(detail_id) {
      await MunchService.rejectPesanan(detail_id)
        .then((response) => {
          this.fetchWaiting();
          this.fetchOrders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async kirimPesanan(detail_id) {
      await MunchService.kirimPesanan(detail_id)
        .then((response) => {
          this.fetchOrders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fillForm() {
      this.form.menu_foto = this.menus.menu_foto;
      this.form.menu_nama = this.menus.menu_nama;
      this.form.menu_harga = this.menus.menu_harga;
      this.form.menu_status = this.menus.menu_status;
    },
  },
});
