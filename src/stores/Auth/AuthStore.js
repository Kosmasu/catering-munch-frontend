import { ref, computed } from "vue";
import { defineStore } from "pinia";
import MunchService from "@/MunchService";
import router from "@/router";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    user: {
      nama: undefined,
      role: undefined,
      saldo: undefined,
    }
  }),
  getters: {},
  actions: {
    async logout() {
      await MunchService.logout().then((response) => {
        this.$reset()
        console.log('response logout:',response)
        if (response.data.status == "success") {
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
    }
  },
});
