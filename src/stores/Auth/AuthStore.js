import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    result: undefined,
  }),
  getters: {},
  actions: {
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
