<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
      <div class="flex flex-col items-center text-center lg:text-left">
        <img
          src="@/assets/munch.png"
          alt=""
          class="hidden rounded-lg xl:block py-4 w-96"
        />
        <p class="text-center text-lg py-2">
          Explore new home cookings through catering.
        </p>
      </div>
      <div class="card flex-shrink w-full max-w-xl shadow-2xl bg-base-100">
        <div class="card-body">
          <h1 class="text-4xl font-bold mb-4 text-primary">Register</h1>
          <form @submit.prevent="submit" class="form-control">
            <!-- NAMA -->
            <input-vue
              v-model="form.users_nama"
              name="users_nama"
              type="text"
              label="Nama"
              :errors="this.errorData.errors"
            />
            <!-- EMAIL -->
            <input-vue
              v-model="form.users_email"
              name="users_email"
              type="email"
              label="Email"
              :errors="this.errorData.errors"
            />
            <!-- ALAMAT -->
            <input-vue
              v-model="form.users_alamat"
              name="users_alamat"
              type="text"
              label="Alamat"
              :errors="this.errorData.errors"
            />
            <!-- TELEPON -->
            <input-vue
              v-model="form.users_telepon"
              name="users_telepon"
              type="text"
              label="Telepon"
              :errors="this.errorData.errors"
            />
            <!-- PASSWORD -->
            <input-vue
              v-model="form.users_password"
              name="users_password"
              type="password"
              label="Password"
              :errors="this.errorData.errors"
            />
            <!-- CONFIRM PASSWORD -->
            <input-vue
              v-model="form.users_password_confirmed"
              name="users_password_confirmed"
              type="password"
              label="Confirm Password"
              :errors="this.errorData.errors"
            />
            <!-- ROLE -->
            <div class="flex justify-center space-x-12 mt-2">
              <label class="label cursor-pointer space-x-2">
                <input
                  type="radio"
                  v-model="form.users_role"
                  value="customer"
                  class="radio"
                  checked
                />
                <span class="label-text">Customer</span>
              </label>
              <label class="label cursor-pointer space-x-2">
                <input
                  type="radio"
                  v-model="form.users_role"
                  value="provider"
                  class="radio"
                />
                <span class="label-text">Provider</span>
              </label>
            </div>
            <!-- T&C -->
            <label class="flex justify-start space-x-4 label cursor-pointer">
              <input type="checkbox" v-model="form.tnc" class="checkbox-primary" />
              <span>
                I agree to the
                <a href="#" class="link link-hover text-primary-focus">
                  Terms &amp; Conditions
                </a>
              </span>
            </label>
            <label v-if="this.errorData" class="label">
              <span class="label-text text-error">
                {{ this.errorData.message }}
              </span>
            </label>
            <button class="btn btn-primary w-full mt-4">Register</button>
          </form>
          <div>
            Already have an account?
            <a href="/login" class="link link-hover text-primary-focus">
              Login Now!
            </a>
          </div>
          <label class="label">
            <a href="/" class="link link-hover text-secondary-focus">
              &lt; Back to Home
            </a>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from "pinia";
import { useRegisterStore } from "@/stores/Auth/RegisterStore.js";
import InputVue from "@/components/Inputs/Input.vue";

export default {
  name: "Register",
  components: {
    InputVue,
  },
  methods: {
    ...mapActions(useRegisterStore, ["register"]),
    async submit() {
      await this.register() 
        .then(response=>{
        console.log('response register:',response);
        if (response instanceof Error) {
          this.errorData = response.response.data
          console.log('this.errorData:',this.errorData);
        }
      })
    },
  },
  computed: {
    ...mapWritableState(useRegisterStore, ["form", "errorData"]),
  },
};
</script>
<style></style>
