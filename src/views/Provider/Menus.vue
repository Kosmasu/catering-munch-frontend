<template>
  <navbar />
  <div class="container">
    <div class="border-solid border-2 rounded-lg p-4 my-4">
      <div class="flex justify-between">
        <div class="text-3xl m-2">List of Menus</div>
        <div class="flex space-x-8">
          <div>
            <div>Showing :</div>
            <div v-if="menus">
              <div v-if="menusSearch(query).length <= 1">
                {{ menusSearch(query).length }} Menu
              </div>
              <div v-else>{{ menusSearch(query).length }} Menus</div>
            </div>
          </div>
          <input
            type="text"
            v-model="query"
            placeholder="Search…"
            class="input input-bordered"
          />
        </div>
      </div>
      <RouterLink to="/provider/menus/add">
        <button class="btn btn-primary rounded-lg m-4">Add New Menu</button>
      </RouterLink>
      <div class="overflow-x-auto">
        <table class="table table-compact w-full text-center">
          <thead></thead>
          <tbody v-if="menus">
            <tr
              v-for="(menu, index) in menusSearch(query)"
              :key="index"
              class="hover"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <img src="@/assets/munch.png" class="w-24" />
              </td>
              <td>{{ menu.menu_nama }}</td>
              <td>Rp. {{ menu.menu_harga.toLocaleString("id-ID") }},00</td>
              <td>
                <button
                  @click="detail(menu.menu_id)"
                  class="btn btn-primary rounded-lg"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import Navbar from "@/components/ProviderNavbar.vue";

export default {
  name: "ProviderMenus",
  components: {
    Navbar,
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    ...mapActions(useProviderStore, ["fetchMenus", "menusSearch"]),
    detail(id) {
      console.log("detail menu", id);
    },
  },
  computed: {
    ...mapState(useProviderStore, ["status", "menus"]),
  },
  created() {
    this.fetchMenus();
  },
};
</script>
<style></style>
