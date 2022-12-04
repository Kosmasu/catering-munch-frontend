import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";

// composition sama option
// ini option api
export const useCustomerStore = defineStore("CustomerStore", {
  // state itu data
  state: () => ({}),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {},
});
