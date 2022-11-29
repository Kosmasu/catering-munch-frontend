<template>
  <navbar />
  <div class="border-solid border-2 rounded-md m-8 p-4">
    <div class="flex justify-between mb-8">
      <div class="text-3xl">List of Menus</div>
      <div class="flex space-x-8">
        <div>
          <div>Showing :</div>
          <div v-if="menuList.length <= 1">{{ menuList.length }} Menu</div>
          <div v-else>{{ menuList.length }} Menus</div>
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
    <div class="overflow-x-auto">
      <table class="table table-compact w-full text-center">
        <tbody>
          <tr>
            <td>
              <img src="" alt="Foto" />
            </td>
            <td>Detail Item</td>
            <td>
              <button class="btn btn-accent-content">Detail</button>
            </td>
          </tr>
          <button class="btn btn-accent-content">Add New Menu</button>
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
      menuList: [],
    };
  },
  methods: {},
};
</script>
<style></style>
