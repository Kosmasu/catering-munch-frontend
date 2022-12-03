import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";

// composition sama option
// ini option api
export const useAdminStore = defineStore("AdminStore", {
  // state itu data
  state: () => ({
    customers: undefined,
    providers: undefined,
    historyLog: undefined,
    historyMenu: undefined,
    historyPemesanan: undefined,
    historyRating: undefined,
    historyTopup: undefined,
    result: undefined,
  }),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {
    async fetchCustomers() {
      await MunchService.getAllCustomers()
        .then((response) => {
          this.result = response.data;
          if (this.result.status == "success") {
            this.customers = this.result.data;
            console.log("this.customers:", this.customers);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async fetchProviders() {
      await MunchService.getAllProviders()
        .then((response) => {
          this.result = response.data;
          if (this.result.status == "success") {
            this.providers = this.result.data;
            console.log("this.providers:", this.providers);
          }
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
    usersSearch(role, query) {
      if (role == "provider") {
        if (this.providers) {
          return this.providers.filter((provider) => {
            return (
              provider.users_nama.toLowerCase().indexOf(query.toLowerCase()) >
                -1 && provider.users_status != "menunggu"
            );
          });
        }
      } else {
        if (this.customers) {
          return this.customers.filter((customer) => {
            return (
              customer.users_nama.toLowerCase().indexOf(query.toLowerCase()) >
              -1
            );
          });
        }
      }
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
