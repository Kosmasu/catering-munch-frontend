import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

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
      return await MunchService.login(
        this.form.users_email, 
        this.form.password)
        .then((response) => {
          console.log('response login:',response);
          if (response.data.status == "success") {
            if (response.data.user.users_role == "admin") {
              router.push({ name: "admin" });
            } else if (response.data.user.users_role == "customer") {
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
  },
});
