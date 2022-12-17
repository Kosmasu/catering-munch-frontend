<template>
  <div class="container">
    <div class="flex space-x-4 justify-center m-8">
      <input
        type="text"
        v-model="query"
        placeholder="Search…"
        class="input input-primary"
      />
      <select v-model="filter" @change="onFilterChange" class="select select-primary">
        <option value="menu_nama">Nama</option>
        <option value="menu_harga">Harga</option>
      </select>
      <select v-model="sort" @change="onSortChange" class="select select-primary">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <table class="table table-compact text-center w-full">
      <thead>
        <tr>
          <th colspan="4" class="bg-primary">Hasil pencarian</th>
        </tr>
      </thead>
      <tbody v-if="menus">
        <tr v-for="menu in menus.data">
          <td>
            <img
              :src="'http://localhost:8000/storage/' + menu.menu_foto"
              class="w-24"
            />
          </td>
          <td class="capitalize">
            <span class="font-bold">{{ menu.menu_nama }}</span>
            - {{ menu.users.users_nama }}
          </td>
          <td>Rp, {{ menu.menu_harga.toLocaleString("id-ID") }},00</td>
          <td>
            <button @click="detail(menu.menu_id)" class="btn btn-primary">
              Detail
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-center" colspan="4">
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
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore";
import PaginationVue from "@/components/Pagination.vue";
import router from "@/router";

export default {
  name: "CustomerSearch",
  components: {
    PaginationVue,
  },
  data() {
    return {
      query: "",
      filter: "menu_nama",
      sort: "asc",
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useCustomerStore, ["fetchMenus"]),
    detail(id) {
      router.push({ name: "customer-search-provider", params: { id } });
    },
    onFilterChange() {
      
    },
    onSortChange() {

    },
  },
  computed: {
    ...mapState(useCustomerStore, ["menus"]),
  },
  created() {
    this.fetchMenus();
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
