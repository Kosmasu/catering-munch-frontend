import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import { useSettingStore } from "@/stores/SettingStore";

export const useAdminStore = defineStore("AdminStore", {
  state: () => ({
    customers: undefined,
    providers: undefined,
    waitingProviders: undefined,
    historyLog: undefined,
    historyMenu: undefined,
    historyPemesanan: undefined,
    historyRating: undefined,
    historyTopup: undefined,
  }),
  getters: {},
  actions: {
    async fetchCustomers(currentPage = 1, users_nama = "") {
      await MunchService.getCustomers(useSettingStore().batch_size, currentPage, users_nama)
        .then((response) => {
          this.customers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProviders(currentPage = 1, users_nama = "") {
      await MunchService.getProviders(useSettingStore().batch_size, currentPage, users_nama)
        .then((response) => {
          this.providers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchWaitingProviders(currentPage = 1) {
      await MunchService.getWaitingProviders(useSettingStore().batch_size, currentPage)
        .then((response) => {
          console.log('response:',response);
          this.waitingProviders = response.data.data;
          console.log('this.waitingProviders:',this.waitingProviders);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryLog() {},
    async banUser(role, id) {
      await MunchService.banUser(id)
        .then((response) => {
          console.log("user id", id, "banned");
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
          console.log("user id", id, "unbanned");
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
          this.result = response.data;
          console.log("user id", id, "approved");
          this.fetchProviders();
          this.fetchWaitingProviders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
