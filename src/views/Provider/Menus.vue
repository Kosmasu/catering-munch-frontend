<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4 space-y-2">
    <div class="flex justify-between mb-8">
      <div class="text-3xl">List of Menus</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="menuSearch.length <= 1">{{ menuSearch.length }} Menu</div>
          <div v-else>{{ menuSearch.length }} Menus</div>
        </div>
        <form class="form-control">
          <div class="input-group">
            <input
              type="text"
              v-model="query"
              placeholder="Search…"
              class="input input-bordered"
            />
            <!-- <button class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> -->
          </div>
        </form>
      </div>
    </div>
    <RouterLink to="/provider/menus/add">
      <button class="btn btn-success rounded-md">Add New Menu</button>
    </RouterLink>
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <thead></thead>
        <tbody v-if="menuList.length > 0">
          <tr v-for="(menu, index) in menuSearch" :key="index" class="hover">
            <td>{{ index + 1 }}</td>
            <td>
              <img src="@/assets/munch.png" class="w-24" />
            </td>
            <td>{{ menu.menu_nama }}</td>
            <td>Rp. {{ menu.menu_harga.toLocaleString("id-ID") }},00</td>
            <td>
              <form @submit.prevent="submit">
                <button
                  @click.prevent="detail(menu.id)"
                  class="btn btn-primary rounded-lg"
                >
                  Detail
                </button>
              </form>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3">Belum ada menu saat ini!</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/ProviderNavbar.vue";
export default {
  name: "ProviderMenus",
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
      menuList: [
        {
          id: 1,
          menu_nama: "Jiwa Toast",
          menu_harga: 35000,
          menu_foto: "munch.png",
          menu_status: "Tersedia",
        },
        {
          id: 2,
          menu_nama: "Mixue",
          menu_harga: 15000,
          menu_foto: "munch.png",
          menu_status: "Tidak Tersedia",
        },
      ],
    };
  },
  computed: {
    menuSearch() {
      return this.menuList.filter((menu) => {
        return menu.menu_nama.indexOf(this.query) > -1;
      });
    },
  },
  methods: {
    submit(id) {
      console.log(this.menuList.find((menu) => menu.id == id));
    },
    detail(id) {
      this.submit(id);
    },
  },
};
</script>
<style></style>
