import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";

export const useCustomerStore = defineStore("CustomerStore", {
  state: () => ({
    topup: {
      nominal: undefined,
      password: undefined,
    },
    errorData: {
      status: undefined,
      message: undefined,
      errors: undefined,
    },
  }),
  getters: {},
  actions: {
    async topup() {
      return await MunchService.topup()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    },
  },
});
