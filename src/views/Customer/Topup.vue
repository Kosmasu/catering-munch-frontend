<template>
  <div class="container">
    <div class="m-4 font-semibold text-3xl text-center">Top Up</div>
    <div class="rounded-lg border-2 p-4">
      <form @submit.prevent="this.topup" class="form-control">
        <!-- NOMINAL -->
        <input-vue
          v-model="formTopup.nominal"
          name="nominal"
          type="number"
          label="Nominal"
          :errors="this.errorData.errors"
        />
        <!-- PASSWORD -->
        <input-vue
          v-model="formTopup.password"
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
        <button class="btn btn-primary w-1/2 mx-auto">Top Up</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { useCustomerStore } from "@/stores/CustomerStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "CustomerTopup",
  components: {
    InputVue,
  },
  methods: {
    ...mapActions(useCustomerStore, ["topup"]),
  },
  computed: {
    ...mapWritableState(useCustomerStore, ["formTopup"]),
    ...mapState(useCustomerStore, ["errorData"]),
  },
};
</script>
<style></style>
