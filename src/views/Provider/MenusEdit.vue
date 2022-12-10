<template>
  <div class="container">
    <div class="border-solid border-2 rounded-lg my-8 p-4">
      <div class="text-3xl">Edit Menu</div>
      <form
        @submit.prevent="this.editMenu"
        class="flex flex-col lg:flex-row mt-4 p-8 form-control"
      >
        <!-- FOTO -->
        <div class="flex-initial w-1/3">
          <div class="flex bg-base-200 w-1/2 h-36">
            <img v-if="foto" :src="foto" class="m-auto w-24" />
            <div v-else class="m-auto">Foto</div>
          </div>
          <input
            v-on:change="uploadFoto"
            name="menu_foto"
            type="file"
            label="Foto"
            :errors="this.errorData.errors"
          />
        </div>
        <div class="flex flex-col flex-1">
          <!-- NAMA -->
          <input-vue
            v-model="form.menu_nama"
            name="menu_nama"
            type="text"
            label="Nama"
            :errors="this.errorData.errors"
          />
          <!-- HARGA -->
          <input-vue
            v-model="form.menu_harga"
            name="menu_harga"
            type="number"
            label="Harga"
            :errors="this.errorData.errors"
          />
          <!-- STATUS -->
          <div class="flex space-x-4">
            <label class="label">
              <span class="label">Status</span>
            </label>
            <label class="label cursor-pointer space-x-2">
              <input
                type="radio"
                v-model="form.menu_status"
                value="tersedia"
                class="radio"
              />
              <span class="label-text">Tersedia</span>
            </label>
            <label class="label cursor-pointer space-x-2">
              <input
                type="radio"
                v-model="form.menu_status"
                value="tidak tersedia"
                class="radio"
              />
              <span class="label-text">Tidak tersedia</span>
            </label>
          </div>
          <template v-if="this.errorData">
            <label
              v-if="
                this.errorData.errors &&
                Object.hasOwn(this.errorData.errors, 'menu_status')
              "
              class="label"
            >
              <span
                v-for="(item, index) in this.errorData.errors['menu_status']"
                :key="index"
                class="label-text text-error"
              >
                {{ item }}
              </span>
            </label>
          </template>
          <label v-if="this.errorData" class="label">
            <span class="label-text text-error">
              {{ this.errorData.message }}
            </span>
          </label>
          <button class="btn btn-primary mt-4">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useProviderStore } from "@/stores/ProviderStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "ProviderMenusEdit",
  components: {
    InputVue,
  },
  data() {
    return {
      foto: "",
    };
  },
  methods: {
    uploadFoto(e) {
      const files = e.target.files;
      if (!files.length) return;

      this.form.menu_foto = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => (this.foto = reader.result);
    },
    ...mapActions(useProviderStore, ["editMenu", "fillForm"]),
  },
  computed: {
    ...mapWritableState(useProviderStore, ["form"]),
    ...mapState(useProviderStore, ["errorData"]),
  },
  created() {
    this.fillForm();
  },
};
</script>
<style></style>
