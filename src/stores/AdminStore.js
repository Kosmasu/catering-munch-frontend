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
  }),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {
    async fetchCustomers() {
      await MunchService.getAllCustomers()
        .then((response) => {
          this.customers = response.data;
          console.log("this.customers:", this.customers);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    customerSearch(query) {
      if (this.customers) {
        return this.customers.filter((customer) => {
          return (
            customer.users_nama.toLowerCase().indexOf(query.toLowerCase()) >
              -1 && customer.users_status != "menunggu"
          );
        });
      }
    },
  },
});
