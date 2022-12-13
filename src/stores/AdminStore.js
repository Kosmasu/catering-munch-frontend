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
        users_nama
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
          console.log(this.histories);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryMenu() {},
    async fetchHistoryPemesanan() {},
    async fetchHistoryRating() {},
    async fetchHistoryTopup() {},
    async banUser(role, id) {
      await MunchService.banUser(id)
        .then((response) => {
          // console.log("user id", id, "banned");
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
          // console.log("user id", id, "unbanned");
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
          // console.log("user id", id, "approved");
          this.fetchProviders();
          this.fetchWaitingProviders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
