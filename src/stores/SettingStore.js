import { defineStore } from "pinia";

export const useSettingStore = defineStore("SettingStore", {
  state: () => ({
    SELECT_BATCH_SIZE: [
      {
        value: 5,
        item: "5 items",
      },
      {
        value: 10,
        item: "10 items",
      },
      {
        value: 20,
        item: "20 items",
      },
      {
        value: 50,
        item: "50 items",
      },
    ],
    batch_size: 10,
  }),
  getters: {
    
  },
  actions: {},
});
