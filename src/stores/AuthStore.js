import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

// composition sama option
// ini option api
export const useAuthStore = defineStore("AuthStore", {
  // state itu data
  state: () => ({
    result: undefined,
  }),
  // getters itu computed properties (tidak boleh ada parameter)
  getters: {},
  // actions itu method
  actions: {
    async login(email, password) {
      return await MunchService.login(email, password)
        .then((response) => {
          if (this.result.status == "success") {
            if (this.result.user.users_role == "admin") {
              router.push({ name: "admin" });
            } else if (this.result.user.users_role == "customer") {
              router.push({ name: "customer" });
            } else {
              router.push({ name: "provider" });
            }
          }
          return response
        })
        .catch((error) => {
          return error
        });
    },
    async register(
      nama,
      email,
      alamat,
      telepon,
      password,
      password_confirmation,
      role,
      tnc
    ) {
      await MunchService.register(
        nama,
        email,
        alamat,
        telepon,
        password,
        password_confirmation,
        role,
        tnc
      )
        .then((response) => {
          this.result = response.data;
          console.log("this.result:", this.result);
          if (this.result.status == "created") {
            router.push({ name: "login" });
          } else {
            console.log(this.result.status);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  async logout() {
    await MunchService.logout().then((response) => {
      this.result = response.data;
      console.log("this.result:", this.result);
      if (this.result.status == "success") {
        router.push({ name: "landing-page" });
      } else {
        console.log(this.result.status);
      }
    });
  },
});
