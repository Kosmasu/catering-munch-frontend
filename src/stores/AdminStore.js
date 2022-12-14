import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";

export const useAdminStore = defineStore("AdminStore", {
  state: () => ({
    stats: undefined,
    customers: undefined,
    providers: undefined,
    waitingProviders: undefined,
    histories: undefined,
  }),
  getters: {},
  actions: {
    async fetchStats() {
      await MunchService.mystat()
        .then((response) => {
          this.stats = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchCustomers(currentPage = 1, users_nama = "") {
      await MunchService.getCustomers(
        useSettingStore().batch_size,
        currentPage,
        users_nama
      )
        .then((response) => {
          this.customers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProviders(currentPage = 1, users_nama = "") {
      await MunchService.getProviders(
        useSettingStore().batch_size,
        currentPage,
        users_nama,
        "users_id",
        "asc"
      )
        .then((response) => {
          this.providers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchWaitingProviders(currentPage = 1) {
      await MunchService.getWaitingProviders(
        useSettingStore().batch_size,
        currentPage
      )
        .then((response) => {
          this.waitingProviders = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryLog(currentPage = 1, date_lower = "", date_upper = "") {
      await MunchService.getHistoryLog(
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
    async fetchHistoryMenu(currentPage = 1, date_lower = "", date_upper = "") {
      await MunchService.getHistoryMenu(
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
      await MunchService.getHistoryTopup(
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
    async fetchHistoryPemesananDetail(pemesanan_id) {
      await MunchService.getHistoryPemesananDetail(pemesanan_id)
        .then((response) => {
          this.histories = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async banUser(role, id) {
      await MunchService.banUser(id)
        .then((response) => {
          if (role == "customer") {
            this.fetchCustomers();
          } else {
            this.fetchProviders();
            this.fetchWaitingProviders();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async unbanUser(role, id) {
      await MunchService.unbanUser(id)
        .then((response) => {
          if (role == "customer") {
            this.fetchCustomers();
          } else {
            this.fetchProviders();
            this.fetchWaitingProviders();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async approveProvider(id) {
      await MunchService.approveProvider(id)
        .then((response) => {
          this.fetchProviders();
          this.fetchWaitingProviders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
