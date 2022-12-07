import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";
import { useAuthStore } from "./AuthStore";

export const useLoginStore = defineStore("LoginStore", {
  state: () => ({
    form: {
      users_email: undefined,
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
    async login() {
      const authStore = useAuthStore()
      await MunchService.login(this.form.users_email, this.form.password)
        .then(async (response) => {
          await authStore.me()
          const role = authStore.getUserFromLocalStorage().role
          console.log("response login:", response);
          if (response.data.status == "success") {
            if (role == "admin") {
              router.push({ name: "admin" });
            } else if (role == "customer") {
              router.push({ name: "customer" });
            } else {
              router.push({ name: "provider" });
            }
          }
          return response;
        })
        .catch((error) => {
          console.log('error:', error);
          this.errorData = error.response.data;
          return error;
        });
    },
  },
});
