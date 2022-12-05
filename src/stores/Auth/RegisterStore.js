import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useRegisterStore = defineStore("RegisterStore", {
  state: () => ({
    form: {
      users_nama: undefined,
      users_email: undefined,
      users_password: undefined,
      users_password_confirmed: undefined,
      users_alamat: undefined,
      users_telepon: undefined,
      users_role: undefined,
      tnc: undefined,
    },
    errorData: {
      status: undefined,
      message: undefined,
      errors: undefined,
    },
  }),
  getters: {},
  actions: {
    async register() {
      return await MunchService.register(
        this.form.users_nama,
        this.form.users_email,
        this.form.users_password,
        this.form.users_alamat,
        this.form.users_telepon,
        this.form.users_role,
        this.form.tnc,
      )
        .then((response) => {
          if (this.response.status == "created") {
            router.push({ name: "login" });
          } else {
            console.log(this.result.status);
          }
          return response
        })
        .catch((error) => {
          return error
        });
    },
  },
});
