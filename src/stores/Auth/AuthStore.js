import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: {
      nama: "guest",
      role: "guest",
      saldo: null,
    }
  }),
  getters: {
    firstName() {
      return this.user.nama.split(" ")[0]
    }
  },
  actions: {
    async me() {
      await MunchService.me()
        .then(response => {
          this.setUser(
            response.data.data.users_nama,
            response.data.data.users_role,
            response.data.data.users_saldo,
          )
          localStorage.setItem("user", JSON.stringify(this.user))
        })
        .catch(error => {
          console.log('error me:', error);
        })
    },
    async logout() {
      await MunchService.logout().then((response) => {
        if (response.data.status == "success") {
          this.$reset()
          localStorage.removeItem("user")
          router.push({ name: "landing-page" })
        } else {
          console.log(response.data.status)
        }
      });
    },
    setUser(nama, role, saldo) {
      this.user.nama = nama
      this.user.role = role
      this.user.saldo = saldo
    },
    getUserFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem("user"))
      if (!this.user) {
        this.$reset()
      }
      return this.user
    }
  },
});
