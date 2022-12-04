<template>
  <div class="border-solid border-2 rounded-lg w-1/2 mx-auto my-8 p-4">
    <div class="text-3xl">Detail Menu</div>
    <div class="flex flex-col lg:flex-row bg-gray-200 mt-4 p-8">
      <!-- FOTO -->
      <div class="flex-initial justify-center w-1/3">
        <img src="@/assets/munch.png" alt="Foto" />
      </div>
      <div class="flex flex-col flex-1 justify-center text-xl space-y-4">
        <div>Nama : {{ menu.menu_nama }}</div>
        <div>Harga : {{ menu.menu_harga }}</div>
        <div>Status : {{ menu.menu_status }}</div>
      </div>
      <div class="flex flex-col justify-center">
        <button @click="editMenu" class="btn btn-warning m-4 rounded-md">
          Edit Details
        </button>
        <button @click="deleteMenu" class="btn btn-error m-4 rounded-md">
          Delete Menu
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProviderMenusDetail",
  components: {
  },
  data() {
    return {
      menu: {
        id: 1,
        menu_nama: "Jiwa Toast",
        menu_harga: 35000,
        menu_foto: "munch.png",
        menu_status: "Tersedia",
      },
    };
  },
  methods: {
    editMenu() {
      console.log(this.menu.id);
    },
    deleteMenu() {
      console.log(this.menu.id);
    },
  },
};
</script>
<style></style>
