<template>
  <nav
    class="bg-indigo-500 top-0 z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 sticky bg-navy-primary"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          to="/"
          class="text-lg xl:text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white w-full"
        >
          <!-- <img
            id="logo-stts"
            src="@/assets/img/istts_warna-min.png"
            class="inline-block mr-2"
          /> -->
          MUNCH
        </router-link>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex flex-grow items-center bg-gray-900 lg:bg-transparent lg:shadow-none rounded lg:rounded-none mt-4 lg:mt-0"
        v-bind:class="{ hidden: !showMenu, block: showMenu }"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="flex items-center">
            <router-link
              to="/admin"
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs xl:text-sm uppercase"
            >
              Admin</router-link
            >
          </li>
          <li class="flex items-center">
            <router-link
              to="/provider"
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs xl:text-sm uppercase"
            >
              Provider</router-link
            >
          </li>
          <li class="flex items-center">
            <router-link
              to="/customer"
              class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs xl:text-sm uppercase"
            >
              Customer</router-link
            >
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <!-- <navbar-dropdown
              class="hidden lg:block uppercase text-xs"
              :routerLinks="[
                { text: 'Pendaftaran D-3 & S-1', path: '/pendaftaran-online-d3-s1' },
                { text: 'Pendaftaran S-2', path: '/pendaftaran-online-s2' },
              ]"
            >
              <span class="font-bold uppercase">
                Daftar
              </span>
            </navbar-dropdown> -->
          </li>
          <li class="flex items-center">
            <router-link to="/login"
              ><button
                class="lg:bg-gray-50 lg:text-gray-800 md:bg-navy-primary md:text-gray-100 active:bg-gray-100 md:active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                type="button"
                style="transition: all 0.15s ease 0s"
              >
                Login
              </button></router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
// import { createPopper } from "@popperjs/core";
// import NavbarDropdown from "@/components/NavbarDropdown.vue";
export default {
  components: {
    // NavbarDropdown,
  },
  data() {
    return {
      showMenu: false,
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>

<style scoped>
#logo-stts {
  max-width: 32px;
}
@media only screen and (min-width: 1280px) {
  #logo-stts {
    max-width: 64px;
  }
}
</style>
