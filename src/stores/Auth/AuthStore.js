import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: {
      id: null,
      nama: "guest",
      desc: null,
      role: "guest",
      saldo: null,
    },
  }),
  getters: {
    firstName() {
      return this.user.nama.split(" ")[0];
    },
    fullName() {
      return this.user.nama;
    },
    id() {
      return this.user.id;
    },
    desc() {
      return this.user.desc;
    },
    saldo() {
      return this.user.saldo.toLocaleString("id-ID");
    },
  },
  actions: {
    async sanctum() {
      await MunchService.sanctum();
    },
    async me() {
      await MunchService.me()
        .then((response) => {
          this.setUser(
            response.data.data.users_id,
            response.data.data.users_nama,
            response.data.data.users_desc,
            response.data.data.users_role,
            response.data.data.users_saldo
          );
          localStorage.setItem("user", JSON.stringify(this.user));
        })
        .catch((error) => {
          console.log("error me:", error);
        });
    },
    async logout() {
      await MunchService.logout().then((response) => {
        if (response.data.status == "success") {
          this.removeUserFromLocalStorage();
          router.push({ name: "landing-page" });
        } else {
          console.log(response.data.status);
        }
      });
    },
    setUser(id, nama, desc, role, saldo) {
      this.user.id = id;
      this.user.nama = nama;
      this.user.desc = desc;
      this.user.role = role;
      this.user.saldo = saldo;
    },
    getUserFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem("user"));
      if (!this.user) {
        this.$reset();
      }
      return this.user;
    },
    removeUserFromLocalStorage() {
      this.$reset();
      localStorage.removeItem("user");
    },
  },
});
