<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg p-4 my-4">
      <div class="flex justify-between mb-8">
        <div class="text-3xl m-2">List Menus</div>
        <div class="flex space-x-8 items-center">
          <div>
            <select-batch-size @on-batch-size-change="this.fetchMenus()" />
          </div>
          <input
            type="text"
            v-model="this.query"
            placeholder="Search…"
            class="input input-bordered"
          />
        </div>
      </div>
      <RouterLink :to="{ name: 'provider-menus-add' }">
        <button class="btn btn-primary rounded-lg m-4">Add New Menu</button>
      </RouterLink>
      <table class="table table-compact w-full text-center">
        <thead></thead>
        <tbody v-if="menus">
          <tr
            v-for="(menu, index) in this.menus.data"
            :key="index"
            class="hover"
          >
            <td>{{ index + 1 }}</td>
            <td>
              <img src="@/assets/munch.png" class="w-24" />
            </td>
            <td>{{ menu.menu_nama }}</td>
            <td>Rp. {{ menu.menu_harga.toLocaleString("id-ID") }},00</td>
            <td class="capitalize">{{ menu.menu_status }}</td>
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
            <td class="text-center" colspan="5">
              <font-awesome-icon
                icon="fa-solid fa-spinner"
                class="text-6xl animate-spin"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="this.menus" class="p-2">
        <pagination-vue v-model="currentPage" :paginatedData="this.menus" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore";
import PaginationVue from "@/components/Pagination.vue";
import SelectBatchSize from "@/components/SelectBatchSize.vue";

export default {
  name: "ProviderMenus",
  components: {
    PaginationVue,
    SelectBatchSize,
  },
  data() {
    return {
      query: "",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useProviderStore, ["fetchMenus", "menusSearch"]),
    detail(id) {
      console.log("detail menu", id);
    },
  },
  computed: {
    ...mapState(useProviderStore, ["result", "menus"]),
  },
  created() {
    this.fetchMenus().then((response) => {
      console.log("this.menus:", this.menus);
    });
  },
  watch: {
    currentPage(newCurrentPage, oldCurrentPage) {
      this.fetchMenus(newCurrentPage);
    },
    query(newQuery, oldQuery) {
      this.currentPage = 1;
      this.fetchMenus(this.currentPage, newQuery);
    },
  },
};
</script>
<style></style>
