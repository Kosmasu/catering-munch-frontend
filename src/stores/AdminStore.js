import { defineStore } from "pinia";
import MunchService from "@/MunchService";

export const useAdminStore = defineStore("AdminStore", {
  state: () => ({
    customers: undefined,
    providers: undefined,
    historyLog: undefined,
    historyMenu: undefined,
    historyPemesanan: undefined,
    historyRating: undefined,
    historyTopup: undefined,
  }),
  getters: {},
  actions: {
    async fetchCustomers(batch_size = 20, currentPage = 1, users_nama = "") {
      await MunchService.getCustomers(batch_size, currentPage, users_nama)
        .then((response) => {
          this.customers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProviders(batch_size = 20, currentPage = 1, users_nama = "") {
      await MunchService.getProviders(batch_size, currentPage, users_nama)
        .then((response) => {
          this.providers = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchHistoryLog() {},
    async banUser(role, id) {
      await MunchService.banUser(id)
        .then((response) => {
          this.result = response.data;
          console.log("user id", id, "banned");
          if (role == "customer") {
            this.fetchCustomers();
          } else {
            this.fetchProviders();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async unbanUser(role, id) {
      await MunchService.unbanUser(id)
        .then((response) => {
          this.result = response.data;
          console.log("user id", id, "unbanned");
          if (role == "customer") {
            this.fetchCustomers();
          } else {
            this.fetchProviders();
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
        })
        .catch((error) => {
          console.error(error);
        });
    },
    providerWaiting() {
      if (this.providers) {
        return this.providers.filter((provider) => {
          return provider.users_status == "menunggu";
        });
      }
    },
  },
});
