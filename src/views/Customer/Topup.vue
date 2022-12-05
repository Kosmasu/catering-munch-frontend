<template>
  <div class="container">
    <div class="m-4 font-semibold text-2xl text-center">Top Up</div>
    <div class="rounded-lg border-2 p-4">
      <form @submit.prevent="submit" class="form-control">
        <!-- NOMINAL -->
        <input-vue
          v-model="topup.nominal"
          name="nominal"
          type="number"
          label="Nominal Top Up"
          :errors="this.errorData.errors"
        />
        <!-- PASSWORD -->
        <input-vue
          v-model="topup.password"
          name="password"
          type="password"
          label="Password"
          :errors="this.errorData.errors"
        />
        <label v-if="this.errorData" class="label">
          <span class="label-text text-error">
            {{ this.errorData.message }}
          </span>
        </label>
        <button class="btn btn-primary w-1/2 mx-auto">Topup</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "CustomerTopup",
  data() {
    return {
      nominal: "",
      password: "",
    };
  },
  components: {
    InputVue,
  },
  computed: {
    ...mapWritableState(useCustomerStore, ["form", "errorData"]),
  },
  methods: {
    ...mapActions(useCustomerStore, ["topup"]),
    async submit() {
      await this.topup().then((response) => {
        console.log("response:", response);
        if (response instanceof Error) {
          this.errorData = response.response.data;
          console.log("this.errorData:", this.errorData);
        }
      });
    },
  },
};
</script>
<style></style>
