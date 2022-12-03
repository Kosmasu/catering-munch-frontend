import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

// composition sama option
// ini option api
export const useLoginRegisterStore = defineStore("LoginRegisterStore", {
  // state itu data
  state: () => ({
    result: undefined,
  }),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {
    async register(name, email, alamat, telepon, password, role, tna) {
      await MunchService.register(
        name,
        email,
        alamat,
        telepon,
        password,
        role,
        tna
      )
        .then((response) => {
          this.result = response.data;
          console.log("this.result:", this.result);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async login(email, password) {
      await MunchService.login(email, password)
        .then((response) => {
          this.result = response.data;
          console.log("this.result:", this.result);
          if (this.result.status == "success") {
            if (this.result.user.users_role == "admin") {
              console.log("Hello");
              router.push({ name: "admin" });
            } else if (this.result.user.users_role == "customer") {
              router.push({ name: "customer" });
            } else {
              router.push({ name: "provider" });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
