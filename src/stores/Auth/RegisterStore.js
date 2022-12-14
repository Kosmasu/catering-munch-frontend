import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useRegisterStore = defineStore("RegisterStore", {
  state: () => ({
    form: {
      users_nama: undefined,
      users_desc: undefined,
      users_email: undefined,
      users_password: undefined,
      users_password_confirmation: undefined,
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
      await MunchService.register(
        this.form.users_nama,
        this.form.users_desc,
        this.form.users_email,
        this.form.users_alamat,
        this.form.users_telepon,
        this.form.users_password,
        this.form.users_password_confirmation,
        this.form.users_role,
        this.form.tnc
      )
        .then((response) => {
          if (response.data.status == "created") {
            router.push({ name: "login" });
          }
          return response;
        })
        .catch((error) => {
          this.errorData = error.response.data;
          return error;
        });
    },
  },
});
