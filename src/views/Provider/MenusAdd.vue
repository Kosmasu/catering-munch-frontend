<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg my-8 p-4">
      <div class="text-3xl">Add New Menu</div>
      <form @submit.prevent="submit" class="flex flex-col lg:flex-row mt-4 p-8">
        <!-- FOTO -->
        <div class="flex-initial w-1/3">
          <div class="flex bg-base-200 w-1/2 h-36">
            <img v-if="foto" :src="foto" class="m-auto w-24" />
            <div v-else class="m-auto">Foto</div>
          </div>
          <input type="file" @change="uploadFoto" />
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
        <button @click="btSubmit" class="btn btn-primary m-4 rounded-md">
          Submit
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
      foto: "",
      nama: "",
      harga: "",
      status: "tersedia",
    };
  },
  methods: {
    uploadFoto(e) {
      const files = e.target.files;
      if (!files.length) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.foto = reader.result);
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
