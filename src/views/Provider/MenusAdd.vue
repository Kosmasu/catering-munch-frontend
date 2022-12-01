<template>
  <navbar />
  <div class="border-solid border-2 rounded-lg w-1/2 mx-auto my-8 p-4">
    <div class="text-3xl">Add New Menu</div>
    <form
      @submit.prevent="submit"
      class="flex flex-col lg:flex-row bg-gray-200 mt-4 p-8"
    >
      <!-- FOTO -->
      <div class="flex-initial w-1/3">
        <img src="" alt="Foto" />
        <input type="file" @change="uploadFoto" ref="foto" />
      </div>
      <div class="flex flex-col flex-1">
        <!-- NAMA -->
        <input
          type="text"
          v-model="nama"
          placeholder="Nama Menu"
          class="input input-bordered"
        />
        <!-- HARGA -->
        <input
          type="text"
          v-model="harga"
          placeholder="Harga Menu"
          class="input input-bordered"
        />
        <!-- STATUS -->
        <div class="flex space-x-4">
          <label class="label">
            <span class="label">Status</span>
          </label>
          <label class="label cursor-pointer space-x-2">
            <input
              type="radio"
              v-model="status"
              value="tersedia"
              class="radio"
            />
            <span class="label-text">Tersedia</span>
          </label>
          <label class="label cursor-pointer space-x-2">
            <input
              type="radio"
              v-model="status"
              value="tidak tersedia"
              class="radio"
            />
            <span class="label-text">Tidak tersedia</span>
          </label>
        </div>
      </div>
    </form>
    <div class="flex justify-end bg-gray-200">
      <button @click="btSubmit" class="btn btn-info m-4 rounded-md">
        Submit
      </button>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/ProviderNavbar.vue";
export default {
  name: "ProviderMenusDetail",
  components: {
    Navbar,
  },
  data() {
    return {
      foto: "",
      nama: "",
      harga: "",
      status: "tersedia",
    };
  },
  methods: {
    uploadFoto() {
      this.foto = this.$refs.file.files[0];
    },
    submit() {
      console.log(this.foto);
      console.log(this.nama);
      console.log(this.harga);
      console.log(this.status);
    },
    btSubmit() {
      this.submit();
    },
  },
};
</script>
<style></style>
